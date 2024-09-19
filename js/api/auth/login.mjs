import { LOGIN_URL } from "../auth/constants.mjs";
import { headers } from "../auth/constants.mjs";
import { extendProfile } from "../profile/extendProfile.mjs";

/**
 * login user with the profile data
 * @param {Object} profile - the user profile data
 * @throws {Error} - if the user is not logged in
 */

export async function loginUser(profile) {
  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify(profile),
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to login user: " + response.statusText);
    }

    const userData = await response.json();

    // if the user is logged in, save the token and profile data
    if (userData) {
      localStorage.setItem("token", userData.data.accessToken);
      const user = {
        name: userData.data.name,
        email: userData.data.email,
        avatar: userData.data.avatar,
        banner: userData.data.banner,
      };
      localStorage.setItem("profile", JSON.stringify(user));

      //extend the user profile with additional info
      await extendProfile();

      //reload the page
      window.location.reload();


    console.log("User logged in successfully:", localStorage.getItem("profile"));

    } else {
      throw new Error("Failed to login user: " + response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
}
