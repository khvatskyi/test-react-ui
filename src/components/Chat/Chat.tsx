import { useEffect, useRef, useState } from 'react';
import React from 'react';

import { FlexRow, Button, TextInput, Text } from '@epam/uui';
import { ReactComponent as sendIcon } from '@epam/assets/icons/action-send-fill.svg';

import css from './Chat.module.scss';
import { IChatMessageInterviewQuestion, IContentMessage, IInteractiveChatTopic } from '../../typings/models/module.models';
import ChatSpinner from './ChatSpinner';
import ChatQuestion from './ChatQuestion';
import ChatAiResponse from './ChatAiResponse';
import UserAnswer from './UserAnswer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearFailedChatRequest, deleteActiveChatLastMessage, selectChatContext, selectFailedChatRequest } from '../../store/ai.slice';
import { ModuleCompleted } from '..';
import ChatTopicSelector from './ChatTopicSelector';
import { multiTopicChats, normalizeSummaryKeys, STATE_CODES } from '../../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure';
import { findLastElement } from '../../utilities/data.utility';
import { ChatMessageType, ChatRole, TopicStatus } from '../../typings/enums/module.enum';
import ChatAiResponseOptions from './ChatAiResponseOptions';
import ChatAiResponseValueCreation from './ChatAiResponseValueCreation';
import ChatAiResponseValueCreators from './ChatAiResponseValueCreators';
import ChatAiResponseNotApplicable from './ChatAiResponseNotApplicable';
import ChatAiError from './ChatAiError';



export interface IChatProps {
  stateCode: STATE_CODES;
  isResponding: boolean;
  showResponseOptionHint: boolean;
  onStartNewChat:(topic: string) => void; 
  onSendMessage: (message: string, isAiGenerated: boolean) => void;
  onEditMessage: (id: string, message: string, isAiGenerated: boolean) => void;
}

