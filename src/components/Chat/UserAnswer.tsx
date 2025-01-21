import { FlexRow, Text, Avatar } from '@epam/uui';
import { IInteractiveChatMessage } from '../../typings/models/module.models';

import css from './UserAnswer.module.scss';
import { useAppSelector } from '../../hooks';
import { selectUserContext } from '../../store/session.slice';

export interface IUserAnswerProps {
  message: IInteractiveChatMessage
}

export default function UserAnswer({ message }: IUserAnswerProps) {
  const avatarSrc = useAppSelector(selectUserContext).picture;

  return (
    <FlexRow cx={css.root} vPadding='24' alignItems='top'>
      <Avatar size='48' img={avatarSrc} />
      <Text cx={css.messageWrapper} size='48'>{message.text}</Text>
    </FlexRow>
  );
}