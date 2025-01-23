import { Chat } from '..';
import { useAppSelector } from '../../hooks';
import { isAiMessageLoading } from '../../store/ai.slice';
import { IInteractiveChatContext } from '../../typings/models/module.models';

export interface IChatProps {
  context: IInteractiveChatContext;
  onSendMessage: (message: string) => void;
  onEditMessage: (id: string, message: string) => void;
  getAiAnswerExample: () => string;
}

export default function ChatRoom(props: IChatProps) {
  const isResponding = useAppSelector(isAiMessageLoading);
  const messages = props.context.history;

  return (
    <Chat 
      messages={messages} 
      onSendMessage={props.onSendMessage} 
      onEditMessage={props.onEditMessage} 
      getAiAnswerExample={props.getAiAnswerExample} 
      isResponding={isResponding}
    />
  );
}
