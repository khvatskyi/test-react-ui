export interface IProfileInfo {
  id?: number;
  name?: string;
  description?: string;
  industry?: string;
  size: 'Small' | 'Medium' | 'Large';
  coreProducts?: string;
}
