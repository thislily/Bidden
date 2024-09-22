import { PROFILES_URL, headers } from "../auth/constants.mjs";

/**
 * fetch user pofile from the api using the user name from the query string in the url
 * @returns {Object} - the user profile data
 * @throws {Error} - if the profile is not found in the api response
 */

export async function fetchProfile() {
  try {
    // get the user name from the query string
    const queryParams = new URLSearchParams(window.location.search);
    const userName = queryParams.get("name");
    const getProfile = `${PROFILES_URL}/${userName}?_wins=true&_listings=true`;

    // get the token from local storage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization token not found.");
    }

    // fetch the profile data
    const response = await fetch(getProfile, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile: " + response.statusText);
    }

    const profileData = await response.json();

    return profileData; // return the profile data for further use if needed
  } catch (error) {
    console.error(error);
  }
}
