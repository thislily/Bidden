import { registerForm } from "./registerForm.mjs";
import { loginForm } from "./loginForm.mjs";


/**
 * handle the login modal
 * 
 * 
 */

export const loginModal = document.querySelector("#login-modal");
export const viewLoginButton = document.querySelector("#view-login-button");
export const viewRegisterButton = document.querySelector("#view-register-button");
export const loginLabel = document.querySelector("#login-label");


export function handleLoginModal() {
    viewRegisterButton.addEventListener("click", function () {
        registerForm.classList.remove("d-none");    
        loginForm.classList.add("d-none");
        registerForm.classList.add("d-block");
        loginForm.classList.remove("d-block");

        viewLoginButton.classList.remove("btn-secondary", "shadow-subtle");
        viewLoginButton.classList.add("btn-dark");
        viewRegisterButton.classList.remove("btn-dark");
        viewRegisterButton.classList.add("btn-secondary", "shadow-subtle");

        loginLabel.textContent = "Sign up here";
    }
);

    viewLoginButton.addEventListener("click", function () {
        loginForm.classList.remove("d-none");
        registerForm.classList.add("d-none");
        loginForm.classList.add("d-block");
        registerForm.classList.remove("d-block");

        viewRegisterButton.classList.remove("btn-secondary", "shadow-subtle");
        viewRegisterButton.classList.add("btn-dark");
        viewLoginButton.classList.remove("btn-dark");
        viewLoginButton.classList.add("btn-secondary", "shadow-subtle");

        loginLabel.textContent = "Log in here";
    }   

  );
}

