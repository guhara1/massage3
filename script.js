(() => {
  const regionLinks = [
    ["수도권", "capital"],
    ["영남권", "yeongnam"],
    ["충청권", "chungcheong"],
    ["호남권", "honam"],
    ["강원·제주", "gangwonjeju"]
  ];

  function applyRegionNav() {
    const navItems = Array.from(document.querySelectorAll(".main-nav .nav-item"));
    const regionItem = navItems.find((item) => item.querySelector(":scope > a")?.textContent.includes("지역"));
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

    dropdown.innerHTML = regionLinks.map(([label, key]) => (
      `<a href="index.html?region=${key}#regions" data-nav-region="${key}">${label}</a>`
    )).join("");
  }

  function activateRegionFromUrl() {
    const region = new URLSearchParams(window.location.search).get("region");
    if (!region) return;

    window.setTimeout(() => {
      const target = document.querySelector(`#regions .region-tabs button[data-region="${region}"]`);
      target?.click();
      document.querySelector("#regions")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  }

  function setupRegionStepJump() {
    const regions = document.querySelector("#regions");
    if (!regions) return;

    const style = document.createElement("style");
    style.textContent = `
      #regions .subregion-list.mobile-step-focus,
      #regions .dong-card.mobile-step-focus {
        outline: 2px solid rgba(255, 138, 29, .92);
        box-shadow: 0 0 0 4px rgba(255, 138, 29, .16), 0 22px 54px rgba(0, 0, 0, .5) !important;
      }

      #regions .subregion-list,
      #regions .dong-card {
        scroll-margin-top: 92px;
      }
    `;
    document.head.appendChild(style);

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
      const regionButton = event.target.closest(".region-tabs button[data-region]");
      const cityButton = event.target.closest("#subregion-list button[data-city]");
      const districtButton = event.target.closest("#dong-list button[data-district]");

      if (regionButton) {
        jumpToStep(".subregion-list");
        return;
      }

      if (cityButton || districtButton) {
        jumpToStep(".dong-card");
      }
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

  const footerStyle = document.createElement("style");
  footerStyle.textContent = `
    .site-footer { background: radial-gradient(circle at 12% 0%, rgba(255,138,29,.18), transparent 28%), linear-gradient(180deg,#141414 0%,#080808 68%,#050505 100%) !important; border-top: 1px solid rgba(255,138,29,.38) !important; box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 -18px 60px rgba(0,0,0,.38); color: #fff !important; padding: 0 max(22px, calc((100vw - var(--max)) / 2)) !important; }
    .footer-inner { display: grid; gap: 20px; padding: 34px 0 26px; }
    .footer-brand-panel { align-items: center; background: linear-gradient(135deg, rgba(255,138,29,.16), rgba(255,255,255,.035)); border: 1px solid rgba(255,138,29,.28); border-radius: 8px; display: flex; gap: 14px; padding: 16px 18px; }
    .footer-brand-mark { align-items: center; background: var(--orange); border-radius: 7px; color: #050505; display: inline-flex; flex: 0 0 auto; font-weight: 900; height: 42px; justify-content: center; width: 42px; }
    .footer-brand-panel strong { color: #fff; display: block; font-size: 20px; line-height: 1.2; } .footer-brand-panel p { color: rgba(255,255,255,.72); font-size: 13px; margin-top: 3px; }
    .footer-info-grid { display: grid; gap: 18px; grid-template-columns: 1.05fr .95fr 1.1fr; }
    .footer-column { background: linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.018)); border: 1px solid rgba(255,255,255,.12); border-radius: 8px; padding: 18px; }
    .footer-column h2 { border-bottom: 1px solid rgba(255,138,29,.32); color: var(--orange); font-size: 17px; line-height: 1.4; margin: 0 0 4px; padding: 0 0 12px; }
    .footer-column dl { display: grid; margin: 0; } .footer-column dl > div { align-items: start; border-bottom: 1px solid rgba(255,255,255,.09); display: grid; gap: 12px; grid-template-columns: 92px minmax(0,1fr); min-height: 44px; padding: 12px 0; } .footer-column dl > div:last-child { border-bottom: 0; }
    .footer-column dt, .footer-column dd { color: #fff; font-size: 15px; line-height: 1.55; margin: 0; } .footer-column dt { color: rgba(255,255,255,.66); } .footer-column dd { font-weight: 800; word-break: keep-all; }
    .footer-column a, .footer-legal-links a { color: #fff; text-decoration: none; } .footer-column a:hover, .footer-legal-links a:hover { color: var(--orange); }
    .footer-socials { display: grid; gap: 10px; grid-template-columns: repeat(2,minmax(0,1fr)); padding-top: 16px; } .social-link { align-items: center; background: rgba(0,0,0,.26); border: 1px solid rgba(255,255,255,.12); border-radius: 8px; display: flex; gap: 9px; min-height: 46px; padding: 10px 12px; transition: border-color .16s ease, transform .16s ease, background .16s ease; } .social-link:hover { background: rgba(255,138,29,.1); border-color: rgba(255,138,29,.58); transform: translateY(-1px); } .social-link svg { fill: none; height: 21px; stroke: var(--orange); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.8; width: 21px; } .social-link svg path:first-child { fill: rgba(255,138,29,.14); } .social-link span { color: #fff; font-size: 13px; font-weight: 900; }
    .footer-legal-links { border-top: 1px solid rgba(255,255,255,.09); display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; padding-top: 16px; } .footer-legal-links a { background: rgba(255,138,29,.1); border: 1px solid rgba(255,138,29,.28); border-radius: 999px; font-size: 13px; font-weight: 900; padding: 8px 12px; }
    .footer-copyright { border-top: 1px solid rgba(255,255,255,.1); color: rgba(255,255,255,.62); font-size: 14px; margin: 0; padding: 18px 0 22px; text-align: center; width: 100%; }
    @media (max-width: 900px) { .footer-info-grid { grid-template-columns: 1fr; } }
    @media (max-width: 520px) { .footer-column dl > div { grid-template-columns: 82px minmax(0,1fr); } .footer-socials { grid-template-columns: 1fr 1fr; } }
  `;
  document.head.appendChild(footerStyle);

  document.querySelectorAll(".site-footer").forEach((footer) => { footer.innerHTML = footerMarkup; });

  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector("#main-nav");
  navToggle?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("is-open") || false;
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  applyRegionNav();
  setupRegionStepJump();
  activateRegionFromUrl();
})();
