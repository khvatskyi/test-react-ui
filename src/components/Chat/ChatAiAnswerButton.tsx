import { FlexRow, Button, FlexSpacer } from '@epam/uui';
import { ReactComponent as iaIcon } from '@epam/assets/icons/ai-copilot_magic_small-fill.svg';

export interface IChatSpinnerProps {
  onClick: () => void;
}

export default function ChatAiAnswerButton({ onClick: handleClick }: IChatSpinnerProps) {
  return (
    <FlexRow>
      <FlexSpacer />
      <Button icon={iaIcon} color="primary" fill='none' caption='Answer with AI' onClick={handleClick} />
    </FlexRow>
  );
}