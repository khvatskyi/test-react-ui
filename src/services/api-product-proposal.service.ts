import { IGetProductProposalRequest, IProductProposal, IProductProposalRequest } from "../typings/models/api-product-proposal.models";
import { fetchWithAuth } from "../utilities/fetch-with-auth.utility";

export async function initApiProductProposalRequest(request: IProductProposalRequest): Promise<IProductProposal> {

  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/api-product-proposal`;
  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  const result: IProductProposal = await response.json();
  return result;
}


export async function getApiProductProposalRequest(request: IGetProductProposalRequest): Promise<IProductProposal> {

  const params = new URLSearchParams({ ...request }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/api-product-proposal?` + params;
  const response = await fetchWithAuth(path, { method: 'GET' });

  const result = await response.json();
  return result; 
}

