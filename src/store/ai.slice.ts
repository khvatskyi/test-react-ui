import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'
import { IStartChatInfo, IInteractiveChatContext, ChatRole, IMessageToAi, IContentMessage } from '../typings/models/module.models';
import { setPending } from './data.slice';
import { createChat, deleteChat, getChatContext, sendChatMessage } from '../services/chat.service';
import { STATE_CODES } from '../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure';

export interface IAiState {
  conversationCompleted: boolean;
  aiChatContext: IInteractiveChatContext;
  lastExample: string | null;
  isLoading: boolean;
}

type StateModel = IAiState;

const initialState: StateModel = {
  conversationCompleted: false,
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

export const sendChatMessageToAi = createAsyncThunk(
  'ai/sendChatMessageToAi',
  async (args: { message: string, stateCode: STATE_CODES }, thunkAPI) => {

    const state = thunkAPI.getState() as RootState;
    const messages = state.ai.aiChatContext.history;
    const lastQuestion = findLastElement(messages, x => x.role === ChatRole.AI) as IContentMessage;
    const isFinalAnswer = lastQuestion.content.questionNumber === lastQuestion.content.totalOfQuestions

    const requestMessage: IMessageToAi = {
      portfolioId: state.data.selectedPortfolio.id,
      isLastAnswer: isFinalAnswer,
      text: args.message,
      context: state.ai.aiChatContext,
      stateCode: args.stateCode,
    };

    const response = await sendChatMessage(requestMessage);

    return response;
  }
);

export const startNewChat = createAsyncThunk(
  'data/startNewChat',
  async (args: { context: IStartChatInfo, stateCode: STATE_CODES }, { rejectWithValue }) => {

    try {
      const response = await createChat(args.context, args.stateCode);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);

export const loadChatContext = createAsyncThunk(
  'data/loadChatContext',
  async (args: { portfolioId: string, stateCode: STATE_CODES }, { rejectWithValue }) => {
    try {
      const response = await getChatContext(args.portfolioId, args.stateCode);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);
      return rejectWithValue(r);
    }
  }
);

export const resetChatContext = createAsyncThunk(
  'data/resetChatContext',
  async (args: { portfolioId: string, stateCode: STATE_CODES }, { rejectWithValue, dispatch }) => {

    dispatch(setPending(true));

    try {
      return await deleteChat(args.portfolioId, args.stateCode);
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);
      return rejectWithValue(r);
    } finally {
      dispatch(setPending(false));
    }
  }
);

const chatExtraReducers = (builder: ActionReducerMapBuilder<IAiState>) => {
  builder
    .addCase(loadChatContext.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loadChatContext.fulfilled, (state, action) => {
      const chatHistory = action.payload?.history ?? [];

      if (action.payload) {
        const lastAiMessage = findLastElement(chatHistory, (x) => x.role === ChatRole.AI);
        const lastMessage = chatHistory.at(-1);
        const isFinalAIMessageSent = Boolean(lastAiMessage && lastAiMessage.content.questionNumber === lastAiMessage.content.totalOfQuestions);

        state.conversationCompleted = Boolean(isFinalAIMessageSent && lastMessage?.role === ChatRole.User)
      }

      state.aiChatContext = action.payload;
      state.lastExample = action.payload
        ? findLastElement(chatHistory, (x) => x.role === ChatRole.AI).content.example
        : null;

      state.isLoading = false;
    })
    .addCase(loadChatContext.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(startNewChat.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(startNewChat.fulfilled, (state, action) => {
      const history = action.payload.history ?? [];
      const lastAiMessage = findLastElement(history, (x) => x.role === ChatRole.AI);

      state.aiChatContext = action.payload;
      state.lastExample = lastAiMessage.content.example;
      state.conversationCompleted = false;
      state.isLoading = false;
    })
    .addCase(startNewChat.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(sendChatMessageToAi.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(sendChatMessageToAi.fulfilled, (state, action) => {
      if (action.payload) {
        state.aiChatContext.history.push(action.payload);
        state.lastExample = action.payload.content.example;
      } else {
        state.lastExample = null;
        state.conversationCompleted = true;
      }

      state.isLoading = false;
    })
    .addCase(sendChatMessageToAi.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(resetChatContext.fulfilled, (state) => {
      state.aiChatContext = null;
      state.lastExample = null;
    })
};

export const aiSlice = createSlice({
  name: 'ai',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: () => structuredClone(initialState),
  reducers: {
    isLoading: (state, action) => {
      state.isLoading = action.payload
    },
    addUserMessage: (state, action) => {
      state.aiChatContext.history.push({
        role: ChatRole.User,
        content: {
          text: action.payload
        }
      });
    },
    clearChatContext: (state) => {
      state = {
        ...structuredClone(initialState),
        isLoading: state.isLoading
      }
    }
  },
  extraReducers: builder => {
    chatExtraReducers(builder);
  }
})

// Other code such as selectors can use the imported `RootState` type
export const selectChatContext = (state: RootState) => state.ai.aiChatContext;
export const isConversationCompleted = (state: RootState) => state.ai.conversationCompleted;
export const selectValuePropositionChatExample = (state: RootState) => state.ai.lastExample;
export const isAiMessageLoading = (state: RootState) => state.ai.isLoading;
export const { addUserMessage, clearChatContext } = aiSlice.actions;

export default aiSlice.reducer;
