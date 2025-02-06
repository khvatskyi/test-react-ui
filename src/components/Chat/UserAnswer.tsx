import { useEffect, useState } from 'react';

import { FlexRow, Avatar, IconContainer, Text, TextArea, Button, FlexSpacer } from '@epam/uui';
import { ReactComponent as ContentEditFillIcon } from '@epam/assets/icons/content-edit-fill.svg';
import { ReactComponent as NotificationDoneOutlineIcon } from '@epam/assets/icons/notification-done-outline.svg';
import { ReactComponent as NavigationCloseOutlineIcon } from '@epam/assets/icons/navigation-close-outline.svg';
import { ReactComponent as AssistantIcon } from '../../assets/icons/assistant-icon.svg';

import css from './UserAnswer.module.scss';
import { IChatMessageUserAnswer, IContentMessage } from '../../typings/models/module.models';
import { useAppSelector } from '../../hooks';
import { selectUserContext } from '../../store/session.slice';
import ChatAiButton from './ChatAiButton';

export interface IUserAnswerProps {
  message: IContentMessage,
  aiExample: string,
  aiOptions?: [string];
  onEditMessage: (id: string, newText: string, isAiGenerated: boolean) => void
}

export default function UserAnswer({ message, aiExample, aiOptions, onEditMessage }: IUserAnswerProps) {
  const avatarSrc = useAppSelector(selectUserContext).picture;
  const [isUserAnswer, onUserAnswerChange] = useState(!(message.content as IChatMessageUserAnswer).isAiGenerated);
  const [value, onValueChange] = useState((message.content as IChatMessageUserAnswer).answer);
  const [isEditMode, onEditModeChange] = useState(false);
  const hasOptions = Boolean(aiOptions && aiOptions.length > 0)
  
  const handleMessageSave = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    if (!value || value === (message.content as IChatMessageUserAnswer).answer) {
      onEditModeChange(false);
      return;
    }

    const isAiGenerated = !hasOptions && (value === aiExample);

    onEditMessage(message.id, value, isAiGenerated);
    onEditModeChange(false);
    onUserAnswerChange(!isAiGenerated);
  };

  const handleCancel = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    onValueChange((message.content as IChatMessageUserAnswer).answer);
    onEditModeChange(false);
  };

  const rewriteWithAI = () => {
    onValueChange(aiExample);
  };

  const handleAiOptionClick = (event) => {
    const selectedOption = event.currentTarget.dataset.option;
    onValueChange(selectedOption);
  };  

  useEffect(() => {
    onEditModeChange(false);
  }, []);

  const messageForView = <Text cx={css.messageWrapper} size='48'>{value}</Text>;
  const messageForEdit = (
    <div className={css.editWrapper}>
      <TextArea rows={4} value={value} onValueChange={(x) => onValueChange(x)} />
      {hasOptions &&
        <FlexRow columnGap={12} rawProps={ { style: { paddingBottom: '12px' } } }>
            <FlexSpacer/>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', maxWidth:'600px', justifyContent: 'flex-end'}}>
              {aiOptions
                    .filter(value => value.toLowerCase() !== "other")  
                    .map( (value, index) => { 
                      return (
                        <Button key={index} rawProps={ { 'data-option': value } } fill="none" color="secondary" caption={value} onClick={handleAiOptionClick}/> 
                      )
                    }
                  )
              }
          </div>
          </FlexRow>
      }
      <FlexRow justifyContent='space-between' columnGap={10}>
        {hasOptions && <FlexSpacer/>}
        {!hasOptions && <ChatAiButton caption='Rewrite with AI' onClick={rewriteWithAI} />}
        <div className={css.editButtonsWrapper}>
          <Button onClick={handleMessageSave} caption='Save' icon={NotificationDoneOutlineIcon} iconPosition='left' />
          <Button onClick={handleCancel} cx={css.cancelButton} color='white' caption='Cancel' icon={NavigationCloseOutlineIcon} iconPosition='left' />
        </div>
      </FlexRow>
    </div>
  );

  return (
    <FlexRow cx={css.root} vPadding='24' alignItems='top'>
      {isUserAnswer 
        ? <Avatar size='54' img={avatarSrc} />
        : <IconContainer cx={css.iconWrapper} icon={AssistantIcon} />
      }
      {isEditMode ? messageForEdit : messageForView}
      <IconContainer onClick={isEditMode ? null : () => onEditModeChange(true)} cx={css.editPencil + (isEditMode ? ` ${css.disabledPencil}` : '')} size='20' icon={ContentEditFillIcon} />
    </FlexRow>
  );
}