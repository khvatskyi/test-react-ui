import { IPortfolio } from '../typings/models/portfolio.models';
import { IPortfolioDetails } from '../typings/models/portfolio.models';
import { fetchWithAuth } from '../utilities/fetch-with-auth.utility';

const MOCK_DATA: IPortfolio[] = [
  { id: '1', name: 'Pesho' },
  { id: '2', name: 'Gosho' },
  { id: '3', name: 'Stamat' },
  { id: '4', name: 'Test' }
];

export async function getPortfolios(): Promise<IPortfolio[]> {

  // MOCK data
  // return Promise.resolve(MOCK_DATA);

  const path = process.env.REACT_APP_API_ROOT + '/user/portfolios';
  const response = await fetchWithAuth(path, {
    method: 'GET', 
  });

  const result: IPortfolio[] = await response.json();
  return result;
}

export async function getPortfolio(id: string): Promise<IPortfolioDetails> {

  // MOCK data
  // return Promise.resolve<IPortfolioDetails>({
  //   ...MOCK_DATA.find(x => x.id === id),
  //   description: 'test',
  //   industry: 'Insurance',
  //   goalsOrObjectives: 'test',
  //   businessCapabilities: 'test',
  //   industryStandards: 'test',
  //   keyPartners: 'test',
  //   keySuppliers: 'test'
  // });

  const path = process.env.REACT_APP_API_ROOT + `/user/portfolio/${id}`;
  const response = await fetchWithAuth(path, {
    method: 'GET', 
  });

  const result: IPortfolioDetails = await response.json();
  return result;
}

export async function savePortfolio(portfolio: IPortfolioDetails): Promise<IPortfolioDetails> {

  // MOCK
  // let result = structuredClone(portfolio);

  // if (result.id) {
  //   const element = MOCK_DATA.find(x => x.id === portfolio.id)!;
  //   element.name = portfolio.name;
  // } else {
  //   result.id = crypto.randomUUID();
  //   MOCK_DATA.push({ id: result.id, name: portfolio.name });
  // }

  // return Promise.resolve(result);
  //END of MOCK

  const path = process.env.REACT_APP_API_ROOT + '/user/portfolio';
  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(portfolio),
  });

  const result: IPortfolioDetails = await response.json();
  return result;
}

export async function deletePortfolio(id: string): Promise<void> {

  const path = process.env.REACT_APP_API_ROOT + `/user/portfolio/${id}`;

  const response = await fetchWithAuth(path, { 
    method: 'DELETE'
  });
  
  return response.json();
}
