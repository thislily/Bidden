import { extendProfile } from "../api/profile/extendProfile.mjs";
import { updateProfile } from "../api/profile/update.mjs";

/**
 * Handle the update profile form submission
 * @returns {Object} - the updated profile data
 *
 */

export function handleUpdateProfileForm() {
  const updateProfileForm = document.getElementById("update-profile-form");
  const updateProfileButton = document.getElementById("update-profile-button");

  updateProfileButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the userProfile from localStorage and parse it
    const userProfile = JSON.parse(localStorage.getItem("profile"));

    if (!userProfile) {
      console.error("User profile not found in localStorage.");
      return;
    }

    const name = userProfile.name;

    // Check and set default values for banner and avatar
    const bannerUrl =
      updateProfileForm.banner.value ||
      "https://i.etsystatic.com/30097568/r/il/394cca/3255209417/il_570xN.3255209417_g5c8.jpg";
    const avatarUrl =
      updateProfileForm.avatar.value ||
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*W35QUSvGpcLuxPo3SRTH4w.png";

    const profile = {
      bio: updateProfileForm.bio.value,
      avatar: {
        url: avatarUrl,
        alt: "avatar for " + name,
      },
      banner: {
        url: bannerUrl,
        alt: "banner for " + name,
      },
    };

    // Call the updateProfile function
    updateProfile(profile);
    extendProfile();
  });
}
