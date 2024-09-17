// import { loginUser } from "../api/auth/login.mjs";

/**
 * handle the login form submission
 * @returns {Object} - the user profile data
 *
 */
export const loginForm = document.querySelector("#login-form");

// export function handleLoginForm() {
//   loginForm.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const profile = {
//       email: loginForm.email.value,
//       password: loginForm.password.value,
//     };

//     loginUser(profile);
//   });
// }