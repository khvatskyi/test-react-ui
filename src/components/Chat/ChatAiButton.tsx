import { FlexRow, Button, FlexSpacer } from '@epam/uui';
import { ReactComponent as iaIcon } from '@epam/assets/icons/ai-copilot_magic_small-fill.svg';

export interface IChatSpinnerProps {
  onClick: () => void;
  caption: string;
}

export default function ChatAiButton({ caption, onClick: handleClick }: IChatSpinnerProps) {
  return (
    <FlexRow>
      <FlexSpacer />
      <Button icon={iaIcon} color="primary" fill='none' caption={caption} onClick={handleClick} />
    </FlexRow>
  );
}