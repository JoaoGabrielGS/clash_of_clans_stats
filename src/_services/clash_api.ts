import { fetchData } from './fetch_data';

export async function fetchClashData<T>(endpoint: string, params: Record<string, string> = {}) {
  return await fetchData<T>(endpoint, params);
}