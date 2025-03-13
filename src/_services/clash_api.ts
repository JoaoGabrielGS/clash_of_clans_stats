import { fetchData } from "./fetch_data";

export async function FindClans<T>(
  endpoint: string,
  params: Record<string, string> = {},
  limit: number = 10,
  after?: string,
  before?: string
) {
  const queryParams: Record<string, string> = {
    ...params,
    limit: limit.toString(),
  };

  if (after) {
    queryParams["after"] = after;
  }

  if (before) {
    queryParams["before"] = before;
  }

  return await fetchData<T>(endpoint, queryParams);
}

export async function FindClanByTag<T>(tag: string) {
  const encodedTag = encodeURIComponent(tag);
  return await fetchData<T>(`clans/${encodedTag}`);
}
