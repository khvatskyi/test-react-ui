import { IChatMessage } from '../../models/chat.models';
import Chat from '../chat/chat';
import { getMessages, isAiMessageLoading, sendMessageToAi } from '../../store/ai.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface ChatProps {
  messages: IChatMessage[];
  isResponding: boolean;
  onSendMessage: (message: string) => void;
}

export const ChatRoom = () => {
  const dispatch = useAppDispatch();
  const isResponding = useAppSelector(isAiMessageLoading);
  const messages = useAppSelector(getMessages);

  const chatProps: ChatProps = {
    messages: messages,
    isResponding,
    onSendMessage: (message: string) => dispatch(sendMessageToAi(message))
  };

  return (
    <div>
      <Chat {...chatProps} />
    </div>
  );
}
