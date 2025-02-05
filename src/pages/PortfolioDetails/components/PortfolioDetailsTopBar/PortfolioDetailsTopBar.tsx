import { Button, FlexRow, FlexSpacer, Panel } from '@epam/uui';

import css from './PortfolioDetailsTopBar.module.scss';
import { FormCancelButton } from '../../../../components/FormCancelButton/FormCancelButton';

export interface IPortfolioDetailsTopBar {
  saveDisabled: boolean;
  save: () => void;
  cancel: () => void;
  formIsChanged: () => boolean;
}

export default function PortfolioDetailsTopBar({saveDisabled, save, cancel, formIsChanged }: IPortfolioDetailsTopBar) {

  return (
    <Panel cx={css.buttonPanel}>
      <FlexRow columnGap='12' cx={css.buttonPanel}>
        <FlexSpacer />
        <Button isDisabled={saveDisabled} caption='Save' color='primary' onClick={save} />
        <FormCancelButton onClick={cancel} needConfirmation={formIsChanged} />
      </FlexRow>
    </Panel>
  )
}