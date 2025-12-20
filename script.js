// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Formspree AJAX (no redirect)
const form = document.getElementById("contactForm");
const formFields = document.getElementById("formFields");
const formSuccess = document.getElementById("formSuccess");
const formStatus = document.getElementById("formStatus");
const sendAnotherBtn = document.getElementById("sendAnotherBtn");
const sendBtn = document.getElementById("sendBtn");

async function handleSubmit(event) {
  event.preventDefault();
  if (!form) return;

  formStatus.textContent = "";
  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      form.reset();
      if (formFields) formFields.hidden = true;
      if (formSuccess) formSuccess.hidden = false;
    } else {
      formStatus.textContent = "Could not send. Please try again.";
    }
  } catch {
    formStatus.textContent = "Network error. Please try again.";
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Send";
  }
}

if (form) form.addEventListener("submit", handleSubmit);

if (sendAnotherBtn) {
  sendAnotherBtn.addEventListener("click", () => {
    if (formSuccess) formSuccess.hidden = true;
    if (formFields) formFields.hidden = false;
    formStatus.textContent = "";
    document.getElementById("contact-name")?.focus();
  });
}
