// Entry point: starts each feature module.
import { initTheme } from "./theme.js";
import { initNav } from "./nav.js";
import { initContactForm } from "./contact.js";

document.getElementById("year").textContent = new Date().getFullYear();
initTheme();
initNav();
initContactForm();
