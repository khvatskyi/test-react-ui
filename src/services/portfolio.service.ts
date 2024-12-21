import { IPortfolio } from '../models/portfolio.model';
import { IPortfolioDetails } from '../pages/portfolioDetails/portfolioDetails.models';

//const MOCK_DATA: IPortfolio[] = [
//  { id: '1', name: 'Pesho' },
//  { id: '2', name: 'Gosho' },
//  { id: '3', name: 'Stamat' },
//  { id: '4', name: 'Test' }
//]

export function getPortfolios(): Promise<IPortfolio[]> {

  // MOCK data
//  return Promise.resolve(MOCK_DATA);

  const path = process.env.REACT_APP_API_ROOT + '/user/portfolios';
  const response = fetch(path, {method: 'GET', credentials: 'include'});

  return response.then(x => x.json() as Promise<IPortfolio[]>);
}

export function getPortfolio(id: string): Promise<IPortfolioDetails> {

  // MOCK data
//  return Promise.resolve({
//    ...MOCK_DATA.find(x => x.id === id),
//    description: 'test',
//    industry: 'Insurance',
//    goalsOrObjectives: 'test',
//    businessCapabilities: 'test',
//    industryStandards: 'test',
//    keyPartners: 'test',
//    keySuppliers: 'test'
//  } as IPortfolioDetails)

  const path = process.env.REACT_APP_API_ROOT + `/user/portfolio/${id}`;
  const response = fetch(path, {method: 'GET', credentials: 'include'});

  return response.then(x => x.json() as Promise<IPortfolioDetails>);
}

export function savePortfolio(portfolio: IPortfolioDetails): Promise<IPortfolioDetails> {

  // MOCK
//  let result = structuredClone(portfolio);
//
//  if (result.id) {
//    const element = MOCK_DATA.find(x => x.id === portfolio.id)!;
//    element.name = portfolio.name;
//  } else {
//    result.id = crypto.randomUUID();
//    MOCK_DATA.push({ id: result.id, name: portfolio.name });
//  }
//
//  return Promise.resolve(result);
  //END of MOCK

  const path = process.env.REACT_APP_API_ROOT + '/user/portfolio';
  const response = fetch(path, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(portfolio),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.then(x => x.json() as Promise<IPortfolioDetails>);
}

export function deletePortfolio(id: string): Promise<void> {

  const path = process.env.REACT_APP_API_ROOT + `/user/portfolio/${id}`;

  return fetch(path, { method: 'DELETE' }).then(x => x.json());
}
