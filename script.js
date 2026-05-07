(() => {
  const phone = "0508-202-4683";
  const regionLinks = [["서울", "/area/seoul/"], ["경기", "/area/gyeonggi/"], ["인천", "/area/incheon/"], ["부산", "/area/busan/"], ["대구", "/area/daegu/"], ["대전", "/area/daejeon/"], ["광주", "/area/gwangju/"], ["강원", "/area/gangwon/"], ["제주", "/area/jeju/"]];
  const page = location.pathname.split("/").pop() || "index.html";
  const site = "https://mazzanng.netlify.app";
  const pageSeo = {
    "index.html": ["마짱 | 내 지역으로 오는 출장 마사지 예약 안내", "마짱은 서울, 경기, 인천, 부산 등 주요 지역의 방문 가능 여부, 코스와 요금, 예약 전 확인사항을 안내합니다. 지역과 희망 시간을 알려주시면 가능 여부를 확인합니다."],
    "booking.html": ["출장마사지 예약방법 | 지역·시간·코스 확인 순서 안내", "처음 문의부터 예약 확정까지 필요한 지역, 희망 시간, 코스, 방문 장소 전달 방법을 단계별로 안내합니다."],
    "process.html": ["출장마사지 이용순서 | 처음 고객을 위한 진행 절차 안내", "문의, 상담, 예약 확정, 방문 전 준비, 관리 진행, 종료 후 확인까지 실제 이용 흐름을 쉽게 정리했습니다."],
    "price.html": ["마사지 코스 및 요금 안내 | 타이·아로마·VIP 가격 기준", "타이, 아로마, VIP 코스별 요금 기준과 가격이 달라지는 이유, 예약 전 확인할 사항을 정리했습니다."],
    "coverage.html": ["방문 가능 지역 안내 | 서울·경기·인천·전국 주요 생활권", "방문 가능 지역을 주요 생활권 중심으로 정리하고, 지역별 도착 시간과 예약 전 확인 기준을 안내합니다."],
    "first.html": ["출장마사지 처음 이용 안내 | 첫 예약 전 확인사항", "처음 예약하는 고객이 궁금해하는 코스 선택, 문의 예시, 방문 전 준비사항, 주의사항을 안내합니다."],
    "swedish.html": ["스웨디시 마사지 안내 | 처음 이용 전 관리 특징과 주의사항", "스웨디시 마사지의 특징, 추천 대상, 진행 방식, 예약 전 확인사항과 주의사항을 정리했습니다."],
    "thai.html": ["타이마사지 안내 | 전신 피로 완화와 스트레칭 관리 설명", "타이마사지를 처음 이용하는 분도 이해하기 쉽도록 관리 특징, 추천 대상, 진행 방식, 예약 전 확인사항을 정리했습니다."],
    "aroma.html": ["아로마 마사지 안내 | 오일 선택과 예약 전 주의사항", "아로마 마사지의 관리 방식, 오일 선택 기준, 피부 상태별 주의사항, 예약 전 확인할 내용을 안내합니다."],
    "sports.html": ["스포츠 마사지 안내 | 피로 관리와 예약 전 체크사항", "스포츠 마사지의 특징, 필요한 상황, 코스 선택 기준, 이용 전 주의사항을 과장 표현 없이 정리했습니다."],
    "reviews.html": ["고객 후기 | 지역별 이용 경험과 예약 전 참고사항", "마짱 이용 고객 후기를 별점, 지역, 이용 상황별로 정리했습니다. 예약 전 상담, 가격, 코스 만족도를 확인하세요."],
    "info.html": ["지역 정보 | 이용 전 확인하면 좋은 생활권별 예약 기준", "지역별 검색 의도와 생활권 특성, 예약 전 확인하면 좋은 기준을 정리한 정보 페이지입니다."],
    "notice.html": ["공지사항 | 운영시간·예약 변경·방문 가능 기준 안내", "마짱 운영시간, 예약 변경 및 취소, 방문 가능 지역 확인 기준, 안전 이용 안내를 공지합니다."],
    "policy.html": ["운영정책 | 예약 기준·변경·취소·안전 이용 안내", "예약 확정 기준, 변경 및 취소, 요금 안내, 안전 이용 기준과 개인정보 처리 관련 안내를 정리했습니다."],
    "checklist.html": ["예약 전 확인사항 | 가격·시간·주소·코스 체크리스트", "예약 전 확인해야 할 가격, 시간, 방문 주소, 출입 방식, 코스, 변경 기준을 체크리스트로 정리했습니다."]
  };
  function meta(name) {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) { tag = document.createElement("meta"); tag.name = name; document.head.appendChild(tag); }
    return tag;
  }
  function og(property) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) { tag = document.createElement("meta"); tag.setAttribute("property", property); document.head.appendChild(tag); }
    return tag;
  }
  function link(rel) {
    let tag = document.querySelector(`link[rel="${rel}"]`);
    if (!tag) { tag = document.createElement("link"); tag.rel = rel; document.head.appendChild(tag); }
    return tag;
  }
  function applySeo() {
    const data = pageSeo[page] || null;
    const canonicalPath = page === "index.html" ? "/" : `/${page}`;
    link("canonical").href = `${site}${canonicalPath}`;
    if (data) {
      document.title = data[0];
      meta("description").content = data[1];
      og("og:title").content = data[0];
      og("og:description").content = data[1];
      og("og:url").content = `${site}${canonicalPath}`;
      og("og:site_name").content = "마짱";
      og("og:type").content = "website";
    }
    if (!document.getElementById("ma-org-schema")) {
      const schema = document.createElement("script");
      schema.id = "ma-org-schema";
      schema.type = "application/ld+json";
      schema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "마짱",
        url: site,
        telephone: phone,
        address: { "@type": "PostalAddress", addressCountry: "KR", addressLocality: "서울", streetAddress: "서울시 강남구 테헤란로 313", postalCode: "06151" },
        openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "16:00", closes: "08:00" }]
      });
      document.head.appendChild(schema);
    }
  }
  function installStyle() {
    if (document.getElementById("ma-shared-style")) return;
    const style = document.createElement("style");
    style.id = "ma-shared-style";
    style.textContent = `
      .guide-grid{align-items:stretch}.guide-grid>a{display:block;height:100%}.guide-grid article{display:flex;flex-direction:column;height:100%;min-height:168px}.guide-grid article p{margin-top:10px}
      .home-trust-section{background:radial-gradient(circle at 12% 8%,rgba(255,138,29,.16),transparent 30%),linear-gradient(180deg,#080808 0%,#111 100%)}.home-trust-wrap{display:grid;gap:18px}.home-trust-lead{background:linear-gradient(135deg,rgba(255,138,29,.15),rgba(255,255,255,.035));border:1px solid rgba(255,138,29,.34);border-radius:8px;padding:26px}.home-trust-lead p{color:rgba(255,255,255,.82);margin-top:12px;max-width:820px}.home-trust-grid{display:grid;gap:14px;grid-template-columns:repeat(3,minmax(0,1fr))}.home-trust-card{background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.018));border:1px solid rgba(255,255,255,.13);border-radius:8px;min-height:190px;padding:22px}.home-trust-card strong{color:var(--orange);display:block;font-size:21px;line-height:1.35;margin-bottom:10px}.home-trust-card p,.home-trust-card li{color:rgba(255,255,255,.78)}.home-trust-card ul{display:grid;gap:8px;margin:0;padding-left:18px}.home-trust-card.quote{border-color:rgba(255,138,29,.42);grid-column:span 2}.home-trust-card.quote p{border-left:3px solid var(--orange);color:#fff;font-weight:800;line-height:1.75;padding-left:14px}.home-faq-panel{background:#121212;border:1px solid rgba(255,138,29,.28);border-radius:8px;padding:24px}.home-faq-panel h3{font-size:28px;margin-bottom:16px}.home-faq-list{display:grid;gap:10px}.home-faq-list details{background:#0a0a0a;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:15px 16px}.home-faq-list summary{color:#fff;cursor:pointer;font-weight:900}.home-faq-list p{color:rgba(255,255,255,.74);margin-top:10px}.home-trust-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.home-trust-links a{background:rgba(255,138,29,.1);border:1px solid rgba(255,138,29,.35);border-radius:999px;color:#fff;font-weight:900;padding:9px 13px}
      .site-footer{background:radial-gradient(circle at 12% 0%,rgba(255,138,29,.18),transparent 28%),linear-gradient(180deg,#141414 0%,#080808 68%,#050505 100%)!important;border-top:1px solid rgba(255,138,29,.38)!important;color:#fff!important;padding:0 max(22px,calc((100vw - var(--max))/2))!important}.site-footer::before,.site-footer::after{content:none!important;display:none!important}.footer-inner{display:grid;gap:20px;padding:34px 0 26px}.footer-brand-panel{align-items:center;background:linear-gradient(135deg,rgba(255,138,29,.16),rgba(255,255,255,.035));border:1px solid rgba(255,138,29,.28);border-radius:8px;display:flex;gap:14px;padding:16px 18px}.footer-brand-mark{align-items:center;background:var(--orange);border-radius:7px;color:#050505;display:inline-flex;font-weight:900;height:42px;justify-content:center;width:42px}.footer-brand-panel strong{display:block;font-size:20px}.footer-brand-panel p{color:rgba(255,255,255,.72);font-size:13px;margin-top:3px}.footer-info-grid{display:grid;gap:18px;grid-template-columns:1.05fr .95fr 1.1fr}.footer-column{background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.018));border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:18px}.footer-column h2{border-bottom:1px solid rgba(255,138,29,.32);color:var(--orange);font-size:17px;margin:0 0 4px;padding:0 0 12px}.footer-column dl{display:grid;margin:0}.footer-column dl>div{align-items:start;border-bottom:1px solid rgba(255,255,255,.09);display:grid;gap:12px;grid-template-columns:92px minmax(0,1fr);min-height:44px;padding:12px 0}.footer-column dt,.footer-column dd{font-size:15px;line-height:1.55;margin:0}.footer-column dt{color:rgba(255,255,255,.66)}.footer-column dd{font-weight:800}.footer-column a,.footer-legal-links a{color:#fff;text-decoration:none}.footer-socials{display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr));padding-top:16px}.social-link{align-items:center;background:rgba(0,0,0,.26);border:1px solid rgba(255,255,255,.12);border-radius:8px;display:flex;gap:9px;min-height:46px;padding:10px 12px}.social-link svg{fill:none;height:21px;stroke:var(--orange);stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;width:21px}.footer-legal-links{border-top:1px solid rgba(255,255,255,.09);display:flex;flex-wrap:wrap;gap:10px;margin-top:16px;padding-top:16px}.footer-legal-links a{background:rgba(255,138,29,.1);border:1px solid rgba(255,138,29,.28);border-radius:999px;font-size:13px;font-weight:900;padding:8px 12px}.footer-copyright{border-top:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.62);font-size:14px;margin:0;padding:18px 0 22px;text-align:center;width:100%}
      @media(max-width:900px){.home-trust-grid{grid-template-columns:1fr 1fr}.home-trust-card.quote{grid-column:span 2}.footer-info-grid{grid-template-columns:1fr}}@media(max-width:620px){.home-trust-grid{grid-template-columns:1fr}.home-trust-card,.home-trust-card.quote{grid-column:auto;min-height:0}.home-trust-lead,.home-faq-panel{padding:20px}.footer-socials{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }
  function applyRegionNav() {
    const item = Array.from(document.querySelectorAll(".main-nav .nav-item")).find((navItem) => navItem.querySelector(":scope > a")?.textContent.includes("지역"));
    if (!item) return;
    const mainLink = item.querySelector(":scope > a");
    mainLink.href = "/#regions";
    mainLink.textContent = "지역 출장마사지";
    let dropdown = item.querySelector(":scope > .dropdown");
    if (!dropdown) { dropdown = document.createElement("div"); dropdown.className = "dropdown"; item.appendChild(dropdown); }
    dropdown.innerHTML = regionLinks.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
  }
  function installFooter() {
    document.querySelectorAll(".site-footer").forEach((footer) => {
      if (footer.dataset.richFooter === "true") return;
      footer.dataset.richFooter = "true";
      footer.innerHTML = `
        <div class="footer-inner" aria-label="사이트 정보"><section class="footer-brand-panel"><span class="footer-brand-mark">M</span><div><strong>마짱</strong><p>전국 지역 안내 및 예약 상담</p></div></section><div class="footer-info-grid"><section class="footer-column"><h2>회사 정보</h2><dl><div><dt>상호</dt><dd>마짱</dd></div><div><dt>대표자명</dt><dd>강백호</dd></div><div><dt>주소</dt><dd>서울시 강남구 테헤란로 313 (우)06151</dd></div><div><dt>운영시간</dt><dd>오후 4시~익일 오전 8시까지</dd></div></dl></section><section class="footer-column"><h2>고객 지원</h2><dl><div><dt>공지사항</dt><dd><a href="/notice.html">공지 확인</a></dd></div><div><dt>자주 묻는 질문</dt><dd><a href="/support.html">FAQ 보기</a></dd></div><div><dt>예약문의</dt><dd><a href="tel:${phone}">1:1 문의</a></dd></div><div><dt>전화번호</dt><dd><a href="tel:${phone}">${phone}</a></dd></div></dl></section><section class="footer-column"><h2>소셜 & 법적 정보</h2><div class="footer-socials"><a href="#" class="social-link"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="5"></rect><circle cx="12" cy="12" r="3.5"></circle></svg><span>Instagram</span></a><a href="#" class="social-link"><svg viewBox="0 0 24 24"><path d="M4.5 8.4c.2-1.2 1.2-2.1 2.4-2.2 3.4-.3 6.8-.3 10.2 0 1.2.1 2.2 1 2.4 2.2.4 2.4.4 4.8 0 7.2-.2 1.2-1.2 2.1-2.4 2.2-3.4.3-6.8.3-10.2 0-1.2-.1-2.2-1-2.4-2.2-.4-2.4-.4-4.8 0-7.2Z"></path><path d="m10.5 9 5 3-5 3V9Z"></path></svg><span>YouTube</span></a><a href="#" class="social-link"><svg viewBox="0 0 24 24"><path d="M5 4h14v16H5z"></path><path d="M8 8h8M8 12h8M8 16h5"></path></svg><span>Blog</span></a><a href="#" class="social-link"><svg viewBox="0 0 24 24"><path d="M12 5c4.4 0 8 2.7 8 6.1s-3.6 6.1-8 6.1c-.6 0-1.2-.1-1.8-.2L6.8 19l.8-3c-2.2-1.1-3.6-2.9-3.6-4.9C4 7.7 7.6 5 12 5Z"></path></svg><span>Kakao</span></a></div><div class="footer-legal-links"><a href="/policy.html">개인정보처리방침</a><a href="/terms.html">이용약관</a></div></section></div></div><p class="footer-copyright">Copyright © 2026 Mazzang. All rights reserved.</p>`;
    });
  }
  function injectHomeTrustSection() {
    const reviews = document.querySelector("#reviews");
    if (!reviews || document.querySelector("#home-trust")) return;
    const section = document.createElement("section");
    section.className = "section home-trust-section";
    section.id = "home-trust";
    section.innerHTML = `<div class="home-trust-wrap"><div class="home-trust-lead"><p class="eyebrow">Before booking</p><h2>마짱을 이용하기 전 확인할 기준</h2><p>처음 문의하는 고객이 지역, 시간, 코스, 최종 요금을 순서대로 확인할 수 있도록 안내합니다. 단순히 빠른 예약만 강조하지 않고 방문 가능 여부와 운영 기준을 먼저 설명해 불필요한 오해를 줄이는 것이 핵심입니다.</p></div><div class="home-trust-grid"><article class="home-trust-card"><strong>지역별 예약 가능 여부</strong><p>고객이 이용할 권역과 세부 생활권을 먼저 확인한 뒤 관리사 이동 가능 시간과 방문 조건을 함께 안내합니다. 같은 지역이라도 건물 출입 방식, 주차 가능 여부, 심야 시간대에 따라 가능 시간이 달라질 수 있습니다.</p></article><article class="home-trust-card"><strong>코스와 요금이 달라지는 이유</strong><p>요금은 코스 종류, 이용 시간, 심야 상담 여부, 이동 거리, 현장 조건에 따라 달라질 수 있습니다. 예약 전에는 기본 요금과 추가 확인이 필요한 조건을 먼저 안내합니다.</p></article><article class="home-trust-card"><strong>운영정책 및 예약 제한</strong><p>건강 상태가 좋지 않거나 음주가 과한 경우, 출입 정보가 불명확한 경우, 무리한 요청이 있는 경우에는 예약이 제한될 수 있습니다.</p></article><article class="home-trust-card quote"><strong>처음 이용하는 고객 상담 예시</strong><p>안녕하세요. 서울 강남구 역삼동입니다. 오늘 밤 9시쯤 아로마 120분 가능할까요? 처음 이용이라 코스 차이와 최종 요금, 방문 전 확인사항도 안내 부탁드립니다.</p></article><article class="home-trust-card"><strong>예약 전 함께 볼 안내</strong><ul><li>지역 선택 후 세부 생활권 확인</li><li>희망 시간과 대체 가능 시간 비교</li><li>코스별 관리 방식과 요금 확인</li><li>방문 주소, 출입 방식, 결제 기준 확인</li></ul></article></div><div class="home-faq-panel"><h3>자주 묻는 질문</h3><div class="home-faq-list"><details><summary>처음 예약할 때 무엇을 먼저 말하면 되나요?</summary><p>이용 지역, 희망 날짜와 시간, 원하는 코스를 먼저 알려주시면 됩니다.</p></details><details><summary>지역이 같아도 가능 시간이 달라질 수 있나요?</summary><p>네. 이동 동선, 주차, 건물 출입 방식, 심야 시간대 여부에 따라 달라질 수 있습니다.</p></details><details><summary>코스 요금은 언제 확정되나요?</summary><p>상담 단계에서 코스, 이용 시간, 방문 지역, 추가 확인 조건을 확인한 뒤 최종 요금을 안내합니다.</p></details><details><summary>예약 변경이나 취소는 어떻게 하나요?</summary><p>방문 준비가 시작되기 전에 알려주시는 것이 가장 좋습니다.</p></details><details><summary>몸 상태가 좋지 않아도 이용할 수 있나요?</summary><p>발열, 염증, 심한 통증, 과도한 음주 상태라면 이용을 미루는 편이 좋습니다.</p></details></div><div class="home-trust-links"><a href="/booking.html">예약방법</a><a href="/price.html">가격 안내</a><a href="/coverage.html">방문 가능 지역</a><a href="/policy.html">운영정책</a><a href="/first.html">처음 이용 안내</a></div></div></div>`;
    reviews.parentNode.insertBefore(section, reviews);
  }
  function addTrustTail() {
    const pages = ["booking.html","process.html","price.html","coverage.html","first.html","checklist.html"];
    const main = document.querySelector("main");
    if (!main || !pages.includes(page) || document.querySelector(".ma-eeat-tail")) return;
    const section = document.createElement("section");
    section.className = "section ma-eeat-tail";
    section.innerHTML = `<div class="section-heading"><p class="eyebrow">Trust guide</p><h2>예약 전 신뢰 기준</h2><p>마짱은 지역, 시간, 코스, 최종 요금, 변경 기준을 예약 전에 확인하는 흐름을 권장합니다. 가능 여부가 모호한 경우 바로 확정하지 않고 실제 이동 조건과 방문 기준을 함께 확인합니다.</p></div><div class="principles"><p>지역명만으로 가능 여부를 단정하지 않습니다. 세부 동, 건물 출입 방식, 주차 가능 여부, 희망 시간까지 확인해야 정확한 안내가 가능합니다.</p><p>건강 상태가 좋지 않거나 강한 압이 부담스러운 경우에는 예약 전 미리 알려주세요. 무리한 진행보다 컨디션에 맞는 코스 선택이 중요합니다.</p></div>`;
    main.appendChild(section);
  }
  function mobileNav() {
    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector("#main-nav");
    navToggle?.addEventListener("click", () => {
      const isOpen = mainNav?.classList.toggle("is-open") || false;
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
  function run() {
    installStyle();
    applySeo();
    applyRegionNav();
    injectHomeTrustSection();
    addTrustTail();
    installFooter();
    mobileNav();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
