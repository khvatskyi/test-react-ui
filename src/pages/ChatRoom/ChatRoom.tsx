import { IChatMessage } from '../../typings/models/chat.models';
import { Chat } from '../../components';
import { getMessages, isAiMessageLoading, sendMessageToAi } from '../../store/ai.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';

export interface IChatProps {
  messages: IChatMessage[];
  isResponding: boolean;
  onSendMessage: (message: string) => void;
}

export default function ChatRoom() {
  const dispatch = useAppDispatch();
  const isResponding = useAppSelector(isAiMessageLoading);
  const messages = useAppSelector(getMessages);

  const chatProps: IChatProps = {
    messages: messages,
    isResponding,
    onSendMessage: (message: string) => dispatch(sendMessageToAi(message))
  };

  return (
    <Chat {...chatProps} />
  );
}
