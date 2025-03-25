import { Panel, ScrollBars, FlexRow, FlexSpacer, Button } from '@epam/uui';
import { IProductJourney } from '../../../../../../../typings/models/product-journey.model';
import css from './ApiProductJorneySummary.module.scss';
import { ReactComponent as EditFillIcon } from '@epam/assets/icons/content-edit-fill.svg';
import { ModuleCompleted } from '../../../../../../../components';
import { getStateTitle, normalizeSummaryKeys, STATE_CODES } from '../../../../PortfolioStagesLeftPanel/structure';
import ApiProductJorneySummarySteps from '../ApiProductJorneySummarySteps/ApiProductJorneySummarySteps';


const LABELS = {
  formTitle: 'Automated Business Insurance Quote Request',
}

export interface IApiProductJorneysProps {
  portfolioId: string;
  productJurney: IProductJourney;
  onEditScenarioClick: () => void;
}

export default function ApiProductJorneySummary({ portfolioId, productJurney, onEditScenarioClick }: IApiProductJorneysProps) {


  return productJurney && (
    <div className={css.content}>
      <ScrollBars>
        <div className={css.rootForm}>
          <Panel cx={css.formPanel} background='surface-main'>
            <FlexRow columnGap='12' cx={css.titleForm}>
              <h3 style={{ margin: '0px' }}>{LABELS.formTitle}</h3>
              <FlexSpacer />
              <Button caption='Edit scenario' icon={EditFillIcon} fill="none" color="primary"  onClick={onEditScenarioClick} />
            </FlexRow>

            <ApiProductJorneySummarySteps portfolioId={portfolioId} steps={productJurney.steps} readOnly={false}/>
            
          </Panel>
          <ModuleCompleted objectToExport={normalizeSummaryKeys(productJurney)} topicName={getStateTitle(STATE_CODES.APIProductJourney)} showSummaryButton={false} />
          </div>
      </ScrollBars>
    </div>
 )
}
