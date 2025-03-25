import { IApiContext } from "../../typings/models/module.models";
import { STATE_CODES } from "./components/PortfolioStagesLeftPanel/structure";

// -------------------------------------------------------

const CAPABILITIES_MODULE_TAGS = [
  'Lifecycle stage',
  'Key processes',
  'Related APIs',
  'Dependencies',
  'Data entities',
  'Performance metrics',
  'Governance',
];

const CAPABILITIES_LABELS = {
  moduleTitle: 'Module objective',
  moduleDescription: 'Outlining the technical and business capabilities that the API provides, mapping them to consumer needs and business objectives.',
  apiTitle: 'Capability details',
  tipMessage: 'To get most out of AI capabilities when completing the modules, try to follow the order presented in the left navigation.',
  runButtonCaption: "Start chat",
};

const CAPABILITIES_DEFAULT_API_CONTEXT_DATA: IApiContext = {  
  portfolioId: null,
  name: '',
  description: '',
} as const;

// -------------------------------------------------------
const VALUE_PROPOSITION_MODULE_TAGS = [
  'Target consumers',
  'Unique solution',
  'Primary benefits',
  'Competitive edge',
  'Success metrics',
]

const VALUE_PROPOSITION_LABELS = {
  moduleTitle: 'Module objective',
  moduleDescription: 'Defining the unique value the API provides to its users, distinguishing it from competitors and outlining its benefits.',
  apiTitle: 'API context',
  tipMessage: 'To get most out of AI capabilities when completing the modules, try to follow the order presented in the left navigation.',
  runButtonCaption: "Start chat",
}

const VALUE_PROPOSITION_DEFAULT_API_CONTEXT_DATA: IApiContext = {
  portfolioId: null,
  name: '',
  description: '',
} as const;

// -------------------------------------------------------
const CONSUMERS_AND_NEEDS_MODULE_TAGS = [
  'Consumer segmentation',
  'Industry focus',
  'Technical requirements',
  'API integration',
  'Data compliance',
];

const CONSUMERS_AND_NEEDS_LABELS = {
  moduleTitle: 'Module objective',
  moduleDescription: 'Defining the target consumers for the API, identifying their needs and how they will interact with the API.',
  apiTitle: 'API context',
  tipMessage: 'To get most out of AI capabilities when completing the modules, try to follow the order presented in the left navigation.',
  runButtonCaption: "Start chat",
};

const CONSUMERS_AND_NEEDS_DEFAULT_API_CONTEXT_DATA: IApiContext = {  
  portfolioId: null,
  name: '',
  description: '',
} as const;

// -------------------------------------------------------
const API_PRODUCT_JOURNEY_MODULE_TAGS = [
  'Actions',
  'Steps',
  'API call details',
  'Outcomes',
];

const API_PRODUCT_JOURNEY_LABELS = {
  moduleTitle: 'Module objective',
  moduleDescription: 'Providing a structured narrative that describes the use and interaction with the API, API Product, or related features, highlighting user interactions and usability.',
  apiTitle: 'Scenario details',
  tipMessage: 'To get most out of AI capabilities when completing the modules, try to follow the order presented in the left navigation.',
  runButtonCaption: "Create API product journey",
};

const API_PRODUCT_JOURNEY_DEFAULT_API_CONTEXT_DATA: IApiContext = {  
  portfolioId: null,
  name: '',
  description: '',
} as const;

// -------------------------------------------------------

const BUSINESS_MODEL_MODULE_TAGS = [
  'Value creation model',
  'Customer segments',
  'Channels',
  'Customer relationships',
  'Value proprosition',
  'Key resources',
  'Key partnerships',
];

const BUSINESS_MODEL_LABELS = {
  moduleTitle: 'Module objective',
  moduleDescription: 'Detailing the business model underpinning the API, including monetization strategies and market positioning.',
  apiTitle: 'Business model',
  tipMessage: 'To get most out of AI capabilities when completing the modules, try to follow the order presented in the left navigation.',
  runButtonCaption: "Create business model",
};

const BUSINESS_MODEL_DEFAULT_API_CONTEXT_DATA: IApiContext = {  
  portfolioId: null,
  name: '',
  description: '',
} as const;

// -------------------------------------------------------

const GOALS_KPIS_MODULE_TAGS = [
  'Goals',
  'Objectives',
  'KPIs',
  'Timeframes',
  'Measurement methods',
]

const GOALS_KPIS_LABELS = {
  moduleTitle: 'Module objective',
  moduleDescription: 'Setting specific goals and key performance indicators (KPIs) for the API to measure success and drive performance.',
  apiTitle: 'API context',
  tipMessage: 'To get most out of AI capabilities when completing the modules, try to follow the order presented in the left navigation.',
  runButtonCaption: 'Define Goals & KPIs',
}

const GOALS_KPIS_DEFAULT_API_CONTEXT_DATA: IApiContext = {
  portfolioId: null,
  name: '',
  description: '',
} as const;

// -------------------------------------------------------

export const FORM_DEFAULT_DATA = [
  {
    id: STATE_CODES.ValueProposition,
    MODULE_TAGS: VALUE_PROPOSITION_MODULE_TAGS,
    LABELS: VALUE_PROPOSITION_LABELS,
    DEFAULT_API_CONTEXT_DATA: VALUE_PROPOSITION_DEFAULT_API_CONTEXT_DATA
  } as const,
  {
    id: STATE_CODES.ConsumersAndNeeds,
    MODULE_TAGS: CONSUMERS_AND_NEEDS_MODULE_TAGS,
    LABELS: CONSUMERS_AND_NEEDS_LABELS,
    DEFAULT_API_CONTEXT_DATA: CONSUMERS_AND_NEEDS_DEFAULT_API_CONTEXT_DATA
  } as const,
  {
    id: STATE_CODES.APIProductJourney,
    MODULE_TAGS: API_PRODUCT_JOURNEY_MODULE_TAGS,
    LABELS: API_PRODUCT_JOURNEY_LABELS,
    DEFAULT_API_CONTEXT_DATA: API_PRODUCT_JOURNEY_DEFAULT_API_CONTEXT_DATA
  } as const,
  {
    id: STATE_CODES.BusinessModel,
    MODULE_TAGS: BUSINESS_MODEL_MODULE_TAGS,
    LABELS: BUSINESS_MODEL_LABELS,
    DEFAULT_API_CONTEXT_DATA: BUSINESS_MODEL_DEFAULT_API_CONTEXT_DATA
  } as const,
  {
    id: STATE_CODES.Capabilities,
    MODULE_TAGS: CAPABILITIES_MODULE_TAGS,
    LABELS: CAPABILITIES_LABELS,
    DEFAULT_API_CONTEXT_DATA: CAPABILITIES_DEFAULT_API_CONTEXT_DATA
  } as const,
  {
    id: STATE_CODES.GoalsAndKPIs,
    MODULE_TAGS: GOALS_KPIS_MODULE_TAGS,
    LABELS: GOALS_KPIS_LABELS,
    DEFAULT_API_CONTEXT_DATA: GOALS_KPIS_DEFAULT_API_CONTEXT_DATA
  } as const,
] as const;