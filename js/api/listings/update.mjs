//send updates of the listing to the server with put request

import { headers, LISTINGS_URL } from "../auth/constants.mjs";


export async function updateListing(listing) {
    try {
        const response = await fetch(`${LISTINGS_URL}/${listing.id}`, {
            method: 'PUT',
            headers: headers(),
            body: JSON.stringify(listing),
        });

        const data = await response.json();
        console.log("data", data);

        if (!response.ok) {
            throw new Error(data.message || "Failed to update listing.");
        }

        return data;
    } catch (error) {
        console.error("Error updating listing:", error);
        throw error;  // Throw error so the calling function can handle it
    }
}


