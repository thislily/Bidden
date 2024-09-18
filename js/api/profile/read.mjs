import { PROFILES_URL } from "../auth/constants.mjs";

/**
 * fetch user pofile from the api using the user name
 * @returns {Object} - the user profile data
 */

export async function fetchProfile() {
    try {
        // get the user name from the query string 
        const queryParams = new URLSearchParams(window.location.search);
        const userName = queryParams.get('name');
        const getProfile = PROFILE_URL + "/" + userName + "?_posts=true&_followers=true&_following=true";
        const profile = JSON.parse(localStorage.getItem("profile"));

        // get the token from local storage
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Authorization token not found.");
        }

        // fetch the profile data
        const response = await fetch(getProfile, {
            method: "GET",
            headers: headers()
        }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch profile: " + response.statusText);
        }

        const profileData = await response.json();

        return profileData;
    } catch (error) {
        console.error(error);
    }
}