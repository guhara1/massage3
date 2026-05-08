(() => {
  const registry = window.MAZZANG_AREA_SLUGS;
  const explicit = {
    seoul: "서울", gyeonggi: "경기", incheon: "인천", busan: "부산", daegu: "대구", daejeon: "대전", gwangju: "광주", gangwon: "강원", jeju: "제주",
    gangnam: "강남", seocho: "서초", songpa: "송파", mapo: "마포", yeongdeungpo: "영등포", yongsan: "용산", seongdong: "성동", gwangjin: "광진", junggu: "중구", jongno: "종로", gangseo: "강서", gwanak: "관악", dongjak: "동작", gangdong: "강동", nowon: "노원", eunpyeong: "은평", guro: "구로", geumcheon: "금천", dongdaemun: "동대문", seodaemun: "서대문", seongbuk: "성북", yangcheon: "양천", jungnang: "중랑", gangbuk: "강북", dobong: "도봉",
    bundang: "분당", seongnam: "성남", suwon: "수원", yongin: "용인", goyang: "고양", ilsan: "일산", anyang: "안양", bucheon: "부천", dongtan: "화성 동탄", songdo: "연수 송도", bupyeong: "부평", namdong: "남동", seogu: "서구", michuhol: "미추홀", gyeyang: "계양",
    haeundae: "해운대", busanjin: "부산진", suyeong: "수영", dongnae: "동래", namgu: "남구", saha: "사하", suseong: "수성", dalseo: "달서", donggu: "동구", bukgu: "북구",
    "개포동": "gaepo-dong", "논현동": "nonhyeon-dong", "대치동": "daechi-dong", "도곡동": "dogok-dong", "삼성동": "samseong-dong", "세곡동": "segok-dong", "수서동": "suseo-dong", "신사동": "sinsa-dong", "압구정동": "apgujeong-dong", "역삼동": "yeoksam-dong", "일원동": "irwon-dong", "자곡동": "jagok-dong", "청담동": "cheongdam-dong",
    "내곡동": "naegok-dong", "반포동": "banpo-dong", "방배동": "bangbae-dong", "서초동": "seocho-dong", "양재동": "yangjae-dong", "우면동": "umyeon-dong", "원지동": "wonji-dong", "잠원동": "jamwon-dong",
    "잠실동": "jamsil-dong", "문정동": "munjeong-dong", "방이동": "bangi-dong", "석촌동": "seokchon-dong", "가락동": "garak-dong", "오금동": "ogeum-dong", "송파동": "songpa-dong",
    "전포동": "jeonpo-dong", "부전동": "bujeon-dong", "범천동": "beomcheon-dong", "가야동": "gaya-dong", "개금동": "gaegeum-dong", "양정동": "yangjeong-dong", "우동": "u-dong", "중동": "jung-dong", "좌동": "jwa-dong", "재송동": "jaesong-dong", "반여동": "banyeo-dong",
    "광안동": "gwangan-dong", "남천동": "namcheon-dong", "민락동": "minrak-dong", "망미동": "mangmi-dong", "범어동": "beomeo-dong", "만촌동": "manchon-dong", "황금동": "hwanggeum-dong", "지산동": "jisan-dong", "두산동": "dusan-dong"
  };
  const reverse = Object.entries(explicit).reduce((acc, [key, value]) => {
    if (/[a-z]/i.test(key) && /[가-힣]/.test(value)) acc[key] = value;
    if (/[가-힣]/.test(key) && /[a-z]/i.test(value)) acc[value] = key;
    return acc;
  }, {});
  const initial = ["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"];
  const medial = ["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"];
  const finalSound = ["","k","k","ks","n","nj","nh","t","l","lk","lm","lb","ls","lt","lp","lh","m","p","ps","t","t","ng","t","t","k","t","p","t"];
  function decode(value) { try { return decodeURIComponent(value || ""); } catch { return value || ""; } }
  function hasHangul(value) { return /[가-힣]/.test(value); }
  function normalizeMixed(value) { return String(value || "").replace(/-dong$/i, "동").replace(/-eup$/i, "읍").replace(/-myeon$/i, "면").replace(/-station$/i, "역").replace(/-/g, " ").trim(); }
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
  function toLabel(value) {
    const decoded = decode(value).trim();
    const lower = decoded.toLowerCase();
    if (reverse[lower]) return reverse[lower];
    if (explicit[lower] && hasHangul(explicit[lower])) return explicit[lower];
    if (hasHangul(decoded)) return normalizeMixed(decoded);
    if (registry?.reverseSlugs?.[decoded]) return normalizeMixed(registry.reverseSlugs[decoded]);
    return normalizeMixed(decoded);
  }
  function toSlug(label) {
    const clean = normalizeMixed(label);
    if (explicit[clean]) return explicit[clean];
    if (registry?.slugOverrides?.[clean]) return registry.slugOverrides[clean];
    return romanize(clean);
  }
  function areaUrl(city, district, dong) {
    const parts = ["", "area", toSlug(city)];
    if (district) parts.push(toSlug(district));
    if (dong) parts.push(toSlug(dong));
    return `${parts.join("/")}/`;
  }
  if (registry) {
    registry.fromSlug = toLabel;
    registry.toSlug = toSlug;
    registry.areaUrl = areaUrl;
  }
  function labelsFromPath() {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts[0] !== "area") return null;
    return { city: toLabel(parts[1] || "seoul"), district: toLabel(parts[2] || "gangnam"), dong: parts[3] ? toLabel(parts[3]) : "" };
  }
  function canonicalizeCurrentUrl(labels) {
    if (!labels?.city) return;
    const cleanPath = areaUrl(labels.city, labels.district, labels.dong);
    if (cleanPath && cleanPath !== location.pathname) history.replaceState(history.state, "", cleanPath + location.search + location.hash);
  }
  function sentenceHtml(text) { return String(text || "").split(/(?<=다\.)\s*/).filter(Boolean).map((line) => `<p>${line}</p>`).join(""); }
  function setCanonical() {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = location.origin + location.pathname;
  }
  function installStyles() {
    if (document.getElementById("ma-area-label-fix-style")) return;
    const style = document.createElement("style");
    style.id = "ma-area-label-fix-style";
    style.textContent = ".ma-readable p{margin:0 0 12px;color:rgba(255,255,255,.84);line-height:1.86}.trust-footer{background:linear-gradient(180deg,#090909,#030303);border-top:1px solid rgba(255,138,29,.28);padding:48px 24px 26px;color:#fff}.trust-footer .footer-brand,.trust-footer .footer-grid,.trust-footer .footer-copy{max-width:1160px;margin-left:auto;margin-right:auto}.trust-footer .footer-brand{display:flex;gap:14px;align-items:center;border:1px solid rgba(255,138,29,.38);border-radius:8px;padding:18px;margin-bottom:20px;background:linear-gradient(135deg,rgba(255,138,29,.14),rgba(255,255,255,.025))}.trust-footer .brand-mark{width:42px;height:42px;border-radius:8px;background:#ff8a1d;color:#050505;display:inline-flex;align-items:center;justify-content:center;font-weight:900}.trust-footer .footer-grid{display:grid;grid-template-columns:1.1fr 1fr 1.15fr;gap:18px}.trust-footer .footer-col{border:1px solid rgba(255,255,255,.14);border-radius:8px;background:linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.018));padding:20px}.trust-footer h2{font-size:18px;color:#ff8a1d;margin:0 0 16px;padding-bottom:14px;border-bottom:1px solid rgba(255,138,29,.32)}.trust-footer .footer-row{display:grid;grid-template-columns:96px 1fr;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.1);line-height:1.55}.trust-footer a{color:#fff;text-decoration:none;font-weight:800}.trust-footer .footer-copy{margin-top:26px;padding-top:22px;border-top:1px solid rgba(255,255,255,.12);text-align:center;color:rgba(255,255,255,.72)}@media(max-width:900px){.trust-footer{padding-bottom:88px}.trust-footer .footer-grid{grid-template-columns:1fr}}";
    document.head.appendChild(style);
  }
  function installFooter() {
    const footer = document.querySelector(".trust-footer, .site-footer");
    if (!footer || footer.dataset.maFooter === "true") return;
    footer.className = "trust-footer";
    footer.dataset.maFooter = "true";
    footer.innerHTML = `<div class="footer-brand"><span class="brand-mark">M</span><span><strong>마짱</strong><small>전국 지역 안내 및 예약 상담</small></span></div><div class="footer-grid"><section class="footer-col"><h2>회사 정보</h2><div class="footer-row"><span>상호</span><strong>마짱</strong></div><div class="footer-row"><span>대표자명</span><strong>강백호</strong></div><div class="footer-row"><span>주소</span><strong>서울시 강남구 테헤란로 313<br>(우)06151</strong></div><div class="footer-row"><span>운영시간</span><strong>오후 4시~익일 오전 8시까지</strong></div></section><section class="footer-col"><h2>고객 지원</h2><div class="footer-row"><span>공지사항</span><a href="/notice.html">공지 확인</a></div><div class="footer-row"><span>자주 묻는 질문</span><a href="/faq.html">FAQ 보기</a></div><div class="footer-row"><span>예약문의</span><a href="tel:0508-202-4683">1:1 문의</a></div><div class="footer-row"><span>전화번호</span><a href="tel:0508-202-4683">0508-202-4683</a></div></section><section class="footer-col"><h2>소셜 & 법적 정보</h2><div class="footer-row"><span>Instagram</span><strong>준비중</strong></div><div class="footer-row"><span>YouTube</span><strong>준비중</strong></div><div class="footer-row"><span>정책</span><a href="/policy.html">개인정보처리방침</a></div><div class="footer-row"><span>약관</span><a href="/terms.html">이용약관</a></div></section></div><p class="footer-copy">Copyright © 2026 Mazzang. All rights reserved.</p>`;
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
    if (faq) faq.innerHTML = [[`${dong}도 당일 예약이 가능한가요?`, `가능 여부는 시간대와 이동 동선에 따라 달라집니다. 전화 문의 시 ${areaName}과 희망 시간을 먼저 알려주세요.`],[`${district} 안에서도 요금이 달라질 수 있나요?`, "코스 시간, 심야 시간, 이동 거리, 관리 종류에 따라 최종 안내가 달라질 수 있습니다."],["처음 이용하면 어떤 코스가 좋나요?", "부담이 적은 기본 코스부터 상담받고, 몸 상태와 선호 강도에 맞춰 선택하는 편이 좋습니다."],["예약 전 무엇을 말해야 하나요?", "지역, 희망 시간, 원하는 코스, 방문 장소의 출입 방식 정도를 알려주시면 됩니다."],["주의해야 할 점이 있나요?", "몸 상태가 좋지 않거나 의료적 판단이 필요한 증상이 있으면 이용을 미루는 편이 좋습니다."]].map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");
  }
  function run() {
    installStyles();
    installFooter();
    const labels = labelsFromPath();
    canonicalizeCurrentUrl(labels);
    setCanonical();
    applyAreaDetail(labels);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  setTimeout(run, 300);
  setTimeout(run, 1200);
  setTimeout(run, 2200);
})();
