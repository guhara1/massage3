const pageMap = {
  regions: ["지역 출장마사지", "서울, 경기, 인천 권역별 출장마사지 안내를 확인하세요.", "지역"],
  seoul: ["서울 출장마사지", "강남, 서초, 송파, 마포, 영등포 등 서울 전역의 출장마사지 안내입니다.", "지역"],
  gyeonggi: ["경기 출장마사지", "분당, 수원, 용인, 일산, 안양 등 경기 주요 지역 안내입니다.", "지역"],
  incheon: ["인천 출장마사지", "송도, 부평, 청라, 검단 등 인천 주요 권역 안내입니다.", "지역"],
  services: ["서비스 안내", "스웨디시, 홈타이, 아로마 마사지, 스포츠 마사지 안내입니다.", "서비스"],
  swedish: ["스웨디시", "부드러운 순환 관리 중심의 출장마사지 서비스입니다.", "서비스"],
  thai: ["홈타이", "스트레칭과 압박 위주의 방문 홈타이 안내입니다.", "서비스"],
  aroma: ["아로마 마사지", "오일과 향을 활용한 편안한 관리 안내입니다.", "서비스"],
  sports: ["스포츠 마사지", "목, 어깨, 허리 등 특정 부위 피로 관리 안내입니다.", "서비스"],
  checklist: ["예약 전 확인사항", "방문 주소, 출입 방식, 코스, 시간, 결제 방식을 예약 전에 확인하세요.", "서비스"],
  guide: ["이용안내", "예약부터 방문 관리까지 전체 이용 흐름을 안내합니다.", "이용안내"],
  booking: ["예약방법", "지역, 시간, 코스, 주소를 알려주시면 가능 여부를 확인합니다.", "이용안내"],
  process: ["이용순서", "문의 접수부터 방문 확정, 관리 진행까지의 순서입니다.", "이용안내"],
  price: ["가격 안내", "코스 시간, 이동 거리, 심야 여부에 따라 가격 안내가 달라질 수 있습니다.", "이용안내"],
  coverage: ["방문 가능 지역", "서울, 경기, 인천 중심의 방문 가능 지역 안내입니다.", "이용안내"],
  first: ["처음 이용하는 분 안내", "처음 예약하는 분이 알아두면 좋은 준비사항입니다.", "이용안내"],
  reviews: ["고객후기", "서울, 경기, 인천 지역별 이용 후기를 확인하세요.", "후기"],
  info: ["지역 정보", "지역별 검색 의도와 이용 팁을 다르게 구성한 안내입니다.", "후기"],
  support: ["고객센터", "예약문의, 제휴문의, 공지사항, 운영정책 안내입니다.", "고객센터"],
  reservation: ["예약문의", "전화예약과 예약 문의에 필요한 정보를 안내합니다.", "고객센터"],
  partner: ["제휴문의", "지역 제휴, 콘텐츠 제휴, 운영 협업 문의 안내입니다.", "고객센터"],
  notice: ["공지사항", "운영 시간, 지역 확장, 예약 관련 공지를 안내합니다.", "고객센터"],
  policy: ["운영정책", "건전한 출장마사지 안내 사이트 운영 기준입니다.", "고객센터"]
};

const detailByGroup = {
  "지역": [
    ["지역 안내", "서울, 경기, 인천 권역별 이동 시간과 예약 가능 조건을 나누어 안내합니다."],
    ["예약 팁", "희망 시간, 방문 주소, 주차 또는 출입 방식을 미리 알려주시면 예약 확인이 빨라집니다."],
    ["검색 의도", "지역명과 출장마사지 키워드를 함께 구성해 실제 이용자가 찾는 정보를 중심으로 안내합니다."]
  ],
  "서비스": [
    ["서비스 특징", "서비스별 관리 방식과 준비사항이 다르므로 목적에 맞는 코스를 선택하는 것이 좋습니다."],
    ["예약 전 확인", "오일 사용 여부, 집중 관리 부위, 공간 확보 여부를 예약 전에 확인하세요."],
    ["주의사항", "불법·무리한 요청은 진행하지 않으며 건전한 방문 관리 기준을 지킵니다."]
  ],
  "이용안내": [
    ["이용 흐름", "문의 접수, 지역 확인, 코스 선택, 방문 확정, 관리 진행 순서로 안내합니다."],
    ["필수 정보", "지역, 상세 주소, 희망 시간, 코스, 이용 환경을 알려주세요."],
    ["확정 안내", "방문 가능 여부와 예상 도착 시간을 확인한 뒤 예약을 진행합니다."]
  ],
  "후기": [
    ["고객후기", "강남, 분당, 송도 등 실제 지역명을 기준으로 후기를 구성합니다."],
    ["지역 정보", "지역별 이동 시간, 야간 예약 팁, 출입 확인사항을 다르게 안내합니다."],
    ["콘텐츠 기준", "얇은 반복 페이지가 되지 않도록 지역마다 실제 안내와 주의사항을 다르게 구성합니다."]
  ],
  "고객센터": [
    ["전화예약", "0508-202-4683으로 전화하면 예약 가능 여부를 확인할 수 있습니다."],
    ["문의 정보", "지역, 시간, 코스, 주소, 출입 방식을 알려주시면 안내가 빨라집니다."],
    ["운영정책", "건전한 서비스 이용 기준에 맞춰 예약과 문의를 안내합니다."]
  ]
};

