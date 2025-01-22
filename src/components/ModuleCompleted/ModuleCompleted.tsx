import { Button, Dropdown, DropdownMenuBody, DropdownMenuButton, FlexRow, FlexSpacer, IconContainer, Panel, RichTextView, Text } from '@epam/uui';
import { ReactComponent as NotificationDoneOutlineIcon } from '@epam/assets/icons/notification-done-outline.svg';

import css from './ModuleCompleted.module.scss';
import { DropdownBodyProps, IDropdownToggler } from '@epam/uui-core';

export interface IModuleCompletedProps {
  objectToExport: any;
}

export default function ModuleCompleted({ objectToExport }: IModuleCompletedProps) {

  const handleDownload = () => {
    const jsonStr = JSON.stringify(objectToExport, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.json';
    link.click();
  };

  const exportOptions = (_: DropdownBodyProps) => {
    return (
      <DropdownMenuBody>
        <DropdownMenuButton caption='JSON' onClick={handleDownload} />
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
