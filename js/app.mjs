/**
 *This is the main entry point for the application. This file is responsible for loading the necessary modules and setting up the event listeners for the application.
 */

 import { loginModal, handleLoginModal } from "./handlers/loginModal.mjs";
 import { registerForm, handleRegForm } from "./handlers/registerForm.mjs";


 if (loginModal) {
    handleLoginModal();
 }

 if (registerForm) {
    handleRegForm();
 }