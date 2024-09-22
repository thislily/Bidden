
import { headers, LISTINGS_URL } from "../auth/constants.mjs";

/**
 * 
 * @param {*} listing 
 * @description Update a listing
 * @returns {Object} the updated listing object
 * @throws {Error} if the listing is not updated
 */

export async function updateListing(listing) {
    // Get the listing ID from the URL
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
        throw new Error("Listing ID not found in the URL");
    }

    try {
        const response = await fetch(`${LISTINGS_URL}/${id}`, {
            method: 'PUT',
            headers: headers(),
            body: JSON.stringify(listing),  // Send listing data as JSON
        });

        // Log the response data for debugging
        const data = await response.json();
        window.location.reload();

        if (!response.ok) {
            console.error("Error response from server:", data);
            throw new Error(data.message || "Failed to update listing.");
        }

        return data;  // Return the response data
    } catch (error) {
        console.error("Error updating listing:", error);
        throw error;
    }
}

