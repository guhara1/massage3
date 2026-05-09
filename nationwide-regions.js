(() => {
  function loadScript(src) {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    document.body.appendChild(script);
  }

  function runReliableSelector() {
    if (typeof setupReliableRegionSelector === "function") {
      setupReliableRegionSelector(true);
    }
  }

  function loadFullRegionSelector() {
    loadScript("/area-data-full.js");
    setTimeout(() => loadScript("/full-region-selector.js"), 150);
  }

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => loadScript("/area-slug-labels.js"), 400);
    setTimeout(() => loadFullRegionSelector(), 650);
    setTimeout(() => runReliableSelector(), 900);
    setTimeout(() => loadScript("/main-region-unifier.js"), 1400);
    setTimeout(() => loadFullRegionSelector(), 1700);
    setTimeout(() => runReliableSelector(), 1900);
    setTimeout(() => loadScript("/main-region-unifier.js"), 2400);
    setTimeout(() => loadFullRegionSelector(), 2700);
  });
})();
