(() => {
  function cleanLabel(text) {
    return String(text || "")
      .replace(/\s*선택\s*$/, "")
      .replace(/\s*출장마사지/g, "")
      .trim();
  }

  function fallbackSlug(label) {
    return encodeURIComponent(cleanLabel(label).replace(/\s+/g, "-"));
  }

  function sharedAreaUrl(city, district, dong) {
    if (window.MAZZANG_AREA_SLUGS?.areaUrl) return window.MAZZANG_AREA_SLUGS.areaUrl(city, district, dong);
    const parts = ["", "area", fallbackSlug(city)];
    if (district) parts.push(fallbackSlug(district));
    if (dong) parts.push(fallbackSlug(dong));
    return `${parts.join("/")}/`;
  }

  function currentState(root) {
    const state = root?._mazzangRegionState || {};
    const activeCity = root.querySelector("#subregion-list button.is-active")?.textContent;
    const title = root.querySelector("#dong-title")?.textContent || "";
    return {
      city: cleanLabel(state.city || activeCity || "서울"),
      district: cleanLabel(state.district || title || "강남"),
      gu: cleanLabel(state.gu || "")
    };
  }

  function fixDongLinks() {
    const root = document.querySelector("#regions");
    if (!root) return;
    const state = currentState(root);
    root.querySelectorAll("#dong-list a").forEach((link) => {
      const dong = cleanLabel(link.textContent);
      if (!dong) return;
      link.href = sharedAreaUrl(state.city, state.district, dong);
      link.setAttribute("aria-label", `${state.city} ${state.district}${state.gu ? " " + state.gu : ""} ${dong} 지역 안내`);
      link.dataset.unifiedAreaLink = "true";
    });
  }

  function bindOnce() {
    const root = document.querySelector("#regions");
    if (!root || root.dataset.mainRegionUnified === "true") return;
    root.dataset.mainRegionUnified = "true";
    root.addEventListener("click", () => {
      setTimeout(fixDongLinks, 0);
      setTimeout(fixDongLinks, 80);
      setTimeout(fixDongLinks, 250);
    }, true);
  }

  function run() {
    bindOnce();
    fixDongLinks();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  setTimeout(run, 300);
  setTimeout(run, 900);
  setTimeout(run, 1800);
})();
