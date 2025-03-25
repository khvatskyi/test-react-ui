import { ICapabilities, ICapabilitiesDetails, ICapabilitiesOwnerDetails, IGetCapabilitiesDetailsRequest } from '../typings/models/capabilities.model';
import { fetchWithAuth } from '../utilities/fetch-with-auth.utility';

export async function getCapabilitiesDetails(request: IGetCapabilitiesDetailsRequest): Promise<ICapabilitiesOwnerDetails> {

  const params = new URLSearchParams({ ...request }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/capabilities-details?` + params;
  const response = await fetchWithAuth(path, { method: 'GET' });

  const result = await response.json();
  return result; 
}


export async function sendCapabilitiesDetailsMessage(portfolioId: string): Promise<ICapabilitiesDetails> {

  const path = process.env.REACT_APP_API_ROOT + '/interactive-chat/capabilities-details/fill';
  const body = {
    portfolioId: portfolioId
  };

  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return response.json();
}


export async function getCapabilitiesRequest(request: IGetCapabilitiesDetailsRequest): Promise<ICapabilities> {

  const params = new URLSearchParams({ ...request }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/capabilities?` + params;
  const response = await fetchWithAuth(path, { method: 'GET' });

  const result = await response.json();
  return result; 
}
