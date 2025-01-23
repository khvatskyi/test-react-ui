import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { addUserMessage, loadChatContext, selectChatContext, selectValuePropositionChatExample, sendChatMessageToAi, sendEditChatMessage } from '../../../../../store/ai.slice';
import ChatRoom from '../../../../../components/ChatRoom/ChatRoom';
import ChatStartForm from '../../StartForm/ChatStartForm';

import css from './ModuleValueProposition.module.scss';
import ModuleTopBar from '../../TopBar/ModuleTopBar';
import { STATE_CODES } from '../../PortfolioStagesLeftPanel/structure';
import { IEditChatMessage } from '../../../../../typings/models/module.models';

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

  const onEditMessage = (id: string, message: string) => {
    if (!message) {
      return;
    }

    const editMessage: IEditChatMessage = {
      portfolioId: portfolioId,
      stateCode: CURRENT_STATE_CODE,
      messageId: id,
      message: message,
    }

    //dispatch(addUserMessage(message)); //TODO: need to check
    return dispatch(sendEditChatMessage(editMessage));
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
      {chatContext && <ChatRoom getAiAnswerExample={() => example} onSendMessage={onSendMessage} onEditMessage={onEditMessage} context={chatContext} />}
    </div>
  )
}
