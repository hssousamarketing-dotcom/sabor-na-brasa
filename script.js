const toggle = document.querySelector("#menu-toggle");
const nav = document.querySelector("#nav-links");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.textContent = open ? "×" : "☰";
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.textContent = "☰";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  });
});

const tabs = document.querySelectorAll(".menu-tab");
const dishes = document.querySelectorAll(".dish-card");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    dishes.forEach((dish) => {
      dish.hidden = filter !== "todos" && dish.dataset.category !== filter;
    });
  });
});

const sections = document.querySelectorAll("main section[id]");
const links = nav.querySelectorAll("a");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => link.classList.toggle(
      "active", link.getAttribute("href") === `#${entry.target.id}`
    ));
  });
}, { rootMargin: "-25% 0px -65% 0px" });
sections.forEach((section) => observer.observe(section));
