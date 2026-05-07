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
  }

  const cities = ["서울","경기","인천","부산","대구","대전","세종","광주","전북","강원","제주"];
  const districts = [
    "강남","서초","송파","마포","영등포","용산","성동","광진","중구","종로","강서","관악","동작","강동","노원","은평","구로","금천","동대문","서대문","성북","양천","중랑","강북","도봉",
    "성남 분당","분당","수원","용인","고양 일산","일산","안양","부천","화성 동탄","동탄","연수 송도","송도","부평","남동","서구","미추홀","계양",
    "해운대","부산진","수영","동래","남구","사하","수성","달서","동구","북구","유성","신도심","조치원","대덕","광산","전주","익산","군산","춘천","원주","강릉","제주시","서귀포"
  ];
  const dongs = [
    "개포동","논현동","대치동","도곡동","삼성동","세곡동","수서동","신사동","압구정동","역삼동","일원동","자곡동","청담동",
    "서초동","반포동","방배동","양재동","잠원동","내곡동","잠실동","문정동","방이동","석촌동","가락동","오금동","송파동",
    "공덕동","합정동","상암동","서교동","망원동","도화동","여의도동","문래동","당산동","신길동","영등포동","대림동",
    "한남동","이태원동","원효로동","청파동","문배동","성수동","왕십리동","금호동","옥수동","행당동","구의동","자양동","화양동","군자동","중곡동",
    "정자동","서현동","수내동","야탑동","판교동","이매동","인계동","광교동","영통동","매탄동","권선동","죽전동","보정동","동백동","장항동","마두동","주엽동","백석동","화정동",
    "송도동","연수동","동춘동","청학동","옥련동","부평동","산곡동","청천동","구월동","만수동","간석동","청라동","주안동","학익동","계산동","작전동","효성동",
    "우동","재송동","부전동","전포동","범천동","광안동","남천동","민락동","범어동","만촌동","두산동","지산동","황금동","상인동","월성동","두류동","본리동","성당동",
    "봉명동","도룡동","관평동","전민동","노은동","나성동","도담동","아름동","종촌동","치평동","수완동","첨단동","하남동","효자동","서신동","퇴계동","석사동","후평동","온의동","무실동","단계동","반곡동","명륜동","교동","포남동","입암동","유천동","연동","노형동","이도동","아라동","서귀동","동홍동","중문동","대정읍"
  ];

  [...cities, ...districts, ...dongs].forEach(add);
  districts.forEach((district) => {
    const base = district.split(/\s+/).pop();
    [base, district].forEach((name) => {
      add(`${name}동`);
      add(`${name}1동`);
      add(`${name}2동`);
      add(`${name}중심가`);
      add(`${name}역권`);
    });
  });

  const originalFromSlug = registry.fromSlug;
  registry.fromSlug = (slug) => {
    let value = String(slug || "").trim();
    try { value = decodeURIComponent(value); } catch {}
    if (registry.reverseSlugs[value]) return registry.reverseSlugs[value];
    const original = originalFromSlug ? originalFromSlug(value) : value;
    if (original && original !== value) return original;
    const compact = value.replace(/-/g, "");
    for (const label of Object.values(registry.reverseSlugs)) {
      if (romanize(label).replace(/-/g, "") === compact) return label;
    }
    return value;
  };
})();

(() => {
  function installStyles() {
    if (document.getElementById("ma-area-footer-style")) return;
    const style = document.createElement("style");
    style.id = "ma-area-footer-style";
    style.textContent = `
      .trust-footer{background:linear-gradient(180deg,#090909,#030303);border-top:1px solid rgba(255,138,29,.28);padding:48px 24px 26px;color:#fff;box-shadow:0 -28px 70px rgba(0,0,0,.42)}
      .trust-footer .footer-brand{max-width:1160px;margin:0 auto 20px;display:flex;align-items:center;gap:14px;border:1px solid rgba(255,138,29,.38);border-radius:8px;padding:18px;background:linear-gradient(135deg,rgba(255,138,29,.14),rgba(255,255,255,.025))}
      .trust-footer .footer-brand .brand-mark{width:42px;height:42px;border-radius:8px;background:#ff8a1d;color:#050505;display:inline-flex;align-items:center;justify-content:center;font-weight:900}
      .trust-footer .footer-brand strong{display:block;font-size:20px}.trust-footer .footer-brand small{display:block;color:rgba(255,255,255,.75);margin-top:3px}
      .trust-footer .footer-grid{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:1.1fr 1fr 1.15fr;gap:18px}
      .trust-footer .footer-col{border:1px solid rgba(255,255,255,.14);border-radius:8px;background:linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.018));padding:20px}
      .trust-footer h2{font-size:18px;color:#ff8a1d;margin:0 0 16px;padding-bottom:14px;border-bottom:1px solid rgba(255,138,29,.32)}
      .trust-footer .footer-row{display:grid;grid-template-columns:96px 1fr;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.1);line-height:1.55}
      .trust-footer .footer-row span{color:rgba(255,255,255,.74)}.trust-footer .footer-row strong{color:#fff}
      .trust-footer a{color:#fff;text-decoration:none;font-weight:800}.trust-footer a:hover{color:#ff8a1d}
      .trust-footer .footer-social{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:16px}
      .trust-footer .footer-social a{border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:13px 14px;background:rgba(0,0,0,.22);display:flex;align-items:center;gap:10px}.trust-footer .footer-social svg{width:18px;height:18px;color:#ff8a1d;flex:0 0 auto}
      .trust-footer .footer-policy-links{display:flex;gap:10px;flex-wrap:wrap;border-top:1px solid rgba(255,255,255,.1);padding-top:16px}.trust-footer .footer-policy-links a{border:1px solid rgba(255,138,29,.42);border-radius:999px;padding:10px 14px;background:rgba(255,138,29,.08)}
      .trust-footer .footer-copy{max-width:1160px;margin:26px auto 0;padding-top:22px;border-top:1px solid rgba(255,255,255,.12);text-align:center;color:rgba(255,255,255,.72)}
      @media (max-width:900px){.trust-footer{padding-bottom:88px}.trust-footer .footer-grid{grid-template-columns:1fr}.trust-footer .footer-row{grid-template-columns:86px 1fr}.trust-footer .footer-social{grid-template-columns:1fr}}
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
        <section class="footer-col"><h2>소셜 & 법적 정보</h2><div class="footer-social"><a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>Instagram</a><a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="4"/><path d="M10 9.5 15 12l-5 2.5z" fill="currentColor"/></svg>YouTube</a><a href="#" aria-label="Blog"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>Blog</a><a href="#" aria-label="Kakao"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5c-5 0-9 3-9 6.8 0 2.3 1.5 4.3 3.8 5.5L6 21l3.7-2.2c.7.1 1.5.2 2.3.2 5 0 9-3 9-7.2S17 5 12 5z"/></svg>Kakao</a></div><div class="footer-policy-links"><a href="/policy.html">개인정보처리방침</a><a href="/terms.html">이용약관</a></div></section>
      </div>
      <p class="footer-copy">Copyright © 2026 Mazzang. All rights reserved.</p>`;
  }

  function run() {
    installStyles();
    installFooter();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
  setTimeout(run, 300);
  setTimeout(run, 1200);
})();
