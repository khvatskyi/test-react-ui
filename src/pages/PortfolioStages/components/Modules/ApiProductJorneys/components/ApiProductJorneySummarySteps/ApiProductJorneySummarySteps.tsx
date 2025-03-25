import React from 'react';
import cx from 'classnames';

import { FlexCell, FlexRow } from '@epam/uui';
import { IStep } from "../../../../../../../typings/models/product-journey.model";
import TextValueEditor from '../../../../../../../components/Editors/TextValueEditor/TextValueEditor';
import { IUpdateApiProductJourneyAction, IUpdateApiProductJourneyStep } from '../../../../../../../typings/models/product-journey.model';
import { updateActionApiProductJourney, updateStepApiProductJourney } from '../../../../../../../store/ai.slice';
import { useAppDispatch } from '../../../../../../../hooks';

import css from './ApiProductJorneySummarySteps.module.scss';

const SIZES = {
  ColumnTitle: 160,
  ColumnValue: 448,
}

export interface IApiProductJorneysProps {
  steps: IStep[];
  portfolioId?: string;
  readOnly?: boolean,
}

export default function ApiProductJorneySummary({ steps, portfolioId = '', readOnly = true }: IApiProductJorneysProps) {

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

  return (<>
    {steps.map( (step) => { 
        return (
          <React.Fragment key={step.stepNumber}>
            <h5 style={{ margin: '0px' }}>STEP {step.stepNumber}</h5>
            <div className={css.stepArea}>

              <FlexRow cx={cx(css.tableRow, css.borderTop, css.borderLeft, css.borderRight)} alignItems="stretch">
                <FlexCell width={ SIZES.ColumnTitle } cx={ cx(css.cellTitleColor, css.borderRight) } >
                  <FlexRow cx={ cx(css.valueMargin) }>Name</FlexRow>
                </FlexCell>
                <FlexCell width={ SIZES.ColumnValue } cx={ cx(css.borderBottom) } >
                  <TextValueEditor id={{number: step.stepNumber, field: 'title'}} value={step.title} onEditValue={handleEditStepValue} readOnly={readOnly}/>
                </FlexCell>
              </FlexRow>

              <FlexRow cx={cx(css.tableRow, css.borderBottom, css.borderLeft, css.borderRight)} vPadding="12" alignItems="stretch">
                <FlexCell width={ SIZES.ColumnTitle } cx={ cx(css.cellTitleColor, css.borderRight) }  >
                  <FlexRow cx={ cx(css.valueMargin) }>Description</FlexRow>
                </FlexCell>
                <FlexCell width={ SIZES.ColumnValue } >
                  <TextValueEditor id={{number: step.stepNumber, field: 'description' }} value={step.description} onEditValue={handleEditStepValue} readOnly={readOnly}/>
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
                          <TextValueEditor id={{id: action.actionId, field: 'name' }} value={action.name} onEditValue={handleEditActionValue} readOnly={readOnly}/>
                        </FlexCell>
                      </FlexRow>

                      <FlexRow cx={cx(css.tableRow, css.borderLeft, css.borderRight)} vPadding="12" alignItems="stretch">
                        <FlexCell width={ SIZES.ColumnTitle } cx={ cx(css.cellTitleColor, css.borderRight) } >
                          <FlexRow cx={ cx(css.valueMargin) }>Description</FlexRow>
                        </FlexCell>
                        <FlexCell width={ SIZES.ColumnValue } cx={ css.borderBottom } >
                          <TextValueEditor id={{id: action.actionId, field: 'description' }} value={action.description} onEditValue={handleEditActionValue} readOnly={readOnly}/>
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
                          <TextValueEditor id={{id: action.actionId, field: 'expectedResult' }} value={action.expectedResult} onEditValue={handleEditActionValue} readOnly={readOnly}/>
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
  </>)
}
