//check if user is logged in to create a new post

export const createListingForm = document.getElementById("create-listing-form");
export const createFormContainer = document.getElementById("create-form-container");
export const loginModal = document.getElementById("login-modal");

export function logInToCreateListing() {
    if (localStorage.getItem("profile")) {
        createListingForm.classList.add("d-block");
        createListingForm.classList.remove("d-none");
    }
    else {
        const logInToCreateButton = document.createElement("button");
        logInToCreateButton.classList.add("btn", "btn-large", "mx-auto", "my-5", "border-1", 'border-black', "rounded-0", "fw-semibold");
        logInToCreateButton.textContent = "Log in to create a listing";
        logInToCreateButton.setAttribute("data-bs-toggle", "modal");
        logInToCreateButton.setAttribute("data-bs-target", "#login-modal");
        createFormContainer.appendChild(logInToCreateButton);

        createListingForm.classList.add("d-none");
        createListingForm.classList.remove("d-block");
    }
}   