//check if the user is logged in via local storage, then change the nav menu to show the user's avatar

export const navUsername = document.querySelector("#nav-username");
export const navCredits = document.querySelector("#nav-credits");
export const menuCredits = document.querySelector("#menu-credits");
export const navUsernameContainer = document.querySelector(
  "#nav-username-container"
);
export const openMenu = document.querySelector("#open-menu");
export const navLoginButton = document.querySelector("#nav-login-button");
export const dropdownMenu = document.querySelector(".dropdown-menu");

export function handleNavMenuAvatar() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (profile) {
    navCredits.textContent = profile.credits;
    menuCredits.textContent = profile.credits;
    navUsernameContainer.classList.add("d-md-flex");
    navLoginButton.classList.add("d-none");
    openMenu.classList.remove("d-none");
    dropdownMenu.classList.remove("d-none");

    navUsername.textContent = 'Welcome, ' + profile.name;
    openMenu.src = profile.avatar.url;
  } else {
    navUsernameContainer.classList.remove("d-md-flex");
    navLoginButton.classList.remove("d-none");
    openMenu.classList.add("d-none");
    dropdownMenu.classList.add("d-none");

  }
}
