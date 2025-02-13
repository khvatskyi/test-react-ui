import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'
import { IApiContext, IStartChat, IEditChatMessage, IInteractiveChatContext, IMessageToAi, IContentMessage, IGetSummaryRequest, 
         IChatMessageUserAnswer, IChatMessageInterviewQuestion, IGetApiContextRequest
       } from '../typings/models/module.models';
import { getSuccessfullyCompletedModules, setPending } from './data.slice';
import { initChatTopic, startChat, deleteChat, getChatContext, sendChatMessage, editChatMessage, getChatSummary, getChatApiContext, getScenarioDetails, 
         getApiProductJourneyReguest, initApiProductJourneyReguest, 
         updateStepApiProductJourneyReguest,
         updateActionApiProductJourneyReguest} from '../services/chat.service';
import { STATE_CODES } from '../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure';
import { findLastElement } from '../utilities/data.utility';
import { ChatMessageType, ChatRole, TopicStatus } from '../typings/enums/module.enum';
import { IGetScenarioDetailsRequest, IProductJourney, IScenarioDetails, IUpdateApiProductJourneyAction, IUpdateApiProductJourneyStep } from '../typings/models/product-journey.model';

export interface IAiState {
  aiChatContext: IInteractiveChatContext;
  ApiContext: IApiContext;
  ScenarioDetails: IScenarioDetails;
  ProductJurney: IProductJourney;
  currentChatTopic: string | null;
  isLoading: boolean[];
}

type StateModel = IAiState;

const initialState: StateModel = {
  aiChatContext: null,
  ApiContext: null,
  ScenarioDetails: null,
  ProductJurney: null,
  currentChatTopic: null,
  isLoading: []
};


export const sendChatMessageToAi = createAsyncThunk(
  'ai/sendChatMessageToAi',
  async (args: { message: string, stateCode: STATE_CODES, isAiGenerated: boolean}, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const activeTopic = state.ai.aiChatContext.topics?.find(topic => topic.status === TopicStatus.ActiveDiscussion);
    const messages = activeTopic.history;
    const lastQuestion = findLastElement(messages, x => x.role === ChatRole.AI) as IContentMessage;
    const lastQuestionContent = lastQuestion.content as IChatMessageInterviewQuestion
    const isFinalAnswer = lastQuestionContent.questionNumber === lastQuestionContent.totalOfQuestions

    const requestMessage: IMessageToAi = {
      portfolioId: state.data.selectedPortfolio.id,
      isLastAnswer: isFinalAnswer,
      isAiGenerated: args.isAiGenerated,
      message: args.message,
      stateCode: args.stateCode,
    };

    const response = await sendChatMessage(requestMessage);

    if (isFinalAnswer) {
      const request: IGetSummaryRequest = {
        chat_id: state.ai.aiChatContext.id,
        portfolio_id: state.ai.aiChatContext.portfolioId,
        state_code: args.stateCode
      };

      thunkAPI.dispatch(getSummary(request)).then(() => thunkAPI.dispatch(getSuccessfullyCompletedModules(state.ai.aiChatContext.portfolioId)));
    }

    return response;
  }
);

