(() => {
  const registry = window.MAZZANG_AREA_SLUGS || (window.MAZZANG_AREA_SLUGS = {});

  const initial = ["g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s", "ss", "", "j", "jj", "ch", "k", "t", "p", "h"];
  const medial = ["a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i"];
  const finalSound = ["", "k", "k", "ks", "n", "nj", "nh", "t", "l", "lk", "lm", "lb", "ls", "lt", "lp", "lh", "m", "p", "ps", "t", "t", "ng", "t", "t", "k", "t", "p", "t"];

  const forcedSlugs = {
    "서울": "seoul", "경기": "gyeonggi", "인천": "incheon", "부산": "busan", "대구": "daegu", "대전": "daejeon", "광주": "gwangju", "강원": "gangwon", "제주": "jeju",
    "강남": "gangnam", "서초": "seocho", "송파": "songpa", "마포": "mapo", "영등포": "yeongdeungpo", "용산": "yongsan", "성동": "seongdong", "광진": "gwangjin", "중구": "junggu", "종로": "jongno", "강서": "gangseo", "관악": "gwanak", "동작": "dongjak", "강동": "gangdong", "노원": "nowon", "은평": "eunpyeong", "구로": "guro", "금천": "geumcheon", "동대문": "dongdaemun", "서대문": "seodaemun", "성북": "seongbuk", "양천": "yangcheon", "중랑": "jungnang", "강북": "gangbuk", "도봉": "dobong",
    "성남 분당": "bundang", "성남": "seongnam", "수원": "suwon", "용인": "yongin", "고양 일산": "ilsan", "고양": "goyang", "안양": "anyang", "부천": "bucheon", "화성 동탄": "dongtan", "남양주": "namyangju", "김포": "gimpo", "파주": "paju", "광명": "gwangmyeong", "하남": "hanam", "의정부": "uijeongbu", "시흥": "siheung", "평택": "pyeongtaek", "안산": "ansan", "안성": "anseong", "양주": "yangju", "여주": "yeoju", "오산": "osan", "이천": "icheon", "포천": "pocheon", "가평": "gapyeong", "과천": "gwacheon", "구리": "guri", "군포": "gunpo", "동두천": "dongducheon", "양평": "yangpyeong", "연천": "yeoncheon", "의왕": "uiwang",
    "연수 송도": "songdo", "부평": "bupyeong", "남동": "namdong", "서구": "seogu", "미추홀": "michuhol", "계양": "gyeyang",
    "해운대": "haeundae", "부산진": "busanjin", "수영": "suyeong", "동래": "dongnae", "남구": "namgu", "사하": "saha", "수성": "suseong", "달서": "dalseo", "동구": "donggu", "북구": "bukgu", "유성": "yuseong", "대덕": "daedeok", "광산": "gwangsan", "춘천": "chuncheon", "원주": "wonju", "강릉": "gangneung", "제주시": "jejusi", "서귀포": "seogwipo",
    "개포동": "gaepo-dong", "논현동": "nonhyeon-dong", "대치동": "daechi-dong", "도곡동": "dogok-dong", "삼성동": "samseong-dong", "세곡동": "segok-dong", "수서동": "suseo-dong", "신사동": "sinsa-dong", "압구정동": "apgujeong-dong", "역삼동": "yeoksam-dong", "일원동": "irwon-dong", "자곡동": "jagok-dong", "청담동": "cheongdam-dong",
    "내곡동": "naegok-dong", "반포동": "banpo-dong", "방배동": "bangbae-dong", "서초동": "seocho-dong", "양재동": "yangjae-dong", "우면동": "umyeon-dong", "원지동": "wonji-dong", "잠원동": "jamwon-dong",
    "잠실동": "jamsil-dong", "문정동": "munjeong-dong", "방이동": "bangi-dong", "석촌동": "seokchon-dong", "가락동": "garak-dong", "오금동": "ogeum-dong", "송파동": "songpa-dong"
  };

  const labelToSlug = {};
  const slugToLabel = {};

  function decode(value) {
    try { return decodeURIComponent(value || ""); } catch { return value || ""; }
  }

  function hasHangul(value) {
    return /[가-힣]/.test(value || "");
  }

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

  function normalizeMixed(value) {
    return String(value || "")
      .replace(/-dong$/i, "동")
      .replace(/-eup$/i, "읍")
      .replace(/-myeon$/i, "면")
      .replace(/-station$/i, "역")
      .replace(/-/g, " ")
      .trim();
  }

  function addLabel(label, forced) {
    const clean = normalizeMixed(label);
    if (!clean) return;
    const slug = forced || forcedSlugs[clean] || romanize(clean);
    if (!slug) return;
    labelToSlug[clean] = labelToSlug[clean] || slug;
    slugToLabel[slug.toLowerCase()] = clean;
    slugToLabel[slug.toLowerCase().replace(/-/g, "")] = clean;
  }

  Object.entries(forcedSlugs).forEach(([label, slug]) => addLabel(label, slug));

  const candidateLabels = `서울 경기 인천 부산 대구 대전 광주 강원 제주 강남 서초 송파 마포 영등포 용산 성동 광진 중구 종로 강서 관악 동작 강동 노원 은평 구로 금천 동대문 서대문 성북 양천 중랑 강북 도봉 성남 분당 성남 수원 용인 고양 일산 안양 부천 화성 동탄 남양주 김포 파주 광명 하남 의정부 시흥 평택 안산 안성 양주 여주 오산 이천 포천 가평 과천 구리 군포 동두천 양평 연천 의왕 연수 송도 부평 남동 서구 미추홀 계양 해운대 부산진 수영 동래 남구 사하 수성 달서 동구 북구 유성 대덕 광산 춘천 원주 강릉 제주시 서귀포 수정구 중원구 분당구 장안구 권선구 팔달구 영통구 처인구 기흥구 수지구 덕양구 일산동구 일산서구 만안구 동안구 개포동 논현동 대치동 도곡동 삼성동 세곡동 수서동 신사동 압구정동 역삼동 일원동 자곡동 청담동 내곡동 반포동 방배동 서초동 양재동 우면동 원지동 잠원동 가락동 거여동 마천동 문정동 방이동 삼전동 석촌동 송파동 신천동 오금동 잠실동 장지동 풍납동 공덕동 도화동 망원동 상암동 서교동 성산동 아현동 연남동 합정동 당산동 대림동 도림동 문래동 신길동 양평동 여의도동 영등포동 남영동 보광동 이촌동 이태원동 청파동 한강로 한남동 후암동 금호동 마장동 성수동 송정동 옥수동 왕십리동 행당동 광장동 구의동 군자동 능동 자양동 중곡동 화양동 광희동 남대문로 다산동 명동 신당동 약수동 을지로 장충동 회현동 황학동 가회동 교남동 무악동 부암동 사직동 삼청동 숭인동 이화동 종로동 창신동 혜화동 가양동 개화동 공항동 내발산동 등촌동 마곡동 방화동 염창동 화곡동 남현동 봉천동 신림동 노량진동 대방동 동작동 본동 사당동 상도동 신대방동 흑석동 강일동 고덕동 길동 둔촌동 명일동 상일동 성내동 암사동 천호동 공릉동 상계동 월계동 중계동 하계동 갈현동 구산동 녹번동 대조동 불광동 수색동 역촌동 응암동 증산동 진관동 가리봉동 개봉동 고척동 구로동 궁동 신도림동 오류동 온수동 천왕동 항동 가산동 독산동 답십리동 신설동 용두동 이문동 장안동 전농동 제기동 청량리동 회기동 휘경동 남가좌동 대현동 북가좌동 북아현동 연희동 창천동 홍은동 홍제동 길음동 돈암동 동선동 보문동 삼선동 석관동 성북동 안암동 월곡동 장위동 정릉동 종암동 목동 신월동 신정동 망우동 면목동 묵동 상봉동 신내동 중화동 미아동 번동 수유동 우이동 도봉동 방학동 쌍문동 우동 중동 좌동 재송동 반여동 부전동 전포동 범천동 가야동 개금동 양정동 광안동 남천동 민락동 망미동 명륜동 온천동 사직동 수안동 안락동 대연동 문현동 용호동 감만동 하단동 당리동 괴정동 장림동 다대동 범어동 만촌동 황금동 지산동 두산동 상인동 월성동 두류동 본리동 성당동 동성로 삼덕동 대봉동 남산동 효목동 각산동 침산동 산격동 복현동 칠성동 대명동 봉덕동 정자동 서현동 수내동 야탑동 판교동 이매동 신흥동 태평동 수진동 단대동 산성동 양지동 복정동 위례동 창곡동 고등동 성남동 중앙동 금광동 은행동 상대원동 하대원동 도촌동 구미동 백현동 삼평동 운중동 조원동 천천동 율전동 영화동 송죽동 파장동 권선동 세류동 호매실동 곡반정동 고색동 탑동 인계동 우만동 매산동 매교동 화서동 지동 영통동 매탄동 망포동 원천동 이의동 하동 동춘동 선학동 송도동 연수동 옥련동 청학동 부평동 산곡동 삼산동 청천동 구월동 만수동 간석동 청라동 주안동 학익동 계산동 작전동 효성동 봉명동 도룡동 관평동 전민동 노은동 수완동 첨단동 월계동 신창동 운남동 퇴계동 석사동 후평동 온의동 무실동 단계동 반곡동 교동 포남동 입암동 유천동 연동 노형동 이도동 아라동 서귀동 동홍동 중문동 대정읍`;
  candidateLabels.split(/\s+/).forEach(addLabel);

  function toLabel(value) {
    const decoded = decode(value).trim();
    const lower = decoded.toLowerCase();
    if (slugToLabel[lower]) return slugToLabel[lower];
    if (registry.reverseSlugs?.[decoded]) return normalizeMixed(registry.reverseSlugs[decoded]);
    if (hasHangul(decoded)) return normalizeMixed(decoded);
    return normalizeMixed(decoded);
  }

  function toSlug(label) {
    const clean = normalizeMixed(label);
    if (labelToSlug[clean]) return labelToSlug[clean];
    if (registry.slugOverrides?.[clean]) return registry.slugOverrides[clean];
    return romanize(clean);
  }

  function areaUrl(city, district, dong) {
    const parts = ["", "area", toSlug(city)];
    if (district) parts.push(toSlug(district));
    if (dong) parts.push(toSlug(dong));
    return `${parts.join("/")}/`;
  }

  registry.fromSlug = toLabel;
  registry.toSlug = toSlug;
  registry.areaUrl = areaUrl;

  function labelsFromPath() {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts[0] !== "area") return null;
    return {
      city: toLabel(parts[1] || "seoul"),
      district: parts[2] ? toLabel(parts[2]) : "",
      dong: parts[3] ? toLabel(parts[3]) : ""
    };
  }

  function canonicalizeCurrentUrl(labels) {
    if (!labels?.city) return;
    const cleanPath = areaUrl(labels.city, labels.district, labels.dong);
    if (cleanPath && cleanPath !== location.pathname) history.replaceState(history.state, "", cleanPath + location.search + location.hash);
  }

  function sentenceHtml(text) {
    return String(text || "").split(/(?<=다\.)\s*/).filter(Boolean).map((line) => `<p>${line}</p>`).join("");
  }

  function setCanonical() {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = location.origin + location.pathname;
  }

  function installStyles() {
    if (document.getElementById("ma-area-label-fix-style")) return;
    const style = document.createElement("style");
    style.id = "ma-area-label-fix-style";
    style.textContent = `.ma-readable p{margin:0 0 12px;color:rgba(255,255,255,.84);line-height:1.86}.trust-footer{background:linear-gradient(180deg,#090909,#030303);border-top:1px solid rgba(255,138,29,.28);padding:48px 24px 26px;color:#fff}.trust-footer .footer-brand,.trust-footer .footer-grid,.trust-footer .footer-copy{max-width:1160px;margin-left:auto;margin-right:auto}.trust-footer .footer-brand{display:flex;gap:14px;align-items:center;border:1px solid rgba(255,138,29,.38);border-radius:8px;padding:18px;margin-bottom:20px;background:linear-gradient(135deg,rgba(255,138,29,.14),rgba(255,255,255,.025))}.trust-footer .brand-mark{width:42px;height:42px;border-radius:8px;background:#ff8a1d;color:#050505;display:inline-flex;align-items:center;justify-content:center;font-weight:900}.trust-footer .footer-grid{display:grid;grid-template-columns:1.1fr 1fr 1.15fr;gap:18px}.trust-footer .footer-col{border:1px solid rgba(255,255,255,.14);border-radius:8px;background:linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.018));padding:20px}.trust-footer h2{font-size:18px;color:#ff8a1d;margin:0 0 16px;padding-bottom:14px;border-bottom:1px solid rgba(255,138,29,.32)}.trust-footer .footer-row{display:grid;grid-template-columns:96px 1fr;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.1);line-height:1.55}.trust-footer a{color:#fff;text-decoration:none;font-weight:800}.trust-footer .footer-copy{margin-top:26px;padding-top:22px;border-top:1px solid rgba(255,255,255,.12);text-align:center;color:rgba(255,255,255,.72)}@media(max-width:900px){.trust-footer{padding-bottom:88px}.trust-footer .footer-grid{grid-template-columns:1fr}}`;
    document.head.appendChild(style);
  }

  function installFooter() {
    const footer = document.querySelector(".trust-footer, .site-footer");
    if (!footer || footer.dataset.maFooter === "true") return;
    footer.className = "trust-footer";
    footer.dataset.maFooter = "true";
    footer.innerHTML = `<div class="footer-brand"><span class="brand-mark">M</span><span><strong>마짱</strong><small>전국 지역 안내 및 예약 상담</small></span></div><div class="footer-grid"><section class="footer-col"><h2>회사 정보</h2><div class="footer-row"><span>상호</span><strong>마짱</strong></div><div class="footer-row"><span>대표자명</span><strong>강백호</strong></div><div class="footer-row"><span>주소</span><strong>서울시 강남구 테헤란로 313<br>(우)06151</strong></div><div class="footer-row"><span>운영시간</span><strong>오후 4시~익일 오전 8시까지</strong></div></section><section class="footer-col"><h2>고객 지원</h2><div class="footer-row"><span>공지사항</span><a href="/notice.html">공지 확인</a></div><div class="footer-row"><span>자주 묻는 질문</span><a href="/faq.html">FAQ 보기</a></div><div class="footer-row"><span>예약문의</span><a href="tel:0508-202-4683">1:1 문의</a></div><div class="footer-row"><span>전화번호</span><a href="tel:0508-202-4683">0508-202-4683</a></div></section><section class="footer-col"><h2>소셜 & 법적 정보</h2><div class="footer-row"><span>Instagram</span><strong>준비중</strong></div><div class="footer-row"><span>YouTube</span><strong>준비중</strong></div><div class="footer-row"><span>정책</span><a href="/policy.html">개인정보처리방침</a></div><div class="footer-row"><span>약관</span><a href="/terms.html">이용약관</a></div></section></div><p class="footer-copy">Copyright © 2026 Mazzang. All rights reserved.</p>`;
  }

  function applyAreaHub(labels) {
    if (!labels || labels.dong) return;
    const label = labels.district || labels.city;
    const title = labels.district ? `${labels.district} 출장마사지 가능 지역 | ${labels.city} 세부 동 예약 안내` : `${labels.city} 출장마사지 가능 지역 | 행정구별 예약 안내`;
    const description = labels.district ? `${labels.city} ${labels.district} 출장마사지 이용 전 확인하면 좋은 세부 동, 방문 가능 범위, 예약 기준, 가격 차이와 코스 선택 방법을 안내합니다.` : `${labels.city} 출장마사지 가능 지역을 행정구별로 확인하고, 원하는 지역의 세부 동과 예약 전 확인사항을 살펴보세요.`;
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = description;
    const eyebrow = document.querySelector(".hub-hero .eyebrow, .eyebrow");
    if (eyebrow && /area|local/i.test(eyebrow.textContent)) eyebrow.textContent = "지역 안내";
    const pageTitle = document.querySelector("#page-title");
    if (pageTitle && /[a-z]/i.test(pageTitle.textContent)) pageTitle.textContent = labels.district ? `${label} 세부 동 선택` : `${label} 지역 선택`;
  }

  function applyAreaDetail(labels) {
    if (!labels?.dong) return;
    const { city, district, dong } = labels;
    const areaName = `${city} ${district} ${dong}`;
    const note = city === "부산" ? "행사, 숙박지 위치, 언덕길 여부에 따라 이동 시간이 달라질 수 있습니다." : city === "대구" ? "상권과 주거 단지의 문의 시간대가 달라 방문 조건을 먼저 확인하는 편이 좋습니다." : "세부 위치와 이동 조건에 따라 안내 시간이 달라질 수 있습니다.";
    const title = `${dong} 출장마사지 예약 전 확인사항 | ${district} 가격·지역·코스 안내`;
    const description = `${areaName} 출장마사지 이용 전 확인하면 좋은 예약 기준, 가격 차이, 주요 생활권, 코스 선택 방법을 정리했습니다. ${note}`;
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = description;

    const setText = (selector, text) => { const el = document.querySelector(selector); if (el) el.textContent = text; };
    const setHtml = (selector, text) => { const el = document.querySelector(selector); if (el) { el.classList.add("ma-readable"); el.innerHTML = sentenceHtml(text); } };

    const eyebrow = document.querySelector(".hub-hero .eyebrow, .eyebrow");
    if (eyebrow) eyebrow.textContent = "지역 안내";
    setText("#page-title", `${dong} 예약 전 확인 기준`);
    setText("#page-summary", description);
    setText("#info-title", `${dong} 방문 안내`);
    setText("#info-area", areaName);
    setText("#reason-title", `${dong}을 찾는 분들이 많은 이유`);
    setText("#range-title", `${areaName} 생활권과 방문 가능 범위`);
    setText("#faq-title", `${dong} 자주 묻는 질문`);

    setHtml("#reason-text", `${dong}은 ${district} 안에서도 생활 동선과 방문 목적이 조금씩 다른 지역입니다. 퇴근 후 피로 회복, 주말 휴식, 늦은 시간 예약처럼 실제 이용 상황을 먼저 말하면 코스 안내가 더 정확해집니다. 단순히 가까운 곳을 고르는 것보다 희망 시간, 건물 출입 방식, 코스 시간을 같이 확인하는 편이 만족도에 더 큰 영향을 줍니다.`);
    setHtml("#range-text", `${district} 안에서도 역 주변, 주거 밀집지, 오피스텔 구간은 이동 시간과 출입 방식이 다를 수 있습니다. ${note} 예약 전에는 가까운 역, 건물 유형, 주차 가능 여부, 도착 희망 시간을 알려주면 안내가 더 정확해집니다.`);
    setHtml("#check-text", `${dong} 예약 전에는 최종 요금, 코스 시간, 방문 장소, 추가 이동 여부, 예약 변경 기준을 확인하는 것이 좋습니다. 처음 이용하는 경우에는 원하는 강도와 불편한 부위를 미리 말하면 상담이 훨씬 편해집니다. 몸 상태가 좋지 않거나 강한 압이 부담스러운 경우에는 예약 전 반드시 먼저 알려주세요.`);

    const faq = document.querySelector("#faq-list");
    if (faq) {
      faq.innerHTML = [
        [`${dong}도 당일 예약이 가능한가요?`, `가능 여부는 시간대와 이동 동선에 따라 달라집니다. 전화 문의 시 ${areaName}과 희망 시간을 먼저 알려주세요.`],
        [`${district} 안에서도 요금이 달라질 수 있나요?`, "코스 시간, 심야 시간, 이동 거리, 관리 종류에 따라 최종 안내가 달라질 수 있습니다."],
        ["처음 이용하면 어떤 코스가 좋나요?", "부담이 적은 기본 코스부터 상담받고, 몸 상태와 선호 강도에 맞춰 선택하는 편이 좋습니다."],
        ["예약 전 무엇을 말해야 하나요?", "지역, 희망 시간, 원하는 코스, 방문 장소의 출입 방식 정도를 알려주시면 됩니다."],
        ["주의해야 할 점이 있나요?", "몸 상태가 좋지 않거나 의료적 판단이 필요한 증상이 있으면 이용을 미루는 편이 좋습니다."]
      ].map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");
    }
  }

  function run() {
    installStyles();
    installFooter();
    const labels = labelsFromPath();
    canonicalizeCurrentUrl(labels);
    setCanonical();
    applyAreaHub(labels);
    applyAreaDetail(labels);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  setTimeout(run, 300);
  setTimeout(run, 1200);
  setTimeout(run, 2200);
})();
