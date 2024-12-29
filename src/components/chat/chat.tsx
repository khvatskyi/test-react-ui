import React, { useState } from 'react';

import { Button } from '@epam/uui-components';

import css from './Chat.module.scss';
import { IChatMessage } from '../../typings/models/chat.models';
import Message from './Message';

export interface IChatProps {
  messages: IChatMessage[];
  isResponding: boolean;
  onSendMessage: (message: string) => void;
}

const AI_ANSWERING_MESSAGE: IChatMessage = {
  text: '...',
  sentByUser: false
} as const;

export default function Chat({ messages, isResponding, onSendMessage }: IChatProps) {
  const [currentInput, setCurrentInput] = useState('');

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

  return (
    <div className={css.chatWrapper}>
      <div className={css.messagesWrapper}>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {isResponding && <Message message={AI_ANSWERING_MESSAGE} />}
      </div>
      <div className={css.inputMessageWrapper}>
        <div className={css.matFormField}>
          <input
            type='text'
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyUp={handleKeyPress}
            className={css.matInputElement}
          />
          <Button
            onClick={handleSendMessage}
            caption='Send'
          />
        </div>
      </div>
    </div>
  );
};