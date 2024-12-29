export interface ISimpleChat {
  id: string;
  name?: string;
}

export interface IExtendedChat extends ISimpleChat {
  messages: IChatMessage[]
}

export interface IChatMessage {
  text: string;
  sentByUser: boolean;
  chatId?: string;
}
