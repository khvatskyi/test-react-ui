import { useEffect, useRef, useState } from 'react';

import { FlexRow, Button, TextInput } from '@epam/uui';
import { ReactComponent as sendIcon } from '@epam/assets/icons/action-send-fill.svg';

import css from './Chat.module.scss';
import { ChatRole, IContentMessage } from '../../typings/models/module.models';
import ChatSpinner from './ChatSpinner';
import ChatQueston from './ChatQueston';
import ChatAiAnswerButton from './ChatAiAnswerButton';
import UserAnswer from './UserAnswer';
import { useAppSelector } from '../../hooks';
import { selectChatContext } from '../../store/ai.slice';

export interface IChatProps {
  messages: IContentMessage[];
  isResponding: boolean;
  onSendMessage: (message: string) => void;
  getAiAnswerExample: () => string;
}

export default function Chat({ messages, isResponding, onSendMessage, getAiAnswerExample }: IChatProps) {
  const history = useAppSelector(selectChatContext).history;
  const lastMessageBelongsToAi = history.at(history.length - 1).role === ChatRole.AI;

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
  }, [messages]);

  const displayMessages = (<>
    {
      messages.map((message, index) => message.role === ChatRole.AI
        ? <ChatQueston key={index} message={message.content} />
        : <UserAnswer key={index} message={message.content} />
      )
    }
  </>);

  return (
    <div className={css.chatWrapper}>
      <div ref={chatBoxRef} className={css.messagesWrapper}>
        {displayMessages}
        {lastMessageBelongsToAi && <ChatAiAnswerButton onClick={handleAiAnswerClick} />}
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
        />
        <Button icon={sendIcon} color="primary" onClick={handleSendMessage} />
      </FlexRow>
    </div>
  );
};