import { IOption } from './option.model';

export interface IAiMessage {
    context: IAiContext[];
    text: string;
}

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
