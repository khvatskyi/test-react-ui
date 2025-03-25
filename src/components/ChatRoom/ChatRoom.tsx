import { Chat } from '..';
import { useAppSelector } from '../../hooks';
import { STATE_CODES } from '../../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure';
import { isAiMessageLoading } from '../../store/ai.slice';

export interface IChatProps {
  stateCode: STATE_CODES;
  showResponseOptionHint: boolean;
  onStartNewChat:(topic: string) => void; 
  onSendMessage: (message: string, isAiGenerated: boolean) => void;
  onEditMessage: (id: string, message: string, isAiGenerated: boolean) => void;
}

export default function ChatRoom(props: IChatProps) {
  const isResponding = useAppSelector(isAiMessageLoading);

  return (
    <Chat 
      stateCode={props.stateCode}
      onStartNewChat={props.onStartNewChat} 
      onSendMessage={props.onSendMessage} 
      onEditMessage={props.onEditMessage} 
      showResponseOptionHint={props.showResponseOptionHint}
      isResponding={isResponding}
    />
  );
}
