export interface CompanyInfo {
  name?: string;
  description?: string;
  industry?: string;
  size?:  'small' | 'medium' | 'large';
  coreProducts?: string;
}
