// Mobile drawer: open/close, keyboard support, focus trap, and highlighting the section in view.
export function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  const backdrop = document.getElementById("nav-backdrop");
  const links = [...nav.querySelectorAll("a")];
  const desktop = window.matchMedia("(min-width: 768px)");

  function setOpen(open) {
    nav.dataset.open = String(open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Menu");
    backdrop.hidden = !open;
    document.body.classList.toggle("nav-open", open);
    if (open) links[0].focus();
  }

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  backdrop.addEventListener("click", () => setOpen(false));
  links.forEach((link) => link.addEventListener("click", () => setOpen(false)));

  document.addEventListener("keydown", (e) => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (!isOpen) return;

    if (e.key === "Escape") {
      setOpen(false);
      toggle.focus();
    }
    // Keep Tab inside the drawer (plus the toggle) while it is open
    if (e.key === "Tab") {
      const stops = [...links, toggle];
      const first = stops[0];
      const last = stops[stops.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Resizing up to desktop closes the drawer so the page is never stuck locked
  desktop.addEventListener("change", (e) => { if (e.matches) setOpen(false); });

  // Highlight the nav link for the section currently on screen
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          if (a.getAttribute("href") === `#${entry.target.id}`) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
}
