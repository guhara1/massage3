function setupReviewSlider() {
  const slider = document.querySelector(".review-slider");
  if (!slider) return;

  const track = slider.querySelector(".review-track");
  const cards = Array.from(slider.querySelectorAll(".review-card"));
  const prevButton = slider.querySelector(".review-prev");
  const nextButton = slider.querySelector(".review-next");
  let index = 0;
  let startX = 0;

  function visibleCount() {
    return window.matchMedia("(max-width: 680px)").matches ? 1 : 2;
  }

  function maxIndex() {
    return Math.max(0, cards.length - visibleCount());
  }

  function updateSlider() {
    const card = cards[0];
    if (!card) return;
    index = Math.min(index, maxIndex());
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const step = card.getBoundingClientRect().width + gap;
    track.style.transform = `translateX(-${index * step}px)`;
    prevButton.disabled = index === 0;
    nextButton.disabled = index === maxIndex();
  }

  prevButton.addEventListener("click", () => {
    index = Math.max(0, index - visibleCount());
    updateSlider();
  });

  nextButton.addEventListener("click", () => {
    index = Math.min(maxIndex(), index + visibleCount());
    updateSlider();
  });

  track.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - startX;
    if (Math.abs(distance) < 42) return;
    index = distance < 0 ? Math.min(maxIndex(), index + 1) : Math.max(0, index - 1);
    updateSlider();
  });

  window.addEventListener("resize", updateSlider);
  updateSlider();
}

function maskLocalReviewName() {
  const reviewer = document.querySelector(".local-review-card span");
  if (!reviewer || !reviewer.textContent.includes("익명")) return;
  const areaText = reviewer.textContent.split("·")[1]?.trim() || "이용 고객";
  reviewer.textContent = `김0영 · ${areaText}`;
}

function loadStationLinks() {
  if (document.querySelector('script[src="/station-links.js"]')) return;
  const script = document.createElement("script");
  script.src = "/station-links.js";
  script.defer = true;
  document.body.appendChild(script);
}

function setupRegionStepFocus() {
  const root = document.querySelector("#regions");
  if (!root) return;

  const regionTabs = root.querySelector(".region-tabs");
  const subregionList = root.querySelector("#subregion-list");
  const detailCard = root.querySelector(".dong-card");
  const detailList = root.querySelector("#dong-list");
  const headerOffset = 92;

  [subregionList, detailCard, detailList].forEach((element) => {
    if (element) element.style.scrollMarginTop = `${headerOffset}px`;
  });

  function panelTop(element) {
    const box = element?.closest(".region-panel, .dong-card") || element;
    return (box?.getBoundingClientRect().top || 0) + window.scrollY - headerOffset;
  }

  function focusStep(element) {
    if (!element) return;
    const move = () => window.scrollTo({ top: Math.max(0, panelTop(element)), behavior: "smooth" });
    requestAnimationFrame(move);
    setTimeout(move, 90);
    setTimeout(() => window.scrollTo({ top: Math.max(0, panelTop(element)), behavior: "auto" }), 220);
  }

  regionTabs?.addEventListener("click", (event) => {
    if (!event.target.closest("button[data-region]")) return;
    focusStep(subregionList);
  });

  subregionList?.addEventListener("click", (event) => {
    if (!event.target.closest("button[data-city]")) return;
    focusStep(detailCard);
  });

  detailList?.addEventListener("click", (event) => {
    if (!event.target.closest("button[data-district], button[data-gu]")) return;
    focusStep(detailList);
  });
}

