import { cx } from '@epam/uui-core';
import {FlexRow, Panel, Text, Button, FlexCell} from '@epam/uui';
import { ReactComponent as PlusIcon } from '@epam/assets/icons/action-add-fill.svg';

import NumberMarker from './../NumberMarker/NumberMarker';
import css from './StartWizardForm.module.scss';
import StartWizardProgress from '../StartWizardProgress/StartWizardProgress';


const LABELS = {
  addProfileTitle: 'Fill client profile',
  addProfileDecs: 'Client profile is a detailed summary of a customer who requires API products to be developed.',
  createProfileButton: 'Add client profile',
  createPortfolioTitle: 'Create API portfolio',
  createPortfolioDesc: 'API portfolio is a managed collection of APIs, typically aligned with a common API resource model or information model.',
  createPortfolioButton: 'Create a portfolio',
  discovePhaseTitle: 'Complete module in Discover phase',
  discovePhaseDesc: 'Modules are topics or concerns that make a key contribution to the portfolio, product, or API.',
  resultTitle: 'Export API product proposal',
  resultDesc: 'API product proposal is a formalization of the API Product as a business-manageable asset that drives downstream activities, including identification of API Consumers, their needs, features of the API product, and initial requirements.',
};

export interface IStartWizardForProps {
  activeStep: number;
  onNextClick: () => void;
}

export default function StartWizardForm(props: IStartWizardForProps) {

  const isActiveProfile: boolean = props.activeStep === 1;
  const isActivePortfolio: boolean = props.activeStep === 2;
  const isActiveDiscover: boolean = props.activeStep === 3;
  const isActiveExport: boolean = props.activeStep === 4;

  return (
    <Panel background="surface-main" cx={css.panelForm}>
      <StartWizardProgress activeStep={props.activeStep} />
      <hr style={{ height: '1px', backgroundColor: '#CED0DB', border: 'none', margin: '12px 0px 12px 0px' }} />

      <FlexRow cx={css.itemRow} alignItems='top'>
        <FlexCell cx={css.itemRowIcon} width={50}>
          <NumberMarker step={1} activeStep={props.activeStep} />
        </FlexCell> 
        <FlexCell cx={css.itemRowText} width={488}>
          <Text  cx={ cx(css.itemCaption, isActiveProfile && css.activeCaption) }>{LABELS.addProfileTitle} </Text>
          <Text cx={css.itemText}> {LABELS.addProfileDecs} </Text>
        </FlexCell>
      </FlexRow>

      { isActiveProfile &&
      <FlexRow cx={css.itemRow} alignItems='top'>
        <FlexCell cx={css.itemRowIcon} width={50}>
        </FlexCell> 
        <FlexCell cx={css.itemRowText} width={488}>
          <Button caption={LABELS.createProfileButton} color='primary' onClick={ props.onNextClick } />
        </FlexCell>
      </FlexRow> }


      <FlexRow cx={css.itemRow} alignItems='top'>
        <FlexCell cx={css.itemRowIcon} width={50}>
          <NumberMarker step={2} activeStep={props.activeStep} />
        </FlexCell> 
        <FlexCell cx={css.itemRowText} width={488}>
          <Text cx={ cx(css.itemCaption, isActivePortfolio && css.activeCaption) }>{LABELS.createPortfolioTitle} </Text>
          <Text cx={css.itemText}> {LABELS.createPortfolioDesc} </Text>
        </FlexCell>
      </FlexRow>

      { isActivePortfolio &&
      <FlexRow cx={css.itemRow} alignItems='top'>
        <FlexCell cx={css.itemRowIcon} width={50}>
        </FlexCell> 
        <FlexCell cx={css.itemRowText} width={488}>
          <Button icon={PlusIcon} caption={LABELS.createPortfolioButton} color='primary' onClick={ props.onNextClick } />
        </FlexCell>
      </FlexRow> }

      <FlexRow cx={css.itemRow} alignItems='top'>
        <FlexCell cx={css.itemRowIcon} width={50}>
          <NumberMarker step={3} activeStep={props.activeStep} />
        </FlexCell> 
        <FlexCell cx={css.itemRowText} width={488}>
          <Text cx={ cx(css.itemCaption, isActiveDiscover && css.activeCaption) }>{LABELS.discovePhaseTitle} </Text>
          <Text cx={css.itemText}> {LABELS.discovePhaseDesc} </Text>
        </FlexCell>
      </FlexRow>

      <FlexRow cx={css.itemRow} alignItems='top'>
        <FlexCell cx={css.itemRowIcon} width={50}>
          <NumberMarker step={4} activeStep={props.activeStep} />
        </FlexCell> 
        <FlexCell cx={css.itemRowText} width={488}>
          <Text cx={ cx(css.itemCaption, isActiveExport && css.activeCaption) }>{LABELS.resultTitle} </Text>
          <Text cx={css.itemText}> {LABELS.resultDesc} </Text>
        </FlexCell>
      </FlexRow>
      
    </Panel>
  );
}