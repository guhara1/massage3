(() => {
  const phone = "0508-202-4683";
  const site = "https://mazzanng.netlify.app";
  const regionLinks = [["서울", "/area/seoul/"], ["경기", "/area/gyeonggi/"], ["인천", "/area/incheon/"], ["부산", "/area/busan/"], ["대구", "/area/daegu/"], ["대전", "/area/daejeon/"], ["광주", "/area/gwangju/"], ["강원", "/area/gangwon/"], ["제주", "/area/jeju/"]];

  const isAreaPage = location.pathname.startsWith("/area/");
  const page = location.pathname.split("/").pop() || "index.html";
  const pageSeo = {
    "index.html": ["마짱 | 내 지역으로 오는 출장 마사지 예약 안내", "마짱은 서울, 경기, 인천, 부산 등 주요 지역의 방문 가능 여부, 코스와 요금, 예약 전 확인사항을 안내합니다. 지역과 희망 시간을 알려주시면 가능 여부를 확인합니다."],
    "booking.html": ["출장마사지 예약방법 | 지역·시간·코스 확인 순서 안내", "처음 문의부터 예약 확정까지 필요한 지역, 희망 시간, 코스, 방문 장소 전달 방법을 단계별로 안내합니다."],
    "process.html": ["출장마사지 이용순서 | 처음 고객을 위한 진행 절차 안내", "문의, 상담, 예약 확정, 방문 전 준비, 관리 진행, 종료 후 확인까지 실제 이용 흐름을 쉽게 정리했습니다."],
    "price.html": ["마사지 코스 및 요금 안내 | 타이·아로마·VIP 가격 기준", "타이, 아로마, VIP 코스별 요금 기준과 가격이 달라지는 이유, 예약 전 확인할 사항을 정리했습니다."],
    "coverage.html": ["방문 가능 지역 안내 | 서울·경기·인천·전국 주요 생활권", "방문 가능 지역을 주요 생활권 중심으로 정리하고, 지역별 도착 시간과 예약 전 확인 기준을 안내합니다."],
    "first.html": ["출장마사지 처음 이용 안내 | 첫 예약 전 확인사항", "처음 예약하는 고객이 궁금해하는 코스 선택, 문의 예시, 방문 전 준비사항, 주의사항을 안내합니다."],
    "reviews.html": ["고객 후기 | 지역별 이용 경험과 예약 전 참고사항", "마짱 이용 고객 후기를 별점, 지역, 이용 상황별로 정리했습니다. 예약 전 상담, 가격, 코스 만족도를 확인하세요."],
    "notice.html": ["공지사항 | 운영시간·예약 변경·방문 가능 기준 안내", "마짱 운영시간, 예약 변경 및 취소, 방문 가능 지역 확인 기준, 안전 이용 안내를 공지합니다."],
    "policy.html": ["운영정책 | 예약 기준·변경·취소·안전 이용 안내", "예약 확정 기준, 변경 및 취소, 요금 안내, 안전 이용 기준과 개인정보 처리 관련 안내를 정리했습니다."],
    "checklist.html": ["예약 전 확인사항 | 가격·시간·주소·코스 체크리스트", "예약 전 확인해야 할 가격, 시간, 방문 주소, 출입 방식, 코스, 변경 기준을 체크리스트로 정리했습니다."]
  };

  function ensureMeta(name) {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = name;
      document.head.appendChild(tag);
    }
    return tag;
  }

  function ensureOg(property) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", property);
      document.head.appendChild(tag);
    }
    return tag;
  }

  function ensureCanonical() {
    let tag = document.querySelector('link[rel="canonical"]');
    if (!tag) {
      tag = document.createElement("link");
      tag.rel = "canonical";
      document.head.appendChild(tag);
    }
    return tag;
  }

  function applySeo() {
    if (isAreaPage) return;
    const data = pageSeo[page];
    const canonicalPath = page === "index.html" ? "/" : `/${page}`;
    ensureCanonical().href = `${site}${canonicalPath}`;
    if (!data) return;
    document.title = data[0];
    ensureMeta("description").content = data[1];
    ensureOg("og:title").content = data[0];
    ensureOg("og:description").content = data[1];
    ensureOg("og:url").content = `${site}${canonicalPath}`;
    ensureOg("og:site_name").content = "마짱";
    ensureOg("og:type").content = "website";
  }

  function installStyle() {
    if (document.getElementById("ma-shared-style")) return;
    const style = document.createElement("style");
    style.id = "ma-shared-style";
    style.textContent = `
      .guide-grid{align-items:stretch}.guide-grid>a{display:block;height:100%}.guide-grid article{display:flex;flex-direction:column;height:100%;min-height:168px}
      .site-footer{background:radial-gradient(circle at 12% 0%,rgba(255,138,29,.18),transparent 28%),linear-gradient(180deg,#141414 0%,#080808 68%,#050505 100%)!important;border-top:1px solid rgba(255,138,29,.38)!important;color:#fff!important;padding:0 max(22px,calc((100vw - var(--max))/2))!important}.site-footer::before,.site-footer::after{content:none!important;display:none!important}.footer-inner{display:grid;gap:20px;padding:34px 0 26px}.footer-brand-panel{align-items:center;background:linear-gradient(135deg,rgba(255,138,29,.16),rgba(255,255,255,.035));border:1px solid rgba(255,138,29,.28);border-radius:8px;display:flex;gap:14px;padding:16px 18px}.footer-brand-mark{align-items:center;background:var(--orange);border-radius:7px;color:#050505;display:inline-flex;font-weight:900;height:42px;justify-content:center;width:42px}.footer-brand-panel strong{display:block;font-size:20px}.footer-brand-panel p{color:rgba(255,255,255,.72);font-size:13px;margin-top:3px}.footer-info-grid{display:grid;gap:18px;grid-template-columns:1.05fr .95fr 1.1fr}.footer-column{background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.018));border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:18px}.footer-column h2{border-bottom:1px solid rgba(255,138,29,.32);color:var(--orange);font-size:17px;margin:0 0 4px;padding:0 0 12px}.footer-column dl{display:grid;margin:0}.footer-column dl>div{align-items:start;border-bottom:1px solid rgba(255,255,255,.09);display:grid;gap:12px;grid-template-columns:92px minmax(0,1fr);min-height:44px;padding:12px 0}.footer-column dt,.footer-column dd{font-size:15px;line-height:1.55;margin:0}.footer-column dt{color:rgba(255,255,255,.66)}.footer-column dd{font-weight:800}.footer-column a,.footer-legal-links a{color:#fff;text-decoration:none}.footer-socials{display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr));padding-top:16px}.social-link{align-items:center;background:rgba(0,0,0,.26);border:1px solid rgba(255,255,255,.12);border-radius:8px;display:flex;gap:9px;min-height:46px;padding:10px 12px}.social-link svg{fill:none;height:21px;stroke:var(--orange);stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;width:21px}.footer-legal-links{border-top:1px solid rgba(255,255,255,.09);display:flex;flex-wrap:wrap;gap:10px;margin-top:16px;padding-top:16px}.footer-legal-links a{background:rgba(255,138,29,.1);border:1px solid rgba(255,138,29,.28);border-radius:999px;font-size:13px;font-weight:900;padding:8px 12px}.footer-copyright{border-top:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.62);font-size:14px;margin:0;padding:18px 0 22px;text-align:center;width:100%}
      @media(max-width:900px){.footer-info-grid{grid-template-columns:1fr}.site-footer{padding-bottom:74px!important}}
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
    if (!dropdown) {
      dropdown = document.createElement("div");
      dropdown.className = "dropdown";
      item.appendChild(dropdown);
    }
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
    installFooter();
    mobileNav();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
