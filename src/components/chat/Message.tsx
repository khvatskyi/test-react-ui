import css from './Chat.module.scss';
import { IChatMessage } from '../../typings/models/chat.models';

export interface IMessageProps {
  message: IChatMessage
}

export default function Message({ message }: IMessageProps) {

  return (
    <div className={`${css.messageWrapper} ${message.sentByUser ? css.rightMessage : ''}`}>
      <div className={`${css.message} ${!message.sentByUser ? css.aiMessage : ''}`}>
        {!message.sentByUser && (
          <div className={`${css.avatar} ${css.aiBackground}`}></div>
        )}
        <div className={css.textWrapper}>
          <span className={css.messageText}>{message.text}</span>
        </div>
      </div>
    </div>
  );
};
