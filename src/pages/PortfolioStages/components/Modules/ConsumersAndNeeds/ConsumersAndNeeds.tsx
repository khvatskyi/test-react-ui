import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { addUserMessage, loadChatContext, selectChatContext, sendChatMessageToAi, sendEditChatMessage, setChatTopic, startNewChat } from '../../../../../store/ai.slice';
import ChatRoom from '../../../../../components/ChatRoom/ChatRoom';
import ChatStartForm from '../../StartForm/ChatStartForm';

import css from './ConsumersAndNeeds.module.scss';
import ModuleTopBar from '../../TopBar/ModuleTopBar';
import { STATE_CODES } from '../../PortfolioStagesLeftPanel/structure';
import { IEditChatMessage, IStartChat } from '../../../../../typings/models/module.models';
import UncompletedModule from '../../UncompletedModule/UncompletedModule';
import { selectCompletedModules } from '../../../../../store/data.slice';

export interface IConsumersAndNeedsProps {
  portfolioId: string;
}

const CURRENT_STATE_CODE = STATE_CODES.ConsumersAndNeeds;

export default function ConsumersAndNeeds({ portfolioId }: IConsumersAndNeedsProps) {
  const dispatch = useAppDispatch();
  const chatContext = useAppSelector(selectChatContext);
  const completedModules = useAppSelector(selectCompletedModules);
  const valuePropositionIsCompleted = Boolean(completedModules.find(x => x === STATE_CODES.ValueProposition));
  
  const onSendMessage = (message: string, isAiGenerated: boolean) => {
    if (!message) {
      return;
    }

    dispatch(addUserMessage({message, isAiGenerated}));

    return dispatch(sendChatMessageToAi({ message, stateCode: CURRENT_STATE_CODE, isAiGenerated }));
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

  useEffect(() => {
    if (portfolioId) {
      dispatch(loadChatContext({ portfolioId, stateCode: CURRENT_STATE_CODE }));
    }
  }, [dispatch, portfolioId]);

  return portfolioId && (
    <div className={css.root}>
      <ModuleTopBar stateCode={CURRENT_STATE_CODE} />
      {!valuePropositionIsCompleted && <UncompletedModule portfolioId={portfolioId} stateCode={STATE_CODES.ValueProposition} />}
      {valuePropositionIsCompleted && 
        <>
          {!chatContext && <ChatStartForm stateCode={CURRENT_STATE_CODE} />}
          {chatContext && <ChatRoom onSendMessage={onSendMessage} onEditMessage={onEditMessage} onStartNewChat={onStartNewChat} />}
        </>
      }
    </div>
  )
}
