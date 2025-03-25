export interface IGetBusinessModelStartDetailsRequest {
  portfolio_id: string;
}

export interface IValueCreationModel {
  name: string;
  description: string;
  value_creation: string[];
  examples: string[];
}

export interface IBusinessModelStartDetails {
  portfolioId: string;
  valueCreationModelName?: string;
  portfolioKeyPartners: string;
}


export interface IBusinessModelCanvas {
  [key: string]: any;
}