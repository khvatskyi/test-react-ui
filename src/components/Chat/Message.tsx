import css from './Chat.module.scss';
import { IChatMessageInterviewQuestion } from '../../typings/models/module.models';

export interface IMessageProps {
  message: IChatMessageInterviewQuestion
}

export default function Message({ message }: IMessageProps) {

  return (
    <div className={`${css.messageWrapper} ${false /*message.sentByUser */ ? css.rightMessage : ''}`}>
      <div className={`${css.message} ${true /*!message.sentByUser*/ ? css.aiMessage : ''}`}>
        {true /*!message.sentByUser*/ && (
          <div className={`${css.avatar} ${css.aiBackground}`}></div>
        )}
        <div className={css.textWrapper}>
          <span className={css.messageText}>
            {message.questionNumber + '/'+ message.totalOfQuestions}<br/>
            <b>Topic:</b>{message.topic }<br/>
            <b>Question:</b>{message.question }<br/>
            <b>Example:</b>{message.example }
          </span>
        </div>
      </div>
    </div>
  );
};
