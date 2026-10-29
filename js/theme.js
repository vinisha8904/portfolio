// Dark / light theme toggle. The saved choice lives in localStorage.
export function initTheme() {
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");

  const sync = () => button.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));
  sync();

  button.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked: still works for this visit */ }
    sync();
  });
}
