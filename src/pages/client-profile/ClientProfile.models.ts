export interface IClientDefinitionInfo {
  id?: string;
  name?: string;
  description?: string;
  industry?: string;
  size?: 'Small' | 'Medium' | 'Large';
  coreProducts?: string;
}

export interface IClientProfileInfo extends IClientDefinitionInfo {
  strengths?: string[] | null;
  competitiveEdge?: string;
  marketPosition?: string;
  headquarters?: string;
  primaryLocations?: string[] | null;
  website?: string;
  linkedIn?: string;
  xDotCom?: string;
  facebook?: string;
  other?: string[] | null;
}
