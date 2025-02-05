import { Button, FlexRow, FlexSpacer, Panel } from '@epam/uui';
import { ReactComponent as iconAI } from '@epam/assets/icons/ai-copilot_magic_small-fill.svg';

import css from './ClientProfileTopBar.module.scss';
import { FormCancelButton } from '../../../../components/FormCancelButton/FormCancelButton';

export interface IClientProfileTopBarProps {
  onSave: () => void;
  onFillFormWithAI: () => void;
  onCancel: () => void;
  formIsChanged: () => boolean;
  isExtendedMode: boolean;
  disableButtons: boolean;
}

export default function ClientProfileTopBar({ onSave, onFillFormWithAI, isExtendedMode, disableButtons, onCancel, formIsChanged }: IClientProfileTopBarProps) {

  let result = (
    <FlexRow columnGap='12' cx={css.buttonPanel}>
      <FlexSpacer />
      <Button caption='Save client definition' color='primary' onClick={onSave} isDisabled={disableButtons} />
      <Button caption='Fill with AI' icon={iconAI} fill='ghost' onClick={onFillFormWithAI} isDisabled={disableButtons} />
    </FlexRow>
  );

  if (isExtendedMode) {
    result = (
      <FlexRow columnGap='12' cx={css.buttonPanel}>
        <FlexSpacer />
        {/* TODO: need to implement Import/Export functionality
        <Button caption='Upload json' fill='ghost' isDisabled={disableButtons} />
        <Button caption='Export' fill='ghost' isDisabled={disableButtons} /> 
        */}
        <Button caption='Save client profile' color='primary' onClick={onSave} isDisabled={disableButtons} />
        <FormCancelButton onClick={onCancel} needConfirmation={formIsChanged} />
      </FlexRow>
    );
  }

  return (
    <Panel cx={css.buttonPanel}>
      {result}
    </Panel>
  );
}
