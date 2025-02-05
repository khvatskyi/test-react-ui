import { FlexRow, Button, FlexSpacer } from '@epam/uui';
import { ReactComponent as iaIcon } from '@epam/assets/icons/ai-copilot_magic_small-fill.svg';

export interface IChatAiButtonProps {
  onClick: () => void;
  caption: string;
}

export default function ChatAiButton({ caption, onClick: handleClick }: IChatAiButtonProps) {
  return (
    <FlexRow>
      <FlexSpacer />
      <Button icon={iaIcon} color="primary" fill='none' caption={caption} onClick={handleClick} />
    </FlexRow>
  );
}