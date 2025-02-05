import { FlexRow, Button, FlexSpacer, Text } from '@epam/uui';
import { IChatMessageInterviewQuestion } from '../../typings/models/module.models';
import ChatAiButton from './ChatAiButton';

export interface IChatAiResponseProps {
  onSendResponce: (string, boolean) => void;
  message: IChatMessageInterviewQuestion;
}

export default function ChatAiResponse({ onSendResponce, message }: IChatAiResponseProps) {
  
  const handleAiAnswerClick = () => {
    let value: any = message.example;
    if (typeof value != 'string') {
      if (Array.isArray(value)) {
        value = value.join(', ')
      }
    }

    onSendResponce(value, true);
  };

  const handleAiOptionClick = (event) => {
    const selectedOption = event.currentTarget.dataset.option;
    onSendResponce(selectedOption, false);
  };


  return (
    <>
    { message.options 
      ? (
        <>
        <FlexRow columnGap={12}>
          <FlexSpacer/>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', maxWidth:'600px', justifyContent: 'flex-end'}}>
            {message.options
              .filter(value => value.toLowerCase() !== "other")  
              .map( (value, index) => { 
                return (
                  <Button key={index} rawProps={ { 'data-option': value } } fill="none" color="secondary" caption={value} onClick={handleAiOptionClick}/> 
                )
              }
            )} 
          </div>
        </FlexRow>
        <FlexRow>
          <FlexSpacer/>
          <Text fontSize='16' color='secondary'>If your answer doesn't match any of the options listed above, please type it in the box.</Text>
        </FlexRow>
        </>
        )
      : <ChatAiButton caption='Answer with AI' onClick={handleAiAnswerClick} />
      }
    </>
  );
}

