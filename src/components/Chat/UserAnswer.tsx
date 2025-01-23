import { useEffect, useState } from 'react';

import { FlexRow, Avatar, IconContainer, Text, TextArea, Button } from '@epam/uui';
import { ReactComponent as ContentEditFillIcon } from '@epam/assets/icons/content-edit-fill.svg';
import { ReactComponent as NotificationDoneOutlineIcon } from '@epam/assets/icons/notification-done-outline.svg';
import { ReactComponent as NavigationCloseOutlineIcon } from '@epam/assets/icons/navigation-close-outline.svg';

import css from './UserAnswer.module.scss';
import { IContentMessage } from '../../typings/models/module.models';
import { useAppSelector } from '../../hooks';
import { selectUserContext } from '../../store/session.slice';
import ChatAiButton from './ChatAiButton';

export interface IUserAnswerProps {
  message: IContentMessage,
  aiExample: string,
  onEditMessage: (id: string, newText: string) => void
}

export default function UserAnswer({ message, aiExample, onEditMessage }: IUserAnswerProps) {
  const avatarSrc = useAppSelector(selectUserContext).picture;
  const [value, onValueChange] = useState(message.content.text);
  const [isEditMode, onEditModeChange] = useState(false);
  const handleMessageSave = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    if (!value || value === message.content.text) {
      return;
    }

    onEditMessage(message.id, value);
  };

  const handleCancel = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    onValueChange(message.content.text);
    onEditModeChange(false);
  };

  const rewriteWithAI = () => {
    onValueChange(aiExample);
  };

  useEffect(() => {
    onEditModeChange(false);
  }, [message.content.text]);

  const messageForView = <Text cx={css.messageWrapper} size='48'>{value}</Text>;
  const messageForEdit = (
    <div className={css.editWrapper}>
      <TextArea rows={4} value={value} onValueChange={(x) => onValueChange(x)} id='goalsOrObjectives' placeholder='What business is trying to achieve with this portfolio?' />
      <FlexRow justifyContent='space-between' columnGap={10}>
        <ChatAiButton caption='Rewrite with AI' onClick={rewriteWithAI} />
        <div className={css.editButtonsWrapper}>
          <Button onClick={handleMessageSave} caption='Save' icon={NotificationDoneOutlineIcon} iconPosition='left' />
          <Button onClick={handleCancel} cx={css.cancelButton} color='white' caption='Cancel' icon={NavigationCloseOutlineIcon} iconPosition='left' />
        </div>
      </FlexRow>
    </div>
  );

  return (
    <FlexRow cx={css.root} vPadding='24' alignItems='top'>
      <Avatar size='48' img={avatarSrc} />
      {isEditMode ? messageForEdit : messageForView}
      <IconContainer onClick={isEditMode ? null : () => onEditModeChange(true)} cx={css.editPencil + (isEditMode ? ` ${css.disabledPencil}` : '')} size='20' icon={ContentEditFillIcon} />
    </FlexRow>
  );
}