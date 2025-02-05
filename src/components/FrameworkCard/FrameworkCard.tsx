import { FlexCell, FlexRow, IconContainer, Text } from '@epam/uui';
import { ReactComponent as NotificationCheckFillIcon } from '@epam/assets/icons/notification-check-fill.svg';

import css from './FrameworkCard.module.scss';
import { IFrameworkCard, IStage } from '../../typings/models/framework.models';
import { StageStatus } from '../../typings/enums/stage-status.enum';

export interface IFrameworkCardProps extends IFrameworkCard {
  onStageClick: (stage: IStage) => void;
  cx?: string;
  isSingleCard?: boolean;
};

export default function FrameworkCard(props: IFrameworkCardProps) {
  const handleStageClick = (e: any, stage: IStage) => {
    e.preventDefault();
    e.stopPropagation();

    props.onStageClick(stage);
  };

  const childStage = (index: number, stage: IStage) => (
    <div key={stage.name} className={css.stageWrapper 
      + (stage.status === StageStatus.Complete ? ` ${css.completedStage}` : '')
      + (index > 0 ? ` ${css.secondColumn}` : '')
      }
      onClick={(e) => handleStageClick(e, stage)}
    >
      <div>
        {stage.status === StageStatus.Complete && <IconContainer size={20} cx={css.completedIcon} icon={NotificationCheckFillIcon} />}
        <Text cx={css.stageTitle} fontSize='16' fontWeight='400' >{stage.name}</Text>
      </div>
    </div>
  );

  return (
    <FlexCell cx={css.root + (props.cx ? ` ${props.cx}` : '')}>
      <h2>{props.title}</h2>
      <Text cx={css.description} fontSize='16'>{props.description}</Text>
      <FlexRow alignItems='top'>
        {
          props.categories.map((category, index) => {
            const categoryStageWrapperClasses = css.categoryStageWrapper
              + (category.path ? ` ${css.categoryStageWrapperClickable}` : '')
              + ` ${index > 0 ? (props.isSingleCard ? css.rightEndChevron : css.rightChevron) : css.rightPoint}`

            return (
              <div key={index} className={css.categoryWrapper} onClick={(e) => handleStageClick(e, category)}>
                <div className={categoryStageWrapperClasses}>
                  <h4>{category.name}</h4>
                </div>
                {category.stages?.map(stage => childStage(index, stage))}
              </div>
            )
          })
        }
      </FlexRow>
    </FlexCell>
  );
}
