const phoneNumber = "0508-202-4683";
const profilePhotoUrl = "assets/profile-therapist.jpg?v=20260507-4";

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

function hashText(value) {
  return Array.from(value).reduce((total, char) => total + char.charCodeAt(0), 0);
}

function pick(list, seed) {
  return list[Math.abs(seed) % list.length];
}

function getAreaProfile(region, area, dong) {
  const seed = hashText(`${region}-${area}-${dong}`);
  const regionName = regionNames[region] || "서울";
  const isMetroCore = region === "seoul";
  const isGyeonggi = region === "gyeonggi";

  const areaProfiles = {
    "강남": {
      life: "오피스, 역세권, 고급 주거지가 섞인 생활권",
      route: "퇴근 직후와 늦은 저녁 문의가 몰리기 쉬워 도착 시간 확인이 중요합니다",
      caution: "건물 보안, 주차, 엘리베이터 이용 가능 여부를 먼저 확인하는 편이 좋습니다"
    },
    "서초": {
      life: "법조타운, 주거지, 교대·강남 인접 수요가 함께 있는 권역",
      route: "평일 저녁에는 교통 흐름에 따라 20~30분 단위로 가능 시간이 달라질 수 있습니다",
      caution: "아파트 단지와 오피스텔은 출입 방식이 달라 예약 전에 상세 주소 확인이 필요합니다"
    },
    "송파": {
      life: "잠실 상권, 문정 업무지구, 주거 단지가 넓게 이어지는 생활권",
      route: "행사일이나 야구 경기 일정이 있는 날은 주변 이동 시간이 늘어날 수 있습니다",
      caution: "대형 단지 방문은 동·호수, 주차 위치, 공동현관 정보를 미리 정리해두면 좋습니다"
    },
    "마포": {
      life: "홍대·합정 상권과 공덕 업무권, 상암 미디어권이 함께 있는 지역",
      route: "상권 중심부와 주거 골목의 이동 난이도가 달라 정확한 위치 안내가 중요합니다",
      caution: "골목 주차가 어려운 곳은 도보 이동 시간을 포함해 예약 시간을 잡는 편이 안전합니다"
    },
    "성남 분당": {
      life: "판교 업무지구, 분당 주거지, 역세권 상권이 나뉘는 권역",
      route: "차량 이동 기준으로 예약이 잡히는 경우가 많아 퇴근 시간대 도로 흐름을 같이 봐야 합니다",
      caution: "아파트 단지, 오피스텔, 업무용 건물의 출입 방식이 달라 방문 조건을 먼저 확인해야 합니다"
    },
    "수원": {
      life: "영통·광교·인계 등 상권과 주거지가 넓게 퍼진 도시형 권역",
      route: "같은 수원 안에서도 이동 거리가 길어 시간대별 가능 범위를 따로 확인하는 편이 좋습니다",
      caution: "원거리 이동이나 심야 문의는 추가 안내가 생길 수 있어 총 금액 확인이 필요합니다"
    },
    "연수 송도": {
      life: "송도 국제업무지구, 연수 주거지, 해안 방향 이동 동선이 섞인 권역",
      route: "신도시 블록이 넓고 건물 출입 동선이 길어 정확한 건물명 안내가 필요합니다",
      caution: "주차 가능 여부와 엘리베이터 이용 동선을 예약 전에 확인하면 대기 시간을 줄일 수 있습니다"
    },
    "부평": {
      life: "역세권 상권, 주거 밀집지, 인천 동서 이동 수요가 많은 권역",
      route: "부평역 주변과 주거 골목은 이동 조건이 달라 방문 가능 시간을 따로 확인해야 합니다",
      caution: "상권 밀집 구간은 주차와 건물 출입이 변수라 예약 전에 위치 설명을 자세히 하는 것이 좋습니다"
    }
  };

  const fallbackProfiles = isMetroCore
    ? [
        {
          life: "지하철역, 주거지, 상권이 가까이 붙어 있는 서울 생활권",
          route: "퇴근 시간대와 심야 시간대의 문의 성격이 달라 예약 가능 시간을 분리해 확인해야 합니다",
          caution: "공동현관, 주차, 건물 출입 방식처럼 현장 변수가 예약 시간에 영향을 줄 수 있습니다"
        },
        {
          life: "오피스텔, 아파트, 골목 상권이 함께 있는 도심형 권역",
          route: "짧은 거리라도 교통 체증이나 골목 진입 조건에 따라 도착 시간이 달라질 수 있습니다",
          caution: "상세 주소와 희망 코스를 함께 말하면 불필요한 재확인을 줄일 수 있습니다"
        }
      ]
    : isGyeonggi
      ? [
          {
            life: "신도시, 구도심, 산업단지 또는 주거 단지가 넓게 이어지는 경기권 생활권",
            route: "차량 이동 기준으로 예약이 조율되는 경우가 많아 같은 도시 안에서도 가능 시간이 달라집니다",
            caution: "이동 거리와 심야 여부에 따라 안내 금액이 달라질 수 있어 총 비용 확인이 중요합니다"
          },
          {
            life: "역세권과 대단지 아파트, 외곽 주거지가 함께 있는 광역 생활권",
            route: "도로 흐름과 주차 조건을 같이 봐야 예약 시간이 현실적으로 맞습니다",
            caution: "건물명, 출입 방식, 주차 위치를 먼저 알려주면 배정 확인이 빠릅니다"
          }
        ]
      : [
          {
            life: "신도시, 항만·공항 방향, 오래된 주거지가 함께 섞인 인천 생활권",
            route: "권역별 이동 방향이 뚜렷해 출발 위치에 따라 가능 시간이 달라집니다",
            caution: "아파트 단지와 상가 건물은 출입 조건이 달라 방문 전 확인이 필요합니다"
          },
          {
            life: "역 주변 상권과 주거 밀집지, 해안·공항 방향 이동 동선이 함께 있는 권역",
            route: "야간에는 이동 가능 범위가 좁아질 수 있어 희망 시간을 먼저 확인하는 편이 좋습니다",
            caution: "주차, 공동현관, 건물 동선을 미리 알려주면 대기 시간을 줄일 수 있습니다"
          }
        ];

  const base = areaProfiles[area] || pick(fallbackProfiles, seed);
  return { ...base, seed, regionName };
}