function setupGyeonggiAdminDepth() {
  const root = document.querySelector("#regions");
  if (!root) return;

  const detailTitle = root.querySelector("#dong-title");
  const detailSummary = root.querySelector("#dong-summary");
  const detailList = root.querySelector("#dong-list");
  const subregionList = root.querySelector("#subregion-list");
  const regionTabs = root.querySelector(".region-tabs");
  if (!detailList || !detailTitle || !detailSummary) return;

  const cityAliases = { "성남 분당": "성남", "고양 일산": "고양", "화성 동탄": "화성" };
  const citySlugs = { "성남": "bundang", "수원": "suwon", "용인": "yongin", "고양": "ilsan", "안양": "anyang", "부천": "bucheon" };
  const adminData = {
    "성남": {
      "수정구": ["신흥동", "태평동", "수진동", "단대동", "산성동", "양지동", "복정동", "위례동", "창곡동", "고등동"],
      "중원구": ["성남동", "중앙동", "금광동", "은행동", "상대원동", "하대원동", "도촌동"],
      "분당구": ["구미동", "금곡동", "백현동", "분당동", "삼평동", "서현동", "수내동", "야탑동", "운중동", "이매동", "정자동", "판교동"]
    },
    "수원": {
      "장안구": ["정자동", "조원동", "천천동", "율전동", "영화동", "송죽동", "파장동"],
      "권선구": ["권선동", "금곡동", "세류동", "호매실동", "곡반정동", "고색동", "탑동"],
      "팔달구": ["인계동", "우만동", "매산동", "매교동", "화서동", "지동", "고등동"],
      "영통구": ["영통동", "매탄동", "망포동", "원천동", "이의동", "하동", "신동"]
    },
    "용인": {
      "처인구": ["김량장동", "역북동", "삼가동", "유방동", "고림동", "포곡읍", "모현읍"],
      "기흥구": ["구갈동", "동백동", "마북동", "보정동", "상갈동", "영덕동", "중동"],
      "수지구": ["풍덕천동", "죽전동", "동천동", "상현동", "성복동", "신봉동"]
    },
    "고양": {
      "덕양구": ["화정동", "행신동", "삼송동", "원흥동", "도내동", "지축동", "향동동"],
      "일산동구": ["장항동", "마두동", "백석동", "식사동", "정발산동", "풍동"],
      "일산서구": ["대화동", "주엽동", "탄현동", "일산동", "가좌동", "덕이동"]
    },
    "안양": {
      "만안구": ["안양동", "석수동", "박달동"],
      "동안구": ["관양동", "비산동", "평촌동", "호계동"]
    },
    "부천": {
      "원미구": ["중동", "상동", "심곡동", "원미동", "춘의동", "도당동"],
      "소사구": ["소사본동", "송내동", "괴안동", "역곡동", "옥길동"],
      "오정구": ["오정동", "원종동", "고강동", "여월동", "작동"]
    }
  };

  function displayCity(label) {
    return cityAliases[label] || label;
  }

  function normalizeDong(dong) {
    return encodeURIComponent(dong.replace(/\s+/g, "-").replace(/동$/, "-dong").replace(/읍$/, "-eup").replace(/면$/, "-myeon"));
  }

  function areaUrl(city, dong) {
    if (window.MAZZANG_AREA_SLUGS?.areaUrl) return window.MAZZANG_AREA_SLUGS.areaUrl("경기", city, dong);
    return `/area/gyeonggi/${citySlugs[city] || encodeURIComponent(city)}/${normalizeDong(dong)}/`;
  }

  function normalizeCityButtons() {
    if (detailTitle.textContent.trim() !== "경기") return;
    detailList.querySelectorAll("button[data-district]").forEach((button) => {
      const original = button.dataset.district || button.textContent.trim();
      const shown = displayCity(original);
      button.dataset.gyeonggiCity = shown;
      button.textContent = shown;
    });
  }

  function renderAdminGus(city) {
    const groups = adminData[city];
    if (!groups) return false;
    detailTitle.textContent = `${city} 행정구 선택`;
    detailSummary.textContent = `${city}은 행정구별 생활권과 이동 동선이 달라 먼저 구를 선택한 뒤 세부 동을 확인하는 흐름이 정확합니다.`;
    detailList.innerHTML = Object.keys(groups).map((gu) => `<button type="button" data-gu="${gu}" data-city="${city}">${gu}</button>`).join("");
    return true;
  }

  function renderGuDongs(city, gu) {
    const dongs = adminData[city]?.[gu] || [];
    detailTitle.textContent = `${city} ${gu}`;
    detailSummary.textContent = `${city} ${gu} 안에서 이용할 세부 동을 선택하면 해당 지역 상세 안내 페이지로 이동합니다.`;
    detailList.innerHTML = dongs.map((dong) => `<a href="${areaUrl(city, dong)}" aria-label="경기 ${city} ${gu} ${dong} 지역 안내">${dong}</a>`).join("");
  }

  detailList.addEventListener("click", (event) => {
    const guButton = event.target.closest("button[data-gu]");
    if (guButton) {
      event.preventDefault();
      event.stopImmediatePropagation();
      renderGuDongs(guButton.dataset.city, guButton.dataset.gu);
      return;
    }

    const cityButton = event.target.closest("button[data-district]");
    if (!cityButton) return;
    const city = cityButton.dataset.gyeonggiCity || displayCity(cityButton.dataset.district || cityButton.textContent.trim());
    if (!adminData[city]) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    renderAdminGus(city);
  }, true);

  [subregionList, regionTabs].forEach((element) => {
    element?.addEventListener("click", () => setTimeout(normalizeCityButtons, 40));
  });

  const observer = new MutationObserver(normalizeCityButtons);
  observer.observe(detailList, { childList: true, subtree: true });
  normalizeCityButtons();
}

setupReviewSlider();
maskLocalReviewName();
loadStationLinks();
setupRegionStepFocus();
setupGyeonggiAdminDepth();
