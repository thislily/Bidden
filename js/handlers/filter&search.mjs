
import { renderListings } from "../render/feed.mjs";



export const filterListings = document.getElementById("filter-listings");
export const searchBar = document.getElementById("search-bar");
export const searchButton = document.getElementById("search-button");

// Handle filter changes
// Handle filter changes
export function handleFilter() {
    filterListings.addEventListener("change", () => {
        renderListings("filter");  // Pass "filter" to renderListings
    });
}

export function handleSearch() {

    searchButton.addEventListener("click", (event) => {
        event.preventDefault();  // Prevent the form from submitting
        renderListings("search");  // Trigger search on button click
        const seeMore = document.getElementById("see-more");
        seeMore.style.display = "none";
    });
}

