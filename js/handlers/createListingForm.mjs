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
        console.log("Listing ID:", listingId);

        // Send listing data to the API
        try {
            const response = await createListing(listing);
            console.log("Listing created successfully:", response);
            alert("Listing created successfully!");
            createListingForm.reset();  // Optionally reset the form after successful submission
        } catch (error) {
            console.error("Failed to create listing:", error);
            alert(`Failed to create listing: ${error.message}`);
        }
    });
}







/* <form action="" class="col-12 col-sm-10 col-md-8 pb-4">

<div class="mb-3 ">
    <label for="title" class="form-label mb-0">Title</label>
    <input type="text" class="form-control rounded-0 border-black" id="title" name="title">
</div>

<div class="mb-3">
    <label for="description" class="form-label mb-0">Description</label>
    <textarea class="form-control rounded-0 border-black" id="description" name="description"></textarea>
</div>

<div class="mb-3">
    <label for="image" class="form-label mb-0">Image URL</label>
    <input type="text" class="form-control rounded-0 border-black" id="image" name="image">
</div>

<div class="mb-3">
    <label for="image-description" class="form-label mb-0">Image Description</label>
    <input type="text" class="form-control rounded-0 border-black" id="image-description" name="image-description">
</div>

<div class="mb-3 d-flex justify-content-center">
    <button class="btn btn-outline-primary fw-semibold text-black rounded-0"> + More Images</button>
</div>

<div class="mb-3">
    <label for="endDate" class="form-label">Auction End Date</label>
    <input type="date" class="form-control rounded-0 border-black" id="endDate" name="endDate">
  </div>

  <div class="mb-3">
    <label for="endTime" class="form-label">Auction End Time</label>
    <input type="time" class="form-control rounded-0 border-black" id="endTime" name="endTime">
  </div>


  <div class="d-flex align-items-center flex-column border-0">
    <button type="submit" class="btn btn-outline-primary text-black rounded-0 fw-semibold">Post Listing <i class="bi bi-box-arrow-in-right "></i></button>
    <span class="border  border-primary-subtle my-3 w-75" style="height: 1px;"></span>
    <button type="button" class="btn btn-outline-secondary rounded-0 fw-semibold" data-bs-dismiss="modal">Nevermind <i class="bi bi-x-circle "></i></button>
  </div>


</form> */