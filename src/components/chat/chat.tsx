import { useEffect, useRef, useState } from 'react';

import { FlexRow, Button, TextInput } from '@epam/uui';
import { ReactComponent as sendIcon } from '@epam/assets/icons/action-send-fill.svg';

import css from './Chat.module.scss';
import { ChatRole, IContentMessage } from '../../typings/models/module.models';
import ChatSpinner from './ChatSpinner';
import ChatQuestion from './ChatQuestion';
import ChatAiAnswerButton from './ChatAiAnswerButton';
import UserAnswer from './UserAnswer';
import { useAppSelector } from '../../hooks';
import { isConversationCompleted, selectChatContext } from '../../store/ai.slice';
import { ModuleCompleted } from '..';

export interface IChatProps {
  messages: IContentMessage[];
  isResponding: boolean;
  onSendMessage: (message: string) => void;
  onEditMessage: (id: string, message: string) => void;
  getAiAnswerExample: () => string;
}

export default function Chat({ messages, isResponding, onSendMessage, onEditMessage, getAiAnswerExample }: IChatProps) {
  const chatHistory = useAppSelector(selectChatContext).history;
  const conversationCompleted = useAppSelector(isConversationCompleted);
  const lastMessageBelongsToAi = chatHistory.at(chatHistory.length - 1).role === ChatRole.AI;

  const [currentInput, setCurrentInput] = useState('');

  const handleAiAnswerClick = () => {
    setCurrentInput(getAiAnswerExample());
  }

  const handleSendMessage = () => {
    if (currentInput.trim()) {
      onSendMessage(currentInput);
      setCurrentInput('');
    }
  };

  const handleEditMessage = () => {
    if (currentInput.trim()) {
      onEditMessage('9795a472-2945-4e41-ae8f-24406d9912a5', currentInput); //TODO: need send read ID
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
  }, [messages, conversationCompleted]);

  const displayMessages = (<>
    {
      messages.map((message, index) => message.role === ChatRole.AI
        ? <ChatQuestion key={index} message={message.content} />
        : <UserAnswer key={index} message={message.content} />
      )
    }
  </>);

  return (
    <div className={css.chatWrapper}>
      <div ref={chatBoxRef} className={css.messagesWrapper}>
        {displayMessages}
        {lastMessageBelongsToAi && <ChatAiAnswerButton onClick={handleAiAnswerClick} />}
        {conversationCompleted && <ModuleCompleted objectToExport={messages} />}
        {isResponding && <ChatSpinner />}
      </div>
      <FlexRow cx={css.inputMessageWrapper} columnGap={12}>
        <TextInput
          type='text'
          placeholder='Type your answer...'
          value={currentInput}
          onValueChange={(v) => setCurrentInput(v)}
          onKeyDown={handleKeyPress}
          cx={css.matInputElement}
          isDisabled={conversationCompleted}
        />
        <Button icon={sendIcon} color="primary" onClick={handleSendMessage} isDisabled={conversationCompleted || isResponding} />
         {/* temporarty for test */}
        <Button icon={sendIcon} color="critical" caption='Edit' onClick={handleEditMessage} isDisabled={conversationCompleted || isResponding} />        
      </FlexRow>
    </div>
  );
};