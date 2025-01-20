import { FlexRow, FlexSpacer, Panel, RichTextView, Text } from '@epam/uui';
import { IInteractiveChatMessage } from '../../typings/models/module.models';
import css from './ChatQueston.module.scss';

export interface IChatQuestonProps {
  message: IInteractiveChatMessage
}

export default function ChatQueston({ message }: IChatQuestonProps) {
    return (
      <FlexRow vPadding='18'>
        <FlexSpacer />
        <Panel background='surface-main' cx={css.panelQuestion}>
          <RichTextView >
            <h5 style={ {margin: '0px'}} >QUESTION {message.questionNumber + '/'+ message.totalOfQuestions}</h5>
          </RichTextView>
          <h3 style={ {margin: '0px'}} >{message.topic }</h3>
          <Text cx={css.questionText} size='48'>{message.question }</Text>          
          {/* <b>Example:</b>{message.example } */}
        </Panel>
      </FlexRow>
    );
}