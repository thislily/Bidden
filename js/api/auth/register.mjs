import { REGISTER_URL } from "../auth/constants.mjs";
import { loginUser } from "./login.mjs"; // Uncomment if necessary

/**
 * Register a new user with the profile data and then log them in
 * @param {Object} profile - the user profile data
 * @throws {Error} - if the user is not registered
 */
export async function registerUser(profile) {
  try {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      body: JSON.stringify(profile),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the registration was successful
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Failed to register user: ${errorDetails.message || response.statusText}`);
    }

    const userData = await response.json();
    console.log("Registration successful:", userData);

    // Log the user in after successful registration
    loginUser(profile);
  } catch (error) {
    console.error(`Registration error: ${error.message}`);
  }
}

