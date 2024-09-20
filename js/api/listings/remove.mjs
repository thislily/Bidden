//delete a listing from the server with delete request

import { headers, LISTINGS_URL } from "../auth/constants.mjs";

export async function removeListing(id) {
    try {
        const response = await fetch(`${LISTINGS_URL}/${id}`, {
            method: 'DELETE',
            headers: headers(),
        });

        const data = await response.json();
        console.log("data", data);

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete listing.");
        }

        return data;
    } catch (error) {
        console.error("Error deleting listing:", error);
        throw error;  // Throw error so the calling function can handle it
    }
}
