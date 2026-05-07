(() => {
  const registry = window.MAZZANG_AREA_SLUGS;
  if (!registry) return;

  const initial = ["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"];
  const medial = ["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"];
  const finalSound = ["","k","k","ks","n","nj","nh","t","l","lk","lm","lb","ls","lt","lp","lh","m","p","ps","t","t","ng","t","t","k","t","p","t"];

  function romanize(text) {
    return Array.from(String(text || "")).map((char) => {
      const code = char.charCodeAt(0) - 44032;
      if (code < 0 || code > 11171) return char;
      const jong = code % 28;
      const jung = ((code - jong) / 28) % 21;
      const cho = Math.floor((code - jong) / 28 / 21);
      return initial[cho] + medial[jung] + finalSound[jong];
    }).join("").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
  }

  function add(label, slug) {
    const cleanLabel = String(label || "").trim();
    if (!cleanLabel) return;
    const cleanSlug = slug || registry.slugOverrides[cleanLabel] || romanize(cleanLabel);
    registry.slugOverrides[cleanLabel] = cleanSlug;
    registry.reverseSlugs[cleanSlug] = cleanLabel;
    registry.reverseSlugs[cleanSlug.replace(/-/g, "")] = cleanLabel;
  }

  const labels = [
    "서울","경기","인천","부산","대구","대전","세종","광주","전북","강원","제주",
    "강남","서초","송파","마포","영등포","용산","성동","광진","중구","종로","강서","관악","동작","강동","노원","은평","구로","금천","동대문","서대문","성북","양천","중랑","강북","도봉",
    "성남 분당","분당","수원","용인","고양 일산","일산","안양","부천","화성 동탄","동탄","연수 송도","송도","부평","남동","서구","미추홀","계양",
    "해운대","부산진","수영","동래","남구","사하","수성","달서","동구","북구","유성","신도심","조치원","대덕","광산","전주","익산","군산","춘천","원주","강릉","제주시","서귀포",
    "개포동","논현동","대치동","도곡동","삼성동","세곡동","수서동","신사동","압구정동","역삼동","일원동","자곡동","청담동","서초동","반포동","방배동","양재동","잠원동","내곡동",
    "잠실동","문정동","방이동","석촌동","가락동","오금동","송파동","공덕동","합정동","상암동","서교동","망원동","도화동","여의도동","문래동","당산동","신길동","영등포동","대림동",
    "한남동","이태원동","원효로동","청파동","문배동","성수동","왕십리동","금호동","옥수동","행당동","구의동","자양동","화양동","군자동","중곡동","명동","신당동","을지로","혜화동",
    "마곡동","화곡동","등촌동","봉천동","신림동","사당동","상도동","흑석동","천호동","암사동","상계동","공릉동","구로동","신도림동","가산동","독산동","청량리동","회기동","홍제동","목동",
    "정자동","서현동","수내동","야탑동","판교동","이매동","인계동","광교동","영통동","매탄동","권선동","죽전동","보정동","동백동","장항동","마두동","주엽동","백석동","화정동",
    "송도동","연수동","동춘동","청학동","옥련동","부평동","산곡동","삼산동","청천동","구월동","만수동","간석동","청라동","주안동","학익동","계산동","작전동","효성동",
    "우동","중동","좌동","재송동","부전동","전포동","범천동","광안동","남천동","민락동","범어동","만촌동","두산동","지산동","황금동","상인동","월성동","두류동","본리동","성당동",
    "봉명동","도룡동","관평동","전민동","노은동","나성동","도담동","아름동","종촌동","치평동","수완동","첨단동","하남동","효자동","서신동","퇴계동","석사동","후평동","온의동","무실동","단계동","반곡동","명륜동","교동","포남동","입암동","유천동","연동","노형동","이도동","아라동","서귀동","동홍동","중문동","대정읍"
  ];
  labels.forEach((label) => add(label));
  labels.filter((label) => !label.endsWith("동") && !label.endsWith("읍") && !label.includes(" ")).forEach((name) => {
    add(`${name}동`);
    add(`${name}1동`);
    add(`${name}2동`);
    add(`${name}중심가`);
    add(`${name}역권`);
  });

  const originalFromSlug = registry.fromSlug;
  registry.fromSlug = (slug) => {
    let value = String(slug || "").trim();
    try { value = decodeURIComponent(value); } catch {}
    if (registry.reverseSlugs[value]) return registry.reverseSlugs[value];
    const compact = value.replace(/-/g, "");
    if (registry.reverseSlugs[compact]) return registry.reverseSlugs[compact];
    const original = originalFromSlug ? originalFromSlug(value) : value;
    if (original && original !== value) return original;
    for (const label of Object.values(registry.reverseSlugs)) {
      if (romanize(label).replace(/-/g, "") === compact) return label;
    }
    return value;
  };
})();

