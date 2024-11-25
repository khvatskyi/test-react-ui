import { IOption } from './option.model';

export interface IMessageToAi {
  context: IAiContext[];
  text: string;
}

export interface IAiContext {
  role: string;
  content: string
}

export interface IAiResponse {
  message: string;
  options: IOption[];
}
