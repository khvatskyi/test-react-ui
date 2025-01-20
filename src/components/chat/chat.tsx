import { useState } from 'react';
import { FlexCell, FlexRow, LabeledInput, Panel, Button, TextArea, TextInput, Spinner } from '@epam/uui';
import css from './Chat.module.scss';
// import { IChatMessage } from '../../typings/models/chat.models';
import Message from './Message';
import { ReactComponent as sendIcon } from '@epam/assets/icons/action-send-fill.svg';
import { IInteractiveChatMessage } from '../../typings/models/module.models';
import ChatSpinner from './ChatSpinner';
import ChatQueston from './ChatQueston';
// import { useAppSelector } from '../../hooks';
// import { selectValuePropositionChatContext } from '../../store/data.slice';

export interface IChatProps {
  messages: IInteractiveChatMessage[];
  isResponding: boolean;
  onSendMessage: (message: string) => void;
}

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
            <>
              <ChatQueston message={message} />
              {/* <Message key={index} message={message} /> */}
            </>
          ))}
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