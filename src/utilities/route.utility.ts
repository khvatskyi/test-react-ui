import { useParams } from 'react-router-dom';
import { svc } from '../services';


export function useParamId() {
  const { id } = useParams<{ id: string; }>();
  return id;
}

export function useQuery(paramName: string, defaultValue: any = undefined) {
  const paramValue = svc.uuiRouter.getCurrentLink().query[paramName];  
  return paramValue ? paramValue : defaultValue;
}