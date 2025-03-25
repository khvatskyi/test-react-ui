export interface IGoal {
  goalId: string; 
  description: string;
}

export interface IObjective {
  objectiveId: string;
  description: string;
  relatedGoalId: string;
  timeFrame: string;
}

export interface IKPI {
  kpiId?: string;
  name?: string;
  description?: string;
  targetValue?: number;
  measurementMethod?: string;
  frequency?: string;
  relatedObjectiveId?: string;
}

export interface IKpiTableItem extends IKPI {
  id: number;
  isStored?: boolean;
  isDeleted?: boolean;
}

export interface IGoalsAndKPIs {
  apiProductName: string;
  goals: IGoal[];
  objectives: IObjective[];
  kpis: IKPI[];
}


export interface IGoalAddRequest{
  portfolioId: string;
  description: string;
}

export interface IGoalEditRequest{
  portfolioId: string;
  goalId: string;
  description: string;
}

export interface IGoalDeleteRequest{
  portfolio_id: string;
  goal_id: string;
}

export interface IGoalDeleteResponce{
  goalId: string;
}

export interface IObjectiveAddRequest{
  portfolioId: string;
  relatedGoalId: string;
  description: string;
}

export interface IObjectiveEditRequest{
  portfolioId: string;
  objectiveId: string;
  relatedGoalId: string;
  description: string;
}

export interface IObjectiveDeleteRequest{
  portfolio_id: string;
  objective_id: string;
}

export interface IObjectiveDeleteResponce{
  objectiveId: string;
}

export interface IKpisUpdateRequest{
  portfolioId: string;
  KPIs: IKpiTableItem[];
}

