import { registerUser } from "../api/auth/register.mjs";

/**
 * handle the registration form submission
 * @returns {Object} - the user profile data
 *
 */
export const registerForm = document.querySelector("#register-form");

export function handleRegForm() {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (registerForm.banner.value === "") {
      registerForm.banner.value ="https://i.etsystatic.com/30097568/r/il/394cca/3255209417/il_570xN.3255209417_g5c8.jpg"
       
    }   

    if (registerForm.avatar.value === "") {
      registerForm.avatar.value ="https://miro.medium.com/v2/resize:fit:720/format:webp/1*W35QUSvGpcLuxPo3SRTH4w.png"
       
    }

    const profile = {
      name: registerForm.regName.value,
      email: registerForm.regEmail.value,
      bio: registerForm.bio.value,
      password: registerForm.regPassword.value,
      avatar: {
        url: registerForm.avatar.value,
        alt: "avatar",
      },
      banner:{
        url: registerForm.banner.value,
        alt: "banner"
      },
    };

    registerUser(profile);
  });
}