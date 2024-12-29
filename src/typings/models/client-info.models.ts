export interface IClientDefinitionInfo {
  name?: string;
  description?: string;
  industry?: string;
  size?: 'Small' | 'Medium' | 'Large';
  coreProducts?: string;
}

export interface IKeyServicesOrProducts {
  service?: string;
  description?: string;
}

export interface IClientProfileInfo extends IClientDefinitionInfo {
  strengths?: string[] | null;
  competitiveEdge?: string;
  marketPosition?: string;
  headquarters?: string;
  primaryLocations?: string[] | null;
  website?: string;
  linkedIn?: string;
  twitter?: string;
  facebook?: string;
  otherSocialMedia?: string[] | null;
  revenue?: string;
  numberOfEmployees?: string;
  keyServicesOrProducts?: IKeyServicesOrProducts[] | null
  strategicGoalsShortTerm?: string[] | null;
  strategicGoalsLongTerm?: string[] | null;
  partnershipsOrAffiliations?: string[] | null;
  phone?: string;
  email?: string;
  address?: string;
}
