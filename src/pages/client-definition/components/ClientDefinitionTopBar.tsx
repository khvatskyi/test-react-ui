import { Button, FlexRow, FlexSpacer, Panel } from "@epam/uui";
import { ReactComponent as iconAI } from '@epam/assets/icons/ai-copilot_magic_small-fill.svg';

import css from './ClientDefinitionTopBar.module.scss';

interface ClientDefinitionTopBarProps {
  onSave: () => void;
  onFillFormWithAI: () => void;
}


export function ClientDefinitionTopBar({ onSave, onFillFormWithAI }:  ClientDefinitionTopBarProps) {
  return (
    <Panel cx={css.buttonPanel}>
      <FlexRow columnGap="12" cx={css.buttonPanel}>
        <FlexSpacer />
        <Button caption="Save client definition" color="primary" onClick={onSave} />
        <Button caption="Fill with AI" icon={iconAI} fill="ghost" onClick={onFillFormWithAI} />
      </FlexRow>
    </Panel>
  )
}
