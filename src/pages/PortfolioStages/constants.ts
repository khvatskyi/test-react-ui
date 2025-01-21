import { IStartChatInfo } from "../../typings/models/module.models";
import { STATE_CODES } from "./components/PortfolioStagesLeftPanel/structure";

const VALUE_PROPOSITION_MODULE_TAGS = [
  'Target consumers',
  'Unique solution',
  'Primary benefits',
  'Competitive edge',
  'Success metrics',
]

const VALUE_PROPOSITION_LABELS = {
  moduleTitle: 'Module objective',
  moduleDescription: 'The purpose of the of the Value Proposition module is to clearly articulate the unique benefits and advantages that the API offers to developers and businesses, demonstrating how it can solve specific problems, streamline processes, or enhance existing systems, ultimately driving adoption and usage.',
  apiTitle: 'API context',
  tipMessage: 'To get most out of AI capabilities when completing the modules, try to follow the order presented in the left navigation.'
}

// const DEFAULT_API_CONTEXT_DATA: IStartChatInfo = { name: '', description: '' } as const;
// for test 
const VALUE_PROPOSITION_DEFAULT_API_CONTEXT_DATA: IStartChatInfo = {
  name: 'Business insurance quote enablement',
  description: "The API Product will enable insurance brokers and agents request a quote from the insurance carrier 'Travelers Insurance' directly from their Agency/Broker Management System.",
} as const;

const API_PRODUCT_JOURNEYS_MODULE_TAGS = [
  'User journey',
  'Journey activities',
  'Personas'
];

const API_PRODUCT_JOURNEYS_LABELS = {
  moduleTitle: 'Module objective',
  moduleDescription: 'Outline the lifecycle and interactions a user or developer has with an API, from discovery and initial testing to integration and long-term usage, ensuring a smooth and effective experience that meets their needs and encourages continued engagement.',
  apiTitle: 'API context',
  tipMessage: 'To get most out of AI capabilities when completing the modules, try to follow the order presented in the left navigation.'
};

const API_PRODUCT_JOURNEYS_DEFAULT_API_CONTEXT_DATA: IStartChatInfo = {
  name: '',
  description: '',
} as const;

export const FORM_DEFAULT_DATA = [
  {
    id: STATE_CODES.ValueProposition,
    MODULE_TAGS: VALUE_PROPOSITION_MODULE_TAGS,
    LABELS: VALUE_PROPOSITION_LABELS,
    DEFAULT_API_CONTEXT_DATA: VALUE_PROPOSITION_DEFAULT_API_CONTEXT_DATA
  } as const,
  {
    id: STATE_CODES.APIProductJourneys,
    MODULE_TAGS: API_PRODUCT_JOURNEYS_MODULE_TAGS,
    LABELS: API_PRODUCT_JOURNEYS_LABELS,
    DEFAULT_API_CONTEXT_DATA: API_PRODUCT_JOURNEYS_DEFAULT_API_CONTEXT_DATA
  } as const
] as const;