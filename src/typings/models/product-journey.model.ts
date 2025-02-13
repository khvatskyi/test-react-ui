export interface IGetScenarioDetailsRequest {
  portfolio_id: string;
}

export interface IScenarioDetails {
  portfolioId: string;
  name?: string;
  description?: string;
  context?: string;
}

export interface IPersona {
  id: string;
  name: string;
  role: string;
  description: string;
}

export interface IAction {
  actionId: string;
  name: string;
  description: string;
  apiCall?: IApiCall;
  expectedResult: string;
}

export interface IApiCall {
  endpoint: string;
  method: string;
  payload: Record<string, any>;
}

export interface IStep {
  stepNumber: number;
  title: string;
  description: string;
  actions: IAction[];
}

export interface IScenario {
  id: string;
  title: string;
  description: string;
  context: string;
}

export interface IProductJourney {
  personas: IPersona[];
  scenario: IScenario;
  steps: IStep[];
}

export interface IUpdateApiProductJourneyStep {
  portfolioId: string;
  stepNumber: number;
  fieldName: string;
  value: string;
}

export interface IUpdateApiProductJourneyAction {
  portfolioId: string;
  actionId: string;
  fieldName: string;
  value: string;
}
