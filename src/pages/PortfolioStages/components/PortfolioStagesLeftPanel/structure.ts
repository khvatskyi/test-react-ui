import { Icon } from '@epam/uui-core';
import { ReactComponent as FillInfoIcon } from '@epam/assets/icons/notification-info-fill.svg';
import { ReactComponent as SuccessIcon } from  '../../../../assets/icons/success.svg'
import { ReactComponent as LockIcon } from  '@epam/assets/icons/action-lock-fill.svg'


export const STATE_CODES = {
    AboutPortfolio: 'about-portfolio',
    Discover: 'discover',
    APIProductJourneys: 'api-product-journeys',
    BusinessModels: 'business-models',
    Capabilities: 'capabilities',
    ConsumersAndNeeds: 'consumers-and-needs',
    GoalsKPIs: 'goals-kpis',
    PortfolioAlignment: 'portfolio-alignment',
    Roadmap: 'roadmap',
    ValueProposition: 'value-proposition',
    Define: 'define',
    DefineItem: 'define-item',
    Design: 'design',
    DesignItem: 'design-item',
    Develop: 'develop',
    DevelopItem: 'develop-item',
    Deliver: 'deliver',
    DeliverItem: 'deliver-item',
  };
  
export interface PortfolioStateItem {
    id: string;
    name: string;
    parentId?: string;
    component?: any;
    icon?: Icon;
    iconPosition?: 'left' | 'right';
    isLocked?: boolean;
}

export function getStateTitle(id: string): string | undefined {
  const state = portfolioStates.find(state => state.id === id);
  return state ? state.name : undefined;
}
  
export const portfolioStates: PortfolioStateItem[] = [
    { id: STATE_CODES.AboutPortfolio, name: 'About Portfolio', icon: FillInfoIcon },
    { id: STATE_CODES.Discover, name: 'Discover'},
    { id: STATE_CODES.ValueProposition, name: 'Value Proposition', parentId: 'discover' },
    { id: STATE_CODES.ConsumersAndNeeds, name: 'Consumers & Needs', parentId: 'discover', icon: SuccessIcon},
    { id: STATE_CODES.APIProductJourneys, name: 'API Product Journeys', parentId: 'discover'},
    { id: STATE_CODES.BusinessModels, name: 'Business Models', parentId: 'discover'},
    { id: STATE_CODES.Capabilities, name: 'Capabilities', parentId: 'discover'},
    { id: STATE_CODES.GoalsKPIs, name: 'Goals & KPIs', parentId: 'discover'},
    { id: STATE_CODES.PortfolioAlignment, name: 'Portfolio Alignment', parentId: 'discover' },
    { id: STATE_CODES.Roadmap, name: 'Roadmap', parentId: 'discover' },
    { id: STATE_CODES.Define, name: 'Define', icon: LockIcon, isLocked: true},
    { id: STATE_CODES.DefineItem, name: 'Item', parentId: 'define'},
    { id: STATE_CODES.Design, name: 'Design', icon: LockIcon, isLocked: true},
    { id: STATE_CODES.DesignItem, name: 'Item', parentId: 'design'},
    { id: STATE_CODES.Develop, name: 'Develop', icon: LockIcon, isLocked: true},
    { id: STATE_CODES.DevelopItem, name: 'Item', parentId: 'develop'},
    { id: STATE_CODES.Deliver, name: 'Deliver', icon: LockIcon, isLocked: true},
    { id: STATE_CODES.DeliverItem, name: 'Item', parentId: 'deliver'},
  ];
  