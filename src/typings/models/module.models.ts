export interface IApiContext {
  portfolioId?: string;
  name?: string;
  description?: string;
}

export interface IValuePropositionDetails {
  properties?: IPropertyValueProposition[] | null  
}


export interface IPropertyValueProposition {
    propertyName: string;
    question: string;
    answer: string;
}