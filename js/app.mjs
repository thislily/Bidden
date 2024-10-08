/**
 *This is the main entry point for the application. This file is responsible for loading the necessary modules and setting up the event listeners for the application.
 */

import { loginModal, handleLoginModal } from "./handlers/loginModal.mjs";
import { registerForm, handleRegForm } from "./handlers/registerForm.mjs";
import { loginForm, handleLoginForm } from "./handlers/loginForm.mjs";
import { handleNavMenuAvatar } from "./handlers/navMenuAvatar.mjs";
import { handleLogoutButton } from "./handlers/logoutUser.mjs";
import { renderListings, handleSeeMore } from "./render/feed.mjs";
import { displaySingleListing } from "./render/listing.mjs";
import {
  filterListings,
  searchBar,
  handleFilter,
  handleSearch,
} from "./render/feed.mjs";
import { setProfileLink } from "./handlers/setProfileLink.mjs";
import { renderProfile } from "./render/profile.mjs";
import { moreImages, handleMoreImages } from "./handlers/moreImages.mjs";
import {
  createListingForm,
  handleCreateListingForm,
} from "./handlers/createListingForm.mjs";
import { handleUpdateListingForm } from "./handlers/updateListingForm.mjs";
import { handleRemoveListingButton } from "./handlers/removeListingButton.mjs";
import { extendProfile } from "./api/profile/extendProfile.mjs";
import { handleUpdateProfileForm } from "./handlers/updateProfileForm.mjs";
import { handleBidForm } from "./handlers/bidForm.mjs";
import { logInToCreateListing } from "./handlers/logInToCreate.mjs";

if (location.pathname === "/" || location.pathname === "/index.html") {
  renderListings();
  handleSeeMore();
}

if (
  location.pathname === "/listing/index.html" ||
  location.pathname === "/listing/"
) {
  displaySingleListing();
  handleUpdateListingForm();
  handleRemoveListingButton();
  handleBidForm();
}

if (
  location.pathname === "/profile/index.html" ||
  location.pathname === "/profile/"
) {
  renderProfile();
  handleUpdateProfileForm();
}

if (loginModal) {
  handleLoginModal();
}

if (registerForm) {
  handleRegForm();
}

if (loginForm) {
  handleLoginForm();
}

if (createListingForm) {
  handleCreateListingForm();
  logInToCreateListing();
}

if (filterListings) {
  handleFilter();
}

if (searchBar) {
  handleSearch();
}

if (moreImages) {
  handleMoreImages();
}

handleNavMenuAvatar();
handleLogoutButton();
document.addEventListener("DOMContentLoaded", () => {
  setProfileLink();

  if (localStorage.getItem("profile")) {
    extendProfile();
  }
});
