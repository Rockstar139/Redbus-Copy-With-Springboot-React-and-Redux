import { BASE_URL, handleResponse } from "./apiConfig";

export const fetchSearchApi = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`${BASE_URL}/search?${query}`);
  return handleResponse(response);
};
