import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'
import { IStartChatInfo, IInteractiveChatContext, ChatRole, IInteractiveChatMessage, IMessageToAi, IMessage } from '../typings/models/module.models';
import { createValuePropositionChat, getValuePropositionChat, sendValuePropositionChatMessage } from '../services/value-proposition-chat.service';

export interface IAiState {
  aiChatContext: IInteractiveChatContext;
  lastExample: string | null;
  isLoading: boolean;
}

type StateModel = IAiState;

const initialState: StateModel = {
  aiChatContext: null,
  lastExample: null,
  isLoading: false
};

const findLastElement = <T>(array: T[], predicate: (item: T) => boolean): T | undefined => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      return array[i];
    }
  }
  return undefined;
};

export const sendMessageValuePropositionChatToAi = createAsyncThunk(
  'ai/sendMessageValuePropositionChatToAi',
  async (message: string, thunkAPI) => {

    const state = thunkAPI.getState() as RootState;
    const messages = state.ai.aiChatContext.history;
    const lastQuestion = findLastElement(messages, x => x.createdBy === ChatRole.AI) as IInteractiveChatMessage;
    const isFinalAnswer = lastQuestion.questionNumber === lastQuestion.totalOfQuestions

    const requestMessage: IMessageToAi = {
      portfolioId: state.data.selectedPortfolio.id,
      isLastAnswer: isFinalAnswer,
      text: message,
      context: state.ai.aiChatContext
    };

    const response = await sendValuePropositionChatMessage(requestMessage);

    let result: IMessage = null;

    if (response) {
      result = {
        createdBy: ChatRole.AI,
        content: response
      }
    }

    return result;
  }
);

export const sendStartValuePropositionChat = createAsyncThunk(
  'data/startValuePropositionChat',
  async (context: IStartChatInfo, { rejectWithValue }) => {

    try {
      const response = await createValuePropositionChat(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);

export const loadValuePropositionChat = createAsyncThunk(
  'data/loadValuePropositionChat',
  async (portfolioId: string, { rejectWithValue }) => {
    try {
      const response = await getValuePropositionChat(portfolioId);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);
      return rejectWithValue(r);
    }
  }
);

const valuePropositionExtraReducers = (builder: ActionReducerMapBuilder<IAiState>) => {
  builder
    .addCase(loadValuePropositionChat.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loadValuePropositionChat.fulfilled, (state, action) => {
      state.aiChatContext = action.payload;
      state.isLoading = false;
    })
    .addCase(loadValuePropositionChat.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(sendStartValuePropositionChat.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(sendStartValuePropositionChat.fulfilled, (state, action) => {
      state.aiChatContext = action.payload;
      state.isLoading = false;
    })
    .addCase(sendStartValuePropositionChat.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(sendMessageValuePropositionChatToAi.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(sendMessageValuePropositionChatToAi.fulfilled, (state, action) => {      
      if (action.payload) {
        state.aiChatContext.history.push(action.payload)
      }

      state.lastExample = action.payload ? action.payload.content.example : null;
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
      state.aiChatContext = null;
      state.lastExample = null;
    },
    addUserMessage: (state, action) => {
      state.aiChatContext.history.push({
        createdBy: ChatRole.User,
        content: {
          text: action.payload
        }
      });
    }
  },
  extraReducers: builder => {
    valuePropositionExtraReducers(builder);
  }
})

// Other code such as selectors can use the imported `RootState` type
export const selectValuePropositionChatContext = (state: RootState) => state.ai.aiChatContext;
export const selectValuePropositionChatExample = (state: RootState) => state.ai.lastExample;
export const isAiMessageLoading = (state: RootState) => state.ai.isLoading;
export const { clearValuePropositionChatContext, addUserMessage } = aiSlice.actions;

export default aiSlice.reducer;
