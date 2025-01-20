import { useState } from 'react';

import { FlexRow, TabButton } from '@epam/uui';

import { FrameworkTab } from '../../../typings/enums/framework-tab.enum';

export interface TabsProps {
  initialTab: FrameworkTab;
  onTabChange: (tab: FrameworkTab) => void;
}

export default function Tabs({ initialTab, onTabChange }: TabsProps) {
  const [currentTab, onValueChange] = useState(initialTab);

  const onChange = (tab: FrameworkTab) => {
    onValueChange(tab);
    onTabChange(tab);
  };

  return (
    <FlexRow>
      <TabButton caption={FrameworkTab.EndToEnd} isLinkActive={currentTab === FrameworkTab.EndToEnd} onClick={() => onChange(FrameworkTab.EndToEnd)} size='36' />
      <TabButton caption={FrameworkTab.Discover} isLinkActive={currentTab === FrameworkTab.Discover} onClick={() => onChange(FrameworkTab.Discover)} size='36' />
      <TabButton caption={FrameworkTab.Define} isLinkActive={currentTab === FrameworkTab.Define} onClick={() => onChange(FrameworkTab.Define)} size='36' />
      <TabButton caption={FrameworkTab.Design} isLinkActive={currentTab === FrameworkTab.Design} onClick={() => onChange(FrameworkTab.Design)} size='36' />
      <TabButton caption={FrameworkTab.Develop} isLinkActive={currentTab === FrameworkTab.Develop} onClick={() => onChange(FrameworkTab.Develop)} size='36' />
      <TabButton caption={FrameworkTab.Deliver} isLinkActive={currentTab === FrameworkTab.Deliver} onClick={() => onChange(FrameworkTab.Deliver)} size='36' />
    </FlexRow>
  );
}