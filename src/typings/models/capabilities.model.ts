export interface IGetCapabilitiesDetailsRequest {
  portfolio_id: string;
}

export interface ICapabilitiesDetails {
  portfolioId: string;
  name?: string;
  description?: string;
  category?: string;
}

export interface ICapabilitiesOwnerDetails extends ICapabilitiesDetails {
  ownerName?: string;
  ownerEmail?: string;
}

export interface ICapabilities {
  context?: string;
  // personas: IPersona[];
  // scenario: IScenario;
  // steps: IStep[];
}

