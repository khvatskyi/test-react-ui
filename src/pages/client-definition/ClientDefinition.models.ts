export interface IClientDefinitionInfo {
  id?: string;
  name?: string;
  description?: string;
  industry?: string;
  size?: 'Small' | 'Medium' | 'Large';
  coreProducts?: string;
}
