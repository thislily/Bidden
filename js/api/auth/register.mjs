import { REGISTER_URL } from "../auth/constants.mjs";
// import { loginUser } from "./login.mjs";

/**
 * register a new user with the profile data
 * @param {Object} profile - the user profile data
 * @throws {Error} - if the user is not registered
 */

export async function registerUser(profile) {
    try {
      // Log the profile object to see what is being sent
      console.log("Sending profile data:", JSON.stringify(profile));
  
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        body: JSON.stringify(profile),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        // Try to get the detailed error message from the response body
        const errorDetails = await response.json();
        throw new Error(`Failed to register user: ${errorDetails.message || response.statusText}`);
      }
  
      const userData = await response.json();
      console.log("Registration successful:", userData);
  
    } catch (error) {
      console.error(error); // Log the error
    }
  }
  