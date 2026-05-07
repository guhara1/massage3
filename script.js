(() => {
  const regionLinks = [["수도권", "capital"], ["영남권", "yeongnam"], ["충청권", "chungcheong"], ["호남권", "honam"], ["강원·제주", "gangwonjeju"]];

  const style = document.createElement("style");
  style.textContent = `
    .guide-grid { align-items: stretch; }
    .guide-grid > a { display: block; height: 100%; }
    .guide-grid article { display: flex; flex-direction: column; height: 100%; min-height: 168px; }
    .guide-grid article p { margin-top: 10px; }

    .home-trust-section { background: radial-gradient(circle at 12% 8%, rgba(255,138,29,.16), transparent 30%), linear-gradient(180deg,#080808 0%,#111 100%); }
    .home-trust-wrap { display: grid; gap: 18px; }
    .home-trust-lead { background: linear-gradient(135deg, rgba(255,138,29,.15), rgba(255,255,255,.035)); border: 1px solid rgba(255,138,29,.34); border-radius: 8px; padding: 26px; }
    .home-trust-lead p { color: rgba(255,255,255,.82); margin-top: 12px; max-width: 820px; }
    .home-trust-grid { display: grid; gap: 14px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .home-trust-card { background: linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.018)); border: 1px solid rgba(255,255,255,.13); border-radius: 8px; min-height: 190px; padding: 22px; }
    .home-trust-card strong { color: var(--orange); display: block; font-size: 21px; line-height: 1.35; margin-bottom: 10px; }
    .home-trust-card p, .home-trust-card li { color: rgba(255,255,255,.78); }
    .home-trust-card ul { display: grid; gap: 8px; margin: 0; padding-left: 18px; }
    .home-trust-card.quote { border-color: rgba(255,138,29,.42); grid-column: span 2; }
    .home-trust-card.quote p { border-left: 3px solid var(--orange); color: #fff; font-weight: 800; line-height: 1.75; padding-left: 14px; }
    .home-faq-panel { background: #121212; border: 1px solid rgba(255,138,29,.28); border-radius: 8px; padding: 24px; }
    .home-faq-panel h3 { font-size: 28px; margin-bottom: 16px; }
    .home-faq-list { display: grid; gap: 10px; }
    .home-faq-list details { background: #0a0a0a; border: 1px solid rgba(255,255,255,.12); border-radius: 8px; padding: 15px 16px; }
    .home-faq-list summary { color: #fff; cursor: pointer; font-weight: 900; }
    .home-faq-list p { color: rgba(255,255,255,.74); margin-top: 10px; }
    .home-trust-links { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
    .home-trust-links a { background: rgba(255,138,29,.1); border: 1px solid rgba(255,138,29,.35); border-radius: 999px; color: #fff; font-weight: 900; padding: 9px 13px; }
    .home-trust-links a:hover { background: rgba(255,138,29,.18); color: var(--orange); }
    @media (max-width: 900px) { .home-trust-grid { grid-template-columns: 1fr 1fr; } .home-trust-card.quote { grid-column: span 2; } }
    @media (max-width: 620px) { .home-trust-grid { grid-template-columns: 1fr; } .home-trust-card, .home-trust-card.quote { grid-column: auto; min-height: 0; } .home-trust-lead, .home-faq-panel { padding: 20px; } }

    #regions .subregion-list.mobile-step-focus,
    #regions .dong-card.mobile-step-focus { outline: 2px solid rgba(255, 138, 29, .92); box-shadow: 0 0 0 4px rgba(255, 138, 29, .16), 0 22px 54px rgba(0, 0, 0, .5) !important; }
    #regions .subregion-list, #regions .dong-card { scroll-margin-top: 92px; }

    .site-footer { background: radial-gradient(circle at 12% 0%, rgba(255,138,29,.18), transparent 28%), linear-gradient(180deg,#141414 0%,#080808 68%,#050505 100%) !important; border-top: 1px solid rgba(255,138,29,.38) !important; box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 -18px 60px rgba(0,0,0,.38); color: #fff !important; padding: 0 max(22px, calc((100vw - var(--max)) / 2)) !important; }
    .footer-inner { display: grid; gap: 20px; padding: 34px 0 26px; }
    .footer-brand-panel { align-items: center; background: linear-gradient(135deg, rgba(255,138,29,.16), rgba(255,255,255,.035)); border: 1px solid rgba(255,138,29,.28); border-radius: 8px; display: flex; gap: 14px; padding: 16px 18px; }
    .footer-brand-mark { align-items: center; background: var(--orange); border-radius: 7px; color: #050505; display: inline-flex; flex: 0 0 auto; font-weight: 900; height: 42px; justify-content: center; width: 42px; }
    .footer-brand-panel strong { color: #fff; display: block; font-size: 20px; line-height: 1.2; }
    .footer-brand-panel p { color: rgba(255,255,255,.72); font-size: 13px; margin-top: 3px; }
    .footer-info-grid { display: grid; gap: 18px; grid-template-columns: 1.05fr .95fr 1.1fr; }
    .footer-column { background: linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.018)); border: 1px solid rgba(255,255,255,.12); border-radius: 8px; padding: 18px; }
    .footer-column h2 { border-bottom: 1px solid rgba(255,138,29,.32); color: var(--orange); font-size: 17px; line-height: 1.4; margin: 0 0 4px; padding: 0 0 12px; }
    .footer-column dl { display: grid; margin: 0; }
    .footer-column dl > div { align-items: start; border-bottom: 1px solid rgba(255,255,255,.09); display: grid; gap: 12px; grid-template-columns: 92px minmax(0,1fr); min-height: 44px; padding: 12px 0; }
    .footer-column dl > div:last-child { border-bottom: 0; }
    .footer-column dt, .footer-column dd { color: #fff; font-size: 15px; line-height: 1.55; margin: 0; }
    .footer-column dt { color: rgba(255,255,255,.66); }
    .footer-column dd { font-weight: 800; word-break: keep-all; }
    .footer-column a, .footer-legal-links a { color: #fff; text-decoration: none; }
    .footer-column a:hover, .footer-legal-links a:hover { color: var(--orange); }
    .footer-socials { display: grid; gap: 10px; grid-template-columns: repeat(2,minmax(0,1fr)); padding-top: 16px; }
    .social-link { align-items: center; background: rgba(0,0,0,.26); border: 1px solid rgba(255,255,255,.12); border-radius: 8px; display: flex; gap: 9px; min-height: 46px; padding: 10px 12px; transition: border-color .16s ease, transform .16s ease, background .16s ease; }
    .social-link:hover { background: rgba(255,138,29,.1); border-color: rgba(255,138,29,.58); transform: translateY(-1px); }
    .social-link svg { fill: none; height: 21px; stroke: var(--orange); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.8; width: 21px; }
    .social-link svg path:first-child { fill: rgba(255,138,29,.14); }
    .social-link span { color: #fff; font-size: 13px; font-weight: 900; }
    .footer-legal-links { border-top: 1px solid rgba(255,255,255,.09); display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; padding-top: 16px; }
    .footer-legal-links a { background: rgba(255,138,29,.1); border: 1px solid rgba(255,138,29,.28); border-radius: 999px; font-size: 13px; font-weight: 900; padding: 8px 12px; }
    .footer-copyright { border-top: 1px solid rgba(255,255,255,.1); color: rgba(255,255,255,.62); font-size: 14px; margin: 0; padding: 18px 0 22px; text-align: center; width: 100%; }
    @media (max-width: 900px) { .footer-info-grid { grid-template-columns: 1fr; } }
    @media (max-width: 520px) { .footer-column dl > div { grid-template-columns: 82px minmax(0,1fr); } .footer-socials { grid-template-columns: 1fr 1fr; } }
  `;
  document.head.appendChild(style);

  function applyRegionNav() {
    const regionItem = Array.from(document.querySelectorAll(".main-nav .nav-item")).find((item) => item.querySelector(":scope > a")?.textContent.includes("지역"));
    if (!regionItem) return;
    const mainLink = regionItem.querySelector(":scope > a");
    mainLink.href = "index.html#regions";
    mainLink.textContent = "지역 출장마사지";
    let dropdown = regionItem.querySelector(":scope > .dropdown");
    if (!dropdown) {
      dropdown = document.createElement("div");
      dropdown.className = "dropdown";
      regionItem.appendChild(dropdown);
    }
    dropdown.innerHTML = regionLinks.map(([label, key]) => `<a href="index.html?region=${key}#regions" data-nav-region="${key}">${label}</a>`).join("");
  }

  function injectHomeTrustSection() {
    const main = document.querySelector("main");
    const reviews = document.querySelector("#reviews");
    if (!main || !reviews || document.querySelector("#home-trust")) return;

    const section = document.createElement("section");
    section.className = "section home-trust-section";
    section.id = "home-trust";
    section.innerHTML = `
      <div class="home-trust-wrap">
        <div class="home-trust-lead">
          <p class="eyebrow">Before booking</p>
          <h2>마짱을 이용하기 전 확인할 기준</h2>
          <p>처음 문의하는 고객이 지역, 시간, 코스, 최종 요금을 순서대로 확인할 수 있도록 안내합니다. 단순히 빠른 예약만 강조하기보다 방문 가능 여부와 운영 기준을 먼저 설명해 불필요한 오해를 줄이는 것이 핵심입니다.</p>
        </div>
        <div class="home-trust-grid">
          <article class="home-trust-card"><strong>지역별 예약 가능 여부를 안내하는 방식</strong><p>고객이 이용할 권역과 세부 생활권을 먼저 확인한 뒤, 관리사 이동 가능 시간과 방문 조건을 함께 안내합니다. 같은 지역이라도 건물 출입 방식, 주차 가능 여부, 심야 시간대에 따라 가능 시간이 달라질 수 있습니다.</p></article>
          <article class="home-trust-card"><strong>코스와 요금이 달라지는 이유</strong><p>요금은 코스 종류, 이용 시간, 심야 상담 여부, 이동 거리, 현장 상황에 따라 달라질 수 있습니다. 예약 전에는 기본 요금과 추가 확인이 필요한 조건을 먼저 안내하고 최종 금액을 확정합니다.</p></article>
          <article class="home-trust-card"><strong>운영정책 및 예약 제한 안내</strong><p>건강 상태가 좋지 않거나 음주가 과한 경우, 출입 정보가 불명확한 경우, 무리한 요청이 있는 경우에는 예약이 제한될 수 있습니다. 안전한 이용을 위해 예약 변경과 취소 기준도 사전에 확인합니다.</p></article>
          <article class="home-trust-card quote"><strong>처음 이용하는 고객을 위한 상담 예시</strong><p>안녕하세요. 서울 강남구 역삼동입니다. 오늘 밤 9시쯤 아로마 120분 가능할까요? 처음 이용이라 코스 차이와 최종 요금, 방문 전 확인할 사항도 같이 안내 부탁드립니다.</p></article>
          <article class="home-trust-card"><strong>예약 전 함께 보면 좋은 안내</strong><ul><li>지역 선택 후 세부 생활권 확인</li><li>원하는 시간과 가능한 시간 비교</li><li>코스별 관리 방식과 요금 확인</li><li>방문 주소, 출입 방식, 결제 기준 확인</li></ul></article>
        </div>
        <div class="home-faq-panel">
          <h3>자주 묻는 질문</h3>
          <div class="home-faq-list">
            <details><summary>처음 예약할 때 무엇을 먼저 말하면 되나요?</summary><p>이용 지역, 희망 날짜와 시간, 원하는 코스를 먼저 알려주시면 됩니다. 처음 이용하는 경우에는 코스 추천과 최종 요금 안내를 함께 요청하면 상담이 빠릅니다.</p></details>
            <details><summary>지역이 같아도 예약 가능 시간이 달라질 수 있나요?</summary><p>네. 같은 구나 동이라도 이동 동선, 주차, 건물 출입 방식, 심야 시간대 여부에 따라 방문 가능 시간이 달라질 수 있습니다.</p></details>
            <details><summary>코스 요금은 언제 확정되나요?</summary><p>상담 단계에서 코스, 이용 시간, 방문 지역, 추가 확인 조건을 확인한 뒤 최종 요금을 안내합니다. 예약 전 금액을 먼저 확인하는 흐름을 권장합니다.</p></details>
            <details><summary>예약 변경이나 취소는 어떻게 하나요?</summary><p>가능하면 확정 전 또는 방문 준비가 시작되기 전에 알려주시는 것이 좋습니다. 당일 변경은 시간대와 배정 상황에 따라 제한될 수 있습니다.</p></details>
            <details><summary>몸 상태가 좋지 않아도 이용할 수 있나요?</summary><p>발열, 염증, 심한 통증, 음주 상태, 의료적 판단이 필요한 증상이 있다면 이용을 미루는 편이 좋습니다. 필요한 경우 의료진 상담을 먼저 권장합니다.</p></details>
          </div>
          <div class="home-trust-links"><a href="booking.html">예약방법</a><a href="price.html">가격 안내</a><a href="coverage.html">방문 가능 지역</a><a href="policy.html">운영정책</a><a href="first.html">처음 이용 안내</a></div>
        </div>
      </div>
    `;
    reviews.parentNode.insertBefore(section, reviews);

    const faqSchema = document.createElement("script");
    faqSchema.type = "application/ld+json";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "처음 예약할 때 무엇을 먼저 말하면 되나요?", "acceptedAnswer": { "@type": "Answer", "text": "이용 지역, 희망 날짜와 시간, 원하는 코스를 먼저 알려주시면 됩니다. 처음 이용하는 경우에는 코스 추천과 최종 요금 안내를 함께 요청하면 상담이 빠릅니다." } },
        { "@type": "Question", "name": "지역이 같아도 예약 가능 시간이 달라질 수 있나요?", "acceptedAnswer": { "@type": "Answer", "text": "같은 구나 동이라도 이동 동선, 주차, 건물 출입 방식, 심야 시간대 여부에 따라 방문 가능 시간이 달라질 수 있습니다." } },
        { "@type": "Question", "name": "코스 요금은 언제 확정되나요?", "acceptedAnswer": { "@type": "Answer", "text": "상담 단계에서 코스, 이용 시간, 방문 지역, 추가 확인 조건을 확인한 뒤 최종 요금을 안내합니다." } },
        { "@type": "Question", "name": "예약 변경이나 취소는 어떻게 하나요?", "acceptedAnswer": { "@type": "Answer", "text": "가능하면 확정 전 또는 방문 준비가 시작되기 전에 알려주시는 것이 좋습니다. 당일 변경은 시간대와 배정 상황에 따라 제한될 수 있습니다." } },
        { "@type": "Question", "name": "몸 상태가 좋지 않아도 이용할 수 있나요?", "acceptedAnswer": { "@type": "Answer", "text": "발열, 염증, 심한 통증, 음주 상태, 의료적 판단이 필요한 증상이 있다면 이용을 미루는 편이 좋습니다." } }
      ]
    });
    document.head.appendChild(faqSchema);
  }

  function activateRegionFromUrl() {
    const region = new URLSearchParams(window.location.search).get("region");
    if (!region) return;
    window.setTimeout(() => {
      document.querySelector(`#regions .region-tabs button[data-region="${region}"]`)?.click();
      document.querySelector("#regions")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  }

  function setupRegionStepJump() {
    const regions = document.querySelector("#regions");
    if (!regions) return;

    function jumpToStep(selector) {
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          const target = regions.querySelector(selector);
          if (!target) return;
          const header = document.querySelector(".site-header");
          const headerHeight = header ? header.getBoundingClientRect().height : 72;
          const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 14;
          target.classList.add("mobile-step-focus");
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
          window.setTimeout(() => target.classList.remove("mobile-step-focus"), 1200);
        }, 80);
      });
    }

    regions.addEventListener("click", (event) => {
      if (event.target.closest(".region-tabs button[data-region]")) return jumpToStep(".subregion-list");
      if (event.target.closest("#subregion-list button[data-city]") || event.target.closest("#dong-list button[data-district]")) jumpToStep(".dong-card");
    }, true);
  }

  const footerMarkup = `
    <div class="footer-inner" aria-label="사이트 정보">
      <section class="footer-brand-panel"><span class="footer-brand-mark">M</span><div><strong>마짱</strong><p>전국 지역 안내 및 예약 상담</p></div></section>
      <div class="footer-info-grid">
        <section class="footer-column"><h2>회사 정보</h2><dl><div><dt>상호</dt><dd>마짱</dd></div><div><dt>대표자명</dt><dd>강백호</dd></div><div><dt>주소</dt><dd>서울시 강남구 테헤란로 313 (우)06151</dd></div><div><dt>운영시간</dt><dd>오후 4시~익일 오전 8시까지</dd></div></dl></section>
        <section class="footer-column"><h2>고객 지원</h2><dl><div><dt>공지사항</dt><dd><a href="notice.html">공지 확인</a></dd></div><div><dt>자주 묻는 질문</dt><dd><a href="support.html">FAQ 보기</a></dd></div><div><dt>예약문의</dt><dd><a href="reservation.html">1:1 문의</a></dd></div><div><dt>전화번호</dt><dd><a href="tel:0508-202-4683">0508-202-4683</a></dd></div></dl></section>
        <section class="footer-column footer-social-column"><h2>소셜 & 법적 정보</h2><div class="footer-socials" aria-label="소셜 채널"><a href="#" aria-label="인스타그램" class="social-link"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"></rect><circle cx="12" cy="12" r="3.5"></circle><circle cx="17" cy="7" r="1"></circle></svg><span>Instagram</span></a><a href="#" aria-label="유튜브" class="social-link"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 8.4c.2-1.2 1.2-2.1 2.4-2.2 3.4-.3 6.8-.3 10.2 0 1.2.1 2.2 1 2.4 2.2.4 2.4.4 4.8 0 7.2-.2 1.2-1.2 2.1-2.4 2.2-3.4.3-6.8.3-10.2 0-1.2-.1-2.2-1-2.4-2.2-.4-2.4-.4-4.8 0-7.2Z"></path><path d="m10.5 9 5 3-5 3V9Z"></path></svg><span>YouTube</span></a><a href="#" aria-label="블로그" class="social-link"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5z"></path><path d="M8 8h8M8 12h8M8 16h5"></path></svg><span>Blog</span></a><a href="#" aria-label="카카오채널" class="social-link"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5c4.4 0 8 2.7 8 6.1s-3.6 6.1-8 6.1c-.6 0-1.2-.1-1.8-.2L6.8 19l.8-3c-2.2-1.1-3.6-2.9-3.6-4.9C4 7.7 7.6 5 12 5Z"></path></svg><span>Kakao</span></a></div><div class="footer-legal-links"><a href="privacy.html">개인정보처리방침</a><a href="terms.html">이용약관</a></div></section>
      </div>
    </div>
    <p class="footer-copyright">Copyright © 2026 Mazzang. All rights reserved.</p>
  `;

  document.querySelectorAll(".site-footer").forEach((footer) => { footer.innerHTML = footerMarkup; });

  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector("#main-nav");
  navToggle?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("is-open") || false;
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  applyRegionNav();
  injectHomeTrustSection();
  setupRegionStepJump();
  activateRegionFromUrl();
})();
