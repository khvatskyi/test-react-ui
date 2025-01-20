import { FlexCell, FlexRow, IconContainer } from '@epam/uui';
import { ReactComponent as NotificationCheckFillIcon } from '@epam/assets/icons/notification-check-fill.svg';

import css from './FrameworkCard.module.scss';
import { IFrameworkCard, IStage } from '../../typings/models/framework.models';
import { StageStatus } from '../../typings/enums/stage-status.enum';

export interface IFrameworkCardProps extends IFrameworkCard {
  onStageClick: (stage: IStage) => void;
};

export default function FrameworkCard(props: IFrameworkCardProps) {
  const handleStageClick = (e: any, stage: IStage) => {
    e.preventDefault();
    e.stopPropagation();

    props.onStageClick(stage);
  };

  const childStage = (stage: IStage) => (
    <div key={stage.name} className={css.stageWrapper + (stage.status === StageStatus.Complete ? ` ${css.completedStage}` : '')}
      onClick={(e) => handleStageClick(e, stage)}
    >
      <div>
        {stage.status === StageStatus.Complete && <IconContainer size={20} cx={css.completedIcon} icon={NotificationCheckFillIcon} />}
        <span>{stage.name}</span>
      </div>
    </div>
  );

  return (
    <FlexCell cx={css.root}>
      <h2>{props.title}</h2>
      <span>{props.description}</span>
      <FlexRow alignItems='top' columnGap="12">
        {
          props.categories.map((category, index) => {
            const categoryStageWrapperClasses = css.categoryStageWrapper
              + ` ${index > 0 ? css.rightChevron : css.rightPoint}`

            return (
              <div key={index} className={css.categoryWrapper} onClick={(e) => handleStageClick(e, category)}>
                <div className={categoryStageWrapperClasses}>
                  <span>{category.name}</span>
                </div>
                {category.stages?.map(stage => childStage(stage))}
              </div>
            )
          })
        }
      </FlexRow>
    </FlexCell>
  );
}
