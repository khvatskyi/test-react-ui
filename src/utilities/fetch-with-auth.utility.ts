import { SessionStorageItems } from '../typings/enums/session-storage-items.enum';
import { IUserContext } from '../typings/models/user.models';
import { redirectToSSO } from './login.utility';
  
export const fetchWithAuth = async (url: string, options?: RequestInit): Promise<Response> => {

  const serializedUserContext: string | null = sessionStorage.getItem(SessionStorageItems.UserContext);
  const storedUserContext: IUserContext = serializedUserContext ? JSON.parse(serializedUserContext) : null;
  const token = storedUserContext ? storedUserContext.accessToken : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options?.headers,
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    if (response.status === 401) {
      redirectToSSO();
    } else {
      throw new Error(response.statusText, {cause: {
        body: await response.json(),
        response: response
      }});
    }
  }

  return response;
};