(() => {
  const phone = "0508-202-4683";
  const cityProfile = {
    "서울": { tone: "퇴근 시간과 건물 출입 방식이 예약 정확도에 영향을 주는 도심형 지역", caution: "오피스텔, 주거 단지, 역세권별 이동 시간이 달라질 수 있습니다." },
    "경기": { tone: "도시 간 이동 거리가 넓어 세부 위치 확인이 중요한 광역형 지역", caution: "신도시와 구도심은 접근 동선이 달라 예상 시간이 바뀔 수 있습니다." },
    "인천": { tone: "송도, 부평, 남동처럼 생활권 성격이 뚜렷한 항만·도심 혼합 지역", caution: "외곽이나 공단 인접 구간은 도착 가능 시간을 별도로 확인합니다." },
    "부산": { tone: "해운대와 서면처럼 관광·상권 수요가 함께 움직이는 해안 도심 지역", caution: "행사, 숙박지 위치, 언덕길 여부에 따라 이동 시간이 달라질 수 있습니다." },
    "대구": { tone: "주거권과 중심상권의 이용 목적이 분리되는 내륙 대도시 지역", caution: "동성로와 주거 단지는 문의 시간대와 방문 조건이 다를 수 있습니다." },
    "대전": { tone: "유성, 둔산, 원도심 생활권이 분리된 연구·업무 중심 지역", caution: "가까운 역이나 건물명을 함께 알려주면 안내가 빨라집니다." },
    "광주": { tone: "상무, 첨단, 수완처럼 목적지가 뚜렷한 생활권 중심 지역", caution: "상권과 주거 단지는 출입 방식과 선호 시간이 다르게 나타납니다." },
    "강원": { tone: "도시 간 거리가 넓고 날씨 영향을 받기 쉬운 권역", caution: "눈·비나 심야 시간에는 도착 가능 시간을 여유 있게 확인합니다." },
    "제주": { tone: "숙소 위치와 이동 거리에 따라 안내가 크게 달라지는 섬 지역", caution: "제주시와 서귀포, 외곽 숙소는 위치 확인이 특히 중요합니다." }
  };
  const districtProfile = {
    "강남": "역삼·선릉·삼성처럼 오피스와 주거가 섞여 야간 문의가 많은 지역입니다.",
    "서초": "반포·방배·양재처럼 주거권과 업무권의 출입 기준이 다른 지역입니다.",
    "송파": "잠실 행사 일정과 문정 업무권의 이동 시간이 함께 고려되는 지역입니다.",
    "마포": "홍대·합정·공덕 생활권이 달라 시간대별 동선 확인이 필요한 지역입니다.",
    "영등포": "여의도 업무권과 문래·당산 주거권의 이용 목적이 나뉘는 지역입니다.",
    "분당": "정자·서현·판교처럼 역세권과 주거 단지가 분리된 신도시형 지역입니다.",
    "수원": "인계·광교·영통처럼 권역이 넓어 세부 동 확인이 중요한 지역입니다.",
    "송도": "오피스텔과 신축 주거 단지가 많아 건물 출입 방식 확인이 필요한 지역입니다.",
    "해운대": "숙박·관광 수요와 주거 수요가 섞여 시간대별 안내가 달라지는 지역입니다.",
    "수성": "주거권 중심 문의가 많아 조용한 방문 시간과 출입 기준 확인이 중요합니다."
  };
  const dongMotifs = [
    "가까운 역보다 실제 건물 진입 방식이 더 큰 차이를 만들 수 있습니다.",
    "퇴근 직후에는 상담이 몰릴 수 있어 대체 가능 시간을 함께 말하는 편이 좋습니다.",
    "주거 단지라면 주차와 공동현관 안내가 예약 흐름을 빠르게 만듭니다.",
    "오피스텔이나 숙소라면 객실 출입 기준과 프런트 동선을 먼저 확인해 주세요.",
    "심야 시간에는 관리 코스보다 도착 가능 시간 확인이 먼저입니다.",
    "처음 이용이라면 강도, 관리 시간, 최종 요금을 한 번에 확인하는 편이 안전합니다."
  ];

  function decode(value) { try { return decodeURIComponent(value || ""); } catch { return value || ""; } }
  function labelsFromPath() {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts[0] !== "area") return null;
    return {
      city: window.MAZZANG_AREA_SLUGS?.fromSlug?.(parts[1]) || decode(parts[1]),
      district: parts[2] ? window.MAZZANG_AREA_SLUGS?.fromSlug?.(parts[2]) || decode(parts[2]) : "",
      dong: parts[3] ? window.MAZZANG_AREA_SLUGS?.fromSlug?.(parts[3]) || decode(parts[3]) : ""
    };
  }
  function hash(text) { return Array.from(text || "").reduce((sum, ch) => sum + ch.charCodeAt(0), 0); }
  function sentenceLines(text) { return String(text || "").split(/(?<=다\.)\s*/).filter(Boolean).map((line) => `<p>${line}</p>`).join(""); }
  function setCanonical() {
    const canonicalUrl = location.origin + location.pathname;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canonicalUrl;
  }
  function setJsonLd(labels) {
    if (!labels) return;
    const old = document.getElementById("ma-local-schema");
    if (old) old.remove();
    const script = document.createElement("script");
    script.id = "ma-local-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: `마짱 ${[labels.city, labels.district, labels.dong].filter(Boolean).join(" ")} 안내`,
      telephone: phone,
      areaServed: [labels.city, labels.district, labels.dong].filter(Boolean).join(" "),
      address: { "@type": "PostalAddress", addressCountry: "KR", addressLocality: labels.city },
      url: location.href
    });
    document.head.appendChild(script);
  }
  function installStyles() {
    if (document.getElementById("ma-seo-polish-style")) return;
    const style = document.createElement("style");
    style.id = "ma-seo-polish-style";
    style.textContent = `
      .ma-readable p{margin:0 0 12px;color:rgba(255,255,255,.84);line-height:1.86}.ma-readable p:last-child{margin-bottom:0}
      .ma-seo-note{border-left:3px solid #ff8a1d;background:rgba(255,138,29,.08);padding:14px 16px;margin-top:14px;color:#fff;line-height:1.8}
      .trust-footer{background:linear-gradient(180deg,#090909,#030303);border-top:1px solid rgba(255,138,29,.28);padding:48px 24px 26px;color:#fff;box-shadow:0 -28px 70px rgba(0,0,0,.42)}
      .trust-footer .footer-brand{max-width:1160px;margin:0 auto 20px;display:flex;align-items:center;gap:14px;border:1px solid rgba(255,138,29,.38);border-radius:8px;padding:18px;background:linear-gradient(135deg,rgba(255,138,29,.14),rgba(255,255,255,.025))}
      .trust-footer .footer-brand .brand-mark{width:42px;height:42px;border-radius:8px;background:#ff8a1d;color:#050505;display:inline-flex;align-items:center;justify-content:center;font-weight:900}
      .trust-footer .footer-brand strong{display:block;font-size:20px}.trust-footer .footer-brand small{display:block;color:rgba(255,255,255,.75);margin-top:3px}
      .trust-footer .footer-grid{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:1.1fr 1fr 1.15fr;gap:18px}.trust-footer .footer-col{border:1px solid rgba(255,255,255,.14);border-radius:8px;background:linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.018));padding:20px}
      .trust-footer h2{font-size:18px;color:#ff8a1d;margin:0 0 16px;padding-bottom:14px;border-bottom:1px solid rgba(255,138,29,.32)}.trust-footer .footer-row{display:grid;grid-template-columns:96px 1fr;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.1);line-height:1.55}.trust-footer .footer-row span{color:rgba(255,255,255,.74)}.trust-footer a{color:#fff;text-decoration:none;font-weight:800}.trust-footer .footer-social{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:16px}.trust-footer .footer-social a{border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:13px 14px;background:rgba(0,0,0,.22);display:flex;align-items:center;gap:10px}.trust-footer .footer-social svg{width:18px;height:18px;color:#ff8a1d}.trust-footer .footer-policy-links{display:flex;gap:10px;flex-wrap:wrap;border-top:1px solid rgba(255,255,255,.1);padding-top:16px}.trust-footer .footer-policy-links a{border:1px solid rgba(255,138,29,.42);border-radius:999px;padding:10px 14px;background:rgba(255,138,29,.08)}.trust-footer .footer-copy{max-width:1160px;margin:26px auto 0;padding-top:22px;border-top:1px solid rgba(255,255,255,.12);text-align:center;color:rgba(255,255,255,.72)}
      @media(max-width:900px){.trust-footer{padding-bottom:88px}.trust-footer .footer-grid{grid-template-columns:1fr}.trust-footer .footer-row{grid-template-columns:86px 1fr}.trust-footer .footer-social{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }
  function installFooter() {
    const footer = document.querySelector(".trust-footer, .site-footer");
    if (!footer || footer.dataset.maFooter === "true") return;
    footer.className = "trust-footer";
    footer.dataset.maFooter = "true";
    footer.innerHTML = `
      <div class="footer-brand"><span class="brand-mark">M</span><span><strong>마짱</strong><small>전국 지역 안내 및 예약 상담</small></span></div>
      <div class="footer-grid">
        <section class="footer-col"><h2>회사 정보</h2><div class="footer-row"><span>상호</span><strong>마짱</strong></div><div class="footer-row"><span>대표자명</span><strong>강백호</strong></div><div class="footer-row"><span>주소</span><strong>서울시 강남구 테헤란로 313<br>(우)06151</strong></div><div class="footer-row"><span>운영시간</span><strong>오후 4시~익일 오전 8시까지</strong></div></section>
        <section class="footer-col"><h2>고객 지원</h2><div class="footer-row"><span>공지사항</span><a href="/notice.html">공지 확인</a></div><div class="footer-row"><span>자주 묻는 질문</span><a href="/faq.html">FAQ 보기</a></div><div class="footer-row"><span>예약문의</span><a href="tel:0508-202-4683">1:1 문의</a></div><div class="footer-row"><span>전화번호</span><a href="tel:0508-202-4683">0508-202-4683</a></div></section>
        <section class="footer-col"><h2>소셜 & 법적 정보</h2><div class="footer-social"><a href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg>Instagram</a><a href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="4"/><path d="M10 9.5 15 12l-5 2.5z" fill="currentColor"/></svg>YouTube</a><a href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>Blog</a><a href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5c-5 0-9 3-9 6.8 0 2.3 1.5 4.3 3.8 5.5L6 21l3.7-2.2c.7.1 1.5.2 2.3.2 5 0 9-3 9-7.2S17 5 12 5z"/></svg>Kakao</a></div><div class="footer-policy-links"><a href="/policy.html">개인정보처리방침</a><a href="/terms.html">이용약관</a></div></section>
      </div><p class="footer-copy">Copyright © 2026 Mazzang. All rights reserved.</p>`;
  }
  function areaLandingFaq(labels) {
    const panel = document.querySelector(".mini-faq");
    if (!panel || !labels || labels.dong) return;
    const city = labels.city || "서울";
    const district = labels.district;
    const profile = cityProfile[city] || cityProfile["서울"];
    const seed = hash(city + district);
    const focus = district ? `${district} 지역` : `${city} 권역`;
    const qas = district ? [
      [`${district}에서 세부 동을 먼저 고르는 이유는 무엇인가요?`, `${district} 안에서도 역세권, 주거 단지, 상권의 이동 시간이 다릅니다. ${districtProfile[district] || profile.caution}`],
      [`${district} 예약 전 가장 먼저 확인할 정보는 무엇인가요?`, `희망 시간, 가까운 역이나 건물명, 출입 방식, 원하는 코스 시간을 먼저 알려주시면 가능 여부와 최종 안내가 빨라집니다.`],
      [`${district} 안에서도 요금이나 시간이 달라질 수 있나요?`, `네. 이동 거리, 심야 시간, 건물 진입 조건, 코스 시간에 따라 안내가 달라질 수 있어 예약 전 확인이 필요합니다.`]
    ] : [
      [`${city}에서 먼저 어떤 지역을 선택해야 하나요?`, `${city}은 ${profile.tone}입니다. 먼저 구나 주요 생활권을 선택하면 세부 동 안내가 더 정확해집니다.`],
      [`${city} 예약 가능 여부는 바로 확정되나요?`, `${profile.caution} 그래서 지역명만으로 확정하지 않고 시간, 장소, 출입 조건을 함께 확인합니다.`],
      [`${city}에서 처음 문의할 때 어떤 문장이 좋나요?`, `“${city} 쪽이고 오늘 가능한 시간, 코스별 최종 요금, 방문 전 확인사항을 안내 부탁드립니다.”처럼 말하면 상담이 빠릅니다.`]
    ];
    panel.innerHTML = `<h3>${focus} 자주 묻는 질문</h3>` + qas.map(([q, a], i) => `<details ${i === 0 ? "open" : ""}><summary>${q}</summary><p>${a}</p></details>`).join("");
  }
  function detailSeo(labels) {
    if (!labels || !labels.dong) return;
    const city = labels.city || "서울";
    const district = labels.district || "강남";
    const dong = labels.dong;
    const profile = cityProfile[city] || cityProfile["서울"];
    const seed = hash(city + district + dong);
    const motif = dongMotifs[seed % dongMotifs.length];
    const districtLine = districtProfile[district] || `${district}은 ${city} 안에서도 세부 생활권별 이동 조건이 달라지는 지역입니다.`;
    const title = `${dong} 출장마사지 예약 전 확인사항 | ${district} 가격·지역·코스 안내`;
    const desc = `${city} ${district} ${dong} 출장마사지 이용 전 확인하면 좋은 예약 기준, 가격 차이, 주요 생활권, 코스 선택 방법을 정리했습니다. ${profile.caution}`;
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = desc;
    const titleEl = document.querySelector("#page-title");
    const summary = document.querySelector("#page-summary");
    if (titleEl) titleEl.textContent = `${dong} 예약 전 확인 기준`;
    if (summary) summary.textContent = desc;
    const reason = `${dong}은 ${district} 안에서도 이용 목적과 시간대가 달라질 수 있는 세부 생활권입니다. ${districtLine} ${motif} 단순히 가까운 곳을 고르는 것보다 희망 시간, 출입 방식, 코스 시간을 같이 확인하는 편이 실제 만족도에 더 큰 영향을 줍니다.`;
    const range = `${city} ${district} ${dong} 주변은 주거지, 상권, 역세권 여부에 따라 방문 조건이 달라집니다. ${profile.caution} 예약 전에는 상세 주소보다 먼저 가까운 역, 건물 유형, 주차 가능 여부, 도착 희망 시간을 알려주면 안내가 정확해집니다.`;
    const check = `${dong}에서 처음 문의한다면 지역과 희망 시간을 먼저 말한 뒤 원하는 코스와 관리 시간을 확인하는 흐름이 좋습니다. 최종 요금은 코스, 시간대, 이동 조건을 함께 본 뒤 안내받아야 오해가 적습니다. 몸 상태가 좋지 않거나 강한 압이 부담스러운 경우에는 예약 전 미리 말해 주세요.`;
    [["#reason-text", reason], ["#range-text", range], ["#check-text", check]].forEach(([selector, text]) => {
      const el = document.querySelector(selector);
      if (el) { el.classList.add("ma-readable"); el.innerHTML = sentenceLines(text); }
    });
    const faq = document.querySelector("#faq-list");
    if (faq) {
      const qas = [
        [`${dong}에서 당일 예약이 가능한가요?`, `가능 여부는 ${district} 내 이동 동선과 시간대에 따라 달라집니다. ${dong}과 희망 시간을 먼저 알려주시면 확인이 빠릅니다.`],
        [`${dong} 이용 전 비용은 어떻게 확인하나요?`, `코스 종류, 이용 시간, 심야 여부, 이동 조건을 확인한 뒤 최종 요금을 안내합니다. 예약 전 금액을 먼저 확인하는 흐름을 권장합니다.`],
        [`${district} 안에서도 ${dong}은 안내 기준이 다른가요?`, `네. 같은 ${district}이라도 건물 출입 방식, 주차 가능 여부, 역과의 거리 때문에 방문 가능 시간이 달라질 수 있습니다.`],
        [`처음 이용할 때 어떤 코스가 무난한가요?`, `처음이라면 몸 상태와 선호 강도를 말한 뒤 기본 시간대부터 상담받는 편이 좋습니다. 무리한 강도보다 편안한 진행이 중요합니다.`],
        [`${dong} 예약 전 주의할 점은 무엇인가요?`, `발열, 심한 통증, 과도한 음주 상태라면 이용을 미루는 것이 좋습니다. 건전한 이용 기준에 맞지 않는 요청은 진행하지 않습니다.`]
      ];
      faq.innerHTML = qas.map(([q, a], i) => `<details ${i === 0 ? "open" : ""}><summary>${q}</summary><p>${a}</p></details>`).join("");
    }
  }
  function run() {
    installStyles();
    installFooter();
    setCanonical();
    const labels = labelsFromPath();
    areaLandingFaq(labels);
    detailSeo(labels);
    setJsonLd(labels);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  setTimeout(run, 300);
  setTimeout(run, 1200);
})();
