import { useEffect, useState } from 'react';

import { FlexRow, IconContainer, Text, TextArea, Button, FlexSpacer } from '@epam/uui';
import { ReactComponent as ContentEditFillIcon } from '@epam/assets/icons/content-edit-fill.svg';
import { ReactComponent as NotificationDoneOutlineIcon } from '@epam/assets/icons/notification-done-outline.svg';
import { ReactComponent as NavigationCloseOutlineIcon } from '@epam/assets/icons/navigation-close-outline.svg';

import css from './TextValueEditor.module.scss';

export interface IValueEditorProps {
  id: any; 
  value: string,
  onEditValue: (id: any, newText: string) => void
}

export default function TextValueEditor({ id, value, onEditValue }: IValueEditorProps) {
  const [editorValue, onValueChange] = useState(value);
  const [isEditMode, onEditModeChange] = useState(false);
    
  const handleMessageSave = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    onEditValue(id, editorValue);
    onEditModeChange(false);
  };

  const handleCancel = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    onValueChange(value);
    onEditModeChange(false);
  };

  useEffect(() => {
    onEditModeChange(false);
  }, []);

  const messageForView = (
    <>
      <Text cx={css.messageWrapper} fontSize='16'>{editorValue}</Text>
      <FlexSpacer />
      <IconContainer onClick={isEditMode ? null : () => onEditModeChange(true)} cx={css.editPencil + (isEditMode ? ` ${css.disabledPencil}` : '')} size='20' icon={ContentEditFillIcon} />
    </>
  );

  const messageForEdit = (
    <div className={css.editWrapper}>
      <TextArea rows={4} value={editorValue} onValueChange={(x) => onValueChange(x)} />
      <FlexRow justifyContent='space-between' columnGap={10}>
        <FlexSpacer />
        <div className={css.editButtonsWrapper}>
          <Button onClick={handleMessageSave} caption='Save' icon={NotificationDoneOutlineIcon} iconPosition='left' />
          <Button onClick={handleCancel} cx={css.cancelButton} color='white' caption='Cancel' icon={NavigationCloseOutlineIcon} iconPosition='left' />
        </div>
      </FlexRow>
    </div>
  );

  return (
    <FlexRow cx={css.root} justifyContent='space-between'>
      {isEditMode ? messageForEdit : messageForView}
    </FlexRow>
  );
}