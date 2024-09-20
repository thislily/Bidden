//display each listing in a card from the template
import { horizontalCard } from "./templates/horizontalCard.mjs";
import { fetchListings } from "../api/listings/read.mjs";

/*
* @param {Object} listing
* @returns {HTMLDivElement}
*/


export async function renderListings(type = null) {
    const listingsContainer = document.getElementById("listings-container");
    listingsContainer.innerHTML = '';  // Clear previous listings

    console.log("Rendering listings with type:", type);  // Log the type to ensure it's "search"

    // Fetch listings based on the type (either "filter" or "search")
    const listings = await fetchListings(type);  // Make sure "search" is passed to fetchListings

    console.log("Listings received:", listings);  // Log listings to check if they are correct

    // Check if listings exist and if there are any data entries
    if (listings && listings.data && listings.data.length > 0) {
        listings.data.forEach((listing) => {
            listingsContainer.appendChild(horizontalCard(listing));  // Display listings
        });
    } else {
        // If no results, display a message
        const noResults = document.createElement("p");
        noResults.classList.add("h1");
        noResults.style.height = "400px";
        noResults.textContent = "No results found.";
        listingsContainer.appendChild(noResults);

        const seeMore =document.getElementById("see-more");
        seeMore.style.display = "none";

    }
}
