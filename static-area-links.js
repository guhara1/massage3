(() => {
  const visualStyle = document.createElement("style");
  visualStyle.textContent = ".area-card span{display:none!important}.area-card{justify-content:flex-start!important}";
  document.head.appendChild(visualStyle);

  const slugOverrides = {
    "서울":"seoul","경기":"gyeonggi","인천":"incheon","부산":"busan","대구":"daegu","대전":"daejeon","광주":"gwangju","강원":"gangwon","제주":"jeju","세종":"sejong","전북":"jeonbuk",
    "강남":"gangnam","서초":"seocho","송파":"songpa","마포":"mapo","영등포":"yeongdeungpo","용산":"yongsan","성동":"seongdong","광진":"gwangjin","중구":"jung-gu","종로":"jongno","강서":"gangseo","관악":"gwanak","동작":"dongjak","강동":"gangdong","노원":"nowon","은평":"eunpyeong","구로":"guro","금천":"geumcheon","동대문":"dongdaemun","서대문":"seodaemun","성북":"seongbuk","양천":"yangcheon","중랑":"jungnang","강북":"gangbuk","도봉":"dobong",
    "성남 분당":"bundang","분당":"bundang","수원":"suwon","용인":"yongin","고양 일산":"ilsan","일산":"ilsan","안양":"anyang","부천":"bucheon","화성 동탄":"dongtan","동탄":"dongtan","연수 송도":"songdo","송도":"songdo","부평":"bupyeong","남동":"namdong","서구":"seo-gu","미추홀":"michuhol","계양":"gyeyang",
    "해운대":"haeundae","부산진":"busanjin","수영":"suyeong","수성":"suseong","달서":"dalseo","유성":"yuseong","광산":"gwangsan","춘천":"chuncheon","원주":"wonju","강릉":"gangneung","제주시":"jeju-si","서귀포":"seogwipo",
    "개포동":"gaepo-dong","논현동":"nonhyeon-dong","대치동":"daechi-dong","도곡동":"dogok-dong","삼성동":"samseong-dong","세곡동":"segok-dong","수서동":"suseo-dong","신사동":"sinsa-dong","압구정동":"apgujeong-dong","역삼동":"yeoksam-dong","일원동":"irwon-dong","자곡동":"jagok-dong","청담동":"cheongdam-dong","잠실동":"jamsil-dong","반포동":"banpo-dong","합정동":"hapjeong-dong","판교동":"pangyo-dong","송도동":"songdo-dong","우동":"u-dong","중동":"jung-dong","좌동":"jwa-dong","재송동":"jaesong-dong"
  };
  const reverseSlugs = Object.fromEntries(Object.entries(slugOverrides).map(([label, slug]) => [slug, label]));
  const cityRegions = { "서울":"capital", "경기":"capital", "인천":"capital", "부산":"yeongnam", "대구":"yeongnam", "대전":"chungcheong", "세종":"chungcheong", "광주":"honam", "전북":"honam", "강원":"gangwonjeju", "제주":"gangwonjeju" };
  const initial = ["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"];
  const medial = ["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"];
  const finalSound = ["","k","k","ks","n","nj","nh","t","l","lk","lm","lb","ls","lt","lp","lh","m","p","ps","t","t","ng","t","t","k","t","p","t"];
  function clean(value) { try { return decodeURIComponent(value || "").trim(); } catch { return (value || "").trim(); } }
  function cleanLabel(text) { return clean(text).replace(/\s*선택\s*$/, "").replace(/\s*출장마사지/g, "").trim(); }
  function romanize(text) { return Array.from(text).map((char) => { const code = char.charCodeAt(0) - 44032; if (code < 0 || code > 11171) return char; const jong = code % 28; const jung = ((code - jong) / 28) % 21; const cho = Math.floor((code - jong) / 28 / 21); return initial[cho] + medial[jung] + finalSound[jong]; }).join(""); }
  function toSlug(label) { const value = cleanLabel(label); return slugOverrides[value] || romanize(value).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, ""); }
  function fromSlug(slug) { const value = clean(slug); return reverseSlugs[value] || value; }
  function areaUrl(city, district, dong) { const parts = ["", "area", toSlug(city)]; if (district) parts.push(toSlug(district)); if (dong) parts.push(toSlug(dong)); return `${parts.join("/")}/`; }
  window.MAZZANG_AREA_SLUGS = { slugOverrides, reverseSlugs, cityRegions, toSlug, fromSlug, areaUrl };

  function applyCleanRegionNav() {
    const nav = document.querySelector(".main-nav");
    if (!nav) return;
    const regionItem = Array.from(nav.querySelectorAll(".nav-item")).find((item) => item.querySelector(":scope > a")?.textContent.includes("지역"));
    if (!regionItem) return;
    const mainLink = regionItem.querySelector(":scope > a");
    if (mainLink) { mainLink.href = "/#regions"; mainLink.textContent = "지역 출장마사지"; }
    let dropdown = regionItem.querySelector(":scope > .dropdown");
    if (!dropdown) { dropdown = document.createElement("div"); dropdown.className = "dropdown"; regionItem.appendChild(dropdown); }
    if (dropdown.dataset.cleanAreaNav === "true") return;
    const links = [["서울","/area/seoul/"],["경기","/area/gyeonggi/"],["인천","/area/incheon/"],["부산","/area/busan/"],["대구","/area/daegu/"],["대전","/area/daejeon/"],["광주","/area/gwangju/"],["강원","/area/gangwon/"],["제주","/area/jeju/"]];
    dropdown.replaceChildren(...links.map(([label, href]) => { const link = document.createElement("a"); link.href = href; link.textContent = label; return link; }));
    dropdown.dataset.cleanAreaNav = "true";
  }

  function areaInfoFromHref(href) {
    const url = new URL(href, location.href);
    if (!url.pathname.endsWith("area.html")) return null;
    const city = clean(url.searchParams.get("city"));
    const district = clean(url.searchParams.get("district"));
    const dong = clean(url.searchParams.get("dong"));
    if (!city || !district || !dong) return null;
    return { city, district, dong };
  }
  function cleanAreaLink(link) { const info = areaInfoFromHref(link.getAttribute("href") || ""); if (!info) return; link.href = areaUrl(info.city, info.district, info.dong); link.dataset.cleanArea = "true"; }
  function applyStaticLinks() { applyCleanRegionNav(); document.querySelectorAll('a[href*="area.html?"]').forEach(cleanAreaLink); }

  function metaDescription() { let meta = document.querySelector('meta[name="description"]'); if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); } return meta; }
  function setMeta(title, description) { document.title = title; metaDescription().content = description; }
  function selectedText(root, selector) { return cleanLabel(root.querySelector(selector)?.textContent || ""); }
  function pushAreaUrl(city, district) { if (!city || location.pathname.includes(".html")) return; const next = areaUrl(city, district); if (location.pathname !== next) history.pushState({ city, district }, "", next); }
  function bindRegionSeo() {
    const root = document.querySelector("#regions");
    if (!root || root.dataset.cleanAreaSeo === "true") return;
    root.dataset.cleanAreaSeo = "true";
    root.addEventListener("click", (event) => {
      if (event.target.closest("#dong-list a")) return;
      const cityButton = event.target.closest("#subregion-list button[data-city]");
      const districtButton = event.target.closest("#dong-list button[data-district]");
      if (districtButton) { const city = selectedText(root, "#subregion-list button.is-active"); const district = cleanLabel(districtButton.textContent); setMeta(`${district} 출장마사지 예약 전 확인사항 | ${city} 가격·지역·코스 안내`, `${district} 출장마사지 이용 전 확인하면 좋은 예약 기준, 가격 차이, 주요 생활권, 방문 가능 범위와 코스 선택 방법을 정리했습니다.`); pushAreaUrl(city, district); return; }
      if (cityButton) { const city = cleanLabel(cityButton.textContent); window.setTimeout(() => { setMeta(`${city} 출장마사지 가능 지역 | 가격·코스·예약 안내`, `${city} 출장마사지 이용 전 확인하면 좋은 방문 가능 범위, 예약 기준, 코스 선택 방법과 가격 차이를 정리했습니다.`); pushAreaUrl(city); }, 80); }
    }, true);
  }

  const cityFaqs = {
    "서울": [["서울은 어느 권역부터 확인하는 게 빠른가요?","강남권, 도심권, 서남권처럼 이동 동선이 다른 편이라 가까운 구와 동을 먼저 알려주시면 가능 시간을 더 정확히 볼 수 있습니다."],["서울 야간 예약은 무엇을 더 확인해야 하나요?","퇴근 시간 이후에는 도로 흐름과 건물 출입 방식이 중요합니다. 희망 시간, 엘리베이터 이용 가능 여부, 주차 조건을 함께 확인하는 편이 좋습니다."],["강남과 마포처럼 지역이 달라도 안내 기준이 같나요?","다릅니다. 강남은 오피스텔과 야간 문의가 많고, 마포·영등포는 업무 후 이동 동선이 중요해 상담 포인트가 달라집니다."]],
    "경기": [["경기는 왜 세부 도시를 먼저 말해야 하나요?","경기권은 수원, 분당, 일산, 동탄의 거리가 넓어 같은 권역이라도 이동 시간이 크게 달라집니다."],["아파트 단지명까지 말하는 게 도움이 되나요?","네. 신도시와 구도심은 진입로와 주차 조건이 달라 단지명이나 가까운 역을 알려주면 안내가 훨씬 빨라집니다."],["경기권 요금은 어떤 부분에서 달라지나요?","코스 시간 외에도 이동 거리, 심야 시간, 외곽 여부가 반영될 수 있어 최종 요금을 예약 전에 확인하는 것이 좋습니다."]],
    "인천": [["인천은 송도와 부평 안내가 다른가요?","송도는 신축 주거지와 오피스텔 문의가 많고, 부평은 상권 중심이라 시간대별 가능 여부가 다르게 움직입니다."],["외곽 지역도 바로 확정할 수 있나요?","항만, 공단, 외곽 생활권은 이동 동선 확인이 필요합니다. 정확한 동과 도착 희망 시간을 먼저 알려주세요."],["인천 예약 전 가장 중요한 정보는 무엇인가요?","세부 동, 건물 출입 방식, 희망 시간입니다. 이 세 가지가 확인되어야 도착 가능 시간과 최종 안내가 정확해집니다."]],
    "부산": [["부산은 해운대와 서면 기준이 왜 다른가요?","해운대는 숙박·관광 수요가 섞이고, 서면은 야간 상권 문의가 많아 이동 시간과 가능 시간이 다르게 잡힙니다."],["부산에서 예약 전 꼭 확인할 조건은요?","언덕길, 주차, 건물 출입 방식이 방문 가능 여부에 영향을 줄 수 있습니다. 가까운 역이나 동 이름을 함께 알려주세요."],["관광 일정 중 예약해도 괜찮나요?","가능하지만 일정이 촉박하면 도착 시간 오차가 생길 수 있어 여유 시간을 두고 문의하는 편이 좋습니다."]],
    "대구": [["대구는 어떤 생활권을 먼저 확인하나요?","수성구, 달서구, 중구처럼 주거지와 상권 성격이 달라 먼저 구와 동을 확인하는 것이 좋습니다."],["동성로 주변은 예약 시간이 다른가요?","상권 시간대 영향을 받을 수 있어 희망 시간과 건물 위치를 함께 알려주셔야 정확합니다."],["대구에서 처음 문의할 때 핵심은요?","지역, 시간, 코스, 최종 요금 확인을 한 번에 요청하면 상담이 빠르고 오해를 줄일 수 있습니다."]],
    "대전": [["대전은 유성과 둔산 안내가 다른가요?","유성은 호텔·오피스텔 문의가 많고 둔산권은 업무 후 야간 상담이 많아 확인 기준이 다릅니다."],["대전에서 가까운 역을 말해야 하나요?","네. 생활권 경계가 뚜렷해 가까운 역이나 건물명을 알려주면 이동 가능 여부 확인이 빨라집니다."],["강한 관리를 원하면 어떻게 말해야 하나요?","무조건 강한 압보다 불편한 부위와 선호 강도를 먼저 말하는 편이 안전합니다."]],
    "광주": [["광주는 어느 생활권 문의가 많은가요?","상무지구, 수완, 첨단, 충장로 주변처럼 목적지가 뚜렷한 문의가 많습니다."],["광산구와 서구는 안내가 다른가요?","광산구는 수완·첨단 생활권, 서구는 상무지구 중심으로 문의가 몰려 시간대 기준이 달라질 수 있습니다."],["광주에서 예약 전 말하면 좋은 정보는요?","동네, 희망 시간, 코스, 건물 형태를 함께 말하면 방문 가능 여부를 현실적으로 안내받을 수 있습니다."]],
    "강원": [["강원은 왜 시 단위 확인이 먼저인가요?","춘천, 원주, 강릉은 생활권이 분리되어 있어 강원이라는 말만으로는 이동 가능 시간을 판단하기 어렵습니다."],["날씨가 예약에 영향을 주나요?","눈·비가 있거나 늦은 시간에는 이동 여건이 달라질 수 있어 도착 가능 시간을 다시 확인하는 편이 좋습니다."],["외곽 숙소도 문의할 수 있나요?","가능 여부 확인은 필요합니다. 숙소명, 주변 위치, 희망 시간을 함께 알려주세요."]],
    "제주": [["제주는 제주시와 서귀포 시간이 많이 다른가요?","네. 이동 시간이 크게 달라 숙소 위치를 먼저 확인해야 예약 가능 여부를 정확히 볼 수 있습니다."],["관광지 근처 숙소도 가능한가요?","숙소명과 체크인 가능 시간, 주차 조건에 따라 안내가 달라질 수 있습니다."],["제주 예약은 무엇을 여유 있게 봐야 하나요?","이동 시간이 포함될 수 있어 코스 시간과 도착 가능 시간을 함께 확인하는 것이 좋습니다."]]
  };
  const districtFaqs = {
    "강남": [["강남은 왜 동 이름까지 먼저 확인하나요?","역삼, 선릉, 삼성, 논현은 이동 방향과 건물 형태가 달라 동 이름을 먼저 알아야 가능 시간이 정확해집니다."],["강남 야간 문의에서 중요한 기준은요?","오피스텔 출입 방식, 주차, 희망 시간, 코스 시간을 함께 확인해야 최종 안내가 명확해집니다."],["강남에서 과장 광고를 피하려면요?","가격만 보지 말고 관리 시간, 변경 기준, 최종 요금 안내가 분명한지 확인하는 것이 좋습니다."]],
    "서초": [["서초는 반포와 양재 안내가 다른가요?","반포는 주거 단지, 양재는 업무·주거 이동 동선이 달라 방문 가능 시간이 다르게 잡힐 수 있습니다."],["서초 주거지는 무엇을 확인해야 하나요?","단지 출입 방식, 주차 가능 여부, 조용한 방문 시간대를 확인하는 편이 좋습니다."],["처음 이용하면 어떤 코스가 무난한가요?","몸 상태와 선호 강도를 말한 뒤 기본 코스부터 상담받는 편이 부담이 적습니다."]],
    "송파": [["송파는 행사 일정이 영향을 주나요?","잠실권은 경기나 행사 일정에 따라 이동 시간이 달라질 수 있어 희망 시간을 여유 있게 확인하는 편이 좋습니다."],["문정·가락권은 어떤 문의가 많나요?","업무 후 피로 회복 목적 문의가 많아 퇴근 시간대 가능 여부를 먼저 보는 것이 좋습니다."],["송파에서 예약 전 핵심 정보는요?","동 이름, 가까운 역, 건물 출입 방식, 희망 코스를 함께 알려주면 상담이 빨라집니다."]]
  };
  const genericDistrictFaqSets = [
    [["이 지역은 왜 세부 동 확인이 필요한가요?","같은 구 안에서도 역세권, 주거 단지, 상권의 이동 시간이 달라 세부 동 확인이 필요합니다."],["예약 전 가장 먼저 볼 기준은요?","방문 가능 시간, 최종 요금, 건물 출입 방식이 명확한지 먼저 확인하는 것이 좋습니다."],["시간이 급할 때는 어떻게 문의하나요?","희망 시간과 가능한 대체 시간을 함께 말하면 배정 가능 여부를 더 빠르게 확인할 수 있습니다."]],
    [["주거지와 상권은 안내가 다른가요?","네. 주거지는 출입 방식과 조용한 시간대가 중요하고, 상권은 이동 동선과 주차 조건이 더 중요할 수 있습니다."],["코스 선택은 어떻게 시작하면 좋나요?","처음이라면 몸 상태와 선호 강도를 말한 뒤 기본 시간부터 상담받는 편이 안전합니다."],["최종 요금은 언제 확인하나요?","지역, 시간, 코스, 이동 조건을 확인한 뒤 예약 전 최종 금액을 안내받는 것이 좋습니다."]],
    [["같은 지역 안에서도 도착 시간이 달라지나요?","네. 도로 흐름, 건물 위치, 주차 가능 여부에 따라 도착 가능 시간이 달라질 수 있습니다."],["처음 문의할 때 문장을 길게 써야 하나요?","길 필요는 없습니다. 지역, 시간, 코스, 처음 이용 여부만 말해도 상담이 시작됩니다."],["예약을 미루는 게 좋은 경우도 있나요?","몸 상태가 좋지 않거나 의료적 판단이 필요한 증상이 있으면 이용을 미루는 편이 좋습니다."]]
  ];
  function pathLabels() {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts[0] !== "area") return null;
    return { city: fromSlug(parts[1] || ""), district: parts[2] ? fromSlug(parts[2]) : "" };
  }
  function renderFaq(faqs, title) {
    const panel = document.querySelector(".mini-faq");
    if (!panel || !faqs) return;
    panel.innerHTML = `<h3>${title}</h3>` + faqs.map(([q, a], index) => `<details ${index === 0 ? "open" : ""}><summary>${q}</summary><p>${a}</p></details>`).join("");
  }
  function personalizeAreaFaq() {
    const labels = pathLabels();
    if (!labels) return;
    if (labels.district) {
      const seed = Array.from(labels.district).reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % genericDistrictFaqSets.length;
      renderFaq(districtFaqs[labels.district] || genericDistrictFaqSets[seed], `${labels.district} 이용 전 자주 묻는 질문`);
      return;
    }
    renderFaq(cityFaqs[labels.city] || cityFaqs["서울"], `${labels.city} 이용 전 자주 묻는 질문`);
  }

  document.addEventListener("click", (event) => { const link = event.target.closest('a[href*="area.html?"]'); if (link) cleanAreaLink(link); }, true);
  applyStaticLinks(); bindRegionSeo();
  window.setTimeout(() => { applyStaticLinks(); bindRegionSeo(); personalizeAreaFaq(); }, 300);
  window.setTimeout(() => { applyStaticLinks(); bindRegionSeo(); personalizeAreaFaq(); }, 1200);
})();
