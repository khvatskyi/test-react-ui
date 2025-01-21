import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { addUserMessage, loadChatContext, selectChatContext, selectValuePropositionChatExample, sendChatMessageToAi } from '../../../../../store/ai.slice';
import ChatRoom from '../../../../../components/ChatRoom/ChatRoom';
import ModuleTopBar from '../../TopBar/ModuleTopBar';

import css from './ModuleValueProposition.module.scss';
import { STATE_CODES } from '../../PortfolioStagesLeftPanel/structure';
import ChatStartForm from '../../StartForm/ChatStartForm';

export interface IModuleValuePropositionProps {
  portfolioId: string;
}

const CURRENT_STATE_CODE = STATE_CODES.ValueProposition;

export default function ModuleValueProposition({ portfolioId }: IModuleValuePropositionProps) {
  const dispatch = useAppDispatch();
  const chatContext = useAppSelector(selectChatContext);
  const example = useAppSelector(selectValuePropositionChatExample);

  const onSendMessage = (message: string) => {
    if (!message) {
      return;
    }

    dispatch(addUserMessage(message));
    return dispatch(sendChatMessageToAi({ message, stateCode: CURRENT_STATE_CODE }));
  };

  useEffect(() => {
    if (portfolioId) {
      dispatch(loadChatContext({ portfolioId, stateCode: CURRENT_STATE_CODE }));
    }
  }, [dispatch, portfolioId]);

  return portfolioId && (
    <div className={css.root}>
      <ModuleTopBar stateCode={CURRENT_STATE_CODE} />
      {!chatContext && <ChatStartForm stateCode={CURRENT_STATE_CODE} />}
      {chatContext && <ChatRoom getAiAnswerExample={() => example} onSendMessage={onSendMessage} context={chatContext} />}
    </div>
  )
}
