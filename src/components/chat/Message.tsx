import css from './Chat.module.scss';
// import { IChatMessage } from '../../typings/models/chat.models';
import { IInteractiveChatMessage } from '../../typings/models/module.models';

export interface IMessageProps {
  message: IInteractiveChatMessage
}

export default function Message({ message }: IMessageProps) {

  return (
    <div className={`${css.messageWrapper} ${false /*message.sentByUser */ ? css.rightMessage : ''}`}>
      <div className={`${css.message} ${true /*!message.sentByUser*/ ? css.aiMessage : ''}`}>
        {true /*!message.sentByUser*/ && (
          <div className={`${css.avatar} ${css.aiBackground}`}></div>
        )}
        <div className={css.textWrapper}>
          <span className={css.messageText}>{message.question}</span>
        </div>
      </div>
    </div>
  );
};
