import { postBid } from "../api/listings/bid.mjs";


/**
 * handle the bid form
 */

export function handleBidForm() {
    const bidButton = document.getElementById("submit-bid");
    const bidInput = document.getElementById("bid");
    bidButton.addEventListener("click", async () => {

        const bid = {
            amount: parseInt(bidInput.value)
        };
        try {
            await postBid(bid);
            bidInput.value = "";
        } catch (error) {
            console.error("Failed to post bid:", error);
            alert(`Failed to post bid: ${error.message  }`);
        }
    });
}