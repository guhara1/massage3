(() => {
  const staticAreaMap = new Map([
    ["서울|강남|역삼동", "gangnam-yeoksam.html"],
    ["서울|송파|잠실동", "songpa-jamsil.html"],
    ["서울|서초|반포동", "seocho-banpo.html"],
    ["서울|마포|합정동", "mapo-hapjeong.html"],
    ["경기|성남 분당|판교동", "bundang-pangyo.html"],
    ["인천|연수 송도|송도동", "incheon-songdo.html"]
  ]);

  function clean(value) {
    try { return decodeURIComponent(value || "").trim(); } catch { return (value || "").trim(); }
  }

  function areaInfoFromHref(href) {
    const url = new URL(href, location.href);
    if (!url.pathname.endsWith("area.html")) return null;
    const city = clean(url.searchParams.get("city"));
    const district = clean(url.searchParams.get("district"));
    const dong = clean(url.searchParams.get("dong"));
    if (!city || !district || !dong) return null;
    return { city, district, dong, key: [city, district, dong].join("|") };
  }

  function cleanAreaUrl(info) {
    const staticUrl = staticAreaMap.get(info.key);
    if (staticUrl) return staticUrl;
    return `/area/${encodeURIComponent(info.city)}/${encodeURIComponent(info.district)}/${encodeURIComponent(info.dong)}/`;
  }

  function applyStaticLinks() {
    document.querySelectorAll('a[href*="area.html?"]').forEach((link) => {
      const info = areaInfoFromHref(link.getAttribute("href"));
      if (!info) return;
      link.setAttribute("href", cleanAreaUrl(info));
      link.setAttribute("data-clean-area", "true");
    });
  }

  applyStaticLinks();
  const target = document.querySelector("#regions") || document.body;
  new MutationObserver(applyStaticLinks).observe(target, { childList: true, subtree: true });
})();
