//display each listing in a card from the template
import { horizontalCard } from "./templates/horizontalCard.mjs";
import { fetchListings } from "../api/listings/read.mjs";

/**
 * @param {Object} listing
 * @returns {HTMLDivElement}
 */

export let currentPage = 1; // Keep track of the current page
export let limit = 20; // Number of listings per page

export async function renderListings(type) {
  const listingsContainer = document.getElementById("listings-container");
  const loader = document.querySelector(".loader");
  loader.style.display = "block"; // Show loader while fetching data

  // Clear previous listings if it's a new search or filter
  if (currentPage === 1) {
    listingsContainer.innerHTML = "";
  }

  // Fetch listings for the current page
  const listings = await fetchListings(type, currentPage, limit);
  loader.style.display = "none"; // Hide loader once data is fetched

  // Check if listings exist and if there are any data entries
  if (listings && listings.data && listings.data.length > 0) {
    listings.data.forEach((listing) => {
      listingsContainer.appendChild(horizontalCard(listing)); // Append listings
    });

    // Check if more listings are available, otherwise hide "See More" button
    if (listings.data.length < limit) {
      document.getElementById("see-more").style.display = "none"; // Hide if fewer results than limit
    }
  } else {
    if (listingsContainer.children.length === 0) {
      // Only show if no previous listings exist
      const noResults = document.createElement("p");
      noResults.classList.add("h1");
      noResults.style.height = "400px";
      noResults.textContent = "No results found.";
      listingsContainer.appendChild(noResults);
    }

    document.getElementById("see-more").style.display = "none"; // Hide "See More" button
  }
}

export const seeMoreButton = document.getElementById("see-more");

export function handleSeeMore() {
  seeMoreButton.addEventListener("click", async () => {
    currentPage++; // Increment page number
    renderListings("", currentPage, limit); // Fetch and display next page of listings
  });
}

export const filterListings = document.getElementById("filter-listings");
export const searchBar = document.getElementById("search-bar");
export const searchButton = document.getElementById("search-button");

export function handleFilter() {
  filterListings.addEventListener("change", () => {
    currentPage = 1; // Reset to first page
    limit = 100; // Reset limit to default
    renderListings("filter", currentPage, limit);
    const seeMore = document.getElementById("see-more");
    seeMore.style.display = "none";
  });
}

export function handleSearch() {
  //allow keyup event to search but after 500ms
  let timer;
  searchBar.addEventListener("keyup", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      currentPage = 1; // Reset to first page
      renderListings("search");
      const seeMore = document.getElementById("see-more");
      seeMore.style.display = "none";
    }, 500);
  });

  searchButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the form from submitting
    currentPage = 1; // Reset to first page
    limit = 100; // Reset limit to default
    renderListings("search");
    const seeMore = document.getElementById("see-more");
    seeMore.style.display = "none";
  });
}
