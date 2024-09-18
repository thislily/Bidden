import { PROFILES_URL } from "../auth/constants.mjs";
import { headers } from "../auth/constants.mjs";

/**
 * Fetch the user profile from the API using the username stored in local storage
 * and update the profile in local storage with additional info.
 * @returns {Object} - The updated user profile data
 */

export async function extendProfile() {
  try {
    // Check if the profile is in local storage
    const storedProfile = localStorage.getItem("profile");
    if (!storedProfile) {
      throw new Error("User profile not found in local storage.");
    }

    const profile = JSON.parse(storedProfile);

    // Fetch the profile data from the API
    const response = await fetch(
      `${PROFILES_URL}/${profile.name}?_wins=true&_listings=true`,
      {
        method: "GET",
        headers: headers(),
      }
    );

    // Handle errors from the response
    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const fullProfile = await response.json();

    // Update the profile data in local storage to include additional info
    const updatedProfile = {
      name: fullProfile.data.name,
      email: fullProfile.data.email,
      bio: fullProfile.data.bio,
      avatar: fullProfile.data.avatar,
      banner: fullProfile.data.banner,
      credits: fullProfile.data.credits,
      _count: {
        listings: fullProfile.data._count.listings,
        wins: fullProfile.data._count.wins,
      },
    };

    localStorage.setItem("profile", JSON.stringify(updatedProfile));

  

    return updatedProfile; // Return updated profile for further use if needed
  } catch (error) {
    console.error("Error extending profile:", error);
  }
}
