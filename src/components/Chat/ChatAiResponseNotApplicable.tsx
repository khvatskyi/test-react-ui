import { IChatMessageInterviewQuestion } from '../../typings/models/module.models';
import ChatAiButton from './ChatAiButton';
import { FlexRow, FlexSpacer, Button } from '@epam/uui';

export interface IChatAiResponseNotApplicableProps {
  onSendResponce: (message: string, isAiGenerated: boolean) => void;
  message: IChatMessageInterviewQuestion;
}

export default function ChatAiResponseNotApplicable({ onSendResponce, message }: IChatAiResponseNotApplicableProps) {

  const handleNotApplicableClick = () => {
    onSendResponce('Not applicable', false);
  }

  const handleAiAnswerClick = () => {
    let value: any = message.example;
    if (typeof value != 'string') {
      if (Array.isArray(value)) {
        value = value.join(', ')
      }
    }

    onSendResponce(value, true);
  };

  return (
    <>
      <FlexRow columnGap={12}>
        <FlexSpacer/>
        <Button fill="none" color="secondary" caption='Not Applicable' onClick={handleNotApplicableClick}/> 
        <ChatAiButton caption='Answer with AI' onClick={handleAiAnswerClick} />
      </FlexRow>
    </>
  );
  
}

