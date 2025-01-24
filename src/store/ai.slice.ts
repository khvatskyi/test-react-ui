import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'
import { IStartChatInfo, IEditChatMessage, IInteractiveChatContext, ChatRole, IMessageToAi, IContentMessage, IGetSummaryRequest } from '../typings/models/module.models';
import { setPending } from './data.slice';
import { createChat, deleteChat, getChatContext, sendChatMessage, editChatMessage, getChatSummary } from '../services/chat.service';
import { STATE_CODES } from '../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure';

export interface IAiState {
  aiChatContext: IInteractiveChatContext;
  lastExample: string | null;
  isLoading: boolean[];
}

type StateModel = IAiState;

const initialState: StateModel = {
  aiChatContext: null,
  lastExample: null,
  isLoading: []
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

    if (isFinalAnswer) {
      const request: IGetSummaryRequest = {
        chat_id: state.ai.aiChatContext.id,
        portfolio_id: state.ai.aiChatContext.portfolioId,
        state_code: args.stateCode
      };

      thunkAPI.dispatch(getSummary(request));
    }

    return response;
  }
);

export const getSummary = createAsyncThunk(
  'data/getSummary',
  async (request: IGetSummaryRequest, { rejectWithValue, dispatch }) => {

    try {
      const response = await getChatSummary(request);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
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

export const sendEditChatMessage = createAsyncThunk(
  'data/sendEditChatMessage',
  async (context: IEditChatMessage, { rejectWithValue }) => {

    try {
      await editChatMessage(context);
      return context;
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
      state.isLoading.push(true);
    })
    .addCase(loadChatContext.fulfilled, (state, action) => {
      const chatHistory = action.payload?.history ?? [];

      state.aiChatContext = action.payload;
      state.lastExample = action.payload
        ? findLastElement(chatHistory, (x) => x.role === ChatRole.AI).content.example
        : null;

      state.isLoading.pop();
    })
    .addCase(loadChatContext.rejected, (state) => {
      state.isLoading.pop();
    })
    .addCase(startNewChat.pending, (state) => {
      state.isLoading.push(true);
    })
    .addCase(startNewChat.fulfilled, (state, action) => {
      const history = action.payload.history ?? [];
      const lastAiMessage = findLastElement(history, (x) => x.role === ChatRole.AI);

      state.aiChatContext = action.payload;
      state.lastExample = lastAiMessage.content.example;
      state.isLoading.pop();
    })
    .addCase(startNewChat.rejected, (state) => {
      state.isLoading.pop();
    })
    .addCase(sendChatMessageToAi.pending, (state) => {
      state.isLoading.push(true);
    })
    .addCase(sendChatMessageToAi.fulfilled, (state, action) => {
      state.aiChatContext.history.pop();
      state.aiChatContext.history.push(...action.payload);

      if (action.payload.length > 1) {
        state.lastExample = action.payload.find(x => x.role === ChatRole.AI).content.example;
      } else {
        state.lastExample = null;
      }

      state.isLoading.pop();
    })
    .addCase(sendChatMessageToAi.rejected, (state) => {
      state.isLoading.pop();
    })
    .addCase(resetChatContext.fulfilled, (state) => {
      state.aiChatContext = null;
      state.lastExample = null;
      state.isLoading = [];
    })
    .addCase(sendEditChatMessage.fulfilled, (state, action) => {
      const editedMessage = state.aiChatContext.history.find(x => x.id === action.payload.messageId);
      editedMessage.content.text = action.payload.message;
    })
    .addCase(getSummary.pending, (state) => {
      state.isLoading.push(true);
    })
    .addCase(getSummary.fulfilled, (state, action) => {
      state.aiChatContext.summary = action.payload;
      state.isLoading.pop();
    })
    .addCase(getSummary.rejected, (state) => {
      state.isLoading.pop();
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
        id: 'temp',
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
export const selectChatSummary = (state: RootState) => state.ai.aiChatContext?.summary;
export const selectValuePropositionChatExample = (state: RootState) => state.ai.lastExample;
export const isAiMessageLoading = (state: RootState) => state.ai.isLoading.length > 0;
export const { addUserMessage, clearChatContext } = aiSlice.actions;

export default aiSlice.reducer;
