import { Icon } from '@epam/uui-core';
import { ReactComponent as FillInfoIcon } from '@epam/assets/icons/notification-info-fill.svg';
// import { ReactComponent as SuccessIcon } from  '../../../../assets/icons/success.svg'
import { ReactComponent as LockIcon } from '@epam/assets/icons/action-lock-fill.svg'
import { TreeListItem } from '@epam/uui-components';

export enum STATE_CODES {
  AboutPortfolio = 'about-portfolio',
  Discover = 'discover',
  APIProductJourneys = 'api-product-journeys',
  BusinessModels = 'business-models',
  Capabilities = 'capabilities',
  ConsumersAndNeeds = 'consumers-and-needs',
  GoalsKPIs = 'goals-kpis',
  PortfolioAlignment = 'portfolio-alignment',
  Roadmap = 'roadmap',
  ValueProposition = 'value-proposition',
  Define = 'define',
  DefineItem = 'define-item',
  Design = 'design',
  DesignItem = 'design-item',
  Develop = 'develop',
  DevelopItem = 'develop-item',
  Deliver = 'deliver',
  DeliverItem = 'deliver-item',
};

export interface PortfolioStateItem extends TreeListItem {
  component?: any;
  icon?: Icon;
  iconPosition?: 'left' | 'right';
  isLocked?: boolean;
  completed?: boolean;
}

export function getStateTitle(id: string): string | undefined {
  const state = portfolioStates.find(state => state.id === id);
  return state ? state.name : undefined;
}

export const portfolioStates: PortfolioStateItem[] = [
  { id: STATE_CODES.AboutPortfolio, name: 'About Portfolio', icon: FillInfoIcon },
  { id: STATE_CODES.Discover, name: 'Discover' },
  { id: STATE_CODES.ValueProposition, name: 'Value Proposition', parentId: STATE_CODES.Discover, iconPosition: 'left' },
  { id: STATE_CODES.ConsumersAndNeeds, name: 'Consumers & Needs', parentId: STATE_CODES.Discover, iconPosition: 'left' }, //, icon: SuccessIcon
  { id: STATE_CODES.APIProductJourneys, name: 'API Product Journeys', parentId: STATE_CODES.Discover, iconPosition: 'left' },
  { id: STATE_CODES.BusinessModels, name: 'Business Models', parentId: STATE_CODES.Discover, iconPosition: 'left' },
  { id: STATE_CODES.Capabilities, name: 'Capabilities', parentId: STATE_CODES.Discover, iconPosition: 'left' },
  { id: STATE_CODES.GoalsKPIs, name: 'Goals & KPIs', parentId: STATE_CODES.Discover, iconPosition: 'left' },
  { id: STATE_CODES.PortfolioAlignment, name: 'Portfolio Alignment', parentId: STATE_CODES.Discover, iconPosition: 'left' },
  { id: STATE_CODES.Roadmap, name: 'Roadmap', parentId: STATE_CODES.Discover, iconPosition: 'left' },
  { id: STATE_CODES.Define, name: 'Define', icon: LockIcon, isLocked: true },
  { id: STATE_CODES.DefineItem, name: 'Item', parentId: STATE_CODES.Define },
  { id: STATE_CODES.Design, name: 'Design', icon: LockIcon, isLocked: true },
  { id: STATE_CODES.DesignItem, name: 'Item', parentId: STATE_CODES.Design },
  { id: STATE_CODES.Develop, name: 'Develop', icon: LockIcon, isLocked: true },
  { id: STATE_CODES.DevelopItem, name: 'Item', parentId: STATE_CODES.Develop },
  { id: STATE_CODES.Deliver, name: 'Deliver', icon: LockIcon, isLocked: true },
  { id: STATE_CODES.DeliverItem, name: 'Item', parentId: STATE_CODES.Deliver },
];


export function normalizeSummaryKeys(data: any) {

    const newData: any = {};

    Object.keys(data).forEach(key => {
        const readableKey = key.replace(/([A-Z])/g, ' $1').trim();
        const capitalizedKey = readableKey.charAt(0).toUpperCase() + readableKey.slice(1);
        newData[capitalizedKey] = data[key];
    });

    return newData;
}
