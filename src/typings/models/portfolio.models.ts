export interface IPortfolio {
  id?: string;
  name: string;
}

export interface IPortfolioDetails extends IPortfolio {
  description: string;
  industry?: string;
  goalsOrObjectives: string;
  businessCapabilities?: string;
  industryStandards: string;
  keyPartners?: string;
  keySuppliers?: string;
}
