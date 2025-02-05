import { FlexRow, FlexSpacer, Panel, RichTextView, Text } from '@epam/uui';

import { IChatMessageInterviewQuestion } from '../../typings/models/module.models';
import css from './ChatQuestion.module.scss';

export interface IChatQuestionProps {
  message: IChatMessageInterviewQuestion 
}

export default function ChatQuestion({ message }: IChatQuestionProps) {
  return (
    <FlexRow vPadding='18'>
      <FlexSpacer />
      <Panel background='surface-main' cx={css.panelQuestion}>
        <RichTextView >
          <h5 style={{ margin: '0px' }} >QUESTION {message.questionNumber + '/' + message.totalOfQuestions}</h5>
        </RichTextView>
        <h3 style={{ margin: '0px' }} >{message.topic}</h3>
        <Text cx={css.questionText} size='48'>{message.question}</Text>
      </Panel>
    </FlexRow>
  );
}