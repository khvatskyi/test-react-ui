import { useEffect, useState } from 'react';

import { FlexRow, IconContainer, Text, TextArea, Button, FlexSpacer } from '@epam/uui';
import { ReactComponent as EditIcon } from '@epam/assets/icons/content-edit-fill.svg';
import { ReactComponent as DeleteIcon } from '@epam/assets/icons/action-delete-fill.svg';

import { ReactComponent as NotificationDoneOutlineIcon } from '@epam/assets/icons/notification-done-outline.svg';
import { ReactComponent as NavigationCloseOutlineIcon } from '@epam/assets/icons/navigation-close-outline.svg';

import css from './TextValueEditor.module.scss';

type ShowButtonMode = 'by_hover' | 'always';

export interface IValueEditorProps {
  id: any; 
  value: string,
  readOnly?: boolean,
  showButton?: ShowButtonMode,
  onEditValue: (id: any, newText: string) => void
  onDelete?: (id: any) => void
}

export default function TextValueEditor({ id, value, onEditValue, onDelete, readOnly = false, showButton = 'by_hover' }: IValueEditorProps) {
  const [editorValue, onValueChange] = useState(value);
  const [isEditMode, onEditModeChange] = useState(false);

  const byHover = showButton === 'by_hover';
    
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

  const handleDelete = () => {
    onDelete(id)
  }

  useEffect(() => {
    onEditModeChange(false);
  }, []);

  const messageForView = (
    <>
      <Text cx={css.messageWrapper} fontSize='18'>{editorValue}</Text>
      {!readOnly && 
        <>
          <FlexSpacer />
          <IconContainer onClick={() => onEditModeChange(true)} cx={`${css.buttonEdit}${byHover ? ` ${css.hideButton}` : ''}`} size='20' icon={EditIcon} />
          {onDelete && <IconContainer onClick={handleDelete} cx={`${css.buttonDelete}${byHover ? ` ${css.hideButton}` : ''}`} size='20' icon={DeleteIcon} />}
        </>
      }
    </>
  );

  const messageForEdit = (
    <div className={css.editWrapper}>
      <TextArea /*rows={4} */ value={editorValue} onValueChange={(x) => onValueChange(x)} />
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
    <FlexRow cx={`${css.root}${byHover ? ` ${css.showButtonOnHover}` : ''}`} justifyContent='space-between'>
      {isEditMode ? messageForEdit : messageForView}
    </FlexRow>
  );
}