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

function getLocalContext() {
  const params = new URLSearchParams(window.location.search);
  const region = params.get("region") || "seoul";
  const area = params.get("area") || "강남";
  const dong = params.get("dong") || "역삼동";
  const regionNames = { seoul: "서울", gyeonggi: "경기", incheon: "인천" };
  const seed = Array.from(`${region}-${area}-${dong}`).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const regionName = regionNames[region] || "서울";
  const isSeoul = region === "seoul";
  const isGyeonggi = region === "gyeonggi";
  const profile = isSeoul
    ? {
        life: "역세권, 주거지, 오피스텔, 상권이 촘촘하게 붙어 있는 도심형 생활권",
        route: "짧은 거리라도 퇴근 시간 교통, 골목 진입, 건물 출입 방식에 따라 도착 시간이 달라집니다",
        caution: "공동현관, 주차, 엘리베이터 이용 가능 여부를 예약 전에 확인하는 것이 좋습니다"
      }
    : isGyeonggi
      ? {
          life: "신도시, 구도심, 대단지 아파트, 산업단지 이동 동선이 함께 있는 광역 생활권",
          route: "차량 이동 기준으로 예약이 조율되는 경우가 많아 같은 도시 안에서도 가능 시간이 달라집니다",
          caution: "원거리 이동, 심야 시간, 주차 조건에 따라 안내 금액이 달라질 수 있습니다"
        }
      : {
          life: "신도시, 역세권 상권, 항만·공항 방향 이동 동선이 섞인 인천 생활권",
          route: "권역별 이동 방향이 뚜렷해 출발 위치와 방문 주소에 따라 가능 시간이 달라집니다",
          caution: "아파트 단지와 상가 건물은 출입 조건이 달라 방문 전 확인이 필요합니다"
        };

  return { area, dong, regionName, seed, ...profile };
}

