import { Chat } from '..';
import { useAppSelector } from '../../hooks';
import { isAiMessageLoading } from '../../store/ai.slice';

export interface IChatProps {
  onStartNewChat:(topic: string) => void; 
  onSendMessage: (message: string) => void;
  onEditMessage: (id: string, message: string) => void;
}

export default function ChatRoom(props: IChatProps) {
  const isResponding = useAppSelector(isAiMessageLoading);

  return (
    <Chat 
      onStartNewChat={props.onStartNewChat} 
      onSendMessage={props.onSendMessage} 
      onEditMessage={props.onEditMessage} 
      isResponding={isResponding}
    />
  );
}
