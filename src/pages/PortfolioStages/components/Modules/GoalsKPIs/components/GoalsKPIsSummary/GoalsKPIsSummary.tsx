import { ScrollBars, FlexRow, Accordion, RichTextView } from '@epam/uui';
import css from './GoalsKPIsSummary.module.scss';
import { ModuleCompleted } from '../../../../../../../components';
import { getStateTitle, normalizeSummaryKeys, STATE_CODES } from '../../../../PortfolioStagesLeftPanel/structure';
import TextValueEditor from '../../../../../../../components/Editors/TextValueEditor/TextValueEditor';
import React from 'react';
import { useAppDispatch } from '../../../../../../../hooks';
import { IGoalAddRequest, IGoalDeleteRequest, IGoalEditRequest, IGoalsAndKPIs, IKpisUpdateRequest, IKpiTableItem, IObjectiveAddRequest, IObjectiveDeleteRequest, IObjectiveEditRequest } from '../../../../../../../typings/models/goals-and-kpis.model';
import ObjectiveEditor from '../ObjectiveEditor/ObjectiveEditor';
import AddGoal from '../AddGoal/AddGoal';
import { deleteGoalInGoalsAndKPIs, deleteObjectiveInGoalsAndKPIs, insertGoalInGoalsAndKPIs, insertObjectiveInGoalsAndKPIs, updateGoalInGoalsAndKPIs, updateKPIsInGoalsAndKPIs, updateObjectiveInGoalsAndKPIs } from '../../../../../../../store/goals-and-kpis.slice';
import AddObjective from '../AddObjective/AddObjective';
import { DeleteConfirmation, IConfirmationData } from '../../../../../../../components/DeleteConfirmation/DeleteConfirmation';
import { JSX } from 'react/jsx-runtime';
import { useUuiContext } from '@epam/uui-core';



export interface IGoalsKPIsProps {
  portfolioId: string;
  summary: IGoalsAndKPIs;
}

export default function GoalsKPIsSummary({ portfolioId, summary }: IGoalsKPIsProps) {

  const dispatch = useAppDispatch();
  const { uuiModals } = useUuiContext();

  const handleAddGoal = (newValue: string) => {
    const data: IGoalAddRequest = {
      portfolioId: portfolioId,
      description: newValue,
    }

    dispatch(insertGoalInGoalsAndKPIs(data));
  }
  
  const handleEditGoal = (key: string, newValue: any) => {

    const data: IGoalEditRequest = {
      portfolioId: portfolioId,
      goalId: key,
      description: newValue,
    }

    dispatch(updateGoalInGoalsAndKPIs(data));
  }

  const handleDeleteGoal = ({key, description}) => {
    const message_element = 
      <RichTextView size='16'>
        <span>Do you really want to delete all data for the </span>
        {' '}<b>[{description}]</b>{' '}
        <span>goal?</span>
      </RichTextView>

    uuiModals.show<boolean>((modalProps: JSX.IntrinsicAttributes & IConfirmationData) => <DeleteConfirmation { ...modalProps } element={message_element} />)
        .then(() => {
          const data: IGoalDeleteRequest = {
            portfolio_id: portfolioId,
            goal_id: key,
          }
      
          dispatch(deleteGoalInGoalsAndKPIs(data));
        })
        .catch(() => {});
  }

  const handleAddObjective = (goalId: string, newValue: string) => {
    const data: IObjectiveAddRequest = {
      portfolioId: portfolioId,
      relatedGoalId: goalId,
      description: newValue,
    }

    dispatch(insertObjectiveInGoalsAndKPIs(data));
  }

  const handleEditObjective = (key: {objectiveId: string, relatedGoalId: string}, newValue: any) => {

    const data: IObjectiveEditRequest = {
      portfolioId: portfolioId,
      objectiveId: key.objectiveId, 
      relatedGoalId: key.relatedGoalId,
      description: newValue,
    }

    dispatch(updateObjectiveInGoalsAndKPIs(data));
  }    

  const handleDeleteObjective = (key: {objectiveId: string, relatedGoalId: string, description: string}) => {
    const message_element = 
      <RichTextView size='16'>
        <span>Do you really want to delete all data for the </span>
        {' '}<b>[{key.description}]</b>{' '}
        <span>objective?</span>
      </RichTextView>

    uuiModals.show<boolean>((modalProps: JSX.IntrinsicAttributes & IConfirmationData) => <DeleteConfirmation { ...modalProps } element={message_element} />)
        .then(() => {
          const data: IObjectiveDeleteRequest = {
            portfolio_id: portfolioId,
            objective_id: key.objectiveId,
          }
      
          dispatch(deleteObjectiveInGoalsAndKPIs(data));
        })
        .catch(() => {});
  }

  const handleUpdateKPIs = async (kpis: IKpiTableItem[]) => {
    const content:  IKpisUpdateRequest = {
      portfolioId: portfolioId,
      KPIs: kpis,
    }
    const action = await dispatch(updateKPIsInGoalsAndKPIs(content));    
    console.log('dbKpis', action.payload); //TODO: need to set data new IDs to table
  }

  

  return summary && (
    <div className={css.content}>
      <ScrollBars>
        <div className={css.rootForm}>
          {summary.goals
            .map( (goal) => {
              return (
                <React.Fragment key={goal.goalId}>
                  <Accordion title={goal.description} mode="block" cx={css.accordion}>
                    <h4 style={{ margin: '0px' }}>Goal</h4>
                    <TextValueEditor id={{key: goal.goalId, description: goal.description}} value={String(goal.description)} onEditValue={handleEditGoal} onDelete={handleDeleteGoal} showButton='always' />
                    <FlexRow>
                      <h4 style={{ margin: '0px' }}>Objective(s)</h4>
                    </FlexRow>
                    {summary.objectives
                      .filter(objective => objective.relatedGoalId === goal.goalId)
                      .map( (objective) => {
                        return (
                          <React.Fragment key={objective.objectiveId}>
                            <ObjectiveEditor 
                              keyInfo={{objectiveId: objective.objectiveId, relatedGoalId: objective.relatedGoalId, description: objective.description}} 
                              kpis={summary.kpis.filter(kpi => kpi.relatedObjectiveId === objective.objectiveId)}
                              onEdit={handleEditObjective} 
                              onDelete={handleDeleteObjective} 
                              onUpdateKPIs={handleUpdateKPIs} 
                            />
                          </React.Fragment>
                        )
                      })
                    }
                    <AddObjective goalId={goal.goalId} onAddObjective={handleAddObjective} />
                  </Accordion>
                </React.Fragment>
              )
            })
          }
          <AddGoal onAdd={handleAddGoal} />
          <ModuleCompleted objectToExport={normalizeSummaryKeys(summary)} topicName={getStateTitle(STATE_CODES.APIProductJourney)} showSummaryButton={true} />
          </div>
      </ScrollBars>
    </div>
 )
}

