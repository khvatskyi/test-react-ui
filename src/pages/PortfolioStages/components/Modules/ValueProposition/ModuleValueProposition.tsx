import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { addUserMessage, loadChatContext, selectChatContext, sendChatMessageToAi, sendEditChatMessage, setChatTopic, startNewChat } from '../../../../../store/ai.slice';
import ChatRoom from '../../../../../components/ChatRoom/ChatRoom';
import ChatStartForm from '../../StartForm/ChatStartForm';

import css from './ModuleValueProposition.module.scss';
import ModuleTopBar from '../../TopBar/ModuleTopBar';
import { STATE_CODES } from '../../PortfolioStagesLeftPanel/structure';
import { IEditChatMessage, IStartChat } from '../../../../../typings/models/module.models';

export interface IModuleValuePropositionProps {
  portfolioId: string;
}

const CURRENT_STATE_CODE = STATE_CODES.ValueProposition;

export default function ModuleValueProposition({ portfolioId }: IModuleValuePropositionProps) {
  const dispatch = useAppDispatch();
  const chatContext = useAppSelector(selectChatContext);

  const onSendMessage = (message: string, isAiGenerated: boolean) => {
    if (!message) {
      return;
    }

    dispatch(addUserMessage({message, isAiGenerated}));

    return dispatch(sendChatMessageToAi({ message, stateCode: CURRENT_STATE_CODE, isAiGenerated}));
  };

  const onStartNewChat = (topic: string) => {
    const context: IStartChat = {
      portfolioId: portfolioId,
      stateCode: CURRENT_STATE_CODE,
      topic: topic,
    }

    const result = dispatch(startNewChat(context));
    dispatch(setChatTopic(context.topic));
    return result;
  };

  const onEditMessage = (id: string, message: string, isAiGenerated: boolean) => {
    if (!message) {
      return;
    }

    const editMessage: IEditChatMessage = {
      portfolioId: portfolioId,
      stateCode: CURRENT_STATE_CODE,
      messageId: id,
      message: message,
      isAiGenerated: isAiGenerated,
    }

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
      {chatContext && <ChatRoom onSendMessage={onSendMessage} onEditMessage={onEditMessage} onStartNewChat={onStartNewChat} />}
    </div>
  )
}
