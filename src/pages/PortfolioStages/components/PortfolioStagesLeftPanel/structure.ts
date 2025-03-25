import { Icon } from '@epam/uui-core';
import { ReactComponent as FillInfoIcon } from '@epam/assets/icons/notification-info-fill.svg';
import { ReactComponent as LockIcon } from '@epam/assets/icons/action-lock-fill.svg'
import { TreeListItem } from '@epam/uui-components';

export enum STATE_CODES {
  AboutPortfolio = 'about-portfolio',
  
  Discover = 'discover',
  Capabilities = 'capabilities',
  ValueProposition = 'value-proposition',
  ConsumersAndNeeds = 'consumers-and-needs',
  APIProductJourney = 'api-product-journey',
  BusinessModel = 'business-model',
  GoalsAndKPIs = 'goals-and-kpis',
  APIProductProposal = 'api-product-proposal',

  PortfolioAlignment = 'portfolio-alignment',
  Roadmap = 'roadmap',

  Define = 'define',
  CapabilityAlignment = 'capability-alignment',
  ValueChain = 'value-chain',
  InteractionalUseCases = 'interactional-use-cases',
  RequirementsDefinition = 'requirements-definition',
  ResourceModel = 'resource-model',
  Interactions = 'interactions',
  JourneyPlan = 'journey-plan',
  SecurityAndAccess = 'security-and-access',

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
  //Discover
  { id: STATE_CODES.Discover, name: 'Discover' },
  { id: STATE_CODES.Capabilities, name: 'Capabilities', parentId: STATE_CODES.Discover, iconPosition: 'left' },
  { id: STATE_CODES.ValueProposition, name: 'Value Proposition', parentId: STATE_CODES.Discover, iconPosition: 'left' },
  { id: STATE_CODES.ConsumersAndNeeds, name: 'Consumers & Needs', parentId: STATE_CODES.Discover, iconPosition: 'left' }, //, icon: SuccessIcon
  { id: STATE_CODES.APIProductJourney, name: 'API Product Journey', parentId: STATE_CODES.Discover, iconPosition: 'left' },
  { id: STATE_CODES.BusinessModel, name: 'Business Model', parentId: STATE_CODES.Discover, iconPosition: 'left' },
  { id: STATE_CODES.GoalsAndKPIs, name: 'Goals & KPIs', parentId: STATE_CODES.Discover, iconPosition: 'left' },
  // { id: STATE_CODES.PortfolioAlignment, name: 'Portfolio Alignment', parentId: STATE_CODES.Discover, iconPosition: 'left' },
  // { id: STATE_CODES.Roadmap, name: 'Roadmap', parentId: STATE_CODES.Discover, iconPosition: 'left' },

  //Define
  // { id: STATE_CODES.Define, name: 'Define' },
  { id: STATE_CODES.Define, name: 'Define', icon: LockIcon, isLocked: true },

  { id: STATE_CODES.CapabilityAlignment, name: 'Capability Alignment', parentId: STATE_CODES.Define, iconPosition: 'left' },
  { id: STATE_CODES.ValueChain, name: 'Value Chain', parentId: STATE_CODES.Define, iconPosition: 'left' },
  { id: STATE_CODES.InteractionalUseCases, name: 'Interactional Use Cases', parentId: STATE_CODES.Define, iconPosition: 'left' },
  { id: STATE_CODES.RequirementsDefinition, name: 'Requirements Definition', parentId: STATE_CODES.Define, iconPosition: 'left' },
  { id: STATE_CODES.ResourceModel, name: 'Resource Model', parentId: STATE_CODES.Define, iconPosition: 'left' },
  { id: STATE_CODES.Interactions, name: 'Interactions', parentId: STATE_CODES.Define, iconPosition: 'left' },
  { id: STATE_CODES.JourneyPlan, name: 'Journey Plan', parentId: STATE_CODES.Define, iconPosition: 'left' },
  { id: STATE_CODES.SecurityAndAccess, name: 'Security & Access', parentId: STATE_CODES.Define, iconPosition: 'left' },

  //Design
  { id: STATE_CODES.Design, name: 'Design', icon: LockIcon, isLocked: true },
  { id: STATE_CODES.DesignItem, name: 'Item', parentId: STATE_CODES.Design },

  //Develop
  { id: STATE_CODES.Develop, name: 'Develop', icon: LockIcon, isLocked: true },
  { id: STATE_CODES.DevelopItem, name: 'Item', parentId: STATE_CODES.Develop },
  //Deliver
  { id: STATE_CODES.Deliver, name: 'Deliver', icon: LockIcon, isLocked: true },
  { id: STATE_CODES.DeliverItem, name: 'Item', parentId: STATE_CODES.Deliver },
];

export const multiTopicChats: STATE_CODES[] = [
  STATE_CODES.ConsumersAndNeeds,
];

export function normalizeSummaryKey(key: string): string {
  if (key === null) { 
    return ''; 
  }

  const readableKey = key.replace(/([A-Z])/g, ' $1').trim().replace(/_/g, " ");
  const capitalizedKey = readableKey.charAt(0).toUpperCase() + readableKey.slice(1);
  return capitalizedKey;
}

export function normalizeSummaryKeys(data: any): any {
  if (Array.isArray(data)) {
      return data.map(item => normalizeSummaryKeys(item));
  } else if (typeof data === 'object' && data !== null) {
      const newData: any = {};
      Object.keys(data).forEach(key => {
          newData[normalizeSummaryKey(key)] = normalizeSummaryKeys(data[key]);
      });
      return newData;
  } else {
      return data;
  }
}