export const getSummary = createAsyncThunk(
  'data/getSummary',
  async (request: IGetSummaryRequest, { rejectWithValue }) => {

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

export const loadApiContext = createAsyncThunk(
  'data/loadApiContext',
  async (request: IGetApiContextRequest, { rejectWithValue }) => {

    try {
      const response = await getChatApiContext(request);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);

export const loadScenarioDetails = createAsyncThunk(
  'data/loadScenarioDetails',
  async (request: IGetScenarioDetailsRequest, { rejectWithValue }) => {

    try {
      const response = await getScenarioDetails(request);
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
  async (context: IStartChat, { rejectWithValue }) => {

    try {
      const response = await startChat(context);
      
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);

export const initNewChatTopics = createAsyncThunk(
  'data/initNewChatTopics',
  async (args: { context: IApiContext}, { rejectWithValue }) => {

    try {
      const response = await initChatTopic(args.context);
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

export const initApiProductJourney = createAsyncThunk(
  'data/initApiProductJourney',
  async (context: IScenarioDetails, { rejectWithValue }) => {

    try {
      const response = await initApiProductJourneyReguest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);

export const getApiProductJourney = createAsyncThunk(
  'data/getApiProductJourney',
  async (context: IGetScenarioDetailsRequest, { rejectWithValue }) => {

    try {
      const response = await getApiProductJourneyReguest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);

export const updateStepApiProductJourney = createAsyncThunk(
  'data/updateStepApiProductJourney',
  async (context: IUpdateApiProductJourneyStep, { rejectWithValue }) => {

    try {
      const response = await updateStepApiProductJourneyReguest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);

export const updateActionApiProductJourney = createAsyncThunk(
  'data/updateActionApiProductJourney',
  async (context: IUpdateApiProductJourneyAction, { rejectWithValue }) => {

    try {
      const response = await updateActionApiProductJourneyReguest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);


const chatExtraReducers = (builder: ActionReducerMapBuilder<IAiState>) => {
  builder
    .addCase(loadChatContext.pending, (state) => {
      state.isLoading.push(true);
    })
    .addCase(loadChatContext.fulfilled, (state, action) => {
      state.aiChatContext = action.payload;
      state.isLoading.pop();
    })
    .addCase(loadChatContext.rejected, (state) => {
      state.isLoading.pop();
    })
    .addCase(initNewChatTopics.pending, (state) => {
      state.isLoading.push(true);
    })
    .addCase(initNewChatTopics.fulfilled, (state, action) => {
      state.aiChatContext = action.payload;
      state.isLoading.pop();
    })
    .addCase(initNewChatTopics.rejected, (state) => {
      state.isLoading.pop();
    })
    .addCase(startNewChat.pending, (state) => {
      state.isLoading.push(true);
    })
    .addCase(startNewChat.fulfilled, (state, action) => {
      state.aiChatContext = action.payload;
      state.isLoading.pop();
    })
    .addCase(startNewChat.rejected, (state) => {
      state.isLoading.pop();
    })
    .addCase(sendChatMessageToAi.pending, (state) => {
      state.isLoading.push(true);
    })
    .addCase(sendChatMessageToAi.fulfilled, (state, action) => {
      const activeTopic = state.aiChatContext.topics?.find(topic => topic.status === TopicStatus.ActiveDiscussion);
      activeTopic.history.pop();
      activeTopic.history.push(...action.payload);

      state.isLoading.pop();
    })
    .addCase(sendChatMessageToAi.rejected, (state) => {
      state.isLoading.pop();
    })
    .addCase(resetChatContext.fulfilled, (state) => {
      state.aiChatContext = null;
      state.ProductJurney = null;
      state.isLoading = [];
    })
    .addCase(sendEditChatMessage.fulfilled, (state, action) => {
      const activeTopic = state.aiChatContext.topics?.find(topic => topic.status === TopicStatus.ActiveDiscussion);
      const editedMessage = activeTopic.history.find(x => x.id === action.payload.messageId);
      (editedMessage.content as IChatMessageUserAnswer).answer = action.payload.message;
    })
    .addCase(getSummary.pending, (state) => {
      state.isLoading.push(true);
    })
    .addCase(getSummary.fulfilled, (state, action) => {
      const activeTopic = state.aiChatContext.topics?.find(topic => topic.status === TopicStatus.ActiveDiscussion);
      activeTopic.status = TopicStatus.Completed;      
      const topic = action.payload.find(topic => topic.name === activeTopic.name);
      activeTopic.summary = topic.summary;
      state.isLoading.pop();
    })
    .addCase(getSummary.rejected, (state) => {
      state.isLoading.pop();
    })
    .addCase(loadApiContext.pending, (state) => {
      state.isLoading.push(true);
    })
    .addCase(loadApiContext.fulfilled, (state, action) => {
      state.ApiContext = action.payload;
      state.isLoading.pop();
    })
    .addCase(loadApiContext.rejected, (state) => {
      state.isLoading.pop();
    })
    .addCase(loadScenarioDetails.pending, (state) => {
      state.isLoading.push(true);
    })
    .addCase(loadScenarioDetails.fulfilled, (state, action) => {
      state.ScenarioDetails = action.payload;
      state.isLoading.pop();
    })
    .addCase(loadScenarioDetails.rejected, (state) => {
      state.isLoading.pop();
    })
    .addCase(initApiProductJourney.fulfilled, (state, action) => {
      state.ProductJurney = action.payload;
    })
    .addCase(getApiProductJourney.fulfilled, (state, action) => {
      state.ProductJurney = action.payload;
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
      const activeTopic = state.aiChatContext.topics?.find(topic => topic.status === TopicStatus.ActiveDiscussion);
      activeTopic.history.push({
        id: 'temp',
        type: ChatMessageType.UserAnswer,
        role: ChatRole.User,
        content: {
          answer: action.payload.message,
          isAiGenerated: action.payload.isAiGenerated,
        }
      });
    },
    clearChatContext: (state) => {
      state = {
        ...structuredClone(initialState),
        isLoading: state.isLoading
      }
    },
    setChatTopic: (state, action) => {
      state.currentChatTopic = action.payload;
    }
  },
  extraReducers: builder => {
    chatExtraReducers(builder);
  }
})

// Other code such as selectors can use the imported `RootState` type
export const selectChatContext = (state: RootState) => state.ai.aiChatContext;
export const selectApiContext = (state: RootState) => state.ai.ApiContext;
export const selectScenarioDetails = (state: RootState) => state.ai.ScenarioDetails;
export const selectProductJurney = (state: RootState) => state.ai.ProductJurney;
export const selectChatTopic = (state: RootState) => state.ai.currentChatTopic;

export const isAiMessageLoading = (state: RootState) => state.ai.isLoading.length > 0;
export const { addUserMessage, clearChatContext, setChatTopic } = aiSlice.actions;

export default aiSlice.reducer;
