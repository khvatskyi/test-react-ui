import { Badge, Button, Dropdown, DropdownMenuBody, DropdownMenuButton, FlexRow, FlexSpacer, Panel, RichTextView } from '@epam/uui';
import { ReactComponent as NotificationDoneOutlineIcon } from '@epam/assets/icons/notification-done-outline.svg';

import css from './ModuleCompleted.module.scss';
import { DropdownBodyProps, IDropdownToggler } from '@epam/uui-core';
import { downloadJSON, exportToPDF, exportToPPT } from '../../utilities/export.utility';
import { ViewSummaryButton } from '../ViewSummaryButton/ViewSummaryButton';

export interface IModuleCompletedProps {
  topicName: string;
  objectToExport: any;
  showSummaryButton: boolean;
}

export default function ModuleCompleted({ objectToExport, topicName, showSummaryButton }: IModuleCompletedProps) {

  const exportOptions = (_: DropdownBodyProps) => {
    return (
      <DropdownMenuBody>
        <DropdownMenuButton caption='JSON' onClick={() => downloadJSON(objectToExport)} />
        <DropdownMenuButton caption='PDF' onClick={() => exportToPDF(objectToExport)} />
        <DropdownMenuButton caption='PowerPoint' onClick={() => exportToPPT(objectToExport)} />
      </DropdownMenuBody>
    );
  };

  return (
    <FlexRow vPadding='18'>
      <FlexSpacer />
      <Panel background='surface-main' cx={css.modulePanel}>
        <FlexRow columnGap={6}  justifyContent='space-between' cx={css.buttonPanel}>
          <RichTextView size='16' cx={css.successText}>Completed</RichTextView>
          <Badge color="success" size="24" fill="outline" icon={ NotificationDoneOutlineIcon } caption={topicName} cx={css.moduleBadge} />
          <FlexSpacer />
          <Dropdown
            renderBody={exportOptions}
            renderTarget={(props: IDropdownToggler) => <Button caption='Export output as' fill="ghost" color="secondary" {...props} />}
          />
          {showSummaryButton && <ViewSummaryButton onClick={()=>{}} summaryObject={objectToExport}  />}
        </FlexRow>
      </Panel>
    </FlexRow>
  )
}