function buildDescription(region, area, dong) {
  const profile = getAreaProfile(region, area, dong);
  const descriptions = [
    `${dong} 출장마사지 이용 전 확인하면 좋은 예약 기준, 가격 차이, 방문 가능 범위와 코스 선택 기준을 ${area} 생활권에 맞춰 정리했습니다.`,
    `${profile.life}인 ${dong}에서 출장마사지 문의 전 살펴볼 이동 시간, 요금, 예약 변경 기준, 코스 선택 팁을 안내합니다.`,
    `${area} ${dong} 출장마사지 예약을 준비하는 분들을 위해 주요 생활권, 문의 시 확인할 질문, 가격이 달라지는 이유를 정리했습니다.`,
    `${dong} 출장마사지 선택 전 참고할 ${profile.regionName} ${area}권 이동 조건, 코스별 차이, 예약 전 체크사항을 현실적으로 안내합니다.`
  ];

  return pick(descriptions, profile.seed);
}

function buildTitle(region, area, dong) {
  const seed = hashText(`${region}-${area}-${dong}-title`);
  return pick([
    `${dong} 출장마사지 예약 기준 | ${area} 생활권 가격·코스 안내`,
    `${dong} 출장마사지 이용 전 체크 | 방문범위·요금·후기`,
    `${area} ${dong} 출장마사지 안내 | 예약 전 확인사항`,
    `${dong} 출장마사지 가격·코스·방문 가능 지역 정리`
  ], seed);
}

function renderPriceCards(region, area, dong) {
  const seed = hashText(`${region}-${area}-${dong}-price`);
  const prices = [
    ["스웨디시", [["60분", "80,000"], ["90분", "110,000"], ["120분", "140,000"]]],
    ["홈타이", [["60분", "70,000"], ["90분", "100,000"], ["120분", "문의"]]],
    ["아로마", [["60분", "90,000"], ["90분", "120,000"], ["120분", "150,000"]]],
    ["스포츠", [["60분", "80,000"], ["90분", "110,000"], ["120분", "문의"]]]
  ];
  const start = seed % prices.length;
  const ordered = prices.slice(start).concat(prices.slice(0, start));

  return ordered.map(([title, rows]) => `
    <article class="price-card">
      <h3>${title}</h3>
      ${rows.map(([time, price]) => `<p><span>${time}</span><strong>${price}</strong></p>`).join("")}
    </article>
  `).join("");
}

