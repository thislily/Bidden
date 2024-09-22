
/**
 * @module navMenuAvatar
 * @description This module is responsible for handling the user avatar in the navigation menu.
 */

export const navUsername = document.querySelector("#nav-username");
export const navCredits = document.querySelector("#nav-credits");
export const menuCredits = document.querySelector("#menu-credits");
export const navUsernameContainer = document.querySelector(
  "#nav-username-container"
);
export const openMenu = document.querySelector("#open-menu");
export const navLoginButton = document.querySelector("#nav-login-button");
export const dropdownMenu = document.querySelector(".dropdown-menu");


// Handle the user avatar in the navigation menu
export function handleNavMenuAvatar() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (profile) {
    // Update the user avatar and credits in the navigation menu
    navCredits.textContent = profile.credits;
    menuCredits.textContent = profile.credits;
    navUsernameContainer.classList.add("d-md-flex");
    navLoginButton.classList.add("d-none");
    openMenu.classList.remove("d-none");
    dropdownMenu.classList.remove("d-none");

    navUsername.textContent = 'Welcome, ' + profile.name;
    openMenu.src = profile.avatar.url;

  } else if (!profile){

    // Hide the user avatar and credits in the navigation menu
    navUsernameContainer.classList.remove("d-md-flex");
    navLoginButton.classList.remove("d-none");
    openMenu.classList.add("d-none");
    dropdownMenu.classList.add("d-none");

  }
}
