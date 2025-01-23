import { Button, Dropdown, DropdownMenuBody, DropdownMenuButton, FlexRow, FlexSpacer, IconContainer, Panel, RichTextView, Text } from '@epam/uui';
import { ReactComponent as NotificationDoneOutlineIcon } from '@epam/assets/icons/notification-done-outline.svg';

import css from './ModuleCompleted.module.scss';
import { DropdownBodyProps, IDropdownToggler } from '@epam/uui-core';
import { downloadJSON, exportToPDF, exportToPPT } from '../../utilities/export.utility';

export interface IModuleCompletedProps {
  objectToExport: any;
}

export default function ModuleCompleted({ objectToExport }: IModuleCompletedProps) {

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
        <div className={css.textContainer}>
          <IconContainer cx={css.successIcon} icon={NotificationDoneOutlineIcon} />
          <RichTextView size='16' cx={css.successText}>Module Completed</RichTextView>
        </div>
        <Dropdown
          renderBody={exportOptions}
          renderTarget={(props: IDropdownToggler) => <Button caption='Export output as' {...props} />}
        />
      </Panel>
    </FlexRow>
  )
}
