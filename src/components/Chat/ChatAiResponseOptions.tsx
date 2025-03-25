import { FlexRow, Button, FlexSpacer, Text } from '@epam/uui';
import { IChatMessageInterviewQuestion } from '../../typings/models/module.models';

export interface IChatAiResponseOptionsProps {
  onSendResponce: (message: string, isAiGenerated: boolean) => void;
  message: IChatMessageInterviewQuestion;
  onlyOptionsAreAllowed: boolean;
}

export default function ChatAiResponseOptions({ onSendResponce, message, onlyOptionsAreAllowed }: IChatAiResponseOptionsProps) {
  
  const handleAiOptionClick = (event) => {
    const selectedOption = event.currentTarget.dataset.option;
    onSendResponce(selectedOption, false);
  };

  return (
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
      {!message.onlyOptionsAllowed &&
        <FlexRow>
          <FlexSpacer/>
          <Text fontSize='16' color='secondary'>If your answer doesn't match any of the options listed above, please type it in the box.</Text>
        </FlexRow>
      }
    </>
  );
}

