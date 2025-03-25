import React, { useEffect, useState } from 'react';

import { FlexRow, IconContainer, TextArea, Button, FlexSpacer } from '@epam/uui';
import { ReactComponent as ContentEditFillIcon } from '@epam/assets/icons/content-edit-fill.svg';
import { ReactComponent as NotificationDoneOutlineIcon } from '@epam/assets/icons/notification-done-outline.svg';
import { ReactComponent as NavigationCloseOutlineIcon } from '@epam/assets/icons/navigation-close-outline.svg';

import css from './TextArrayValueEditor.module.scss';

export interface ITextArrayValueProps {
  id: any; 
  value: string[],
  onEditValue: (id: any, newText: string[]) => void
}

export default function TextArrayValueEditor({ id, value, onEditValue }: ITextArrayValueProps) {
  const [editorValue, setEditorValue] = useState(value);
  const [isEditMode, setEditMode] = useState(false);
    
  const handleMessageSave = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    setEditorValue(editorValue.filter(str => str.trim() !== ""));
    onEditValue(id, editorValue);
    setEditMode(false);
  };

  const handleCancel = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    setEditorValue(value);
    setEditMode(false);
  };

  useEffect(() => {
    setEditMode(false);
  }, []);

  const messageForView = (
    <>
      <div>
        <ul>
          {editorValue.map((value, index) => {
            return  <React.Fragment key={index}>
                      <li className={css.arrayItem}>{`${value}`}</li>
                    </React.Fragment>
          })}
        </ul>
      </div>
      <FlexSpacer />
      <IconContainer onClick={isEditMode ? null : () => setEditMode(true)} cx={css.editPencil + (isEditMode ? ` ${css.disabledPencil}` : '')} size='20' icon={ContentEditFillIcon} />
    </>
  );

  const messageForEdit = (
    <div className={css.editWrapper}>
      <TextArea rows={4} 
        value={editorValue.join("\n")} 
        onValueChange={(v) => setEditorValue(v.split("\n"))}
      />
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