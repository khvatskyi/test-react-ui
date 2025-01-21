import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { addUserMessage, loadChatContext, selectChatContext, selectValuePropositionChatExample, sendChatMessageToAi } from '../../../../../store/ai.slice';
import ChatRoom from '../../../../../components/ChatRoom/ChatRoom';
import ChatStartForm from '../../StartForm/ChatStartForm';

import css from './ApiProductJorneys.module.scss';
import ModuleTopBar from '../../TopBar/ModuleTopBar';
import { STATE_CODES } from '../../PortfolioStagesLeftPanel/structure';

export interface IApiProductJorneysProps {
  portfolioId: string;
}

export const CURRENT_STATE_CODE = STATE_CODES.APIProductJourneys;

export default function ApiProductJorneys({ portfolioId }: IApiProductJorneysProps) {
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
