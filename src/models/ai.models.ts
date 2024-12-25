
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

export interface IAiClientDefinitionFillRequest {
  name: string;
}

export interface IAiClientDefinitionFillResponse {
    name?: string;
    description?: string;
    industry?: string;
    size?: 'Small' | 'Medium' | 'Large';
    core_products?: string;
}

export interface IAiClientProfileFillRequest {
  name: string;
}

export interface IAiClientProfileFillResponse {
    name?: string;
    description?: string;
    industry?: string;
    size?: 'Small' | 'Medium' | 'Large';
    core_products?: string;
}