function buildFaq(region, area, dong) {
  const profile = getAreaProfile(region, area, dong);
  const seed = profile.seed;
  const faqSets = [
    [
      [`${dong} 출장마사지는 당일 예약이 가능한가요?`, `당일 예약은 가능할 수 있지만 시간대와 이동 동선에 따라 달라집니다. ${dong} 상세 주소와 희망 시간을 함께 알려주면 확인이 빠릅니다.`],
      [`${area}권은 이동비가 따로 붙나요?`, `${profile.caution} 심야, 원거리, 주차 조건이 있으면 추가 안내가 생길 수 있어 예약 전에 총 금액을 확인하는 것이 좋습니다.`],
      ["처음 이용하면 어떤 코스를 고르는 게 무난한가요?", "몸이 뻐근하면 스포츠, 편안한 회복 목적이면 아로마나 스웨디시를 먼저 비교해보는 편이 무난합니다."],
      ["예약 문의 때 꼭 말해야 할 내용은 무엇인가요?", "주소, 희망 시간, 원하는 코스, 집중 관리 부위, 결제 방식, 예약 변경 기준을 한 번에 확인하면 오해를 줄일 수 있습니다."],
      ["후기만 보고 선택해도 괜찮나요?", "후기는 참고 자료로 보고, 실제 문의 때 가격과 운영 기준을 명확하게 안내하는지 함께 확인하는 것이 좋습니다."]
    ],
    [
      [`${dong}에서 늦은 시간 예약도 가능한가요?`, `야간 가능 여부는 배정 상황과 이동 거리 기준으로 달라집니다. ${profile.route}`],
      ["주소를 정확히 말해야 하나요?", "대략적인 동 이름만으로는 도착 시간을 맞추기 어렵습니다. 건물명, 출입 방식, 주차 가능 여부를 알려주면 안내가 정확해집니다."],
      ["가격이 안내와 달라지는 경우가 있나요?", "코스 시간, 심야 여부, 이동 거리, 대기 시간에 따라 달라질 수 있으므로 예약 확정 전에 총 비용을 다시 확인하세요."],
      [`${area} ${dong} 주변 다른 동도 같이 문의할 수 있나요?`, "인근 동 방문 가능 여부는 당일 동선에 따라 달라집니다. 가까운 지역이라도 배정 위치에 따라 가능 시간이 달라질 수 있습니다."],
      ["처음 문의할 때 민망하지 않게 물어보는 방법이 있나요?", "희망 시간, 코스, 예산, 집중 관리 부위를 차분히 말하면 됩니다. 과장된 표현보다 필요한 조건을 정확히 확인하는 것이 좋습니다."]
    ],
    [
      [`${dong} 출장마사지 예약은 얼마나 여유 있게 해야 하나요?`, `${profile.life} 특성상 피크 시간에는 바로 배정이 어려울 수 있습니다. 원하는 시간이 있으면 최소 1~2시간 전 문의가 안정적입니다.`],
      ["관리 시간은 이동 시간까지 포함되나요?", "일반적으로 실제 관리 시간을 기준으로 안내하지만 업체마다 기준이 다를 수 있어 시작 시간과 종료 기준을 꼭 확인하세요."],
      ["아파트나 오피스텔 방문도 가능한가요?", "가능 여부는 출입 방식과 주차 조건에 따라 달라집니다. 공동현관, 경비실 안내, 주차 위치를 미리 알려주는 편이 좋습니다."],
      ["코스 변경은 현장에서 가능한가요?", "가능한 경우도 있지만 다음 예약과 준비 물품에 따라 제한될 수 있습니다. 변경 가능 여부는 예약 확정 전 문의하는 것이 안전합니다."],
      ["너무 저렴한 안내를 믿어도 되나요?", "낮은 가격만 보고 결정하기보다 총 금액, 관리 시간, 추가비, 운영정책을 함께 확인해야 실제 이용 만족도가 높습니다."]
    ]
  ];

  return pick(faqSets, seed);
}

function renderFaq(region, area, dong) {
  return buildFaq(region, area, dong).map(([question, answer]) => `
    <details class="faq-item">
      <summary>${question}</summary>
      <p>${answer}</p>
    </details>
  `).join("");
}

