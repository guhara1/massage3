(() => {
  const staticAreaMap = new Map([
    ["서울|강남|역삼동", "gangnam-yeoksam.html"],
    ["서울|송파|잠실동", "songpa-jamsil.html"],
    ["서울|서초|반포동", "seocho-banpo.html"],
    ["서울|마포|합정동", "mapo-hapjeong.html"],
    ["경기|성남 분당|판교동", "bundang-pangyo.html"],
    ["인천|연수 송도|송도동", "incheon-songdo.html"]
  ]);

  function decode(value) {
    try { return decodeURIComponent(value || ""); } catch { return value || ""; }
  }

  function staticUrlFromHref(href) {
    const url = new URL(href, location.href);
    if (!url.pathname.endsWith("area.html")) return null;
    const key = ["city", "district", "dong"].map((name) => decode(url.searchParams.get(name))).join("|");
    return staticAreaMap.get(key) || null;
  }

  function applyStaticLinks() {
    document.querySelectorAll('a[href*="area.html?"]').forEach((link) => {
      const staticUrl = staticUrlFromHref(link.getAttribute("href"));
      if (!staticUrl) return;
      link.setAttribute("href", staticUrl);
      link.setAttribute("data-static-area", "true");
    });
  }

  applyStaticLinks();
  const target = document.querySelector("#regions") || document.body;
  new MutationObserver(applyStaticLinks).observe(target, { childList: true, subtree: true });
})();
