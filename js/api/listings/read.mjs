import { headers, LISTINGS_URL } from "../auth/constants.mjs";

/**
 * fetch all listings from the api
 * @returns {Object} - the listings data
 * @throws {Error} - if the listings are not found in the api response
 */

export async function fetchListings() {
    try {
        const response = await fetch(LISTINGS_URL, {
            method: "GET",
            headers: headers()
        });

        if (!response.ok) {
            throw new Error("Failed to fetch listings: " + response.statusText);
        }

        const listingsData = await response.json();

        console.log("Listings fetched successfully:", listingsData);

        return listingsData;

    } catch (error) {
        console.error(error);
    }

}