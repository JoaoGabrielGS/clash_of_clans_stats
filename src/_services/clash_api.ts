import { API_KEY } from "../_config/api";

function buildQueryParams(params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : '';
}

export async function fetchClashData(endpoint: string, params: Record<string, string> = {}) {

  const response = await fetch(`/api/v1/${endpoint}${buildQueryParams(params)}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error:', errorData);
    throw new Error('Failed to fetch data from API');
  }

  return await response.json();
}
