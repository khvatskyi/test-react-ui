
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
}

export interface IAiProfileFillRequest {
  name: string;
}

export interface IAiProfileFillResponse {
    name?: string;
    description?: string;
    industry?: string;
    size?: 'Small' | 'Medium' | 'Large';
    coreProducts?: string;
}
