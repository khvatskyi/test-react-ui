import { useHistory } from 'react-router-dom';

import {
  FlexRow, FlexSpacer, Panel, RichTextView, Button, Text,
  FlexCell,
} from '@epam/uui';
import { ReactComponent as EditIcon } from '@epam/assets/icons/content-edit-fill.svg';

import css from './ProfileLeftPanel.module.scss';
import type { IClientProfileInfo } from '../../../../typings/models/client-info.models';

const LABELS = {
  Title: 'Client Profile',
  Name: 'NAME',
  Desc: 'DESCRIPTION',
  Industry: 'INDUSTRY',
  Size: 'SIZE',
  CoreProducts: 'CORE PRODUCTOS / BUSINESS LINES',
};

export interface IProfileLeftPanelProps {
  profile: IClientProfileInfo;
}

export default function ProfileLeftPanel({ profile: profileData }: IProfileLeftPanelProps ) {

  const history = useHistory();

  const editProfile = () => {
    history.push('/profile')
  };

  const getLabel = (text: string) => (
    <Text cx={css.profileLabel} fontSize='16' fontWeight='700' lineHeight='18' >
      {text}
    </Text>
  );
  const getText = (text: string) => (
    <Text fontSize='16' fontWeight='400' lineHeight='24' >
      {text}
    </Text>
  );

  return (<>
    {profileData &&
      <FlexCell cx={css.leftSideProfile} minWidth={360}>
        <Panel background='surface-main' cx={css.panelProfile} shadow>
          <aside className={css.root}>
            <Panel cx={css.formPanel} >
              <FlexRow cx={css.buttonPanel}>
                <RichTextView>
                  <h2 className={css.profileTitle}> {LABELS.Title}</h2>
                </RichTextView>
                <FlexSpacer />
                <Button caption='Edit' icon={EditIcon} fill='outline' color='secondary' onClick={editProfile} />
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
