// on click of the remove listing button, the listing is removed from the database

import { removeListing } from "../api/listings/remove.mjs"; 

export const confirmDeleteListing = document.getElementById("confirm-delete-listing");

export function handleRemoveListingButton() {
    confirmDeleteListing.addEventListener("click", function (event) {


        // Get the listing ID from the URL
        const id = new URLSearchParams(window.location.search).get("id");
        if (!id) {
            throw new Error("Listing ID not found in the URL");
        }

        removeListing(id);

        // Redirect to the profile page after deleting the listing
       console.log("Listing removed successfully");
    });
}