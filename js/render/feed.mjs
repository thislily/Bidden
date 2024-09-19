//display each listing in a card from the template
import { horizontalCard } from "./templates/horizontalCard.mjs";
import { fetchListings } from "../api/listings/read.mjs";

/*
* @param {Object} listing
* @returns {HTMLDivElement}
*/



export async function renderListings() {
    const listingsContainer = document.getElementById("listings-container");
    const listings = await fetchListings();
    listings.data.forEach((listing) => {
        listingsContainer.appendChild(horizontalCard(listing));
    });
}