function enhanceLocalSeoArticle() {
  const article = document.querySelector(".seo-article");
  if (!article || article.dataset.enhanced === "true") return;

  const context = getLocalContext();
  const { area, dong, regionName, seed, life, route, caution } = context;
  const pick = (list, offset = 0) => list[Math.abs(seed + offset) % list.length];

  const sections = [
    [
      `${dong} 출장마사지를 찾는 분들이 많은 이유`,
      pick([
        `${dong} 출장마사지를 찾는 분들은 가까운 업체만 찾기보다 예약 가능 시간, 총 비용, 코스 차이, 방문 가능 범위를 함께 확인하려는 경우가 많습니다. ${route}. 특히 ${area}권은 같은 행정동 안에서도 역 주변, 주거 단지, 오피스텔 밀집 구간의 이동 조건이 달라 실제 도착 가능 시간이 달라질 수 있습니다. 처음 문의할 때는 희망 시간만 말하기보다 현재 위치, 원하는 코스, 집중 관리 부위를 같이 전달하는 편이 좋습니다. 이렇게 확인하면 상담이 짧아지고 예약 확정 뒤 금액이나 시간 때문에 다시 조율하는 일을 줄일 수 있습니다.`,
        `${dong}은 ${life}이라 이용 목적이 조금씩 다릅니다. 퇴근 후 피로 회복, 주말 휴식, 장시간 운전 뒤 관리처럼 실제 상황을 먼저 말하면 코스 안내가 더 정확해집니다. 단순히 가까운 곳을 고르는 것보다 이동 가능 시간, 관리 시간, 추가비 기준을 함께 보는 것이 만족도에 더 큰 영향을 줍니다. ${caution}. 이런 기본 조건이 정리되어 있으면 상담 과정에서 불필요한 오해를 줄이고, 처음 이용하는 분도 부담 없이 문의할 수 있습니다.`
      ])
    ],
    [
      `${area} ${dong} 생활권과 방문 가능 범위`,
      pick([
        `${area} 안에서도 역 주변, 상권, 주거 밀집지, 오피스텔 구간은 예약 수요가 다릅니다. 역과 가까운 곳은 접근은 빠르지만 주차나 건물 진입이 변수로 작용할 수 있습니다. 반대로 주거 단지는 이동 거리가 조금 있어도 출입 방식이 명확하면 예약 시간이 더 안정적으로 맞는 경우가 있습니다. ${dong} 방문 가능 여부는 단순 거리보다 주소 확인, 건물 동선, 예약 시간대가 함께 맞아야 정확하게 판단할 수 있습니다.`,
        `${dong} 방문 가능 여부는 거리보다 출입 조건과 도착 동선의 영향을 더 받는 경우가 있습니다. ${caution}. 같은 ${area} 안에서도 큰 도로를 사이에 두거나 상권 중심부와 주거 골목이 나뉘면 이동 시간이 달라질 수 있습니다. 예약 전에는 건물명, 동·호수, 공동현관 여부, 주차 가능 여부를 미리 알려주는 편이 좋습니다. 이런 정보가 있으면 당일 배정 가능 여부를 더 빠르게 확인할 수 있고, 현장 대기 시간을 줄이는 데도 도움이 됩니다.`
      ], 1)
    ],
    [
      `${dong}에서 선택할 수 있는 마사지 코스`,
      pick([
        `스웨디시는 부드러운 순환 관리에 가깝고, 홈타이는 스트레칭과 압박 중심입니다. 아로마는 오일 사용 여부를 확인해야 하며, 스포츠 마사지는 목·어깨·허리처럼 특정 부위 피로를 말해두는 편이 좋습니다. ${dong}에서 처음 이용한다면 코스명만 보고 고르기보다 관리 강도, 관리 시간, 집중 부위 가능 여부를 먼저 비교해야 합니다. 예를 들어 장시간 앉아서 일한 뒤 목과 어깨가 뻐근한 경우와 이동이 많아 다리 피로가 심한 경우는 어울리는 코스가 다를 수 있습니다. 예약 문의 때 불편한 부위를 구체적으로 말하면 상담자가 코스 선택을 더 현실적으로 안내할 수 있습니다.`,
        `가볍게 긴장을 풀고 싶다면 아로마나 스웨디시가 무난하고, 뻐근한 부위를 분명히 관리받고 싶다면 스포츠나 홈타이 계열을 비교해볼 수 있습니다. ${area} ${dong} 이용자는 퇴근 후 짧게 받는 코스와 주말에 여유 있게 받는 코스를 다르게 보는 경우가 많습니다. 짧은 코스는 집중 부위를 좁히는 것이 좋고, 긴 코스는 전신 흐름을 보면서 피로가 쌓인 부위를 함께 조절하는 방식이 잘 맞습니다. 오일 사용 여부나 스트레칭 포함 여부도 개인 취향이 갈리므로 예약 전에 꼭 확인하는 편이 좋습니다.`
      ], 2)
    ],
    [
      `예약 전 꼭 확인해야 할 기준`,
      pick([
        `가격, 이용 시간, 상세 위치, 추가비용, 운영정책, 예약 변경 기준은 문의 단계에서 확인해야 합니다. 특히 ${dong}처럼 건물 출입 방식이 다른 곳은 공동현관, 주차, 엘리베이터 이용 가능 여부를 미리 알려주는 것이 좋습니다. 예약 전에 확인할 내용이 많아 보여도 실제로는 총 금액, 관리 시간, 방문 가능 시간, 변경 기준 네 가지만 분명히 해도 대부분의 혼선을 줄일 수 있습니다. 안내가 모호하거나 금액을 계속 다르게 말하는 곳은 예약 전 다시 확인하는 편이 안전합니다. 처음 이용하는 분이라면 상담 내용을 짧게 메모해두면 나중에 비교하기 쉽습니다.`,
        `예약 전에는 총 금액, 시작 기준, 관리 시간, 도착 가능 시간을 먼저 물어보세요. ${caution}. ${area} ${dong} 이용 시에는 주소를 늦게 알려주면 배정 시간이 흔들릴 수 있습니다. 희망 시간, 코스, 위치, 결제 방식이 한 번에 정리되면 상담이 빨라지고 당일 예약 가능 여부도 더 정확하게 안내받을 수 있습니다. 예약 변경이 필요한 경우에는 언제까지 연락해야 하는지, 변경 수수료나 대기 기준이 있는지도 함께 확인하는 것이 좋습니다.`
      ], 3)
    ],
    [
      `${dong} 출장마사지 가격이 달라지는 이유`,
      pick([
        `코스 시간, 서비스 종류, 심야 여부, 이동 거리, 대기 시간에 따라 금액이 달라질 수 있습니다. 너무 낮은 가격만 앞세우는 안내보다 총 비용과 조건을 분명히 말하는 곳을 선택하는 편이 안전합니다. ${dong}에서 예약할 때는 기본 요금만 보지 말고 추가 이동비, 심야 기준, 코스 변경 가능 여부까지 함께 확인해야 합니다. 가격이 낮아 보여도 실제 관리 시간이 짧거나 추가 조건이 많으면 만족도가 떨어질 수 있습니다. 반대로 안내 금액이 조금 높아도 조건이 명확하면 이용 전후의 불필요한 분쟁을 줄일 수 있습니다.`,
        `${area}권 안에서도 원거리 이동, 심야 시간, 주차 대기 여부에 따라 안내 금액이 달라질 수 있습니다. 예약 확정 전 “추가비 포함 총액”을 확인하는 것이 가장 깔끔합니다. ${dong} 주변은 같은 행정동 안에서도 방문 위치에 따라 이동 난이도가 달라질 수 있어 상담 시 상세 주소가 중요합니다. 관리 시간은 60분, 90분, 120분처럼 단순히 숫자로만 비교하지 말고 실제 관리 방식과 준비 시간을 함께 봐야 합니다. 가격표는 기준을 보는 용도이고, 최종 금액은 예약 조건을 확인한 뒤 결정된다고 생각하면 좋습니다.`
      ], 4)
    ],
    [
      `${regionName} ${area}권 처음 이용자를 위한 조언`,
      pick([
        `과장된 표현이나 확인되지 않은 후기만 보고 결정하지 말고, 문의할 때 응답이 구체적인지 확인하세요. 실제 이용 전에는 “총 금액이 얼마인지”, “몇 분 코스인지”, “예약 변경은 어떻게 되는지”를 물어보면 불필요한 오해를 줄일 수 있습니다. ${dong}처럼 생활권이 뚜렷한 지역은 당일 상황에 따라 가능 시간이 빠르게 바뀔 수 있습니다. 상담이 지나치게 급하거나 조건 설명 없이 예약만 유도한다면 한 번 더 확인하는 것이 좋습니다. 이용 목적과 불편한 부위를 차분히 말하면 처음 이용하는 분도 더 편하게 코스를 고를 수 있습니다.`,
        `후기는 분위기를 보는 자료로 활용하고, 최종 결정은 상담의 명확함으로 판단하는 편이 좋습니다. 가격 설명이 계속 바뀌거나 운영 기준이 모호하면 예약 전에 다시 확인하세요. ${area} ${dong} 이용 전에는 자신의 상황을 짧게 정리해서 문의하면 훨씬 수월합니다. 예를 들어 “오늘 저녁 9시 이후, 어깨와 허리 위주, 90분 코스 가능 여부”처럼 말하면 상담자가 가능 여부를 빠르게 확인할 수 있습니다. 이런 방식은 고객 입장에서도 조건 비교가 쉬워지고 업체 입장에서도 정확한 안내를 하기 좋습니다.`
      ], 5)
    ]
  ];

  article.dataset.enhanced = "true";
  article.innerHTML = sections.map(([heading, body]) => `
    <h2>${heading}</h2>
    <div class="seo-copy">${localSeoParagraphs(body)}</div>
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
