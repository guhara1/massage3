const phoneNumber = "0508-202-4683";

const regionNames = {
  seoul: "서울",
  gyeonggi: "경기",
  incheon: "인천"
};

const params = new URLSearchParams(window.location.search);
const regionKey = params.get("region") || "seoul";
const areaName = params.get("area") || "강남";
const dongName = params.get("dong") || "역삼동";

const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector("#main-nav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

function sentenceByRegion(region, area, dong) {
  if (region === "seoul") {
    return `${dong}은 역세권, 오피스, 주거 단지가 가까운 경우가 많아 퇴근 후 시간대와 야간 문의가 함께 들어오는 편입니다. ${area}권은 이동 동선이 짧아도 건물 출입 방식이나 주차 조건에 따라 도착 시간이 달라질 수 있습니다.`;
  }

  if (region === "gyeonggi") {
    return `${dong}은 생활권이 넓고 차량 이동 기준으로 예약이 잡히는 경우가 많습니다. ${area}권은 같은 도시 안에서도 신도시, 구도심, 산업단지 방향에 따라 이동 시간과 가능 코스가 달라집니다.`;
  }

  return `${dong}은 송도, 청라, 부평처럼 권역별 이동 흐름이 뚜렷한 인천 지역 특성을 함께 봐야 합니다. ${area}권은 아파트 단지, 상권, 오피스텔 밀집 구간에 따라 출입 확인을 먼저 하는 편이 좋습니다.`;
}

function buildDescription(area, dong) {
  return `${area} ${dong} 출장마사지 이용 전 확인하면 좋은 예약 기준, 가격 차이, 주요 생활권, 코스 선택 방법을 정리했습니다. ${area}권 이용 전 참고하세요.`;
}

function renderPriceCards() {
  const prices = [
    ["스웨디시", [["60분", "80,000"], ["90분", "110,000"], ["120분", "140,000"]]],
    ["홈타이", [["60분", "70,000"], ["90분", "100,000"], ["120분", "문의"]]],
    ["아로마", [["60분", "90,000"], ["90분", "120,000"], ["120분", "150,000"]]],
    ["스포츠", [["60분", "80,000"], ["90분", "110,000"], ["120분", "문의"]]]
  ];

  return prices.map(([title, rows]) => `
    <article class="price-card">
      <h3>${title}</h3>
      ${rows.map(([time, price]) => `<p><span>${time}</span><strong>${price}</strong></p>`).join("")}
    </article>
  `).join("");
}

function renderFaq(area, dong) {
  const faqs = [
    [`${dong} 출장마사지는 당일 예약이 가능한가요?`, `가능 여부는 시간대와 이동 거리 기준으로 달라집니다. ${dong} 상세 주소와 희망 시간을 먼저 알려주시면 확인이 빠릅니다.`],
    [`${area} ${dong} 지역은 추가 이동비가 있나요?`, `기본 권역 안에서도 주차, 심야 시간, 이동 동선에 따라 추가 안내가 있을 수 있습니다. 예약 전에 총 금액을 확인하세요.`],
    ["처음 이용하면 어떤 코스가 무난한가요?", "목적이 피로 회복이면 스포츠, 편안한 관리가 필요하면 아로마나 스웨디시를 먼저 비교하는 것이 좋습니다."],
    ["예약 전에 무엇을 물어봐야 하나요?", "가격, 관리 시간, 도착 가능 시간, 결제 방식, 예약 변경 기준, 운영정책을 한 번에 확인하는 것이 좋습니다."],
    ["후기만 보고 선택해도 괜찮나요?", "후기는 참고용으로 보고, 실제 문의 때 안내가 명확한지와 가격 설명이 일관적인지를 함께 확인하세요."]
  ];

  return faqs.map(([question, answer]) => `
    <details class="faq-item">
      <summary>${question}</summary>
      <p>${answer}</p>
    </details>
  `).join("");
}

function renderLocalPage(regionData) {
  const region = regionData[regionKey] || regionData.seoul;
  const regionName = regionNames[regionKey] || "서울";
  const dongs = region.areas[areaName] || [];
  const nearby = dongs.filter((dong) => dong !== dongName).slice(0, 8);
  const title = `${dongName} 출장마사지 예약 전 확인사항 | 가격·지역·코스 안내`;
  const description = buildDescription(areaName, dongName);
  const context = sentenceByRegion(regionKey, areaName, dongName);

  document.title = title;
  document.querySelector('meta[name="description"]').setAttribute("content", description);

  document.querySelector("#local-page").innerHTML = `
    <section class="local-hero">
      <div>
        <p class="eyebrow">${regionName} · ${areaName}</p>
        <h1>${dongName} 출장마사지 예약 전 확인해야 할 기준</h1>
        <p>${description}</p>
      </div>
      <aside class="booking-panel">
        <p class="eyebrow">전화예약</p>
        <strong>${phoneNumber}</strong>
        <a class="button primary" href="tel:${phoneNumber}">바로 전화예약</a>
      </aside>
    </section>

    <section class="section local-section">
      <div class="local-grid">
        <article class="business-info">
          <p class="eyebrow">기본정보</p>
          <h2>${dongName} 방문 안내</h2>
          <dl>
            <div><dt>방문 권역</dt><dd>${regionName} ${areaName} ${dongName}</dd></div>
            <div><dt>예약 방식</dt><dd>전화 문의 후 가능 시간 확인</dd></div>
            <div><dt>운영 안내</dt><dd>지역·시간·코스별 가능 여부 확인</dd></div>
            <div><dt>확인 항목</dt><dd>주소, 출입 방식, 결제, 변경 기준</dd></div>
          </dl>
        </article>

        <article class="profile-card">
          <img src="assets/profile-therapist.svg" alt="전문 관리사 프로필 이미지">
          <div>
            <p class="eyebrow">프로필</p>
            <h2>전문 관리사 배정</h2>
            <p>예약 목적과 코스에 맞춰 관리 경험, 이동 가능 시간, 요청 부위를 확인한 뒤 배정 안내를 진행합니다.</p>
            <span>스웨디시 · 아로마 · 홈타이 상담 가능</span>
          </div>
        </article>
      </div>

      <div class="local-block">
        <p class="eyebrow">마사지 코스 및 요금</p>
        <h2>코스별 기본 요금표</h2>
        <div class="price-grid">${renderPriceCards()}</div>
        <p class="price-note">심야, 원거리, 주차 조건, 코스 구성에 따라 실제 안내 금액이 달라질 수 있습니다.</p>
      </div>

      <div class="notice-box">
        <strong>업소 공지사항</strong>
        <p>불법·무리한 요청은 진행하지 않습니다. 예약 전 안내된 시간, 금액, 코스 기준을 확인한 뒤 이용해 주세요.</p>
      </div>

      <article class="seo-article">
        <h2>${dongName} 출장마사지를 찾는 분들이 많은 이유</h2>
        <p>${context}</p>
        <p>${dongName} 출장마사지를 찾는 고객은 단순히 가까운 업체보다 예약 가능 시간, 가격 설명, 코스 차이, 실제 방문 범위를 함께 확인하려는 경우가 많습니다.</p>
        <h2>${dongName} 주요 생활권과 방문 가능 범위</h2>
        <p>${areaName} 안에서도 역 주변, 상권, 주거 밀집지, 오피스텔 구간은 예약 수요가 다릅니다. ${nearby.length ? `${nearby.join(", ")} 등 인근 동도 함께 비교하면 이동 가능 시간을 더 정확히 잡을 수 있습니다.` : "인근 생활권까지 함께 확인하면 이동 가능 시간을 더 정확히 잡을 수 있습니다."}</p>
        <h2>${dongName}에서 선택할 수 있는 마사지 종류</h2>
        <p>스웨디시는 부드러운 순환 관리에 가깝고, 홈타이는 스트레칭과 압박 중심입니다. 아로마는 오일 사용 여부를 확인해야 하며, 스포츠 마사지는 목·어깨·허리처럼 특정 부위 피로를 말해두는 편이 좋습니다.</p>
        <h2>예약 전 꼭 확인해야 할 사항</h2>
        <p>가격, 이용 시간, 상세 위치, 추가비용, 운영정책, 예약 변경 기준은 문의 단계에서 확인해야 합니다. 특히 ${dongName}처럼 건물 출입 방식이 다른 곳은 공동현관, 주차, 엘리베이터 이용 가능 여부를 미리 알려주는 것이 좋습니다.</p>
        <h2>가격이 달라지는 이유</h2>
        <p>코스 시간, 서비스 종류, 심야 여부, 이동 거리, 대기 시간에 따라 금액이 달라질 수 있습니다. 너무 낮은 가격만 앞세우는 안내보다 총 비용과 조건을 분명히 말하는 곳을 선택하는 편이 안전합니다.</p>
        <h2>처음 이용하는 분들을 위한 현실적인 조언</h2>
        <p>과장된 표현이나 확인되지 않은 후기만 보고 결정하지 말고, 문의할 때 응답이 구체적인지 확인하세요. 실제 이용 전에는 “총 금액이 얼마인지”, “몇 분 코스인지”, “예약 변경은 어떻게 되는지”를 물어보면 불필요한 오해를 줄일 수 있습니다.</p>
      </article>

      <section class="faq-section">
        <p class="eyebrow">FAQ</p>
        <h2>${dongName} 출장마사지 자주 묻는 질문</h2>
        ${renderFaq(areaName, dongName)}
      </section>
    </section>
  `;
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

loadRegionData().then(renderLocalPage);
