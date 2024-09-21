//handle the update listing form submission

import { updateListing } from "../api/listings/update.mjs";


export const updateListingForm = document.getElementById("update-listing-form");
export const updateListingButton = document.getElementById("update-listing-button");


export function handleUpdateListingForm() {

    updateListingButton.addEventListener("click", function (event) {
        event.preventDefault();  // Prevent default form submission


        const mediaArray = [];

        // Collect valid media URLs
        for (let i = 1; i < 6; i++) {
            const image = updateListingForm[`image${i}`]?.value;
            const imageDescription = updateListingForm[`image-description${i}`]?.value;
            
            // Only add media if both URL and alt text are present and valid
            if (image && imageDescription) {
                mediaArray.push({ url: image, alt: imageDescription });
            }
        }

        const listing = {
            title: updateListingForm.title.value,
            description: updateListingForm.description.value,
            media: mediaArray
        };

        updateListing(listing);


    }
    );
}






   
