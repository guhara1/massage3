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

(() => {
  const root = document.querySelector("#regions");
  if (!root) return;

  const baseTitle = "출장 마사지 바로 예약 | 실시간 관리사 매칭";
  const baseDescription = "내 지역으로 오는 출장 마사지. 전국 어디든 관리사 매칭. 강남, 인천, 수원, 부산 등 전국 50개 지역 예약 가능.";

  const cityCopy = {
    "서울": {
      title: "서울 출장마사지 가능 지역 | 가격·코스·예약 안내",
      description: "서울 출장마사지 이용 전 확인하면 좋은 방문 가능 지역, 예약 기준, 코스 선택 방법, 가격 차이와 상담 전 확인사항을 안내합니다."
    },
    "경기": {
      title: "경기 출장마사지 가능 지역 | 수원·분당·일산 예약 안내",
      description: "경기 출장마사지 가능 지역과 주요 생활권, 이동 시간, 코스별 요금 차이, 예약 전 확인 기준을 정리했습니다."
    },
    "인천": {
      title: "인천 출장마사지 가능 지역 | 송도·부평·청라 예약 안내",
      description: "인천 출장마사지 이용 전 확인할 방문 가능 범위, 주요 생활권, 예약 시간, 코스와 가격 기준을 안내합니다."
    },
    "부산": {
      title: "부산 출장마사지 가능 지역 | 해운대·서면·남포 예약 안내",
      description: "부산 출장마사지 가능 지역과 주요 상권별 예약 흐름, 이동 시간, 코스 선택 기준을 확인할 수 있습니다."
    },
    "대구": {
      title: "대구 출장마사지 가능 지역 | 수성·중구·달서 예약 안내",
      description: "대구 출장마사지 예약 전 확인할 주요 생활권, 방문 가능 시간, 코스와 요금 차이를 안내합니다."
    },
    "대전": {
      title: "대전 출장마사지 가능 지역 | 둔산·유성·중구 예약 안내",
      description: "대전 출장마사지 이용 전 확인할 주요 생활권, 예약 가능 시간, 이동 기준, 코스와 요금 차이를 안내합니다."
    },
    "광주": {
      title: "광주 출장마사지 가능 지역 | 상무·첨단·수완 예약 안내",
      description: "광주 출장마사지 가능 지역과 생활권별 상담 기준, 예약 가능 시간, 코스 선택 전 확인사항을 정리했습니다."
    }
  };

  function getMetaDescription() {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    return meta;
  }

  function setMeta(title, description) {
    document.title = title;
    getMetaDescription().setAttribute("content", description);
    root.setAttribute("data-current-title", title);
    root.setAttribute("data-current-description", description);
  }

  function cleanLabel(text) {
    return (text || "").replace(/\s*선택\s*$/, "").trim();
  }

  function activeText(selector) {
    return cleanLabel(root.querySelector(selector)?.textContent || "");
  }

  function selectedRegion() {
    return activeText(".region-tabs button.is-active");
  }

  function selectedCity() {
    return activeText("#subregion-list button.is-active");
  }

  function selectedDistrict() {
    return activeText("#dong-list button.is-active");
  }

  function titleForRegion(region) {
    return `${region} 출장마사지 가능 지역 | 전국 권역별 예약 안내`;
  }

  function descriptionForRegion(region) {
    return `${region} 출장마사지 가능 지역을 먼저 확인하고 주요 도시, 생활권, 예약 가능 시간과 코스 기준을 비교할 수 있습니다.`;
  }

  function titleForCity(city) {
    return cityCopy[city]?.title || `${city} 출장마사지 가능 지역 | 가격·코스·예약 안내`;
  }

  function descriptionForCity(city) {
    return cityCopy[city]?.description || `${city} 출장마사지 이용 전 확인하면 좋은 방문 가능 범위, 예약 기준, 코스 선택 방법과 가격 차이를 정리했습니다.`;
  }

  function titleForDistrict(city, district) {
    return `${district} 출장마사지 예약 전 확인사항 | ${city} 가격·지역·코스 안내`;
  }

  function descriptionForDistrict(city, district) {
    return `${district} 출장마사지 이용 전 확인하면 좋은 예약 기준, 가격 차이, 주요 생활권, 방문 가능 범위와 코스 선택 방법을 정리했습니다.`;
  }

  function updateMeta(depth, override = {}) {
    const region = override.region || selectedRegion();
    const city = override.city || selectedCity();
    const district = override.district || selectedDistrict();

    if (depth === "district" && city && district) {
      setMeta(titleForDistrict(city, district), descriptionForDistrict(city, district));
      return;
    }

    if ((depth === "city" || depth === "district") && city) {
      setMeta(titleForCity(city), descriptionForCity(city));
      return;
    }

    if (depth === "region" && region) {
      setMeta(titleForRegion(region), descriptionForRegion(region));
      return;
    }

    setMeta(baseTitle, baseDescription);
  }

  root.addEventListener("click", (event) => {
    if (event.target.closest("#dong-list a")) return;

    const regionButton = event.target.closest(".region-tabs button[data-region]");
    const cityButton = event.target.closest("#subregion-list button[data-city]");
    const districtButton = event.target.closest("#dong-list button[data-district]");

    if (districtButton) {
      updateMeta("district", {
        city: selectedCity(),
        district: cleanLabel(districtButton.textContent)
      });
      return;
    }
    if (cityButton) {
      window.setTimeout(() => updateMeta("city", { city: cleanLabel(cityButton.textContent) }), 80);
      return;
    }
    if (regionButton) {
      window.setTimeout(() => updateMeta("region", { region: cleanLabel(regionButton.textContent) }), 80);
    }
  }, true);

  window.setTimeout(() => updateMeta("city"), 300);
})();