export default function Chat({ stateCode, isResponding, showResponseOptionHint, onSendMessage, onEditMessage, onStartNewChat }: IChatProps) {
  const dispatch = useAppDispatch();
  
  const failedChatRequest = useAppSelector(selectFailedChatRequest);
  const chatContext = useAppSelector(selectChatContext);
  const chatTopics = chatContext.topics;
    
  const topicsNew = chatTopics.filter(topic => topic.status === TopicStatus.New); 
  const topicsActive = chatTopics.filter(topic => topic.status === TopicStatus.ActiveDiscussion);
  const topicsCompleted = chatTopics.filter(topic => topic.status === TopicStatus.Completed);
  const topicsNewNames = topicsNew.map(topic => topic.name);

  const showTopicSelector = topicsActive.length === 0 && topicsNewNames.length > 0 && multiTopicChats.includes(stateCode);
  
  let onlyOptionsAllowed: boolean = false;
  let spinnerHint = 'Loading...';
  if (topicsActive.length === 0) {
    spinnerHint = 'Preparing interview...';
  } else if (topicsActive[0].history) {
    const lastInterviewMessage = findLastElement(topicsActive[0].history, x => 
        (x.type === ChatMessageType.InterviewQuestion) || (x.type === ChatMessageType.ValueCreationModelQuestion)
      ) as IContentMessage;
    const interviewQuestion = lastInterviewMessage.content as IChatMessageInterviewQuestion;
    onlyOptionsAllowed = Boolean(interviewQuestion.onlyOptionsAllowed);
    if (interviewQuestion.totalOfQuestions === interviewQuestion.questionNumber) {
      spinnerHint = 'Generating summary...';
    } else {
      spinnerHint = 'Preparing next question...';
    }
  }

  const sendControlsDisabled = (chatTopics.length === 0) || (topicsActive.length === 0) || onlyOptionsAllowed || Boolean(failedChatRequest);

  const [currentInput, setCurrentInput] = useState('');

  const handleSendResponce = (value: string, isAiGenerated: boolean) => {
    onSendMessage(value, isAiGenerated);
  }

  const handleSendMessage = () => {
    if (currentInput.trim()) {
      onSendMessage(currentInput, false);
      setCurrentInput('');
    }
  };

  const handleRetryRequest = () => {
    dispatch(clearFailedChatRequest());
    dispatch(deleteActiveChatLastMessage());
    onSendMessage(failedChatRequest.message, failedChatRequest.isAiGenerated);
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const chatBoxRef = useRef(null);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [topicsNew, topicsActive, topicsCompleted]);

  const renderMessage = (message, message_index, topic, onEditMessageProc) => {
    switch (message.type) {
      case ChatMessageType.InterviewQuestion:
        return <ChatQuestion key={message_index} message={message.content as IChatMessageInterviewQuestion} />;
      case ChatMessageType.ValueCreationModelQuestion:
        return <ChatQuestion key={message_index} message={message.content as IChatMessageInterviewQuestion} />;
      case ChatMessageType.ValueCreatorsListQuestion:
        return <ChatQuestion key={message_index} message={message.content as IChatMessageInterviewQuestion} />;
      case ChatMessageType.NotApplicableQuestion:
        return <ChatQuestion key={message_index} message={message.content as IChatMessageInterviewQuestion} />;
      default:
        const interviewQuestion = topic.history[message_index-1]?.content as IChatMessageInterviewQuestion;
        return <UserAnswer key={message_index} message={message} 
                           aiExample={interviewQuestion?.example}
                           aiOptions={interviewQuestion?.options}
                           onEditMessage={onEditMessageProc} />;
    }
  };  
  
  const renderAiResponce = (message: IContentMessage) => {
    if (message.type === ChatMessageType.ValueCreationModelQuestion) {
      return <ChatAiResponseValueCreation onSendResponce={handleSendResponce} message={message.content as IChatMessageInterviewQuestion} />
    } else if (message.type === ChatMessageType.ValueCreatorsListQuestion) {
      return <ChatAiResponseValueCreators onSendResponce={handleSendResponce} message={message.content as IChatMessageInterviewQuestion} />
    } else if (message.type === ChatMessageType.NotApplicableQuestion) {
      return <ChatAiResponseNotApplicable onSendResponce={handleSendResponce} message={message.content as IChatMessageInterviewQuestion} />    
    } else {
        const interviewQuestion = message.content as IChatMessageInterviewQuestion;
      if (interviewQuestion.options && interviewQuestion.options.length > 0 ) {
        return <ChatAiResponseOptions onSendResponce={handleSendResponce} message={interviewQuestion} onlyOptionsAreAllowed={showResponseOptionHint}/>
      } else {
        return <ChatAiResponse onSendResponce={handleSendResponce} message={interviewQuestion} />
      }
    }
  }

  const displayTopicMessages = (topics: IInteractiveChatTopic[]) => (<>
    {
      topics.map((topic, topic_index) => {
        
        const lastMessage = topic?.history?.at(topic.history.length - 1);
        const lastMessageBelongsToAi = Boolean(lastMessage?.role === ChatRole.AI);
        const onEditMessageProc = topic.status === TopicStatus.ActiveDiscussion ? onEditMessage : null; //Only for Active Discussion
        //const onEditMessageProc = onEditMessage;
        
        return (
          <React.Fragment key={topic_index}>
            {topic.history && topic.history.map((message, message_index) => renderMessage(message, message_index, topic, onEditMessageProc) )}
            {lastMessageBelongsToAi && renderAiResponce(lastMessage)}
            {topic.summary && <ModuleCompleted objectToExport={normalizeSummaryKeys(topic.summary)} topicName={topic.name} showSummaryButton={true} />}
          </React.Fragment>
        )
      })
    }
  </>);

  return (
    <div className={css.chatWrapper}>
      <div ref={chatBoxRef} className={css.messagesWrapper}>
        {displayTopicMessages(topicsCompleted)}
        {displayTopicMessages(topicsActive)}
        {displayTopicMessages(topicsNew)}
        {showTopicSelector && <ChatTopicSelector topics={topicsNewNames} onSelect={onStartNewChat} />}
        {isResponding && <ChatSpinner hint={spinnerHint}/>}
        {failedChatRequest && <ChatAiError onClick={handleRetryRequest} />}
      </div>
      <FlexRow cx={css.inputMessageWrapper} columnGap={12} >
        <TextInput
          type='text'
          placeholder={sendControlsDisabled || isResponding ? '': 'Type your answer...'}
          value={currentInput}
          onValueChange={(v) => setCurrentInput(v)}
          onKeyDown={handleKeyPress}
          cx={css.matInputElement}
          isDisabled={sendControlsDisabled || isResponding}
        />
        <Button icon={sendIcon} color="primary" onClick={handleSendMessage} isDisabled={sendControlsDisabled || isResponding} />      
      </FlexRow>
    </div>
  );
};