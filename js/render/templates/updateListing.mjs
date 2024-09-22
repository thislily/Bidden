/**
 *
 * @param {*} listing
 * @description fill the update listing form with the existing listing data, and set up for adding more images
 *
 */

export function fillUpdateListingForm(listing) {
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  // Set the existing listing title and description
  title.value = listing.data.title;
  description.value = listing.data.description;

  // Clear any existing image fields before dynamically adding new ones
  const imageFieldsContainer = document.getElementById(
    "image-fields-container"
  );
  imageFieldsContainer.innerHTML = ""; // Clear any existing image fields

  // Populate the media fields with existing listing media
  for (let i = 0; i < listing.data.media.length; i++) {
    const count = i + 1;
    createImageFields(
      count,
      listing.data.media[i].url,
      listing.data.media[i].alt
    );
  }

  // Set up for adding more images
  const moreImagesButton = document.getElementById("more-images");
  let count = listing.data.media.length + 1;

  // Ensure we don't add multiple event listeners by removing any previous listener
  moreImagesButton.replaceWith(moreImagesButton.cloneNode(true)); // Remove previous listeners
  const newMoreImagesButton = document.getElementById("more-images");

  // Add new event listener for "More Images" button
  newMoreImagesButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    // Create new fields for the next image and description
    createImageFields(count);
    count++; // Increment the counter for the next image
  });
}

// Helper function to create image URL and description input fields dynamically
function createImageFields(count, url = "", alt = "") {
  const imageFieldsContainer = document.getElementById(
    "image-fields-container"
  );

  // Create new image URL input
  const div = document.createElement("div");
  div.classList.add("mb-3");

  const label = document.createElement("label");
  label.setAttribute("for", `image${count}`);
  label.classList.add("form-label", "mb-0");
  label.textContent = `Image ${count} URL`;

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.classList.add("form-control", "rounded-0", "border-black");
  input.setAttribute("id", `image${count}`);
  input.setAttribute("name", `image${count}`);
  input.value = url; // Pre-fill with URL if provided

  div.appendChild(label);
  div.appendChild(input);

  // Create new image description input
  const div2 = document.createElement("div");
  div2.classList.add("mb-3");

  const label2 = document.createElement("label");
  label2.setAttribute("for", `image-description${count}`);
  label2.classList.add("form-label", "mb-0");
  label2.textContent = `Image ${count} Description`;

  const input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.classList.add("form-control", "rounded-0", "border-black");
  input2.setAttribute("id", `image-description${count}`);
  input2.setAttribute("name", `image-description${count}`);
  input2.value = alt; // Pre-fill with description if provided

  div2.appendChild(label2);
  div2.appendChild(input2);

  // Append new fields to the container
  imageFieldsContainer.appendChild(div);
  imageFieldsContainer.appendChild(div2);
}
