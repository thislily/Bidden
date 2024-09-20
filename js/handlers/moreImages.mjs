import { createListingForm } from "./createListingForm.mjs";
//handle the more images button, each one will be numbered so that we can identify them as a pair

export const moreImages = document.querySelector("#more-images");

export function handleMoreImages() {
    let count = 2;
    moreImages.addEventListener("click", function (event) {
        event.preventDefault();

        const div = document.createElement("div");
        div.classList.add("mb-3");
        
        const label = document.createElement("label");
        label.setAttribute("for", `image${count}`);
        label.classList.add("form-label", "mb-0");
        label.textContent = 'Image ' + count + ' URL';

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.classList.add("form-control", "rounded-0", "border-black");
        input.setAttribute("id", `image${count}`);
        input.setAttribute("name", `image${count}`);

        div.appendChild(label);
        div.appendChild(input);

        const div2 = document.createElement("div");
        div2.classList.add("mb-3");

        const label2 = document.createElement("label");
        label2.setAttribute("for", `image-description${count}`);
        label2.classList.add("form-label", "mb-0");
        label2.textContent = "Image " + count + " Description";

        const input2 = document.createElement("input");
        input2.setAttribute("type", "text");
        input2.classList.add("form-control", "rounded-0", "border-black");
        input2.setAttribute("id", `image-description${count}`);
        input2.setAttribute("name", `image-description${count}`);

        div2.appendChild(label2);
        div2.appendChild(input2);

        const moreImagesContainer = document.querySelector("#more-images-container");

        moreImagesContainer.before(div);
        moreImagesContainer.before(div2);

        if (count >= 5) {
            moreImages.style.display = "none";
        } else {
            count++;
        }
    });
}
