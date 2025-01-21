import { useState } from 'react';

import { FlexRow, Button, TextInput } from '@epam/uui';
import { ReactComponent as sendIcon } from '@epam/assets/icons/action-send-fill.svg';

import css from './Chat.module.scss';
import { IInteractiveChatMessage } from '../../typings/models/module.models';
import ChatSpinner from './ChatSpinner';
import ChatQueston from './ChatQueston';
import ChatAiAnswerButton from './ChatAiAnswerButton';

export interface IChatProps {
  messages: IInteractiveChatMessage[];
  isResponding: boolean;
  onSendMessage: (message: string) => void;
  getAiAnswerExample: () => string;
}

export default function Chat({ messages, isResponding, onSendMessage, getAiAnswerExample }: IChatProps) {
  const [currentInput, setCurrentInput] = useState('');

  const handleAiAnswerClick = () => {
    setCurrentInput(getAiAnswerExample);
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

  return (
    <div className={css.chatWrapper}>
        <div className={css.messagesWrapper}>
          {messages.map((message, index) => ( <ChatQueston message={message} /> ))}
          <ChatAiAnswerButton handleOnClick={handleAiAnswerClick} />
          {isResponding && <ChatSpinner/>}
        </div>
        <FlexRow vPadding='12' columnGap={12}>
          <TextInput
            type='text'
            placeholder='Type your answer...'
            value={currentInput}
            onValueChange={(v) => setCurrentInput(v)}
            onKeyDown={handleKeyPress}
            cx={css.matInputElement}
          />
          <Button icon={sendIcon} color="primary" onClick={handleSendMessage}/>
        </FlexRow>
    </div>
  );
};