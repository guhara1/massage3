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

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => loadScript("/area-slug-labels.js"), 500);
    setTimeout(() => runReliableSelector(), 900);
    setTimeout(() => loadScript("/main-region-unifier.js"), 1400);
    setTimeout(() => runReliableSelector(), 1800);
    setTimeout(() => loadScript("/main-region-unifier.js"), 2400);
  });
})();
