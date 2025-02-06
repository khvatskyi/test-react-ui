import { useEffect, useRef, useState } from 'react';

import { FlexRow, Button, TextInput } from '@epam/uui';
import { ReactComponent as sendIcon } from '@epam/assets/icons/action-send-fill.svg';

import css from './Chat.module.scss';
import { ChatMessageType, ChatRole, IChatMessageInterviewQuestion, IContentMessage, TopicStatus } from '../../typings/models/module.models';
import ChatSpinner from './ChatSpinner';
import ChatQuestion from './ChatQuestion';
import ChatAiResponse from './ChatAiResponse';
import UserAnswer from './UserAnswer';
import { useAppSelector } from '../../hooks';
import { selectChatContext } from '../../store/ai.slice';
import { ModuleCompleted } from '..';
import ChatTopicSelector from './ChatTopicSelector';
import { normalizeSummaryKeys } from '../../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure';
import { findLastElement } from '../../utilities/data.utility';


export interface IChatProps {
  isResponding: boolean;
  onStartNewChat:(topic: string) => void; 
  onSendMessage: (message: string, isAiGenerated: boolean) => void;
  onEditMessage: (id: string, message: string, isAiGenerated: boolean) => void;
}

export default function Chat({ isResponding, onSendMessage, onEditMessage, onStartNewChat }: IChatProps) {
  
  const chatTopics = useAppSelector(selectChatContext).topics;
    
  const topicsNew = chatTopics.filter(topic => topic.status === TopicStatus.New); 
  const topicsActive = chatTopics.filter(topic => topic.status === TopicStatus.ActiveDiscussion);
  const topicsCompleted = chatTopics.filter(topic => topic.status === TopicStatus.Completed);
  const topicsNewNames = topicsNew.map(topic => topic.name);

  const sendControlsDisabled = (chatTopics.length === 0) || (topicsActive.length === 0)
  const isSingleTopicChat = chatTopics.length === 1;
  const showTopicSelector = topicsActive.length === 0 && topicsNewNames.length > 0 && !isSingleTopicChat;
  
  let spinnerHint = 'Loading...';
  if (topicsActive.length === 0) {
    spinnerHint = 'Preparing interview...';
  } else if (topicsActive[0].history) {
    const lastInterviewMessage = findLastElement(topicsActive[0].history, x => x.type === ChatMessageType.InterviewQuestion) as IContentMessage;
    const interviewQuestion = lastInterviewMessage.content as IChatMessageInterviewQuestion
    if (interviewQuestion.totalOfQuestions === interviewQuestion.questionNumber) {
      spinnerHint = 'Generating summary...';
    } else {
      spinnerHint = 'Preparing next question...';
    }
  }

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


  const displayTopicMessages = (topics) => (<>
    {
      topics.map((topic, topic_index) => {
        
        const lastMessage = topic?.history?.at(topic.history.length - 1);
        const lastMessageBelongsToAi = lastMessage?.role === ChatRole.AI;
        
        return (
          <>
            {topic.history && topic.history.map((message, message_index) => message.type === ChatMessageType.InterviewQuestion
              ? <ChatQuestion key={message_index} message={message.content as IChatMessageInterviewQuestion} />
              : <UserAnswer key={message_index} message={message} 
                            aiExample={(topic.history[message_index-1]?.content as IChatMessageInterviewQuestion)?.example}
                            aiOptions={(topic.history[message_index-1]?.content as IChatMessageInterviewQuestion)?.options}
                            onEditMessage={onEditMessage} />
            )}
            {lastMessageBelongsToAi && <ChatAiResponse onSendResponce={handleSendResponce} message={lastMessage.content as IChatMessageInterviewQuestion} /> }
            {topic.summary && <ModuleCompleted objectToExport={normalizeSummaryKeys(topic.summary)} topicName={topic.name}/>}
          </>
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
      </div>
      <FlexRow cx={css.inputMessageWrapper} columnGap={12}>
        <TextInput
          type='text'
          placeholder='Type your answer...'
          value={currentInput}
          onValueChange={(v) => setCurrentInput(v)}
          onKeyDown={handleKeyPress}
          cx={css.matInputElement}
          isDisabled={sendControlsDisabled}
        />
        <Button icon={sendIcon} color="primary" onClick={handleSendMessage} isDisabled={sendControlsDisabled || isResponding} />      
      </FlexRow>
    </div>
  );
};