import { listingCard } from './templates/listingCards.mjs';
import { fetchSingleListing } from '../api/listings/read.mjs';

/**
 * render a post to the single-listing-container element
 * @param {Object} post - the post data
 * @returns {Object} - the post element
 */

//render a listing using the listingCard template

export function renderSingleListing(listing) {
    const listingContainer = document.getElementById("single-listing-container");
    const listingElement = listingCard(listing);
    listingContainer.appendChild(listingElement);
    console.log("Listing rendered successfully:", listingElement);
    return listingElement;
}

export async function displaySingleListing(){
    try {
        const listing = await fetchSingleListing();

        renderSingleListing(listing);
    }
    catch (error) {
        console.error(error);
    }

}