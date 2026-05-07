(() => {
  const footerMarkup = `
    <div class="footer-info-grid" aria-label="사이트 정보">
      <section class="footer-column">
        <h2>회사 정보</h2>
        <dl>
          <div><dt>상호명</dt><dd>마짱</dd></div>
          <div><dt>대표자명</dt><dd>강백호</dd></div>
          <div><dt>사업자번호</dt><dd>숨김처리</dd></div>
          <div><dt>주소</dt><dd>서울시 강남구 테헤란로 313 (우)06151</dd></div>
          <div><dt>이메일</dt><dd>생략</dd></div>
        </dl>
      </section>
      <section class="footer-column">
        <h2>고객 지원</h2>
        <dl>
          <div><dt>공지사항</dt><dd><a href="notice.html">바로가기</a></dd></div>
          <div><dt>자주 묻는 질문</dt><dd><a href="support.html">확인하기</a></dd></div>
          <div><dt>1:1 문의</dt><dd><a href="reservation.html">예약문의</a></dd></div>
          <div><dt>전화번호</dt><dd><a href="tel:0508-202-4683">0508-202-4683</a></dd></div>
          <div><dt>운영시간</dt><dd>오후 4시~익일 오전 8시까지</dd></div>
        </dl>
      </section>
      <section class="footer-column">
        <h2>소셜 & 법적 정보</h2>
        <dl>
          <div><dt>인스타그램</dt><dd>준비중</dd></div>
          <div><dt>유튜브</dt><dd>준비중</dd></div>
          <div><dt>블로그</dt><dd>준비중</dd></div>
          <div><dt>카카오채널</dt><dd>준비중</dd></div>
          <div><dt>개인정보처리방침</dt><dd><a href="policy.html">확인하기</a></dd></div>
          <div><dt>이용약관</dt><dd><a href="policy.html">확인하기</a></dd></div>
        </dl>
      </section>
    </div>
    <p class="footer-copyright">Copyright © 2026 Mazzang. All rights reserved.</p>
  `;

  const footerStyle = document.createElement("style");
  footerStyle.textContent = `
    .site-footer {
      background: #f7f7f7 !important;
      border-top: 1px solid #dddddd !important;
      color: #050505 !important;
      padding: 0 max(22px, calc((100vw - var(--max)) / 2)) 0 !important;
    }

    .footer-info-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 28px;
      padding: 18px 0 0;
    }

    .footer-column h2 {
      border-bottom: 1px solid #d9d9d9;
      color: #050505;
      font-size: 16px;
      line-height: 1.4;
      margin: 0;
      padding: 0 0 12px;
    }

    .footer-column dl {
      display: grid;
      margin: 0;
    }

    .footer-column div {
      align-items: center;
      border-bottom: 1px solid #dddddd;
      display: grid;
      gap: 12px;
      grid-template-columns: 108px minmax(0, 1fr);
      min-height: 46px;
      padding: 8px 0;
    }

    .footer-column dt,
    .footer-column dd {
      color: #050505;
      font-size: 15px;
      line-height: 1.45;
      margin: 0;
    }

    .footer-column dd {
      font-weight: 700;
      word-break: keep-all;
    }

    .footer-column a {
      color: #050505;
      text-decoration: none;
    }

    .footer-column a:hover {
      color: var(--orange);
    }

    .footer-copyright {
      border-top: 1px solid #d9d9d9;
      color: #050505;
      font-size: 14px;
      margin: 0;
      padding: 18px 0 22px;
      text-align: center;
      width: 100%;
    }

    @media (max-width: 820px) {
      .footer-info-grid {
        grid-template-columns: 1fr;
        gap: 18px;
      }

      .footer-column div {
        grid-template-columns: 96px minmax(0, 1fr);
      }
    }
  `;
  document.head.appendChild(footerStyle);

  document.querySelectorAll(".site-footer").forEach((footer) => {
    footer.innerHTML = footerMarkup;
  });

  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector("#main-nav");

  navToggle?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("is-open") || false;
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  const regions = document.querySelector("#regions");
  if (!regions) return;

  const mobileQuery = window.matchMedia("(max-width: 680px)");
  const style = document.createElement("style");
  style.textContent = `
    @media (max-width: 680px) {
      #regions .subregion-list.mobile-step-focus,
      #regions .dong-card.mobile-step-focus {
        outline: 2px solid rgba(255, 138, 29, .92);
        box-shadow: 0 0 0 4px rgba(255, 138, 29, .16), 0 22px 54px rgba(0, 0, 0, .5) !important;
      }

      #regions .subregion-list,
      #regions .dong-card {
        scroll-margin-top: 84px;
      }
    }
  `;
  document.head.appendChild(style);

  function jumpToStep(selector) {
    if (!mobileQuery.matches) return;

    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        const target = regions.querySelector(selector);
        if (!target) return;

        const header = document.querySelector(".site-header");
        const headerHeight = header ? header.getBoundingClientRect().height : 72;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;

        target.classList.add("mobile-step-focus");
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        window.setTimeout(() => target.classList.remove("mobile-step-focus"), 1200);
      }, 70);
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
})();
