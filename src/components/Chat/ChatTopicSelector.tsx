import { FlexRow, Button, FlexSpacer } from '@epam/uui';

export interface IChatTopicSelectorProps {
  onSelect: (topic: string) => void;
  topics: string[];
}

export default function ChatTopicSelector({ topics, onSelect }: IChatTopicSelectorProps) {
  
  const handleClick = (event) => {
    onSelect(event.currentTarget.dataset.topic);
  };

  return (
    <>
      <FlexRow>
        <FlexSpacer/>
        <h4>Choose consumer segment to continue with:</h4>
      </FlexRow>
      <FlexRow columnGap={12}>
        <FlexSpacer/>
        {topics.map( (value, index) => { 
            return (
              <Button key={index} rawProps={ { 'data-topic': value } } fill="none" color="secondary" caption={value} onClick={handleClick}/> 
            )
          }
        )} 
      </FlexRow>
    </>
  );
}

