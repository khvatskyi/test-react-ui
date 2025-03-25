import { STATE_CODES } from "../../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure";
import { ChatMessageType, ChatRole } from "../enums/module.enum";

export interface IChatRequest {
  message: string, 
  stateCode: STATE_CODES, 
  isAiGenerated: boolean
}

export interface IApiContext {
  portfolioId: string;
  name?: string;
  description?: string;
}

export interface IStartChat {
  portfolioId: string;
  stateCode: string;
  topic?: string;
}

export interface IEditChatMessage {
  portfolioId: string;
  stateCode: string;
  messageId: string;
  message: string;
  isAiGenerated: boolean;
}

export interface IChatMessageInterviewQuestion {
  topic?: string;
  question?: string;
  example?: string;
  options?: string[];
  onlyOptionsAllowed?: boolean;
  totalOfQuestions?: number;
  questionNumber?: number;
}

export interface IChatMessageUserAnswer {
  answer?: string;
  isAiGenerated: boolean;
}

export type IChatMessageAnyContent = 
  IChatMessageInterviewQuestion | 
  IChatMessageUserAnswer

export interface IContentMessage {
  id?: string;
  type: ChatMessageType;
  role: ChatRole;
  content: IChatMessageAnyContent;
}

export interface IInteractiveChatTopic {
  name: string;
  status: string;
  history?: IContentMessage[];
  summary?: { [key: string]: any };
}

export interface IInteractiveChatContext {
  id: string;
  portfolioId: string;
  topics?: IInteractiveChatTopic[];
}

export interface IMessageToAi {
  message: string;
  portfolioId: string;
  questionNumber: number;
  isLastAnswer: boolean;
  isAiGenerated: boolean;
  stateCode: string;
}

export interface IGetSummaryRequest {
  portfolio_id: string;
  state_code: STATE_CODES;
}

export interface IPortfolioRequest {
  portfolio_id: string;
}

export interface IUpdateChatSummaryValueRequest {
  portfolioId: string;
  stateCode: string;
  topic: string;
  key: string;
  value: any;
}
