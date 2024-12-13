export const fetchWithAuth = async (url: string, token?: string, options?: RequestInit): Promise<Response> => {
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
    throw new Error(`HTTP error status: ${response.status}`);
  }

  return response.json();
};
