import { Chat } from '../../components';
import { isAiMessageLoading, sendMessageToAi } from '../../store/ai.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IInteractiveChatMessage } from '../../typings/models/module.models';
import { selectValuePropositionChatContext } from '../../store/data.slice';


export interface IChatProps {
  messages: IInteractiveChatMessage[];
  isResponding: boolean;
  onSendMessage: (message: string) => void;
}

export default function ChatRoom() {
  const dispatch = useAppDispatch();
  const isResponding = useAppSelector(isAiMessageLoading);
  const messages = useAppSelector(selectValuePropositionChatContext);

  const chatProps: IChatProps = {
    messages: messages,
    isResponding,
    onSendMessage: (message: string) => dispatch(sendMessageToAi(message))
  };

  return (
    <Chat {...chatProps} />
  );
}
