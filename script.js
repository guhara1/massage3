(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector("#main-nav");

  navToggle?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("is-open") || false;
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  const regions = document.querySelector("#regions");
  if (!regions) return;

  const mobileQuery = window.matchMedia("(max-width: 680px)");
  const style = document.createElement("style");
  style.textContent = `
    @media (max-width: 680px) {
      #regions .subregion-list.mobile-step-focus,
      #regions .dong-card.mobile-step-focus {
        outline: 2px solid rgba(255, 138, 29, .92);
        box-shadow: 0 0 0 4px rgba(255, 138, 29, .16), 0 22px 54px rgba(0, 0, 0, .5) !important;
      }

      #regions .subregion-list,
      #regions .dong-card {
        scroll-margin-top: 84px;
      }
    }
  `;
  document.head.appendChild(style);

  function jumpToStep(selector) {
    if (!mobileQuery.matches) return;

    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        const target = regions.querySelector(selector);
        if (!target) return;

        const header = document.querySelector(".site-header");
        const headerHeight = header ? header.getBoundingClientRect().height : 72;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;

        target.classList.add("mobile-step-focus");
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        window.setTimeout(() => target.classList.remove("mobile-step-focus"), 1200);
      }, 70);
    });
  }

  regions.addEventListener("click", (event) => {
    const regionButton = event.target.closest(".region-tabs button[data-region]");
    const cityButton = event.target.closest("#subregion-list button[data-city]");
    const districtButton = event.target.closest("#dong-list button[data-district]");

    if (regionButton) {
      jumpToStep(".subregion-list");
      return;
    }

    if (cityButton || districtButton) {
      jumpToStep(".dong-card");
    }
  }, true);
})();
