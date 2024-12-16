import { IPortfolio } from '../models/portfolio.model';
import { IPortfolioDetails } from '../pages/portfolioDetails/portfolioDetails.models';

const BASE_PATH = process.env.REACT_APP_API_ROOT + '/api/portfolio';

export function getPortfolios(): Promise<IPortfolio[]> {

  const response = fetch(BASE_PATH, {
    method: 'GET'
  });

  return response.then(x => x.json() as Promise<IPortfolio[]>);
}

export function getPortfolio(id: string): Promise<IPortfolioDetails> {

  const path = BASE_PATH + `/${id}`;
  const response = fetch(path, { method: 'GET' });

  return response.then(x => x.json() as Promise<IPortfolioDetails>);
}

export function savePortfolio(portfolio: IPortfolioDetails): Promise<IPortfolioDetails> {

  const response = fetch(BASE_PATH, {
    method: 'POST',
    body: JSON.stringify(portfolio)
  });

  return response.then(x => x.json() as Promise<IPortfolioDetails>);
}

export function deletePortfolio(id: string): Promise<void> {

  const path = BASE_PATH + `/${id}`;

  return fetch(path, { method: 'DELETE' }).then(x => x.json());
}
