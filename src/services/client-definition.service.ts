import { IClientDefinitionInfo } from '../pages/client-definition/ClientDefinition.models';

//let CLIENT_DEFINITION_DATA: IClientDefinitionInfo = {
//  id: '1',
//  name: 'Travelers',
//  description: 'Travelers Insurance is one of the largest and most established insurance companies in the United States, providing a wide array of property and casualty insurance products and services to businesses, organizations, and individuals. Founded in 1864, Travelers has built a reputation for financial strength, stability, and handling claims efficiently and fairly. The company focuses on innovation and comprehensive risk management to cater to the changing needs of its clients.',
//  industry: '13',
//  size: 'Large',
//  coreProducts: '',
//}

export function getClientDefinition(): Promise<IClientDefinitionInfo> {

  // MOCK data
//  return Promise.resolve(CLIENT_DEFINITION_DATA);

  const path = process.env.REACT_APP_API_ROOT + '/user/client-definition';
  const response = fetch(path, {
    method: 'GET',
    credentials: 'include'
  });

  return response.then(x => x.json() as Promise<IClientDefinitionInfo>);
}

export function saveClientDefinition(clientDefinition: IClientDefinitionInfo): Promise<IClientDefinitionInfo> {

  // MOCK data
//  CLIENT_DEFINITION_DATA = structuredClone(clientDefinition);
//  CLIENT_DEFINITION_DATA.id = CLIENT_DEFINITION_DATA.id ?? crypto.randomUUID();
//  return Promise.resolve(CLIENT_DEFINITION_DATA);

  const path = process.env.REACT_APP_API_ROOT + '/user/client-definition';
  const response = fetch(path, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(clientDefinition),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.then(x => x.json() as Promise<IClientDefinitionInfo>);
}