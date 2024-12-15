import { Button, FlexRow, FlexSpacer, Panel } from "@epam/uui";
import { ReactComponent as iconAI } from '@epam/assets/icons/ai-copilot_magic_small-fill.svg';

import css from './ProfileTopBar.module.scss';

export function ProfileTopBar({ save }: { save: () => void }) {

  return (
    <Panel cx={css.buttonPanel}>
      <FlexRow columnGap="12" cx={css.buttonPanel}>
        <FlexSpacer />
        <Button caption="Save client profile" color="primary" onClick={save} />
        <Button caption="Fill with AI" icon={iconAI} fill="ghost" onClick={save} />
      </FlexRow>
    </Panel>
  )
}
