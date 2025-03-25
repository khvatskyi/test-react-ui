import { IPortfolioRequest } from '../typings/models/module.models';
import { fetchWithAuth } from "../utilities/fetch-with-auth.utility";
import { IGoal, IGoalAddRequest, IGoalDeleteRequest, IGoalDeleteResponce, IGoalEditRequest, IGoalsAndKPIs, IObjectiveAddRequest, IObjectiveDeleteRequest, IObjectiveDeleteResponce, IObjectiveEditRequest, IObjective, IKPI, IKpisUpdateRequest } from "../typings/models/goals-and-kpis.model"

export async function initGoalsAndKPIsRequest(request: IPortfolioRequest): Promise<IGoalsAndKPIs> {

  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/goals-and-kpis`;
  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  const result: IGoalsAndKPIs = await response.json();
  return result;
}


export async function getGoalsAndKPIsRequest(request: IPortfolioRequest): Promise<IGoalsAndKPIs> {

  const params = new URLSearchParams({ ...request }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/goals-and-kpis?` + params;
  const response = await fetchWithAuth(path, { method: 'GET' });

  const result = await response.json();
  return result; 
}


export async function insertGoalInGoalsAndKPIsRequest(request: IGoalAddRequest): Promise<IGoal> {

  const path = process.env.REACT_APP_API_ROOT + `/module/goals-and-kpis/goal`;
  const response = await fetchWithAuth(path, {
    method: 'PUT',
    body: JSON.stringify(request),
  });

  const result: IGoal = await response.json();
  return result;
}

export async function updateGoalInGoalsAndKPIsRequest(request: IGoalEditRequest): Promise<IGoal> {

  const path = process.env.REACT_APP_API_ROOT + `/module/goals-and-kpis/goal`;
  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  const result: IGoal = await response.json();
  return result;
}

export async function deleteGoalInGoalsAndKPIsRequest(request: IGoalDeleteRequest): Promise<IGoalDeleteResponce> {

  const params = new URLSearchParams({ ...request }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/module/goals-and-kpis/goal?` + params;
  const response = await fetchWithAuth(path, { method: 'DELETE' });

  const result: IGoalDeleteResponce = await response.json();
  return result;
}



export async function insertObjectiveInGoalsAndKPIsRequest(request: IObjectiveAddRequest): Promise<IObjective> {

  const path = process.env.REACT_APP_API_ROOT + `/module/goals-and-kpis/objective`;
  const response = await fetchWithAuth(path, {
    method: 'PUT',
    body: JSON.stringify(request),
  });

  const result: IObjective = await response.json();
  return result;
}

export async function updateObjectiveInGoalsAndKPIsRequest(request: IObjectiveEditRequest): Promise<IObjective> {

  const path = process.env.REACT_APP_API_ROOT + `/module/goals-and-kpis/objective`;
  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  const result: IObjective = await response.json();
  return result;
}

export async function deleteObjectiveInGoalsAndKPIsRequest(request: IObjectiveDeleteRequest): Promise<IObjectiveDeleteResponce> {

  const params = new URLSearchParams({ ...request }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/module/goals-and-kpis/objective?` + params;
  const response = await fetchWithAuth(path, { method: 'DELETE' });

  const result: IObjectiveDeleteResponce = await response.json();
  return result;
}


export async function updateKPIsInGoalsAndKPIsRequest(request: IKpisUpdateRequest): Promise<IKPI[]> {

  const path = process.env.REACT_APP_API_ROOT + `/module/goals-and-kpis/kpis`;
  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  const result: IKPI[] = await response.json();
  return result;
}


