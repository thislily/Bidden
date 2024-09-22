import { headers, LISTINGS_URL } from "../auth/constants.mjs";


/**
 * fetch all listings from the api
 * @returns {Object} - the listings data
 * @throws {Error} - if the listings are not found in the api response
 */

export async function fetchListings(type, currentPage, limit) {
    let ADD_ON_URL = `?sort=created&order=desc&limit=${limit}&page=${currentPage}`;

    // Add filter or search logic as needed
    if (type === "filter") {
        const filterValue = document.getElementById("filter-listings").value;
        if (filterValue === "1") {
            ADD_ON_URL = `?_active=true&sort=created&order=desc&limit=${limit}&page=${currentPage}`;
        } else if (filterValue === "2") {
            ADD_ON_URL = `?_active=false&sort=created&order=desc&limit=${limit}&page=${currentPage}`;
        }
    } else if (type === "search") {
        const searchValue = document.getElementById("search-bar").value;
        if (searchValue !== "") {
            ADD_ON_URL = `/search?q=${encodeURIComponent(searchValue)}&sort=created&order=desc`;
        } else {
            return;
        }
    }

    try {
        const response = await fetch(LISTINGS_URL + ADD_ON_URL, {
            method: "GET",
            headers: headers(),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch listings: " + response.statusText);
        }

        const listingsData = await response.json();
        return listingsData;
    } catch (error) {
        console.error("Error fetching listings:", error);
    }
}



export async function fetchSingleListing() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    try {
        const response = await fetch(`${LISTINGS_URL}/${id}?_bids=true&_seller=true`, {
            method: "GET",
            headers: headers()
        });

        if (!response.ok) {
            throw new Error("Failed to fetch listing: " + response.statusText);
        }

        const listingData = await response.json();


        return listingData;

    } catch (error) {
        console.error(error);
    }
}