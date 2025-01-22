import { IModal } from '@epam/uui-core';
import {
    ModalBlocker, ModalWindow, FlexRow, Panel, Text, Button,
    ProgressBar,
    FlexSpacer,
    FlexCell,
} from '@epam/uui';
import { useEffect, useState } from 'react';
import css from './StartWizard.module.scss';
import { ReactComponent as PlusIcon } from '@epam/assets/icons/action-add-fill.svg';
import NumberMarker from './components/NumberMarker/NumberMarker';


const LABELS = {
  formCaption: 'Getting started',
  progressCaption: '% complete',
  addProfileTitle: 'Add client profile',
  addProfileDecs: 'A client profile is a detailed summary of a customer who requires API products to be developed.',
  createPortfolioTitle: 'Create first API portfolio',
  createPortfolioDesc: 'An API portfolio is a collection of APIs managed by an organization that are designed to be used together to achieve specific business goals or provide a comprehensive suite of services.',
  createPortfolioButton: 'Create a portfolio',
  discovePhaseTitle: 'Finish module in Discover phase',
  discovePhaseDesc: 'Answer a set of questions regarding specific API inside a portfolio either manually or with a help of AI assistant.',
  resultTitle: 'Export results as a deliverable',
  resultDesc: 'Choose your preferred format of the output and export it.',
};

export interface IWizardData extends IModal<string> {  
  activeStep: number;
}

export default function StartWizard(modalProps: IWizardData) {

  const [progress, setProgress] = useState(0);

  const allowCreatePortfolio: boolean = modalProps.activeStep === 2;

  useEffect(() => {
    const progressValue = 100 / 4 * (modalProps.activeStep - 1);
    setProgress(progressValue);
  }, [modalProps.activeStep]); 

  return (
    <ModalBlocker { ...modalProps }>
      <ModalWindow width='590px'>
        <Panel background="surface-main" cx={css.panelForm}>
            <FlexRow >
              <Text cx={css.formCaption}>{LABELS.formCaption}</Text>
              <FlexSpacer />
              <Text cx={css.progressCaption}> { progress } {LABELS.progressCaption} </Text>
            </FlexRow>
          <ProgressBar /*cx={ css.bar }*/  progress={ progress } hideLabel />
          <hr style={{ height: '1px', backgroundColor: '#CED0DB', border: 'none', margin: '12px 0px 12px 0px' }} />

          <FlexRow cx={css.itemRow} alignItems='top'>
            <FlexCell cx={css.itemRowIcon} width={50}>
              {/* <IconContainer icon={checkIcon} size='42'/> */}
              <NumberMarker step={1} activeStep={modalProps.activeStep} />
            </FlexCell> 
            <FlexCell cx={css.itemRowText} width={488}>
              <Text  cx={css.itemCaption}>{LABELS.addProfileTitle} </Text>
              <Text cx={css.itemText}> {LABELS.addProfileDecs} </Text>
            </FlexCell>
          </FlexRow>

          <FlexRow cx={css.itemRow} alignItems='top'>
            <FlexCell cx={css.itemRowIcon} width={50}>
              <NumberMarker step={2} activeStep={modalProps.activeStep} />
            </FlexCell> 
            <FlexCell cx={css.itemRowText} width={488}>
              <Text  cx={css.itemCaption}>{LABELS.createPortfolioTitle} </Text>
              <Text cx={css.itemText}> {LABELS.createPortfolioDesc} </Text>
            </FlexCell>
          </FlexRow>

          { allowCreatePortfolio &&
          <FlexRow cx={css.itemRow} alignItems='top'>
            <FlexCell cx={css.itemRowIcon} width={50}>
            </FlexCell> 
            <FlexCell cx={css.itemRowText} width={488}>
              <Button icon={PlusIcon} 
                  caption={LABELS.createPortfolioButton} 
                  color='primary' 
                  onClick={ () => modalProps.success(LABELS.createPortfolioButton) }
                />
            </FlexCell>
          </FlexRow> }

          <FlexRow cx={css.itemRow} alignItems='top'>
            <FlexCell cx={css.itemRowIcon} width={50}>
              <NumberMarker step={3} activeStep={modalProps.activeStep} />
            </FlexCell> 
            <FlexCell cx={css.itemRowText} width={488}>
              <Text  cx={css.itemCaption}>{LABELS.discovePhaseTitle} </Text>
              <Text cx={css.itemText}> {LABELS.discovePhaseDesc} </Text>
            </FlexCell>
          </FlexRow>

          <FlexRow cx={css.itemRow} alignItems='top'>
            <FlexCell cx={css.itemRowIcon} width={50}>
              <NumberMarker step={4} activeStep={modalProps.activeStep} />
            </FlexCell> 
            <FlexCell cx={css.itemRowText} width={488}>
              <Text  cx={css.itemCaption}>{LABELS.resultTitle} </Text>
              <Text cx={css.itemText}> {LABELS.resultDesc} </Text>
            </FlexCell>
          </FlexRow>
          
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
}