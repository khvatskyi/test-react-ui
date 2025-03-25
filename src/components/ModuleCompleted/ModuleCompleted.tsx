import { Badge, FlexRow, FlexSpacer, Panel, RichTextView } from '@epam/uui';
import { ReactComponent as NotificationDoneOutlineIcon } from '@epam/assets/icons/notification-done-outline.svg';

import css from './ModuleCompleted.module.scss';
import { SummaryViewButton } from '../SummaryViewButton/SummaryViewButton';
import { SummaryExportButton } from '../SummaryExportButton/SummaryExportButton';

export interface IModuleCompletedProps {
  topicName: string;
  objectToExport: any;
  showSummaryButton: boolean;
}

export default function ModuleCompleted({ objectToExport, topicName, showSummaryButton }: IModuleCompletedProps) {

  return (
    <FlexRow vPadding='18'>
      <FlexSpacer />
      <Panel background='surface-main' cx={css.modulePanel}>
        <FlexRow columnGap={6}  justifyContent='space-between' cx={css.buttonPanel}>
          <RichTextView size='16' cx={css.successText}>Completed</RichTextView>
          <Badge color="success" size="24" fill="outline" icon={ NotificationDoneOutlineIcon } caption={topicName} cx={css.moduleBadge} />
          <FlexSpacer />
          <SummaryExportButton summaryObject={objectToExport} />
          {showSummaryButton && <SummaryViewButton onClick={()=>{}} summaryObject={objectToExport}  />}
        </FlexRow>
      </Panel>
    </FlexRow>
  )
}
