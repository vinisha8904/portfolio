// Contact form: validates in the browser, then opens the visitor's email app with the message filled in.
// (A static site has no server, so a mailto link is the free way to deliver the message.)
import { CONTACT_EMAIL } from "./config.js";

export function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const fields = {
    name: form.elements.name,
    email: form.elements.email,
    message: form.elements.message,
  };

  const rules = {
    name: (v) => (v.trim() ? "" : "Enter your name."),
    email: (v) => {
      if (!v.trim()) return "Enter your email address.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Enter a valid email, like name@example.com.";
    },
    message: (v) => (v.trim().length >= 10 ? "" : "Write at least 10 characters so I know how to help."),
  };

  function check(key) {
    const field = fields[key];
    const error = document.getElementById(`${key}-error`);
    const problem = rules[key](field.value);
    error.textContent = problem;
    error.hidden = !problem;
    field.setAttribute("aria-invalid", String(Boolean(problem)));
    return !problem;
  }

  // Re-check a field as soon as the visitor leaves it, and while fixing an error
  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("blur", () => check(key));
    fields[key].addEventListener("input", () => {
      if (fields[key].getAttribute("aria-invalid") === "true") check(key);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    const results = Object.keys(fields).map(check);
    const firstBad = Object.keys(fields).find((k, i) => !results[i]);
    if (firstBad) {
      fields[firstBad].focus();
      return;
    }

    const subject = `Portfolio message from ${fields.name.value.trim()}`;
    const body = `${fields.message.value.trim()}\n\nFrom: ${fields.name.value.trim()} (${fields.email.value.trim()})`;
    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    status.textContent = "Opening your email app. Press send there to finish.";
    status.classList.add("ok");
    form.reset();
  });
}
