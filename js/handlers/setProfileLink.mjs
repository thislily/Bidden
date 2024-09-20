//set profile link from user profile in local storage

export function setProfileLink() {
    if (!localStorage.getItem("profile")) {
        return;
    }

    const profile = JSON.parse(localStorage.getItem("profile"));

    const profileLink = document.getElementById("profile-link");

    if (profile && profileLink) {  // Check if profileLink is not null
        profileLink.href = `/profile/index.html?name=${profile.name}`;
    } else {
        console.error("Profile link element not found or profile is invalid.");
    }
}
