export interface IStartChatInfo {
  portfolioId?: string;
  name?: string;
  description?: string;
}

export interface IInteractiveChatMessage {
  topic?: string;
  question?: string;
  example?: string;
  totalOfQuestions?: number;
  questionNumber?: number;
}
