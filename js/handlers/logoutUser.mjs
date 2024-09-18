

// Logout the user
/**
 * Logout the user by clearing the token and profile from local storage
 */


export function logoutUser() {
    // Clear user token and profile from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
  
    // Optionally redirect to login or homepage after logout
    window.location.href = "/"; // Redirect to homepage, adjust URL if needed
  }
  

  export function handleLogoutButton() {
    const logoutButton = document.querySelector("#logout-button");
    
    if (logoutButton) {
      logoutButton.addEventListener("click", function () {
        logoutUser();
      });
    }
  }
