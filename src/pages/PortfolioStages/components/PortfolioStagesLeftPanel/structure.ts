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

export interface PortfolioStateItem {
    id: string;
    name: string;
    parentId?: string;
    component?: any;
    icon?: Icon;
    iconPosition?: 'left' | 'right';
    isLocked?: boolean;
}
  
export const items: PortfolioStateItem[] = [
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
    { id: 'define', name: 'Define', icon: LockIcon, isLocked: true},
    { id: 'define-item', name: 'Item', parentId: 'define'},
    { id: 'design', name: 'Design', icon: LockIcon, isLocked: true},
    { id: 'design-item', name: 'Item', parentId: 'design'},
    { id: 'develop', name: 'Develop', icon: LockIcon, isLocked: true},
    { id: 'develop-item', name: 'Item', parentId: 'develop'},
    { id: 'deliver', name: 'Deliver', icon: LockIcon, isLocked: true},
    { id: 'deliver-item', name: 'Item', parentId: 'deliver'},
  ];
  