function renderLocalReview(region, area, dong) {
  const seed = hashText(`${region}-${area}-${dong}-review`);
  const reviews = [
    {
      rating: "★★★★★",
      name: "김0영",
      body: `${dong}에서 예약 전 문의했는데 가능 시간과 코스 차이를 차분하게 설명해줘서 처음 이용해도 불안하지 않았습니다. 어깨와 목이 많이 뻣뻣했는데 강도를 계속 확인해주면서 천천히 풀어주는 스타일이라 만족도가 높았습니다. 가격도 문의 때 들은 내용과 달라지지 않았습니다.`
    },
    {
      rating: "★★★★☆",
      name: "박0현",
      body: `${area} 쪽은 원하는 시간에 바로 맞추기는 조금 어려웠지만, 안내가 솔직해서 시간 여유 두고 예약하기 좋았습니다. 관리 자체는 무리하게 누르는 느낌이 아니라 중간중간 강도를 맞춰주는 편이었고, 이용 후 허리 쪽이 한결 편했습니다.`
    },
    {
      rating: "★★★★★",
      name: "이0진",
      body: `${dong} 근처에서 퇴근 후 이용했습니다. 주소 확인, 도착 시간, 금액 안내가 순서대로 정리돼서 헷갈리지 않았고 관리사님도 계속 편한지 물어봐줘서 좋았습니다. 다음에는 예약 시간을 조금 더 넉넉히 잡고 이용하려고 합니다.`
    }
  ];
  const review = pick(reviews, seed);

  return `
    <section class="local-review-card">
      <div>
        <p class="eyebrow">고객후기</p>
        <h2>${dong} 이용 후기</h2>
      </div>
      <p class="review-stars" aria-label="${review.rating}">${review.rating}</p>
      <blockquote>${review.body}</blockquote>
      <span>${review.name} · ${area}권 이용 고객</span>
    </section>
  `;
}

function buildInfoRows(region, area, dong) {
  const profile = getAreaProfile(region, area, dong);
  return [
    ["방문 권역", `${profile.regionName} ${area} ${dong}`],
    ["예약 방식", pick([
      "전화 문의 후 가능 시간 확인",
      "희망 시간·코스 확인 후 배정 안내",
      "주소와 코스 확인 뒤 예약 확정"
    ], profile.seed)],
    ["운영 안내", pick([
      profile.route,
      "지역·시간·코스별 가능 여부를 먼저 확인합니다",
      "당일 동선에 따라 가능 시간과 대기 시간이 달라질 수 있습니다"
    ], profile.seed + 1)],
    ["확인 항목", pick([
      "주소, 출입 방식, 결제, 변경 기준",
      "주차, 공동현관, 희망 코스, 집중 부위",
      "총 금액, 관리 시간, 도착 가능 시간"
    ], profile.seed + 2)]
  ];
}

function buildNotice(region, area, dong) {
  const profile = getAreaProfile(region, area, dong);
  return pick([
    `불법·무리한 요청은 진행하지 않습니다. ${dong} 예약 전 안내된 시간, 금액, 코스 기준을 확인한 뒤 이용해 주세요.`,
    `${area}권 방문은 당일 이동 동선에 따라 가능 시간이 달라질 수 있습니다. 예약 확정 전 총 금액과 변경 기준을 꼭 확인해 주세요.`,
    `${profile.caution} 예약 후 주소가 바뀌면 도착 시간이 달라질 수 있으니 변경 사항은 바로 알려주세요.`,
    "안전한 이용을 위해 코스, 관리 시간, 결제 방식은 전화 문의 단계에서 먼저 안내드립니다. 과장 광고성 요청은 진행하지 않습니다."
  ], profile.seed);
}

