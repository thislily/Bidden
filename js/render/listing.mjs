import { listingCard } from "./templates/listingCards.mjs";
import { fetchSingleListing } from "../api/listings/read.mjs";

/**
 * render a post to the single-listing-container element
 * @param {Object} post - the post data
 * @returns {Object} - the post element
 */

export function renderSingleListing(listing) {
  const listingContainer = document.getElementById("single-listing-container");
  const loader = document.querySelector(".loader");
  loader.style.display = "none";
  const listingElement = listingCard(listing);
  listingContainer.appendChild(listingElement);

  return listingElement;
}

export async function displaySingleListing() {
  try {
    const listing = await fetchSingleListing();

    renderSingleListing(listing);
  } catch (error) {
    console.error(error);
  }
}
