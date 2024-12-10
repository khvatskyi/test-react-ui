import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IAiContext, IAiMessage, IAiResponse } from '../models/ai.models';
import { sendMessage } from '../services/ai.service';
import { firstValueFrom } from 'rxjs';
import { AiRole } from '../enums/ai-role.enum';
import { IChatMessage } from '../models/chat.models';

export interface AiState {
  aiContext: IAiContext[];
  isLoading: boolean;
}

type StateModel = AiState;

const initialState: StateModel = {
  aiContext: [],
  isLoading: false
};

export const sendMessageToAi = createAsyncThunk(
  'ai/sendMessageToAi',
  async (message: string, thunkAPI) => {

    const state = thunkAPI.getState() as StateModel;

    const requestMessage: IAiMessage = {
      text: message,
      context: state.aiContext
    };

    thunkAPI.dispatch(isLoading(true));
    const response = await firstValueFrom(sendMessage(requestMessage));
    thunkAPI.dispatch(isLoading(false));
    return response;
  },
);

export const aiSlice = createSlice({
  name: 'ai',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    isLoading: (state, action) => {
      state.isLoading = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(sendMessageToAi.fulfilled, (state, action) => {
      state.aiContext.push({ role: AiRole.User, content: action.meta.arg });
      state.aiContext.push({ role: AiRole.Assistant, content: JSON.stringify(action.payload) });
    })
  }
})

const { isLoading } = aiSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const lastAiResponse = (state: RootState) => state.ai.aiContext.at(-1)?.content ?? null;
export const isAiMessageLoading = (state: RootState) => state.ai.isLoading;
// export const getMessages = (state: RootState): IChatMessage[] => state.ai.aiContext.map(x => ({ text: x.content, sentByUser: x.role === AiRole.User }));

const selectAiContext = (state: RootState) => state.ai.aiContext;

// Memoized selector: Transform aiContext into IChatMessage[]
export const getMessages = createSelector(
  [selectAiContext], // Input selectors
  (aiContext) =>
    aiContext.map((x) => ({
      text: x.role === AiRole.User ? x.content : (JSON.parse(x.content) as IAiResponse).message,
      sentByUser: x.role === AiRole.User,
    })) as IChatMessage[]
);

export default aiSlice.reducer;
