import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { loadValuePropositionChat, selectValuePropositionChatContext, selectValuePropositionChatExample, sendMessageValuePropositionChatToAi } from '../../../../../store/ai.slice';
import ChatRoom from '../../../../../components/ChatRoom/ChatRoom';
import ChatStartForm from './components/Chat/StartForm/ChatStartForm';
import ModuleValuePropositionTopBar from './components/TopBar/ModuleValuePropositionTopBar';

import css from './ModuleValueProposition.module.scss';

export interface IModuleValuePropositionProps {
  portfolioId: string;
}

export default function ModuleValueProposition({ portfolioId }: IModuleValuePropositionProps) {
  const dispatch = useAppDispatch();
  const chatContext = useAppSelector(selectValuePropositionChatContext);
  const example = useAppSelector(selectValuePropositionChatExample);
  const onSendMessage = (message: string) => dispatch(sendMessageValuePropositionChatToAi(message));

  useEffect(() => {
    if (portfolioId) {
      dispatch(loadValuePropositionChat(portfolioId));
    }
  }, [dispatch, portfolioId]);

  return portfolioId && (
    <div className={css.root}>
      <ModuleValuePropositionTopBar />
      {!chatContext && <ChatStartForm />}
      {chatContext && <ChatRoom getAiAnswerExample={() => example} onSendMessage={onSendMessage} context={chatContext} />}
    </div>
  )
}
