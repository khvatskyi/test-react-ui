export interface IClientProfileInfo {
  id?: string;
  name?: string;
  description?: string;
  industry?: string;
  size?: 'Small' | 'Medium' | 'Large';
  coreProducts?: string;
}
