import { FlexRow, FlexSpacer, Spinner, Text } from '@epam/uui';


export interface IChatSpinnerProps {
  hint: string;
}

export default function ChatSpinner({ hint }: IChatSpinnerProps) {
  return (
    <FlexRow rawProps={ { style: { paddingTop: '12px' } } }>
      <FlexSpacer />
      <Spinner />
      <Text fontSize='16' fontStyle='italic'>{hint}</Text>
    </FlexRow>
  );
}