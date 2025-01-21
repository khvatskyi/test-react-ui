import { ActionReducerMapBuilder, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'
import { IAiContext, IAiMessage } from '../typings/models/ai.models';
import { sendMessage, sendValuePropositionChatMessage } from '../services/ai.service';
import { AiRole } from '../typings/enums/ai-role.enum';
import { IChatMessage } from '../typings/models/chat.models';
import { IStartChatInfo, IInteractiveChatMessage } from '../typings/models/module.models';
import { startValuePropositionChat } from '../services/valueProposition.service';

export interface IAiState {
  ValuePropositionChatContext: IInteractiveChatMessage[] | null;
  ValuePropositionLastExample: string | null;
  aiContext: IAiContext[];
  isLoading: boolean;
}

type StateModel = IAiState;

const initialState: StateModel = {
  ValuePropositionChatContext: null,
  ValuePropositionLastExample: null,
  aiContext: [],
  isLoading: false
};

export const sendMessageToAi = createAsyncThunk(
  'ai/sendMessageToAi',
  async (message: string, thunkAPI) => {

    const state = thunkAPI.getState() as RootState;

    const requestMessage: IAiMessage = {
      portfolioId: state.data.selectedPortfolio.id,
      isLastAnswer: false,
      text: message,
      context: state.ai.aiContext
    };

    thunkAPI.dispatch(isLoading(true));
    const response = await sendMessage(requestMessage);
    thunkAPI.dispatch(isLoading(false));
    return response;
  },
);

export const sendMessageValuePropositionChatToAi = createAsyncThunk(
  'ai/sendMessageValuePropositionChatToAi',
  async (message: string, thunkAPI) => {

    const state = thunkAPI.getState() as RootState;
    const messages = state.ai.ValuePropositionChatContext;
    const isLastAnswer = (messages && messages.length > 0) 
      ? messages[messages.length - 1].questionNumber === messages[messages.length - 1].totalOfQuestions
      : false;

    const requestMessage: IAiMessage = {
      portfolioId: state.data.selectedPortfolio.id,
      isLastAnswer: isLastAnswer,
      text: message,
      context: state.ai.aiContext
    };

    thunkAPI.dispatch(isLoading(true));
    const response = await sendValuePropositionChatMessage(requestMessage);
    thunkAPI.dispatch(isLoading(false));
    return response;
  },
);


export const sendStartValuePropositionChat = createAsyncThunk(
  'data/startValuePropositionChat',
  async (context: IStartChatInfo, { rejectWithValue }) => {
    
    const response = startValuePropositionChat(context)
    .catch(
      r => { 
        const errorText = r.cause?.body?.detail ?? r.message;
        console.log(errorText);
        return rejectWithValue(r);
      }
    );
    return response;
  }
);


const valuePropositionExtraReducers = (builder: ActionReducerMapBuilder<IAiState>) => {
  builder
  .addCase(sendStartValuePropositionChat.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(sendStartValuePropositionChat.fulfilled, (state, action) => {
    if (!state.ValuePropositionChatContext) {
      state.ValuePropositionChatContext = [action.payload];
      state.ValuePropositionLastExample = action.payload.example;      
    } else {
      if (action.payload) {
        state.ValuePropositionChatContext.push(action.payload);
        state.ValuePropositionLastExample = action.payload.example;
      } else {
        state.ValuePropositionLastExample = null;
      }
    }
    state.isLoading = false;
  })
  .addCase(sendStartValuePropositionChat.rejected, (state) => {
    state.isLoading = false;
  })
  .addCase(sendMessageValuePropositionChatToAi.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(sendMessageValuePropositionChatToAi.fulfilled, (state, action) => {
    if (!state.ValuePropositionChatContext) {
      state.ValuePropositionChatContext = [action.payload];
      state.ValuePropositionLastExample = action.payload.example;
    } else {
      if (action.payload) {
        state.ValuePropositionChatContext.push(action.payload);
        state.ValuePropositionLastExample = action.payload.example;
      } else {
        state.ValuePropositionLastExample = null;
      }
    }
    state.isLoading = false;
  })
  .addCase(sendMessageValuePropositionChatToAi.rejected, (state) => {
    state.isLoading = false;
  })

  
};


export const aiSlice = createSlice({
  name: 'ai',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    isLoading: (state, action) => {
      state.isLoading = action.payload
    },
    clearValuePropositionChatContext: (state) => {
      state.ValuePropositionChatContext = null;
      state.ValuePropositionLastExample = null;
    }, 
  },
  extraReducers: builder => {
    builder.addCase(sendMessageToAi.fulfilled, (state, action) => {
      state.aiContext.push({ role: AiRole.User, content: action.meta.arg });
      state.aiContext.push({ role: AiRole.Assistant, content: action.payload.message });
    });
    valuePropositionExtraReducers(builder);
  }
})

const { isLoading } = aiSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectValuePropositionChatContext = (state: RootState) => state.ai.ValuePropositionChatContext;
export const selectValuePropositionChatExample = (state: RootState) => state.ai.ValuePropositionLastExample;
export const lastAiResponse = (state: RootState) => state.ai.aiContext.at(-1)?.content ?? null;
export const isAiMessageLoading = (state: RootState) => state.ai.isLoading;
export const { clearValuePropositionChatContext } = aiSlice.actions;

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
