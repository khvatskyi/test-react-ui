import { IProductJourney } from "./product-journey.model";

export interface IProductProposalRequest {
  portfolioId: string;
}

export interface IGetProductProposalRequest {
  portfolio_id: string;
}


// Summary Structure
export interface IProductProposal {
  productOverview: IProductOverview;
  valueProposition: IValueProposition;
  targetConsumers: ITargetConsumer[];
  productJourney: IProductJourney;
  businessModel: IBusinessModel;
  capabilities: ICapability[];
  goalsAndKPIs: IGoalsAndKPIs;
}

// Product Overview
export interface IProductOverview {
  apiProductName: string;
  briefDescription: string;
  businessJustification: string;
}

// Value Proposition
export interface IValueProposition {
  apiProductName: string;
  productDescription: string;
  targetConsumers: string[];
  consumerNeeds: string;
  uniqueSolution: string;
  primaryBenefits: string;
  competitiveEdge: string;
  successMetrics: string;
}

// Target Consumer
export interface ITargetConsumer {
  segmentName: string;
  segmentDescription: string;
  industrySector: string;
  organizationSize: string;
  geographicalLocation: string;
  technicalMaturity: string;
  primaryUseCase: string;
  businessModel?: string;
  integrationPatterns?: string[];
  frequencyAndVolume?: string;
  dataSensitivity?: string;
  primaryPainPointsOrGoals: string[];
  securityRequirements?: string[];
}


// Business Model
export interface IBusinessModel {
  customer_segments: string[];
  value_propositions: string[];
  channels: string[];
  customer_relationships: string[];
  value_creation_model: string;
  key_activities: string[];
  key_resources: string[];
  key_partnerships: string[];
  cost_structure: string[];
}

// Capability
export interface ICapability {
  name: string;
  description: string;
  category?: string;
  owner: IOwner;
  domain: string;
  subdomain?: string;
  capabilityLevel: string;
  lifecycleStage: string;
  businessValue?: string;
  industryStandardAlignment: IIndustryStandardAlignment;
  keyProcesses?: IKeyProcess[];
  relatedAPIs?: IRelatedAPI[];
  dependencies?: IDependency[];
  performanceMetrics?: IPerformanceMetric[];
  governance?: IGovernance;
}

// Owner
export interface IOwner {
  name: string;
  email?: string;
}

// Industry Standard Alignment
export interface IIndustryStandardAlignment {
  isAligned: boolean;
  standard?: string;
}

// Key Process
export interface IKeyProcess {
  name: string;
  description?: string;
}

// Related API
export interface IRelatedAPI {
  name: string;
  description?: string;
}

// Dependency
export interface IDependency {
  name: string;
}

// Performance Metric
export interface IPerformanceMetric {
  name: string;
  description?: string;
  targetValue?: string;
  actualValue?: string;
}

// Governance
export interface IGovernance {
  complianceStandards?: string[];
}

// Goals and KPIs
export interface IGoalsAndKPIs {
  apiProductName: string;
  goals: IGoal[];
  objectives: IObjective[];
  kpis: IKPI[];
}

// Goal
export interface IGoal {
  goalId: string;
  description: string;
}

// Objective
export interface IObjective {
  objectiveId: string;
  description: string;
  relatedGoalId: string;
  timeFrame: string;
}

// KPI
export interface IKPI {
  kpiId: string;
  name: string;
  description: string;
  targetValue: number;
  measurementMethod: string;
  frequency: string;
  relatedObjectiveId: string;
}