// import {
//     ContextProviderDoc, ApiContextDoc, ModalContextDoc,
//     NotificationContextDoc, IconsDoc, DownloadsDoc, ProjectsDoc, ReleaseNotesDoc,
//     LockContextDoc, InternationalizationDoc, TeamDoc, AnalyticsContextDoc, DragAndDropDoc,
//     EmptyStatesDoc, LayoutsDoc, LoadersDoc, ValidationDoc, VisualExamplesDoc, GettingStartedDoc, UtGuideBasicsDoc, UtGuideToolsDoc,
//     UtGuideCookbookDoc, DataSourcesGettingStartedDoc, DataSourcesRowOptionsDoc, DataSourcesBaseDataSourcePropsDoc,
//     DataSourcesDataSourceStateDoc, DataSourcesArrayDataSourceDoc, DataSourcesAsyncDataSourceDoc,
//     DataSourcesLazyDataSourceDoc, DataSourcesUsageDoc, OverviewDoc,
//     ThemingOverview, Tokens, AccessibilityDoc, UtGuideGettingStartedDoc, LensesDoc,
// } from '../docs';
// import { CoreConceptsDoc } from '../docs/CoreConcepts';
// import { componentsStructure } from './structureComponents';
import { Icon } from '@epam/uui-core';
import { ReactComponent as FillInfoIcon } from '@epam/assets/icons/notification-info-fill.svg';
import { ReactComponent as SuccessIcon } from  '../../../../assets/icons/success.svg'
import { ReactComponent as LockIcon } from  '@epam/assets/icons/action-lock-fill.svg'



// export interface DocItem {
//     id: string;
//     parentId?: string;
//     name: string;
//     icon?: Icon;
//     isLocked?: boolean;
//     component?: any;
//   }

export interface DocItem {
    id: string;
    name: string;
    component?: any;
    icon?: Icon;
    iconPosition?: 'left' | 'right';
    parentId?: string;
    order?: number;
    isLocked?: boolean;
    tags?: string[];
}
  
export const items: DocItem[] = [
    { id: 'about', name: 'About Portfolio', icon: FillInfoIcon },
    { id: 'discover', name: 'Discover'},
    { id: 'journeys', name: 'API Product Journeys', parentId: 'discover'},
    { id: 'models', name: 'Business Models', parentId: 'discover'},
    { id: 'capabilities', name: 'Capabilities', parentId: 'discover'},
    { id: 'consumers', name: 'Consumers', parentId: 'discover'},
    { id: 'needs', name: 'Consumer Needs', parentId: 'discover', icon: SuccessIcon},
    { id: 'goals', name: 'Goals & KPIs', parentId: 'discover'},
    { id: 'aignment', name: 'Portfolio Alignment', parentId: 'discover' },
    { id: 'roadmap', name: 'Roadmap', parentId: 'discover' },
    { id: 'proposition', name: 'Value Proposition', parentId: 'discover' },
    { id: 'define', name: 'Define', icon: LockIcon, iconPosition: 'right' },
    { id: 'design', name: 'Design', icon: LockIcon, iconPosition: 'right' },
    { id: 'develop', name: 'Develop', icon: LockIcon, iconPosition: 'right' },
    { id: 'deliver', name: 'Deliver', icon: LockIcon, iconPosition: 'right' },
  ];
  