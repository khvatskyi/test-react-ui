import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'
import { IAiContext, IAiMessage } from '../typings/models/ai.models';
import { sendMessage } from '../services/ai.service';
import { AiRole } from '../typings/enums/ai-role.enum';
import { IChatMessage } from '../typings/models/chat.models';

export interface IAiState {
  aiContext: IAiContext[];
  isLoading: boolean;
}

type StateModel = IAiState;

const initialState: StateModel = {
  aiContext: [],
  isLoading: false
};

export const sendMessageToAi = createAsyncThunk(
  'ai/sendMessageToAi',
  async (message: string, thunkAPI) => {

    const state = thunkAPI.getState() as RootState;

    const requestMessage: IAiMessage = {
      text: message,
      context: state.ai.aiContext
    };

    thunkAPI.dispatch(isLoading(true));
    const response = await sendMessage(requestMessage);
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
      state.aiContext.push({ role: AiRole.Assistant, content: action.payload.message });
    })
  }
})

const { isLoading } = aiSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const lastAiResponse = (state: RootState) => state.ai.aiContext.at(-1)?.content ?? null;
export const isAiMessageLoading = (state: RootState) => state.ai.isLoading;

const selectAiContext = (state: RootState) => state.ai.aiContext;

// Memoized selector: Transform aiContext into IChatMessage[]
export const getMessages = createSelector(
  [selectAiContext], // Input selectors
  (aiContext) =>
    aiContext.map((x) => ({
      text: x.content,
      sentByUser: x.role === AiRole.User,
    })) as IChatMessage[]
);

export default aiSlice.reducer;
