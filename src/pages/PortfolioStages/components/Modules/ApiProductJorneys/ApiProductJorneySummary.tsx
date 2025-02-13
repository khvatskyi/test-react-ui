import cx from 'classnames';

import { FlexCell, Panel, ScrollBars, FlexRow, FlexSpacer, Button } from '@epam/uui';
import { IProductJourney, IUpdateApiProductJourneyAction, IUpdateApiProductJourneyStep } from '../../../../../typings/models/product-journey.model';
import css from './ApiProductJorneySummary.module.scss';
import { ReactComponent as EditFillIcon } from '@epam/assets/icons/content-edit-fill.svg';
import { ModuleCompleted } from '../../../../../components';
import { getStateTitle, normalizeSummaryKeys, STATE_CODES } from '../../PortfolioStagesLeftPanel/structure';
import TextValueEditor from '../../../../../components/TextValueEditor/TextValueEditor';
import React from 'react';
import { updateActionApiProductJourney, updateStepApiProductJourney } from '../../../../../store/ai.slice';
import { useAppDispatch } from '../../../../../hooks';


const LABELS = {
  formTitle: 'Automated Business Insurance Quote Request',
}

const SIZES = {
  ColumnTitle: 160,
  ColumnValue: 448,
}

export interface IApiProductJorneysProps {
  portfolioId: string;
  productJurney: IProductJourney;
  onEditScenarioClick: () => void;
}

export default function ApiProductJorneySummary({ portfolioId, productJurney, onEditScenarioClick }: IApiProductJorneysProps) {

  const dispatch = useAppDispatch();

  const handleEditStepValue = (key: {number: number, field: string }, newValue: string) => {
    const data: IUpdateApiProductJourneyStep = {
      portfolioId: portfolioId,
      stepNumber: key.number,
      fieldName: key.field,
      value: newValue,
    }

    dispatch(updateStepApiProductJourney(data));
  }    


  const handleEditActionValue = (key: {id: string, field: string }, newValue: string) => {
    const data: IUpdateApiProductJourneyAction = {
      portfolioId: portfolioId,
      actionId: key.id,
      fieldName: key.field,
      value: newValue,
    }

    dispatch(updateActionApiProductJourney(data));
  }

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

            {productJurney.steps
              .map( (step) => { 
                  return (
                    <React.Fragment key={step.stepNumber}>
                      <h5 style={{ margin: '0px' }}>STEP {step.stepNumber}</h5>
                      <div className={css.stepArea}>

                        <FlexRow cx={cx(css.tableRow, css.borderTop, css.borderLeft, css.borderRight)} alignItems="stretch">
                          <FlexCell width={ SIZES.ColumnTitle } cx={ cx(css.cellTitleColor, css.borderRight) } >
                            <FlexRow cx={ cx(css.valueMargin) }>Name</FlexRow>
                          </FlexCell>
                          <FlexCell width={ SIZES.ColumnValue } cx={ cx(css.borderBottom) } >
                            <TextValueEditor id={{number: step.stepNumber, field: 'title'}} value={step.title} onEditValue={handleEditStepValue} />
                          </FlexCell>
                        </FlexRow>

                        <FlexRow cx={cx(css.tableRow, css.borderBottom, css.borderLeft, css.borderRight)} vPadding="12" alignItems="stretch">
                          <FlexCell width={ SIZES.ColumnTitle } cx={ cx(css.cellTitleColor, css.borderRight) }  >
                            <FlexRow cx={ cx(css.valueMargin) }>Description</FlexRow>
                          </FlexCell>
                          <FlexCell width={ SIZES.ColumnValue } >
                            <TextValueEditor id={{number: step.stepNumber, field: 'description' }} value={step.description} onEditValue={handleEditStepValue} />
                          </FlexCell>
                        </FlexRow>

                        <h5>ACTION DETAILS</h5>
                        {step.actions.map( (action, index) => {
                          const isNotLastAction = index + 1 < step.actions.length;                          
                          return ( 
                            <React.Fragment key={action.actionId}>
                              <div className={cx(isNotLastAction && css.actionAria)}>
                                <FlexRow cx={cx(css.tableRow, css.borderTop, css.borderLeft, css.borderRight)} alignItems="stretch">
                                  <FlexCell width={ SIZES.ColumnTitle } cx={ cx(css.cellTitleColor, css.borderRight) } >
                                    <FlexRow cx={ cx(css.valueMargin) }>Name</FlexRow>
                                  </FlexCell>
                                  <FlexCell width={ SIZES.ColumnValue } cx={ css.borderBottom } >
                                    <TextValueEditor id={{id: action.actionId, field: 'name' }} value={action.name} onEditValue={handleEditActionValue} />
                                  </FlexCell>
                                </FlexRow>

                                <FlexRow cx={cx(css.tableRow, css.borderLeft, css.borderRight)} vPadding="12" alignItems="stretch">
                                  <FlexCell width={ SIZES.ColumnTitle } cx={ cx(css.cellTitleColor, css.borderRight) } >
                                    <FlexRow cx={ cx(css.valueMargin) }>Description</FlexRow>
                                  </FlexCell>
                                  <FlexCell width={ SIZES.ColumnValue } cx={ css.borderBottom } >
                                    <TextValueEditor id={{id: action.actionId, field: 'description' }} value={action.description} onEditValue={handleEditActionValue} />
                                  </FlexCell>
                                </FlexRow>


                                <FlexRow cx={cx(css.tableRow, css.borderLeft, css.borderRight)} vPadding="12" alignItems="stretch">
                                  <FlexCell width={ SIZES.ColumnTitle } cx={ cx(css.cellTitleColor, css.borderRight) } >
                                    <FlexRow cx={ cx(css.valueMargin) }>API call</FlexRow>
                                  </FlexCell>
                                  <FlexCell width={ SIZES.ColumnValue } cx={ css.borderBottom } >
                                    <FlexRow cx={ cx(css.valueMargin) }>{action.apiCall ? 'Yes' : 'No'}</FlexRow>
                                  </FlexCell>
                                </FlexRow>

                                <FlexRow cx={cx(css.tableRow, css.borderBottom, css.borderLeft, css.borderRight)} vPadding="12" alignItems="stretch">
                                  <FlexCell width={ SIZES.ColumnTitle } cx={ cx(css.cellTitleColor, css.borderRight)} >
                                     <FlexRow cx={ cx(css.valueMargin) }>Expected result</FlexRow>
                                  </FlexCell>
                                  <FlexCell width={ SIZES.ColumnValue } >
                                    <TextValueEditor id={{id: action.actionId, field: 'expectedResult' }} value={action.expectedResult} onEditValue={handleEditActionValue} />
                                  </FlexCell>
                                </FlexRow>
                              </div>
                            </React.Fragment>
                          )
                        })}
                      </div>
                    </React.Fragment>
                  )
                }
              )} 
          </Panel>
          <ModuleCompleted objectToExport={normalizeSummaryKeys(productJurney)} topicName={getStateTitle(STATE_CODES.APIProductJourneys)} showSummaryButton={false} />
          </div>
      </ScrollBars>
    </div>
 )
}
