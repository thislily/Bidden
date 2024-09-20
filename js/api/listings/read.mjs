import { headers, LISTINGS_URL } from "../auth/constants.mjs";

/**
 * fetch all listings from the api
 * @returns {Object} - the listings data
 * @throws {Error} - if the listings are not found in the api response
 */


export async function fetchListings(type) {
    let ADD_ON_URL = "";

    if (type === "filter") {
        const filterValue = document.getElementById("filter-listings").value;
        console.log("Filter value:", filterValue);

        if (filterValue === "1") {
            ADD_ON_URL = `?_active=true`;
        } else if (filterValue === "2") {
            ADD_ON_URL = `?_active=false`;
        }

    } else if (type === "search") {
        const searchValue = document.getElementById("search-bar").value;
        console.log("Search value:", searchValue);

        if (searchValue !== "") {
            // Build the correct search URL
            ADD_ON_URL = `/search?q=${searchValue}`;
        } else {
            console.log("Search term is empty, no search will be performed.");
            return;  // Exit if the search bar is empty
        }
    }

    console.log("Fetching listings with URL:", LISTINGS_URL + ADD_ON_URL);

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