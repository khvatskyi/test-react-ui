import { Button, FlexRow, FlexSpacer, Panel } from '@epam/uui';

import css from './PortfolioDetailsTopBar.module.scss';

export interface IPortfolioDetailsTopBar {
  saveDisabled: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export default function PortfolioDetailsTopBar({saveDisabled, onSave, onCancel}: IPortfolioDetailsTopBar) {

  return (
    <Panel cx={css.buttonPanel}>
      <FlexRow columnGap='12' cx={css.buttonPanel}>
        <FlexSpacer />
        <Button isDisabled={saveDisabled} caption='Save' color='primary' onClick={onSave} />
        <Button caption='Cancel' color='white' onClick={onCancel} />
      </FlexRow>
    </Panel>
  )
}