/**
 * @param {Object} profile
 * fills the update profile form with the profile data
 */

export function fillUpdateProfileForm(profile) {
  const updateProfileForm = document.getElementById("update-profile-form");

  // Fill the form with the profile data
  updateProfileForm.bio.value = profile.bio;
  updateProfileForm.avatar.value = profile.avatar.url;
  updateProfileForm.banner.value = profile.banner.url;
}
