// post a bid to the api
import { headers, LISTINGS_URL } from "../auth/constants.mjs";




export async function postBid(bid) {
    let id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
        throw new Error("Listing ID not found in the URL");
    }

    let bidURL = `${LISTINGS_URL}/${id}/bids`;

    try {
        const response = await fetch(bidURL, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(bid),
        });

        if (response.status === 204) {
            console.log("Bid posted successfully with no content");
            return;
        }

        const data = await response.json();

        if (!response.ok) {
            console.error("Error response from server:", data);
            throw new Error(data.message || "Failed to post bid.");
        }

        console.log("Bid posted successfully:", data);
        window.location.reload();
        return data;
    } catch (error) {
        console.error("Error posting bid:", error);
        throw error;
    }
}
