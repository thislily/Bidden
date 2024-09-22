import { fetchProfile } from "../api/profile/read.mjs";
import { horizontalCard } from "./templates/horizontalCard.mjs";
import { fillUpdateProfileForm } from "./templates/updateProfile.mjs";

/**
 * @module render
 * @description Renders the profile page and adds event listeners to the buttons
 *
 */

export async function renderProfile() {
  const breadcrumbName = document.getElementById("breadcrumb-name");
  const bannerImg = document.getElementById("banner-img");
  const avatarImg = document.getElementById("avatar-img");
  const profileName = document.getElementById("profile-name");
  const profileBio = document.getElementById("profile-bio");
  const editProfile = document.getElementById("edit-profile");

  const listingsButton = document.getElementById("listings-button");
  const winsButton = document.getElementById("wins-button");
  const listingsAmount = document.getElementById("listings-amount");
  const winsAmount = document.getElementById("wins-amount");
  const listingsAndWins = document.getElementById("listings-and-wins");

  const profileData = await fetchProfile();
  const userProfile = JSON.parse(localStorage.getItem("profile"));

  fillUpdateProfileForm(userProfile);

  if (userProfile.name === profileData.data.name) {
    editProfile.classList.remove("d-none");
  } else {
    editProfile.classList.add("d-none");
  }

  if (profileData) {
    breadcrumbName.innerText = profileData.data.name;
    bannerImg.src = profileData.data.banner.url;
    avatarImg.src = profileData.data.avatar.url;
    profileName.innerText = profileData.data.name;
    profileBio.innerText = profileData.data.bio;

    listingsAmount.innerText = profileData.data._count.listings;
    winsAmount.innerText = profileData.data._count.wins;
    listingsAndWins.innerHTML = "";
    profileData.data.listings.forEach((listing) => {
      listingsAndWins.appendChild(horizontalCard(listing));
    });
  }

  // Event listener for Listings button
  listingsButton.addEventListener("click", () => {
    listingsButton.classList.add("active");
    winsButton.classList.remove("active");
    listingsAndWins.innerHTML = "";

    if (profileData.data._count.listings < 1) {
      listingsAndWins.innerHTML = "No listings found.";
    } else {
      profileData.data.listings.forEach((listing) => {
        listingsAndWins.appendChild(horizontalCard(listing)); // Ensure horizontalCard works
      });
    }
  });

  // Event listener for Wins button
  winsButton.addEventListener("click", () => {
    winsButton.classList.add("active");
    listingsButton.classList.remove("active");
    listingsAndWins.innerHTML = "";

    if (profileData.data._count.wins < 1) {
      const h3 = document.createElement("h3");
      h3.innerText = "No wins yet.";
      listingsAndWins.appendChild(h3);
    } else {
      profileData.data.wins.forEach((win) => {
        listingsAndWins.appendChild(horizontalCard(win)); // Ensure horizontalCard works
      });
    }
  });
}
