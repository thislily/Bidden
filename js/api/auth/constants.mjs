export const API_URL = "https://v2.api.noroff.dev"; // API URL
export const LOGIN_URL = `${API_URL}/auth/login`; // Login URL
export const REGISTER_URL = `${API_URL}/auth/register`; // Register URL
export const LISTINGS_URL = `${API_URL}/auction/listings`; // Posts URL
export const PROFILES_URL = `${API_URL}/auction/profiles`; // Profile URL

/**
 *  function to get the headers with the token
 * @returns the headers with the token
 */

export function headers() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}