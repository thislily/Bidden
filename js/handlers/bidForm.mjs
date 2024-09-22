import { postBid } from "../api/listings/bid.mjs";


export function handleBidForm() {
    const bidButton = document.getElementById("submit-bid");
    const bidInput = document.getElementById("bid");
    bidButton.addEventListener("click", async () => {

        const bid = {
            amount: parseInt(bidInput.value)
        };
        try {
            await postBid(bid);
            alert("Bid posted successfully");
            bidInput.value = "";
        } catch (error) {
            alert("Failed to post bid");
        }
    });
}