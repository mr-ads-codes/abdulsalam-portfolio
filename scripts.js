const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
const navLinks = nav.querySelectorAll("a");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const setMenu = (open) => {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.querySelector(".sr-only").textContent = open
    ? "Close navigation"
    : "Open navigation";
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
};

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

navLinks.forEach((link) =>
  link.addEventListener("click", () => setMenu(false)),
);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

const updateHeader = () =>
  header.classList.toggle("is-scrolled", window.scrollY > 24);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  revealItems.forEach((item) => observer.observe(item));
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();
