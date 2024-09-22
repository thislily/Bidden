// on click of the remove listing button, the listing is removed from the database

import { removeListing } from "../api/listings/remove.mjs"; 


/**
 * handle the remove listing button
 */

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


       const singleListingContainer = document.getElementById("single-listing-container");
         singleListingContainer.innerHTML = "";

         const div = document.createElement("div");
            div.classList.add("border", "border-primary", "p-5", "my-5", "mx-auto", "w-75", "d-flex", "flex-column", "align-items-center", "justify-content-center");
            singleListingContainer.appendChild(div);
       
       const h1 = document.createElement("h1");
       h1.classList.add("text-center", "py-5");
         h1.textContent = "Listing Removed";
        
        div.appendChild(h1);

        const homeLink = document.createElement("a");
        homeLink.href = "/";
        homeLink.classList.add("btn", "btn-outline-primary", "rounded-0", "fw-semibold");
        homeLink.textContent = "Return to Listings";
        div.appendChild(homeLink);

        //close the modal
        const modalElement = document.getElementById('delete-listing-modal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);  // Get the modal instance
        if (modalInstance) {
            modalInstance.hide();  // Close the modal
        }

    });
}