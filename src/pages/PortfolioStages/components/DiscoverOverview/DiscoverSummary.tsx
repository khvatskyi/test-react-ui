import React from 'react';
import css from './DiscoverSummary.module.scss';

import { Badge, Button, FlexRow, FlexSpacer, Tooltip  } from "@epam/uui";
import { IFrameworkCard } from '../../../../typings/models/framework.models';
import { StageStatus } from '../../../../typings/enums/stage-status.enum';
import { ReactComponent as iconRun } from '@epam/assets/icons/navigation-chevron_right-outline.svg';


export interface IDiscoverOverviewProps {
  frameworkCard: IFrameworkCard;
  generateProductProposal: () => void;
}

export default function DiscoverSummary(props: IDiscoverOverviewProps) {

  const handleGenerateProductProposal = () => {
    props.generateProductProposal();
  }


  const allStages = props.frameworkCard.categories.flatMap(category => category.stages);
  const uncompletedStages = allStages.filter(stage => stage.status !== StageStatus.Complete);
  const totalStageCount = allStages.length;
  const completedStageCount = totalStageCount - uncompletedStages.length;
  const uncompletedRequiredStages = uncompletedStages.filter( stage => props.frameworkCard.summaryRequired.includes(stage.code) );
  const hasUncompletedRequiredStages = Boolean(uncompletedRequiredStages && uncompletedRequiredStages.length > 0);
  
  const renderExportTooltip= () => (
    <>
      <div className={css.tooltipContent}>
        <div className={css.tooltipCaption}>Complete following modules:</div>
        <ul>
          {
            uncompletedRequiredStages.map( (stage, index) => { 
              return (
                <React.Fragment key={index}>                  
                  <li className={css.tooltipItem}>{stage.name}</li> 
                </React.Fragment>
              )
            })
          }
        </ul>
      </div>
    </>
  );

   return (
    <>
      <h3>Deliverables</h3>
      <div className={css.infoPanel}>
        <h4 className={css.infoCaption}>API Product Proposal</h4>
        <FlexRow columnGap={6}>
          <h5 className={css.infoLabel}>Your progress:</h5>
          <Badge color="info" size="24" fill="outline" caption={`${completedStageCount}/${totalStageCount} modules`} />
          <FlexSpacer />
          {hasUncompletedRequiredStages &&
            <Tooltip renderContent={ renderExportTooltip }>
              <Button color='primary' caption='Get Summary' icon={iconRun} iconPosition='right' isDisabled={true}></Button>
            </Tooltip>
          }
          {!hasUncompletedRequiredStages &&
            <Button color='primary' caption='Get Summary' icon={iconRun} iconPosition='right' onClick={handleGenerateProductProposal} ></Button>
          }
        </FlexRow>
      </div>
    </>
   )
  }  

