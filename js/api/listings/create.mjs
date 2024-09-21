import { headers, LISTINGS_URL } from "../auth/constants.mjs";

/**
 * Function to create a listing
 * @param {Object} listing - the listing object
 * @returns {Object} the listing object or error
 */

export async function createListing(listing) {
    try {
        const response = await fetch(LISTINGS_URL, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(listing),
        });

        const data = await response.json();

        window.location.href = `/listing/index.html?id=${data.data.id}`;

        if (!response.ok) {
            throw new Error(data.message || "Failed to create listing.");
        }

        return data;
    } catch (error) {
        console.error("Error creating listing:", error);
        throw error;  // Throw error so the calling function can handle it
    }
}
