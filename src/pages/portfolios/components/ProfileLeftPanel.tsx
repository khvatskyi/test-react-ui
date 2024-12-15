import {
  FlexRow, FlexSpacer, Panel, RichTextView, Button, Text,
  FlexCell,
} from '@epam/uui';

import css from './ProfileLeftPanel.module.scss';
import { ReactComponent as EditIcon } from '@epam/assets/icons/content-edit-fill.svg';
import type { IProfileInfo } from '../../provider/Profile.models';

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

const DEFAULT_PROFILE_DATA: IProfileInfo = {
  name: 'Travelers',
  description: 'Travelers Insurance is one of the largest and most established insurance companies in the United States, providing a wide array of property and casualty insurance products and services to businesses, organizations, and individuals. Founded in 1864, Travelers has built a reputation for financial strength, stability, and handling claims efficiently and fairly. The company focuses on innovation and comprehensive risk management to cater to the changing needs of its clients.',
  industry: 'Insurance',
  size: 'Large',
  coreProducts: '',
}

export const ProfileLeftPanel = () => {

  // TODO: grab profileData from state
  const profileData = true ? DEFAULT_PROFILE_DATA : null;

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

  return (<>
    {profileData &&
      <FlexCell cx={css.leftSideProfile} minWidth={360}>
        <Panel background="surface-main" cx={css.panelProfile} shadow>
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
              {getText(profileData.name!)}
              {getLabel(LABELS.Desc)}
              {getText(profileData.description!)}
              {getLabel(LABELS.Industry)}
              {getText(profileData.industry!)}
              {getLabel(LABELS.Size)}
              {getText(profileData.size!)}
              {getLabel(LABELS.CoreProducts)}
              {getText(profileData.coreProducts!)}
            </Panel>
          </aside>
        </Panel>
      </FlexCell>
    }
  </>);
}
