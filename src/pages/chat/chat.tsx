import React, { useState } from 'react';

import css from './Chat.module.scss';
import { IChatMessage } from '../../models/chat.models';
import { Button } from '@epam/uui-components';

interface ChatProps {
  messages: IChatMessage[];
  isResponding: boolean;
  onSendMessage: (message: string) => void;
}

const aiAnsweringMessage: IChatMessage = {
  text: '...',
  sentByUser: false
}

const Chat: React.FC<ChatProps> = ({ messages, isResponding, onSendMessage }) => {
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
    <div className={css['chat-wrapper']}>
      <div className={css['messages-wrapper']}>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {isResponding && <Message message={aiAnsweringMessage} />}
      </div>
      <div className={css['input-message-wrapper']}>
        <div className={css['mat-form-field']}>
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyUp={handleKeyPress}
            className={css['mat-input-element']}
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

type MessageProps = {
  message: IChatMessage
}

const Message = ({ message }: MessageProps) => {
  return (
    <div
      className={`${css['message-wrapper']} ${message.sentByUser ? css['right-message'] : ''}`}
    >
      <div className={`${css['message']} ${!message.sentByUser ? css['ai-message'] : ''}`}>
        {!message.sentByUser && (
          <div className={`${css['user-image']} ${css['ai-background']}`}></div>
        )}
        <div className={css['text-wrapper']}>
          <span className={css['message-text']}>{message.text}</span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
