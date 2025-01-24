import { IModal } from '@epam/uui-core';
import { ModalBlocker, ModalWindow } from '@epam/uui';
import StartWizardForm from './components/StartWizardForm/StartWizardForm';


export interface IWizardData extends IModal<string> {  
  activeStep: number;
}

export default function StartWizard(modalProps: IWizardData) {

  const handleWizardNextClick = () => {
    modalProps.success('Create a portfolio')
  }

  return (
    <ModalBlocker { ...modalProps }>
      <ModalWindow width='590px'>
        <StartWizardForm activeStep={modalProps.activeStep} onNextClick={handleWizardNextClick}/>
      </ModalWindow>
    </ModalBlocker>
  );
}