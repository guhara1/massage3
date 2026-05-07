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

function localSeoParagraphs(text) {
  return text
    .split(/(?<=[.?!])\s+/)
    .filter(Boolean)
    .map((sentence) => `<p>${sentence}</p>`)
    .join("");
}

function seededNumber(value) {
  return Array.from(value).reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 3), 0);
}

function rotateList(list, seed) {
  const start = Math.abs(seed) % list.length;
  return list.slice(start).concat(list.slice(0, start));
}

function pickFrom(list, seed, offset = 0) {
  return list[Math.abs(seed + offset) % list.length];
}

function getLocalContext() {
  const params = new URLSearchParams(window.location.search);
  const region = params.get("region") || "seoul";
  const area = params.get("area") || "강남";
  const dong = params.get("dong") || "역삼동";
  const seed = seededNumber(`${region}-${area}-${dong}`);
  const regionNames = { seoul: "서울", gyeonggi: "경기", incheon: "인천" };

  const exactAreas = {
    "강남": ["오피스와 역세권 수요가 강한 생활권", "퇴근 직후와 늦은 저녁 문의가 겹치는 편", "건물 보안과 주차 위치 확인이 중요"],
    "서초": ["법조타운과 주거지가 함께 있는 생활권", "평일 저녁 교통 흐름에 따라 배정 시간이 달라지는 편", "아파트와 오피스텔 출입 방식 확인이 중요"],
    "송파": ["잠실 상권과 문정 업무지구, 대단지 주거지가 이어지는 생활권", "행사나 경기 일정에 따라 주변 이동 시간이 흔들리는 편", "단지 동선과 공동현관 정보를 미리 정리하는 것이 중요"],
    "마포": ["홍대·합정 상권과 공덕 업무권, 상암 방향 수요가 섞인 생활권", "상권 중심부와 주거 골목의 이동 난이도가 다른 편", "골목 주차와 도보 진입 시간을 함께 봐야 함"],
    "성남 분당": ["판교 업무지구와 분당 주거지가 나뉘는 생활권", "차량 이동 기준으로 예약이 조율되는 경우가 많은 편", "대단지 아파트와 업무용 건물의 출입 방식 확인이 중요"],
    "수원": ["영통·광교·인계 등 상권과 주거지가 넓게 퍼진 생활권", "같은 도시 안에서도 이동 거리가 길어 시간대별 가능 범위가 달라지는 편", "원거리 이동과 심야 기준 확인이 중요"],
    "연수 송도": ["송도 국제업무지구와 연수 주거지가 이어지는 생활권", "신도시 블록이 넓어 건물명과 출입 동선이 중요한 편", "주차와 엘리베이터 동선을 먼저 확인해야 함"],
    "미추홀": ["구도심 주거지와 역세권 상권이 함께 있는 생활권", "골목 진입과 주차 조건에 따라 도착 시간이 달라지는 편", "건물 입구와 주변 정차 가능 여부 확인이 중요"],
    "부평": ["역세권 상권과 주거 밀집지가 가까운 생활권", "부평역 주변과 주거 골목의 이동 조건이 다른 편", "상권 밀집 구간은 주차와 건물 출입이 변수"],
    "남동": ["구월 상권, 논현 주거지, 산업단지 이동 수요가 섞인 생활권", "낮과 저녁의 문의 목적이 달라지는 편", "도로 이동과 건물 출입 조건을 함께 확인해야 함"]
  };

  const regionProfiles = {
    seoul: ["지하철역과 상권, 주거지가 촘촘한 서울 생활권", "짧은 거리라도 퇴근 시간과 건물 출입 방식에 영향을 받는 편", "공동현관, 주차, 엘리베이터 이용 가능 여부 확인이 중요"],
    gyeonggi: ["신도시, 구도심, 대단지 아파트가 넓게 이어지는 경기권 생활권", "차량 이동 기준으로 예약 시간이 조율되는 경우가 많은 편", "이동 거리와 심야 여부에 따른 추가 기준 확인이 중요"],
    incheon: ["신도시, 구도심, 항만·공항 방향 동선이 섞인 인천 생활권", "권역별 이동 방향이 뚜렷해 출발 위치에 따라 가능 시간이 달라지는 편", "주차, 공동현관, 건물 동선을 먼저 확인해야 함"]
  };

  const [life, route, caution] = exactAreas[area] || regionProfiles[region] || regionProfiles.seoul;
  const placeTypes = ["역 주변", "주거 단지", "오피스텔", "상가 건물", "대단지 아파트", "골목 안쪽 건물", "업무용 건물"];
  const situations = ["퇴근 후 목과 어깨가 뻐근한 경우", "주말에 여유 있게 피로를 풀고 싶은 경우", "장시간 운전 뒤 허리와 다리가 무거운 경우", "야간에 당일 예약 가능 여부를 확인하는 경우", "처음 이용이라 가격과 운영 기준이 걱정되는 경우", "짧은 시간 안에 집중 관리가 필요한 경우"];
  const timeNotes = ["평일 저녁", "늦은 밤", "주말 오후", "퇴근 직후", "비 오는 날", "행사나 모임이 많은 날"];
  const courseFocus = ["스웨디시", "아로마", "홈타이", "스포츠", "어깨·목 집중", "허리·하체 집중"];

  return {
    region,
    regionName: regionNames[region] || "서울",
    area,
    dong,
    seed,
    life,
    route,
    caution,
    place: pickFrom(placeTypes, seed, 1),
    altPlace: pickFrom(placeTypes, seed, 4),
    situation: pickFrom(situations, seed, 2),
    anotherSituation: pickFrom(situations, seed, 5),
    timeNote: pickFrom(timeNotes, seed, 3),
    course: pickFrom(courseFocus, seed, 6),
    secondCourse: pickFrom(courseFocus, seed, 9)
  };
}

