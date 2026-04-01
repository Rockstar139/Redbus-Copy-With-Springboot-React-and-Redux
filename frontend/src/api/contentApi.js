import { BASE_URL, handleResponse } from "./apiConfig";

export const fetchOffersApi = async () => {
  const response = await fetch(`${BASE_URL}/offers`);
  return handleResponse(response);
};

export const fetchOffersPageApi = async () => {
  const response = await fetch(`${BASE_URL}/offers-page`);
  return handleResponse(response);
};

export const fetchWhatsNewApi = async () => {
  const response = await fetch(`${BASE_URL}/whats-new`);
  return handleResponse(response);
};
