import { Button, FlexRow, FlexSpacer, Panel } from "@epam/uui";
import { ReactComponent as iconAI } from '@epam/assets/icons/ai-copilot_magic_small-fill.svg';

import css from './ProfileTopBar.module.scss';

interface ProfileTopBarProps {
  onSave: () => void;
  onFillProfileWithAI: () => void;
}


export function ProfileTopBar({ onSave, onFillProfileWithAI }:  ProfileTopBarProps) {
  return (
    <Panel cx={css.buttonPanel}>
      <FlexRow columnGap="12" cx={css.buttonPanel}>
        <FlexSpacer />
        <Button caption="Save client definition" color="primary" onClick={onSave} />
        <Button caption="Fill with AI" icon={iconAI} fill="ghost" onClick={onFillProfileWithAI} />
      </FlexRow>
    </Panel>
  )
}
