import { API_KEY } from "../_config/api";
import { buildQueryParams } from "./build_query_params";

export async function fetchData<T>(
  endpoint: string,
  params: Record<string, string> = {},
  options: RequestInit = {}
): Promise<T> {
  const url = `/api/v1/${endpoint}${buildQueryParams(params)}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error:', errorData);
    throw new Error('Failed to fetch data from API');
  }

  return response.json();
}
