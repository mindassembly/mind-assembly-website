(() => {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute(
        "aria-label",
        open ? "Close navigation menu" : "Open navigation menu",
      );
      menu.textContent = open ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-label", "Open navigation menu");
        menu.textContent = "☰";
      }),
    );
  }
  const year = document.getElementById("copyright-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();

document.querySelectorAll("a[target=_blank]").forEach((a) => {
  a.rel = "noopener noreferrer";
});
