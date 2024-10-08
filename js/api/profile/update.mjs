import { headers, PROFILES_URL } from "../auth/constants.mjs";

/**
 * Function to update a user profile
 * @param {Object} profile - the profile object
 * @returns {Object} the updated profile object
 * @throws {Error} if the profile is not updated
 */

export async function updateProfile(profile) {
  try {
    const queryParams = new URLSearchParams(window.location.search);
    const userName = queryParams.get("name"); // Get the user name from URL

    if (!userName) {
      throw new Error("User name not found in the URL.");
    }

    const updateProfileUrl = `${PROFILES_URL}/${userName}`;

    const response = await fetch(updateProfileUrl, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(profile), // Send profile data as JSON
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error response from server:", data);
      throw new Error(data.message || "Failed to update profile.");
    }

    window.location.reload(); // Reload the page after success

    return data; // Return the response data
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
