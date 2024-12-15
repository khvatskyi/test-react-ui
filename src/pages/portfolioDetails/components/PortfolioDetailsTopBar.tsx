import { Button, FlexRow, FlexSpacer, Panel } from "@epam/uui";

import css from './PortfolioDetailsTopBar.module.scss';

interface IPortfolioDetailsTopBar {
  save: () => void;
  cancel: () => void;
}

export function PortfolioDetailsTopBar({ save, cancel }: IPortfolioDetailsTopBar) {

  return (
    <Panel cx={css.buttonPanel}>
      <FlexRow columnGap="12" cx={css.buttonPanel}>
        <FlexSpacer />
        <Button isDisabled={true} caption="Save" color="primary" onClick={save} />
        <Button caption="Cancel" color="white" onClick={cancel} />
      </FlexRow>
    </Panel>
  )
}