function buildLocalModules(ctx) {
  const { regionName, area, dong, seed, life, route, caution, place, altPlace, situation, anotherSituation, timeNote, course, secondCourse } = ctx;

  return [
    {
      key: "intent",
      heading: pickFrom([
        `${dong}에서 출장마사지를 찾는 실제 이유`,
        `${dong} 이용자가 먼저 확인하는 예약 기준`,
        `${area} ${dong} 출장마사지 검색 의도 정리`
      ], seed, 1),
      body: `${dong} 출장마사지를 찾는 분들은 단순히 가까운 곳보다 오늘 가능한 시간, 총 비용, 코스 차이, 방문 가능 범위를 함께 확인하려는 경우가 많습니다. ${life}이라 문의 목적도 한 가지로 고정되지 않습니다. 예를 들어 ${situation}와 ${anotherSituation}는 같은 출장마사지 문의라도 필요한 코스와 상담 포인트가 다릅니다. 그래서 ${dong} 페이지에서는 가격표만 보여주는 것보다 예약 전에 무엇을 확인해야 하는지, 어떤 상황에서 시간이 달라지는지까지 안내하는 것이 중요합니다.`
    },
    {
      key: "movement",
      heading: pickFrom([
        `${dong} 방문 동선과 생활권 특징`,
        `${area} ${dong} 방문 가능 범위를 볼 때 중요한 점`,
        `${dong} 주변 이동 조건과 예약 가능 시간`
      ], seed, 2),
      body: `${dong}은 ${place}와 ${altPlace}의 조건이 서로 다를 수 있어 주소 확인이 중요합니다. ${route}. 같은 ${area} 안에서도 큰 도로를 건너는지, 골목 안쪽 건물인지, 주차가 가능한지에 따라 도착 시간이 달라질 수 있습니다. 예약 문의 때 건물명, 출입 방식, 주차 가능 여부를 함께 알려주면 실제 방문 가능 시간을 더 정확하게 안내받을 수 있습니다.`
    },
    {
      key: "course",
      heading: pickFrom([
        `${dong}에서 코스를 고를 때 봐야 할 부분`,
        `${course}와 ${secondCourse} 중 어떤 코스가 맞을까`,
        `${dong} 출장마사지 코스 선택 기준`
      ], seed, 3),
      body: `${course} 코스가 맞는지 ${secondCourse} 중심으로 보는 것이 나은지는 이용 목적에 따라 달라집니다. 가볍게 긴장을 풀고 싶을 때와 특정 부위가 뻐근할 때는 상담에서 말해야 할 내용이 다릅니다. ${dong}에서 처음 이용한다면 코스명만 보고 고르기보다 관리 강도, 관리 시간, 오일 사용 여부, 집중 부위 가능 여부를 먼저 확인하는 편이 좋습니다. 특히 ${situation}라면 강한 압보다 중간 강도로 조절 가능한지 확인하는 것이 만족도에 도움이 됩니다.`
    },
    {
      key: "price",
      heading: pickFrom([
        `${dong} 출장마사지 가격이 달라지는 조건`,
        `${area} ${dong} 요금 문의 전에 볼 기준`,
        `가격표보다 먼저 확인해야 할 ${dong} 예약 조건`
      ], seed, 4),
      body: `${dong} 출장마사지 가격은 코스 시간만으로 결정되지 않습니다. 심야 여부, 이동 거리, 대기 시간, 주차 조건, 코스 구성에 따라 안내 금액이 달라질 수 있습니다. ${timeNote}에는 예약이 몰리거나 이동 시간이 길어질 수 있어 가능 시간과 총 금액을 같이 확인해야 합니다. 예약 확정 전에는 기본요금뿐 아니라 추가비 포함 총액, 실제 관리 시간, 변경 기준을 한 번에 물어보는 것이 안전합니다.`
    },
    {
      key: "checklist",
      heading: pickFrom([
        `${dong} 예약 전 꼭 확인해야 할 사항`,
        `처음 문의할 때 ${dong}에서 물어볼 질문`,
        `${area} ${dong} 이용 전 체크리스트`
      ], seed, 5),
      body: `예약 전에는 주소, 희망 시간, 원하는 코스, 집중 관리 부위, 결제 방식, 예약 변경 기준을 정리해두는 것이 좋습니다. ${caution}. 상담이 구체적이면 고객도 비교하기 쉽고, 업체도 가능 여부를 빠르게 판단할 수 있습니다. 반대로 총 금액을 명확히 말하지 않거나 운영 기준이 계속 바뀌면 예약 전 한 번 더 확인하는 편이 좋습니다.`
    },
    {
      key: "firstuser",
      heading: pickFrom([
        `${regionName} ${area}권 처음 이용자를 위한 현실적인 조언`,
        `${dong} 출장마사지가 처음이라면 이렇게 문의하세요`,
        `후기보다 먼저 봐야 할 ${dong} 상담 기준`
      ], seed, 6),
      body: `처음 이용하는 분은 후기를 참고하되 최종 판단은 상담의 명확함으로 하는 편이 좋습니다. 예를 들어 “${timeNote} 이후, ${course} 가능 여부, ${place} 방문, 총 금액 확인”처럼 말하면 상담이 훨씬 빨라집니다. 과장된 표현이나 지나치게 낮은 가격만 보고 결정하면 실제 조건이 달라질 수 있습니다. ${dong}에서는 위치와 시간 조건을 먼저 맞춘 뒤 코스를 고르는 순서가 가장 현실적입니다.`
    },
    {
      key: "notice",
      heading: pickFrom([
        `${dong} 이용 시 주의해야 할 운영 기준`,
        `${area} ${dong} 예약 변경과 방문 조건`,
        `안전하게 이용하기 위한 ${dong} 확인 포인트`
      ], seed, 7),
      body: `출장마사지 예약은 방문형 서비스라 현장 조건이 중요합니다. 주소가 바뀌거나 출입 방식이 달라지면 도착 시간이 흔들릴 수 있습니다. 불법적이거나 무리한 요청은 진행되지 않으며, 코스와 시간, 결제 방식은 전화 문의 단계에서 먼저 확인하는 것이 좋습니다. ${dong} 이용 전에는 예약 변경 기준과 늦은 시간 가능 여부까지 함께 물어보면 불필요한 오해를 줄일 수 있습니다.`
    },
    {
      key: "comparison",
      heading: pickFrom([
        `${dong}과 인근 지역을 함께 비교하는 방법`,
        `${area}권에서 방문 시간을 맞추는 요령`,
        `${dong} 예약이 어려울 때 확인할 대안`
      ], seed, 8),
      body: `${dong}에서 원하는 시간이 바로 맞지 않으면 같은 ${area}권의 인근 동까지 함께 확인하는 방법이 있습니다. 다만 가까운 지역이라도 배정 위치와 이동 방향이 맞지 않으면 오히려 시간이 더 걸릴 수 있습니다. 문의할 때 “근처 다른 동도 가능하면 확인해달라”고 말하면 당일 동선 기준으로 더 현실적인 답변을 받을 수 있습니다. 특히 ${timeNote}에는 한 시간 차이로 가능 여부가 달라지는 경우가 있어 시간대를 두세 개 준비하는 것이 좋습니다.`
    }
  ];
}

function enhanceLocalSeoArticle() {
  const article = document.querySelector(".seo-article");
  if (!article || article.dataset.enhanced === "true") return;

  const ctx = getLocalContext();
  const modules = buildLocalModules(ctx);
  const selected = rotateList(modules, ctx.seed).slice(0, 6);

  article.dataset.enhanced = "true";
  article.innerHTML = selected.map((section) => `
    <h2>${section.heading}</h2>
    <div class="seo-copy">${localSeoParagraphs(section.body)}</div>
  `).join("");
}

setupReviewSlider();
maskLocalReviewName();
enhanceLocalSeoArticle();

new MutationObserver(() => {
  maskLocalReviewName();
  enhanceLocalSeoArticle();
}).observe(document.body, {
  childList: true,
  subtree: true
});