const regionSlugMap = {
  regions: "seoul",
  seoul: "seoul",
  gyeonggi: "gyeonggi",
  incheon: "incheon"
};

const regionNames = {
  seoul: "서울",
  gyeonggi: "경기",
  incheon: "인천"
};

const pathSlug = window.location.pathname
  .split("/")
  .pop()
  .replace(".html", "");
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug") || pathSlug || "regions";
const [title, description, group] = pageMap[slug] || pageMap.regions;
const details = detailByGroup[group];

document.title = `${title} | 출장마사지`;
document.querySelector('meta[name="description"]').setAttribute("content", description);
document.querySelector("#sub-kicker").textContent = group;
document.querySelector("#sub-title").textContent = title;
document.querySelector("#sub-description").textContent = description;
const subContent = document.querySelector("#sub-content");

function renderBasicContent() {
  subContent.innerHTML = details.map(([heading, text]) => (
    `<section class="sub-block"><h2>${heading}</h2><p>${text}</p></section>`
  )).join("");
}

async function loadRegionData() {
  const response = await fetch("script.js", { cache: "no-store" });
  const source = await response.text();
  const match = source.match(/const regionData = ([\s\S]*?);\s*const tabs/);

  if (!match) {
    throw new Error("지역 데이터를 찾을 수 없습니다.");
  }

  return Function(`"use strict"; return (${match[1]});`)();
}

function renderDongOutput(region, areaName) {
  const dongs = region.areas[areaName] || [];
  const dongLinks = dongs.map((dong) => (
    `<a href="local.html?region=${currentRegionKey}&area=${encodeURIComponent(areaName)}&dong=${encodeURIComponent(dong)}" aria-label="${areaName} ${dong} 출장마사지 상세 안내">${dong}</a>`
  )).join("");

  return `
    <div class="dong-output" id="dong-output">
      <div>
        <p class="eyebrow">3차 지역</p>
        <h3>${areaName}</h3>
      </div>
      <p>${areaName} 선택 시 방문 가능 동을 한눈에 확인할 수 있습니다. 예약 전에는 상세 주소, 출입 방식, 희망 시간을 함께 알려주세요.</p>
      <div class="dong-chip-grid">${dongLinks}</div>
    </div>
  `;
}

function setActiveDistrict(areaName) {
  document.querySelectorAll(".district-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.area === areaName);
  });
}

function renderAreaBrowser(regionData, selectedRegionKey) {
  let currentRegionKey = selectedRegionKey;
  let currentRegion = regionData[currentRegionKey];
  let currentArea = Object.keys(currentRegion.areas)[0];

  function draw() {
    currentRegion = regionData[currentRegionKey];
    const areaNames = Object.keys(currentRegion.areas);
    currentArea = areaNames.includes(currentArea) ? currentArea : areaNames[0];

    const regionButtons = Object.keys(regionData).map((regionKey) => (
      `<button class="area-button ${regionKey === currentRegionKey ? "is-active" : ""}" type="button" data-region="${regionKey}">${regionNames[regionKey]}</button>`
    )).join("");

    const districtButtons = areaNames.map((areaName) => (
      `<button class="district-button ${areaName === currentArea ? "is-active" : ""}" type="button" data-area="${areaName}">${areaName}</button>`
    )).join("");

    subContent.innerHTML = `
      <section class="area-browser">
        <div class="area-browser-head">
          <p class="eyebrow">1차 지역</p>
          <h2>${currentRegion.title}</h2>
          <p>${currentRegion.description}</p>
        </div>
        <div class="region-switcher" aria-label="1차 지역 선택">${regionButtons}</div>
        <div class="area-browser-head">
          <p class="eyebrow">2차 지역</p>
          <h2>${regionNames[currentRegionKey]} 행정구·주요 지역 선택</h2>
          <p>고객이 원하는 구 또는 도시를 클릭하면 바로 아래에 3차 지역 동 목록이 표시됩니다.</p>
        </div>
        <div class="district-grid" aria-label="2차 지역 선택">${districtButtons}</div>
        ${renderDongOutput(currentRegion, currentArea)}
      </section>
    `;

    subContent.querySelectorAll(".area-button").forEach((button) => {
      button.addEventListener("click", () => {
        currentRegionKey = button.dataset.region;
        currentArea = Object.keys(regionData[currentRegionKey].areas)[0];
        draw();
      });
    });

    subContent.querySelectorAll(".district-button").forEach((button) => {
      button.addEventListener("click", () => {
        currentArea = button.dataset.area;
        setActiveDistrict(currentArea);
        document.querySelector("#dong-output").outerHTML = renderDongOutput(currentRegion, currentArea);
      });
    });
  }

  draw();
}

if (group === "지역") {
  loadRegionData()
    .then((regionData) => renderAreaBrowser(regionData, regionSlugMap[slug] || "seoul"))
    .catch(() => {
      renderBasicContent();
    });
} else {
  renderBasicContent();
}

const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector("#main-nav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
