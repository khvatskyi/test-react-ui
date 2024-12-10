// import { IChatMessage } from '../../models/chat.models';
// import Chat from '../chat/chat';
// import { getMessages, isAiMessageLoading, sendMessageToAi } from '../../store/ai.slice';
// import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  // TextInput, SuccessNotification, TextArea, FlexCell, LabeledInput, PickerInput, RadioGroup, useForm
  FlexRow, FlexSpacer, Panel, RichTextView, Button, Text,
} from '@epam/uui';

import css from './ProfileLeftPanel.module.scss';
import { ReactComponent as EditIcon } from '@epam/assets/icons/content-edit-fill.svg';
import type { ProfileInfo } from './ProfileTypes';

const LABELS = {
  Title: 'Client Profile',
  Name: 'NAME',
  Desc: 'DESCRIPTION',
  Industry: 'INDUSTRY',
  Size: 'SIZE',
  CoreProducts: 'CORE PRODUCTOS / BUSINESS LINES',
};

const editProfile = () => {
  alert('editProfile');
};

const ProfileData: ProfileInfo = {
  name: 'Travelers',
  description: 'Travelers Insurance is one of the largest and most established insurance companies in the United States, providing a wide array of property and casualty insurance products and services to businesses, organizations, and individuals. Founded in 1864, Travelers has built a reputation for financial strength, stability, and handling claims efficiently and fairly. The company focuses on innovation and comprehensive risk management to cater to the changing needs of its clients.',
  industry: 'Insurance',
  size: 'Large',
  coreProducts: '',
}


export const ProfileLeftPanel = () => {

  const getLabel = (text: string) => (
    <Text cx={css.profileLabel} fontSize="16" fontWeight="700" lineHeight="18" >
      {text}
    </Text>
  );

  const getText = (text: string) => (
    <Text fontSize="16" fontWeight="400" lineHeight="24" >
      {text}
    </Text>
  );

  return (
    <aside className={css.root}>
      <Panel cx={css.formPanel} >
        <FlexRow cx={css.buttonPanel}>
          <RichTextView>
            <h2 className={css.profileTitle}> {LABELS.Title}</h2>
          </RichTextView>
          <FlexSpacer />
          <Button caption="Edit" icon={EditIcon} fill="outline" color="secondary" onClick={editProfile} />
        </FlexRow>

        {getLabel(LABELS.Name)}
        {getText(ProfileData.name!)}
        {getLabel(LABELS.Desc)}
        {getText(ProfileData.description!)}
        {getLabel(LABELS.Industry)}
        {getText(ProfileData.industry!)}
        {getLabel(LABELS.Size)}
        {getText(ProfileData.size!)}
        {getLabel(LABELS.CoreProducts)}
        {getText(ProfileData.coreProducts!)}
      </Panel>
    </aside>
  );
}
