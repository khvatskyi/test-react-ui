import { FlexRow, Panel, RichTextView, Text, Avatar } from '@epam/uui';
import { IInteractiveChatMessage } from '../../typings/models/module.models';

import css from './UserAnswer.module.scss';

export interface IUserAnswerProps {
  message: IInteractiveChatMessage
}

export default function UserAnswer({ message }: IUserAnswerProps) {
  

  return (
    <FlexRow vPadding='18'>
      <Avatar size='18' img='' />
      <Panel background='surface-main' cx={css.panelQuestion}>
        <RichTextView >
          <h5 style={{ margin: '0px' }} >QUESTION {message.questionNumber + '/' + message.totalOfQuestions}</h5>
        </RichTextView>
        <h3 style={{ margin: '0px' }} >{message.topic}</h3>
        <Text cx={css.questionText} size='48'>{message.text}</Text>
        {/* <b>Example:</b>{message.example } */}
      </Panel>
    </FlexRow>
  );
}