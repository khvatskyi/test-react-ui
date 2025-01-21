import { useState } from 'react';

import { FlexRow, Button, TextInput } from '@epam/uui';
import { ReactComponent as sendIcon } from '@epam/assets/icons/action-send-fill.svg';

import css from './Chat.module.scss';
import { ChatRole, IMessage } from '../../typings/models/module.models';
import ChatSpinner from './ChatSpinner';
import ChatQueston from './ChatQueston';
import ChatAiAnswerButton from './ChatAiAnswerButton';
import UserAnswer from './UserAnswer';

export interface IChatProps {
  messages: IMessage[];
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

  const displayMessages = (<>
    {
      messages.map((message, index) => message.createdBy === ChatRole.AI
        ? <ChatQueston key={index} message={message.content} />
        : <UserAnswer key={index} message={message.content} />
      )
    }
  </>);

  return (
    <div className={css.chatWrapper}>
      <div className={css.messagesWrapper}>
        {displayMessages}
        <ChatAiAnswerButton handleOnClick={handleAiAnswerClick} />
        {isResponding && <ChatSpinner />}
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
        <Button icon={sendIcon} color="primary" onClick={handleSendMessage} />
      </FlexRow>
    </div>
  );
};