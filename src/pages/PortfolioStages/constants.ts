import { IApiContext } from "../../typings/models/module.models";
import { STATE_CODES } from "./components/PortfolioStagesLeftPanel/structure";

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
  tipMessage: 'To get most out of AI capabilities when completing the modules, try to follow the order presented in the left navigation.'
}

// const DEFAULT_API_CONTEXT_DATA: IApiContext = { name: '', description: '' } as const;
// for test 
const VALUE_PROPOSITION_DEFAULT_API_CONTEXT_DATA: IApiContext = {
  portfolioId: null,
  name: '', // 'Business insurance quote enablement',
  description: '', // "The API Product will enable insurance brokers and agents request a quote from the insurance carrier 'Travelers Insurance' directly from their Agency/Broker Management System.",
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
  tipMessage: 'To get most out of AI capabilities when completing the modules, try to follow the order presented in the left navigation.'
};

const CONSUMERS_AND_NEEDS_DEFAULT_API_CONTEXT_DATA: IApiContext = {  
  portfolioId: null,
  name: '',
  description: '',
} as const;

// -------------------------------------------------------
const API_PRODUCT_JOURNEYS_MODULE_TAGS = [
  'Actions',
  'Steps',
  'API call details',
  'Outcomes',
];

const API_PRODUCT_JOURNEYS_LABELS = {
  moduleTitle: 'Module objective',
  moduleDescription: 'Providing a structured narrative that describes the use and interaction with the API, API Product, or related features, highlighting user interactions and usability.',
  apiTitle: 'Scenario details',
  tipMessage: 'To get most out of AI capabilities when completing the modules, try to follow the order presented in the left navigation.'
};

const API_PRODUCT_JOURNEYS_DEFAULT_API_CONTEXT_DATA: IApiContext = {  
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
    id: STATE_CODES.APIProductJourneys,
    MODULE_TAGS: API_PRODUCT_JOURNEYS_MODULE_TAGS,
    LABELS: API_PRODUCT_JOURNEYS_LABELS,
    DEFAULT_API_CONTEXT_DATA: API_PRODUCT_JOURNEYS_DEFAULT_API_CONTEXT_DATA
  } as const,
] as const;