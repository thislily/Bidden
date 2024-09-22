import { createListing } from "../api/listings/create.mjs";

/**
 * handle the create listing form submission
 * @returns {Object} - the listing data
 */

export const createListingForm = document.querySelector("#create-listing-form");

export function handleCreateListingForm() {
    createListingForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const mediaArray = [];

        for (let i = 1; i < 6; i++) {
            const image = createListingForm[`image${i}`]?.value;
            const imageDescription = createListingForm[`image-description${i}`]?.value;
            if (image && imageDescription) {
                mediaArray.push({ url: image, alt: imageDescription });
            }
        }

        // Create combined end date and time
        const endDate = createListingForm.endDate.value;
        const endTime = createListingForm.endTime.value;
        const endDateTime = new Date(`${endDate}T${endTime}`);
    
        // Prepare the listing object
        const listing = {
            title: createListingForm.title.value,
            description: createListingForm.description.value,
            media: mediaArray,
            endsAt: endDateTime.toISOString(),
        };

        // get id from the query string
        const listingId = new URLSearchParams(window.location.search).get("id");
        // Send listing data to the API
        try {
            const response = await createListing(listing);

            createListingForm.reset();  // Optionally reset the form after successful submission
        } catch (error) {
            console.error("Failed to create listing:", error);
            alert(`Failed to create listing: ${error.message}`);
        }
    });
}