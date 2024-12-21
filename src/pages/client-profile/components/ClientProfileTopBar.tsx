import { Button, FlexRow, FlexSpacer, Panel } from "@epam/uui";

import css from './ClientProfileTopBar.module.scss';

interface ClientProfileTopBarProps {
  onSave: () => void;
}


export function ClientProfileTopBar({ onSave }:  ClientProfileTopBarProps) {
  return (
    <Panel cx={css.buttonPanel}>
      <FlexRow columnGap="12" cx={css.buttonPanel}>
        <FlexSpacer />
        <Button caption="Upload json" fill="ghost"/>
        <Button caption="Export" fill="ghost"/>
        <Button caption="Save client profile" color="primary" onClick={onSave} />
      </FlexRow>
    </Panel>
  )
}
