(() => {
  const slugOverrides = {
    "서울": "seoul", "경기": "gyeonggi", "인천": "incheon", "부산": "busan", "대구": "daegu", "대전": "daejeon", "광주": "gwangju", "세종": "sejong", "강원": "gangwon", "제주": "jeju", "전북": "jeonbuk",
    "강남": "gangnam", "서초": "seocho", "송파": "songpa", "마포": "mapo", "영등포": "yeongdeungpo", "용산": "yongsan", "성동": "seongdong", "광진": "gwangjin", "중구": "jung-gu", "종로": "jongno", "강서": "gangseo", "관악": "gwanak", "동작": "dongjak", "강동": "gangdong", "노원": "nowon", "은평": "eunpyeong", "구로": "guro", "금천": "geumcheon", "동대문": "dongdaemun", "서대문": "seodaemun", "성북": "seongbuk", "양천": "yangcheon", "중랑": "jungnang", "강북": "gangbuk", "도봉": "dobong",
    "성남 분당": "bundang", "분당": "bundang", "수원": "suwon", "용인": "yongin", "고양 일산": "ilsan", "일산": "ilsan", "안양": "anyang", "부천": "bucheon", "화성 동탄": "dongtan", "동탄": "dongtan", "연수 송도": "songdo", "송도": "songdo", "부평": "bupyeong", "남동": "namdong", "서구": "seo-gu", "미추홀": "michuhol", "계양": "gyeyang",
    "해운대": "haeundae", "부산진": "busanjin", "수영": "suyeong", "수성": "suseong", "달서": "dalseo", "유성": "yuseong", "신도심": "new-town", "조치원": "jochiwon", "광산": "gwangsan", "동구": "dong-gu", "전주": "jeonju", "익산": "iksan", "군산": "gunsan", "춘천": "chuncheon", "원주": "wonju", "강릉": "gangneung", "제주시": "jeju-si", "서귀포": "seogwipo",
    "개포동": "gaepo-dong", "논현동": "nonhyeon-dong", "대치동": "daechi-dong", "도곡동": "dogok-dong", "삼성동": "samseong-dong", "세곡동": "segok-dong", "수서동": "suseo-dong", "신사동": "sinsa-dong", "압구정동": "apgujeong-dong", "역삼동": "yeoksam-dong", "일원동": "irwon-dong", "자곡동": "jagok-dong", "청담동": "cheongdam-dong", "잠실동": "jamsil-dong", "반포동": "banpo-dong", "합정동": "hapjeong-dong", "판교동": "pangyo-dong", "송도동": "songdo-dong", "우동": "u-dong", "중동": "jung-dong", "좌동": "jwa-dong", "재송동": "jaesong-dong"
  };

  const reverseSlugs = Object.fromEntries(Object.entries(slugOverrides).map(([label, slug]) => [slug, label]));
  const cityRegions = { "서울": "capital", "경기": "capital", "인천": "capital", "부산": "yeongnam", "대구": "yeongnam", "대전": "chungcheong", "세종": "chungcheong", "광주": "honam", "전북": "honam", "강원": "gangwonjeju", "제주": "gangwonjeju" };
  const initial = ["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"];
  const medial = ["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"];
  const finalSound = ["","k","k","ks","n","nj","nh","t","l","lk","lm","lb","ls","lt","lp","lh","m","p","ps","t","t","ng","t","t","k","t","p","t"];

  function clean(value) {
    try { return decodeURIComponent(value || "").trim(); } catch { return (value || "").trim(); }
  }

  function cleanLabel(text) {
    return clean(text).replace(/\s*선택\s*$/, "").replace(/\s*출장마사지/g, "").trim();
  }

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
    const value = cleanLabel(label);
    return slugOverrides[value] || romanize(value).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
  }

  function fromSlug(slug) {
    const value = clean(slug);
    return reverseSlugs[value] || value;
  }

  function areaUrl(city, district, dong) {
    const parts = ["", "area", toSlug(city)];
    if (district) parts.push(toSlug(district));
    if (dong) parts.push(toSlug(dong));
    return `${parts.join("/")}/`;
  }

  window.MAZZANG_AREA_SLUGS = { slugOverrides, reverseSlugs, cityRegions, toSlug, fromSlug, areaUrl };

  function applyCleanRegionNav() {
    const nav = document.querySelector(".main-nav");
    if (!nav) return;
    const regionItem = Array.from(nav.querySelectorAll(".nav-item")).find((item) => item.querySelector(":scope > a")?.textContent.includes("지역"));
    if (!regionItem) return;

    const mainLink = regionItem.querySelector(":scope > a");
    if (mainLink) {
      mainLink.href = "/#regions";
      mainLink.textContent = "지역 출장마사지";
    }

    let dropdown = regionItem.querySelector(":scope > .dropdown");
    if (!dropdown) {
      dropdown = document.createElement("div");
      dropdown.className = "dropdown";
      regionItem.appendChild(dropdown);
    }
    if (dropdown.dataset.cleanAreaNav === "true") return;

    const links = [
      ["서울", "/area/seoul/"], ["경기", "/area/gyeonggi/"], ["인천", "/area/incheon/"],
      ["부산", "/area/busan/"], ["대구", "/area/daegu/"], ["대전", "/area/daejeon/"],
      ["광주", "/area/gwangju/"], ["강원", "/area/gangwon/"], ["제주", "/area/jeju/"]
    ];
    dropdown.replaceChildren(...links.map(([label, href]) => {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      return link;
    }));
    dropdown.dataset.cleanAreaNav = "true";
  }

  function areaInfoFromHref(href) {
    const url = new URL(href, location.href);
    if (!url.pathname.endsWith("area.html")) return null;
    const city = clean(url.searchParams.get("city"));
    const district = clean(url.searchParams.get("district"));
    const dong = clean(url.searchParams.get("dong"));
    if (!city || !district || !dong) return null;
    return { city, district, dong };
  }

  function cleanAreaLink(link) {
    const info = areaInfoFromHref(link.getAttribute("href") || "");
    if (!info) return;
    link.href = areaUrl(info.city, info.district, info.dong);
    link.dataset.cleanArea = "true";
  }

  function applyStaticLinks() {
    applyCleanRegionNav();
    document.querySelectorAll('a[href*="area.html?"]').forEach(cleanAreaLink);
  }

  function metaDescription() {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    return meta;
  }

  function setMeta(title, description) {
    document.title = title;
    metaDescription().content = description;
  }

  function titleForCity(city) {
    return `${city} 출장마사지 가능 지역 | 가격·코스·예약 안내`;
  }

  function descriptionForCity(city) {
    return `${city} 출장마사지 이용 전 확인하면 좋은 방문 가능 범위, 예약 기준, 코스 선택 방법과 가격 차이를 정리했습니다.`;
  }

  function titleForDistrict(city, district) {
    return `${district} 출장마사지 예약 전 확인사항 | ${city} 가격·지역·코스 안내`;
  }

  function descriptionForDistrict(district) {
    return `${district} 출장마사지 이용 전 확인하면 좋은 예약 기준, 가격 차이, 주요 생활권, 방문 가능 범위와 코스 선택 방법을 정리했습니다.`;
  }

  function selectedText(root, selector) {
    return cleanLabel(root.querySelector(selector)?.textContent || "");
  }

  function pushAreaUrl(city, district) {
    if (!city || location.pathname.includes(".html")) return;
    const next = areaUrl(city, district);
    if (location.pathname !== next) history.pushState({ city, district }, "", next);
  }

  function bindRegionSeo() {
    const root = document.querySelector("#regions");
    if (!root || root.dataset.cleanAreaSeo === "true") return;
    root.dataset.cleanAreaSeo = "true";

    root.addEventListener("click", (event) => {
      if (event.target.closest("#dong-list a")) return;
      const cityButton = event.target.closest("#subregion-list button[data-city]");
      const districtButton = event.target.closest("#dong-list button[data-district]");

      if (districtButton) {
        const city = selectedText(root, "#subregion-list button.is-active");
        const district = cleanLabel(districtButton.textContent);
        setMeta(titleForDistrict(city, district), descriptionForDistrict(district));
        pushAreaUrl(city, district);
        return;
      }

      if (cityButton) {
        const city = cleanLabel(cityButton.textContent);
        window.setTimeout(() => {
          setMeta(titleForCity(city), descriptionForCity(city));
          pushAreaUrl(city);
        }, 80);
      }
    }, true);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href*="area.html?"]');
    if (!link) return;
    cleanAreaLink(link);
  }, true);

  applyStaticLinks();
  bindRegionSeo();
  window.setTimeout(() => { applyStaticLinks(); bindRegionSeo(); }, 300);
  window.setTimeout(() => { applyStaticLinks(); bindRegionSeo(); }, 1200);
})();