function renderSeoArticle(region, area, dong, nearby) {
  const profile = getAreaProfile(region, area, dong);
  const nearbyText = nearby.length
    ? `${nearby.join(", ")} 등 인근 동까지 함께 비교하면 실제 이동 가능 시간을 더 정확하게 잡을 수 있습니다.`
    : "인근 생활권까지 함께 확인하면 이동 가능 시간을 더 정확하게 잡을 수 있습니다.";

  const reasons = [
    `${dong} 출장마사지를 찾는 분들은 가까운 업체만 찾기보다 예약 가능 시간, 총 비용, 코스 차이, 방문 가능 범위를 함께 확인하려는 경우가 많습니다. ${profile.route}`,
    `${dong}은 ${profile.life}이라 이용 목적이 조금씩 다릅니다. 퇴근 후 피로 회복, 주말 휴식, 장시간 운전 뒤 관리처럼 실제 상황을 먼저 말하면 코스 안내가 더 정확해집니다.`,
    `${area} ${dong} 문의는 단순 가격 비교보다 “언제 도착 가능한지”, “어떤 코스가 맞는지”, “추가비가 있는지”를 확인하려는 검색 의도가 강합니다.`
  ];

  const coverage = [
    `${area} 안에서도 역 주변, 상권, 주거 밀집지, 오피스텔 구간은 예약 수요가 다릅니다. ${nearbyText}`,
    `${dong} 방문 가능 여부는 거리보다 출입 조건과 도착 동선의 영향을 더 받는 경우가 있습니다. ${profile.caution}`,
    `${profile.life}에서는 시간대별 이동 흐름이 다릅니다. 낮 시간에는 주거지, 저녁에는 역세권과 상권 문의가 늘어나는 편입니다.`
  ];

  const courses = [
    "스웨디시는 부드러운 순환 관리에 가깝고, 홈타이는 스트레칭과 압박 중심입니다. 아로마는 오일 사용 여부를 확인해야 하며, 스포츠 마사지는 목·어깨·허리처럼 특정 부위 피로를 말해두는 편이 좋습니다.",
    "가볍게 긴장을 풀고 싶다면 아로마나 스웨디시가 무난하고, 뻐근한 부위를 분명히 관리받고 싶다면 스포츠나 홈타이 계열을 비교해볼 수 있습니다. 코스명만 보지 말고 실제 관리 방식과 시간을 확인하세요.",
    "처음 이용한다면 강한 압 위주의 코스보다 중간 강도로 조절 가능한 코스를 고르는 편이 편합니다. 오일 사용 여부, 스트레칭 포함 여부, 집중 부위 관리 가능 여부를 문의 단계에서 확인하면 좋습니다."
  ];

  const checklist = [
    `가격, 이용 시간, 상세 위치, 추가비용, 운영정책, 예약 변경 기준은 문의 단계에서 확인해야 합니다. 특히 ${dong}처럼 건물 출입 방식이 다른 곳은 공동현관, 주차, 엘리베이터 이용 가능 여부를 미리 알려주는 것이 좋습니다.`,
    `예약 전에는 총 금액, 시작 기준, 관리 시간, 도착 가능 시간을 먼저 물어보세요. ${profile.caution}`,
    `주소를 나중에 알려주면 배정 시간이 흔들릴 수 있습니다. ${dong} 이용 전에는 건물명, 주차 가능 여부, 희망 코스, 불편한 부위를 한 번에 정리해두는 편이 좋습니다.`
  ];

  const pricing = [
    "코스 시간, 서비스 종류, 심야 여부, 이동 거리, 대기 시간에 따라 금액이 달라질 수 있습니다. 너무 낮은 가격만 앞세우는 안내보다 총 비용과 조건을 분명히 말하는 곳을 선택하는 편이 안전합니다.",
    `${area}권 안에서도 원거리 이동, 심야 시간, 주차 대기 여부에 따라 안내 금액이 달라질 수 있습니다. 예약 확정 전 “추가비 포함 총액”을 확인하는 것이 가장 깔끔합니다.`,
    "가격 차이는 관리 시간만으로 결정되지 않습니다. 코스 준비물, 이동 동선, 늦은 시간 배정 여부, 요청 부위에 따라 상담 내용이 달라질 수 있습니다."
  ];

  const advice = [
    "과장된 표현이나 확인되지 않은 후기만 보고 결정하지 말고, 문의할 때 응답이 구체적인지 확인하세요. 실제 이용 전에는 “총 금액이 얼마인지”, “몇 분 코스인지”, “예약 변경은 어떻게 되는지”를 물어보면 불필요한 오해를 줄일 수 있습니다.",
    `${dong}에서 처음 문의한다면 원하는 시간 하나만 말하기보다 가능한 시간대를 2~3개 정도 준비하는 편이 좋습니다. 실제로 피크 시간에는 한 시간 차이로 가능 여부가 달라지는 경우가 있습니다.`,
    "후기는 분위기를 보는 자료로 활용하고, 최종 결정은 상담의 명확함으로 판단하는 편이 좋습니다. 가격 설명이 계속 바뀌거나 운영 기준이 모호하면 예약 전에 다시 확인하세요."
  ];

  const layouts = [
    [
      [`${dong} 출장마사지를 찾는 분들이 많은 이유`, pick(reasons, profile.seed)],
      [`${dong} 주요 생활권과 방문 가능 범위`, pick(coverage, profile.seed + 1)],
      [`${dong}에서 선택할 수 있는 마사지 종류`, pick(courses, profile.seed + 2)],
      ["예약 전 꼭 확인해야 할 사항", pick(checklist, profile.seed + 3)],
      ["가격이 달라지는 이유", pick(pricing, profile.seed + 4)],
      ["처음 이용하는 분들을 위한 현실적인 조언", pick(advice, profile.seed + 5)]
    ],
    [
      [`${area} ${dong} 생활권에서 먼저 봐야 할 점`, pick(coverage, profile.seed + 1)],
      [`${dong} 출장마사지 수요가 생기는 실제 상황`, pick(reasons, profile.seed + 2)],
      ["코스 선택 전에 비교할 부분", pick(courses, profile.seed + 3)],
      ["문의 단계에서 확인할 예약 기준", pick(checklist, profile.seed + 4)],
      [`${dong} 요금 안내가 달라질 수 있는 조건`, pick(pricing, profile.seed + 5)],
      ["처음 이용할 때 도움이 되는 팁", pick(advice, profile.seed + 6)]
    ],
    [
      [`${dong} 방문 가능 범위와 이동 조건`, pick(coverage, profile.seed + 2)],
      ["이용 목적별 코스 선택 기준", pick(courses, profile.seed + 3)],
      [`${dong} 출장마사지 문의가 많은 이유`, pick(reasons, profile.seed + 4)],
      ["예약 전에 놓치기 쉬운 확인사항", pick(checklist, profile.seed + 5)],
      ["가격을 비교할 때 봐야 할 기준", pick(pricing, profile.seed + 6)],
      [`${area}권 처음 이용자를 위한 조언`, pick(advice, profile.seed + 7)]
    ]
  ];

  const sections = pick(layouts, profile.seed);

  return `
    <article class="seo-article">
      ${sections.map(([heading, body]) => `
        <h2>${heading}</h2>
        <p>${body}</p>
      `).join("")}
    </article>
  `;
}

