(() => {
  const staticAreaMap = new Map([
    ["서울|강남|역삼동", "gangnam-yeoksam.html"],
    ["서울|송파|잠실동", "songpa-jamsil.html"],
    ["서울|서초|반포동", "seocho-banpo.html"],
    ["서울|마포|합정동", "mapo-hapjeong.html"],
    ["경기|성남 분당|판교동", "bundang-pangyo.html"],
    ["인천|연수 송도|송도동", "incheon-songdo.html"]
  ]);

  const slugOverrides = {
    "서울": "seoul", "경기": "gyeonggi", "인천": "incheon", "부산": "busan", "대구": "daegu", "대전": "daejeon", "광주": "gwangju", "세종": "sejong", "강원": "gangwon", "제주": "jeju", "전북": "jeonbuk",
    "강남": "gangnam", "서초": "seocho", "송파": "songpa", "마포": "mapo", "영등포": "yeongdeungpo", "용산": "yongsan", "성동": "seongdong", "광진": "gwangjin", "중구": "jung-gu", "종로": "jongno", "강서": "gangseo", "관악": "gwanak", "동작": "dongjak", "강동": "gangdong", "노원": "nowon", "은평": "eunpyeong", "구로": "guro", "금천": "geumcheon", "동대문": "dongdaemun", "서대문": "seodaemun", "성북": "seongbuk", "양천": "yangcheon", "중랑": "jungnang", "강북": "gangbuk", "도봉": "dobong",
    "성남 분당": "bundang", "수원": "suwon", "용인": "yongin", "고양 일산": "ilsan", "안양": "anyang", "부천": "bucheon", "화성 동탄": "dongtan", "연수 송도": "songdo", "부평": "bupyeong", "남동": "namdong", "서구": "seo-gu", "미추홀": "michuhol", "계양": "gyeyang", "해운대": "haeundae", "부산진": "busanjin", "수영": "suyeong", "수성": "suseong", "달서": "dalseo", "유성": "yuseong", "신도심": "new-town", "조치원": "jochiwon", "광산": "gwangsan", "동구": "dong-gu", "전주": "jeonju", "익산": "iksan", "군산": "gunsan", "춘천": "chuncheon", "원주": "wonju", "강릉": "gangneung", "제주시": "jeju-si", "서귀포": "seogwipo",
    "개포동": "gaepo-dong", "논현동": "nonhyeon-dong", "대치동": "daechi-dong", "도곡동": "dogok-dong", "삼성동": "samseong-dong", "세곡동": "segok-dong", "수서동": "suseo-dong", "신사동": "sinsa-dong", "압구정동": "apgujeong-dong", "역삼동": "yeoksam-dong", "일원동": "irwon-dong", "자곡동": "jagok-dong", "청담동": "cheongdam-dong", "잠실동": "jamsil-dong", "반포동": "banpo-dong", "합정동": "hapjeong-dong", "판교동": "pangyo-dong", "송도동": "songdo-dong", "우동": "u-dong", "중동": "jung-dong", "좌동": "jwa-dong", "재송동": "jaesong-dong"
  };

  const reverseSlugs = Object.fromEntries(Object.entries(slugOverrides).map(([label, slug]) => [slug, label]));
  const cityRegions = { "서울": "capital", "경기": "capital", "인천": "capital", "부산": "yeongnam", "대구": "yeongnam", "대전": "chungcheong", "세종": "chungcheong", "광주": "honam", "전북": "honam", "강원": "gangwonjeju", "제주": "gangwonjeju" };
  window.MAZZANG_AREA_SLUGS = { slugOverrides, reverseSlugs, cityRegions };

  const initial = ["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"];
  const medial = ["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"];
  const finalSound = ["","k","k","ks","n","nj","nh","t","l","lk","lm","lb","ls","lt","lp","lh","m","p","ps","t","t","ng","t","t","k","t","p","t"];

  function romanize(text) {
    return Array.from(text).map((char) => {
      const code = char.charCodeAt(0) - 44032;
      if (code < 0 || code > 11171) return char;
      const jong = code % 28;
      const jung = ((code - jong) / 28) % 21;
      const cho = Math.floor((code - jong) / 28 / 21);
      return initial[cho] + medial[jung] + finalSound[jong];
    }).join("");
  }

  function toSlug(label) {
    const cleanLabel = clean(label).replace(/출장마사지/g, "").trim();
    return slugOverrides[cleanLabel] || romanize(cleanLabel).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
  }

  function fromSlug(slug) {
    const value = clean(slug);
    return reverseSlugs[value] || value;
  }

  window.MAZZANG_AREA_SLUGS.toSlug = toSlug;
  window.MAZZANG_AREA_SLUGS.fromSlug = fromSlug;

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

  function areaUrl(city, district, dong) {
    const parts = ["", "area", toSlug(city)];
    if (district) parts.push(toSlug(district));
    if (dong) parts.push(toSlug(dong));
    return `${parts.join("/")}/`;
  }

  function cleanAreaUrl(info) {
    const staticUrl = staticAreaMap.get(info.key);
    if (staticUrl) return staticUrl;
    return areaUrl(info.city, info.district, info.dong);
  }

  function applyStaticLinks() {
    document.querySelectorAll('a[href*="area.html?"]').forEach((link) => {
      const info = areaInfoFromHref(link.getAttribute("href"));
      if (!info) return;
      link.setAttribute("href", cleanAreaUrl(info));
      link.setAttribute("data-clean-area", "true");
    });
  }

  function cleanLabel(text) {
    return (text || "").replace(/\s*선택\s*$/, "").replace(/\s*출장마사지/g, "").trim();
  }

  function activeText(selector) {
    return cleanLabel(document.querySelector(`#regions ${selector}`)?.textContent || "");
  }

  function pushAreaUrl(city, district) {
    if (!city || location.pathname.includes(".html")) return;
    const next = areaUrl(city, district);
    if (location.pathname !== next) history.pushState({ city, district }, "", next);
  }

  function clickButton(selector, matcher) {
    const buttons = [...document.querySelectorAll(selector)];
    const target = buttons.find((button) => cleanLabel(button.textContent) === matcher || button.dataset.region === matcher);
    target?.click();
    return Boolean(target);
  }

  function applyInitialSelectionFromUrl() {
    const root = document.querySelector("#regions");
    if (!root) return;
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts[0] !== "area" || parts.length < 2 || parts.length > 3) return;

    const city = fromSlug(parts[1]);
    const district = parts[2] ? fromSlug(parts[2]) : "";
    const region = cityRegions[city];
    window.__mazzangSuppressHistory = true;
    if (region) clickButton("#regions .region-tabs button[data-region]", region);
    window.setTimeout(() => {
      clickButton("#regions #subregion-list button[data-city]", city);
      window.setTimeout(() => {
        if (district) clickButton("#regions #dong-list button[data-district]", district);
        window.__mazzangSuppressHistory = false;
      }, 80);
    }, 80);
  }

  applyStaticLinks();
  applyInitialSelectionFromUrl();
  const target = document.querySelector("#regions") || document.body;
  new MutationObserver(applyStaticLinks).observe(target, { childList: true, subtree: true });

  const root = document.querySelector("#regions");
  if (!root) return;

  const baseTitle = "출장 마사지 바로 예약 | 실시간 관리사 매칭";
  const baseDescription = "내 지역으로 오는 출장 마사지. 전국 어디든 관리사 매칭. 강남, 인천, 수원, 부산 등 전국 50개 지역 예약 가능.";

  const cityCopy = {
    "서울": { title: "서울 출장마사지 가능 지역 | 가격·코스·예약 안내", description: "서울 출장마사지 이용 전 확인하면 좋은 방문 가능 지역, 예약 기준, 코스 선택 방법, 가격 차이와 상담 전 확인사항을 안내합니다." },
    "경기": { title: "경기 출장마사지 가능 지역 | 수원·분당·일산 예약 안내", description: "경기 출장마사지 가능 지역과 주요 생활권, 이동 시간, 코스별 요금 차이, 예약 전 확인 기준을 정리했습니다." },
    "인천": { title: "인천 출장마사지 가능 지역 | 송도·부평·청라 예약 안내", description: "인천 출장마사지 이용 전 확인할 방문 가능 범위, 주요 생활권, 예약 시간, 코스와 가격 기준을 안내합니다." },
    "부산": { title: "부산 출장마사지 가능 지역 | 해운대·서면·남포 예약 안내", description: "부산 출장마사지 가능 지역과 주요 상권별 예약 흐름, 이동 시간, 코스 선택 기준을 확인할 수 있습니다." },
    "대구": { title: "대구 출장마사지 가능 지역 | 수성·중구·달서 예약 안내", description: "대구 출장마사지 예약 전 확인할 주요 생활권, 방문 가능 시간, 코스와 요금 차이를 안내합니다." },
    "대전": { title: "대전 출장마사지 가능 지역 | 둔산·유성·중구 예약 안내", description: "대전 출장마사지 이용 전 확인할 주요 생활권, 예약 가능 시간, 이동 기준, 코스와 요금 차이를 안내합니다." },
    "광주": { title: "광주 출장마사지 가능 지역 | 상무·첨단·수완 예약 안내", description: "광주 출장마사지 가능 지역과 생활권별 상담 기준, 예약 가능 시간, 코스 선택 전 확인사항을 정리했습니다." }
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

  function selectedRegion() { return activeText(".region-tabs button.is-active"); }
  function selectedCity() { return activeText("#subregion-list button.is-active"); }
  function selectedDistrict() { return activeText("#dong-list button.is-active"); }
  function titleForRegion(region) { return `${region} 출장마사지 가능 지역 | 전국 권역별 예약 안내`; }
  function descriptionForRegion(region) { return `${region} 출장마사지 가능 지역을 먼저 확인하고 주요 도시, 생활권, 예약 가능 시간과 코스 기준을 비교할 수 있습니다.`; }
  function titleForCity(city) { return cityCopy[city]?.title || `${city} 출장마사지 가능 지역 | 가격·코스·예약 안내`; }
  function descriptionForCity(city) { return cityCopy[city]?.description || `${city} 출장마사지 이용 전 확인하면 좋은 방문 가능 범위, 예약 기준, 코스 선택 방법과 가격 차이를 정리했습니다.`; }
  function titleForDistrict(city, district) { return `${district} 출장마사지 예약 전 확인사항 | ${city} 가격·지역·코스 안내`; }
  function descriptionForDistrict(city, district) { return `${district} 출장마사지 이용 전 확인하면 좋은 예약 기준, 가격 차이, 주요 생활권, 방문 가능 범위와 코스 선택 방법을 정리했습니다.`; }

  function updateMeta(depth, override = {}) {
    const region = override.region || selectedRegion();
    const city = override.city || selectedCity();
    const district = override.district || selectedDistrict();

    if (depth === "district" && city && district) {
      setMeta(titleForDistrict(city, district), descriptionForDistrict(city, district));
      if (!window.__mazzangSuppressHistory) pushAreaUrl(city, district);
      return;
    }
    if ((depth === "city" || depth === "district") && city) {
      setMeta(titleForCity(city), descriptionForCity(city));
      if (!window.__mazzangSuppressHistory) pushAreaUrl(city);
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
      updateMeta("district", { city: selectedCity(), district: cleanLabel(districtButton.textContent) });
      return;
    }
    if (cityButton) {
      window.setTimeout(() => updateMeta("city", { city: cleanLabel(cityButton.textContent) }), 80);
      return;
    }
    if (regionButton) window.setTimeout(() => updateMeta("region", { region: cleanLabel(regionButton.textContent) }), 80);
  }, true);

  window.setTimeout(() => {
    if (!location.pathname.startsWith("/area/")) updateMeta("city");
  }, 300);
})();