function renderLocalPage(regionData) {
  const region = regionData[regionKey] || regionData.seoul;
  const regionName = regionNames[regionKey] || "서울";
  const dongs = region.areas[areaName] || [];
  const nearby = dongs.filter((dong) => dong !== dongName).slice(0, 8);
  const profile = getAreaProfile(regionKey, areaName, dongName);
  const title = buildTitle(regionKey, areaName, dongName);
  const description = buildDescription(regionKey, areaName, dongName);
  const infoRows = buildInfoRows(regionKey, areaName, dongName);

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
            ${infoRows.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}
          </dl>
        </article>

        <article class="profile-card">
          <img src="${profilePhotoUrl}" loading="lazy" alt="전문 관리사 프로필 사진">
          <div>
            <p class="eyebrow">프로필</p>
            <h2>전문 관리사 배정</h2>
            <p>${profile.life}에 맞춰 이동 가능 시간, 요청 부위, 희망 코스를 확인한 뒤 배정 안내를 진행합니다.</p>
            <span>스웨디시 · 아로마 · 홈타이 상담 가능</span>
          </div>
        </article>
      </div>

      <div class="local-block">
        <p class="eyebrow">마사지 코스 및 요금</p>
        <h2>코스별 기본 요금표</h2>
        <div class="price-grid">${renderPriceCards(regionKey, areaName, dongName)}</div>
        <p class="price-note">${areaName} ${dongName} 방문은 시간대, 이동 거리, 주차 조건, 코스 구성에 따라 실제 안내 금액이 달라질 수 있습니다.</p>
      </div>

      <div class="notice-box">
        <strong>업소 공지사항</strong>
        <p>${buildNotice(regionKey, areaName, dongName)}</p>
      </div>

      ${renderLocalReview(regionKey, areaName, dongName)}

      ${renderSeoArticle(regionKey, areaName, dongName, nearby)}

      <section class="faq-section">
        <p class="eyebrow">FAQ</p>
        <h2>${dongName} 출장마사지 자주 묻는 질문</h2>
        ${renderFaq(regionKey, areaName, dongName)}
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
