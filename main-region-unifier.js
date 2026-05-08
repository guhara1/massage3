(() => {
  const citySlugs = { 서울: "seoul", 경기: "gyeonggi", 인천: "incheon", 부산: "busan", 대구: "daegu", 대전: "daejeon", 광주: "gwangju", 강원: "gangwon", 제주: "jeju", 세종: "sejong", 전북: "jeonbuk" };
  const districtSlugs = { 강남: "gangnam", 서초: "seocho", 송파: "songpa", 마포: "mapo", 영등포: "yeongdeungpo", 용산: "yongsan", 성동: "seongdong", 광진: "gwangjin", 중구: "junggu", 종로: "jongno", 강서: "gangseo", 관악: "gwanak", 동작: "dongjak", 강동: "gangdong", 노원: "nowon", 은평: "eunpyeong", 구로: "guro", 금천: "geumcheon", 동대문: "dongdaemun", 서대문: "seodaemun", 성북: "seongbuk", 양천: "yangcheon", 중랑: "jungnang", 강북: "gangbuk", 도봉: "dobong", 부산진: "busanjin", 해운대: "haeundae", 수영: "suyeong", 동래: "dongnae", 남구: "namgu", 사하: "saha", 미추홀: "michuhol", 부평: "bupyeong", 남동: "namdong", 서구: "seogu", 계양: "gyeyang", "연수 송도": "songdo", 수성: "suseong", 달서: "dalseo", 유성: "yuseong", 광산: "gwangsan", 춘천: "chuncheon", 원주: "wonju", 강릉: "gangneung", 제주시: "jejusi", 서귀포: "seogwipo" };
  const dongSlugs = { 부전동: "bujeon-dong", 전포동: "jeonpo-dong", 범천동: "beomcheon-dong", 가야동: "gaya-dong", 개금동: "gaegeum-dong", 양정동: "yangjeong-dong", 주안동: "juan-dong", 용현동: "yonghyeon-dong", 학익동: "hagik-dong", 숭의동: "sungui-dong", 도화동: "dohwa-dong", 문학동: "munhak-dong", 우동: "u-dong", 중동: "jung-dong", 좌동: "jwa-dong", 재송동: "jaesong-dong", 반여동: "banyeo-dong", 광안동: "gwangan-dong", 남천동: "namcheon-dong", 민락동: "minrak-dong", 망미동: "mangmi-dong", 압구정동: "apgujeong-dong", 개포동: "gaepo-dong", 논현동: "nonhyeon-dong", 대치동: "daechi-dong", 도곡동: "dogok-dong", 삼성동: "samseong-dong", 역삼동: "yeoksam-dong", 청담동: "cheongdam-dong", 남현동: "namhyeondong", 봉천동: "bongcheondong", 신림동: "sinlimdong" };

  function cleanLabel(text) {
    return String(text || "")
      .replace(/\s*선택\s*$/, "")
      .replace(/\s*출장마사지/g, "")
      .replace(/\s*행정구\s*선택\s*$/, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeDong(text) {
    return cleanLabel(text)
      .replace(/-dong$/i, "동")
      .replace(/-eup$/i, "읍")
      .replace(/-myeon$/i, "면")
      .replace(/dong$/i, "동")
      .replace(/eup$/i, "읍")
      .replace(/myeon$/i, "면");
  }

  function fallbackSlug(label) {
    return encodeURIComponent(cleanLabel(label).replace(/\s+/g, "-"));
  }

  function dongSlug(dong) {
    const normalized = normalizeDong(dong);
    if (dongSlugs[normalized]) return dongSlugs[normalized];
    if (window.MAZZANG_AREA_SLUGS?.toSlug) return window.MAZZANG_AREA_SLUGS.toSlug(normalized);
    return fallbackSlug(normalized);
  }

  function sharedAreaUrl(city, district, dong) {
    const cleanCity = cleanLabel(city);
    const cleanDistrict = cleanLabel(district);
    const cleanDong = normalizeDong(dong);
    const cityPart = citySlugs[cleanCity] || window.MAZZANG_AREA_SLUGS?.toSlug?.(cleanCity) || fallbackSlug(cleanCity);
    const districtPart = districtSlugs[cleanDistrict] || window.MAZZANG_AREA_SLUGS?.toSlug?.(cleanDistrict) || fallbackSlug(cleanDistrict);
    return `/area/${cityPart}/${districtPart}/${dongSlug(cleanDong)}/`;
  }

  function currentState(root) {
    const state = root?._mazzangRegionState || {};
    const activeCity = root.querySelector("#subregion-list button.is-active")?.textContent;
    let title = root.querySelector("#dong-title")?.textContent || "";
    title = title.replace(/ 행정구 선택$/, "");
    return {
      city: cleanLabel(state.city || activeCity || "서울"),
      district: cleanLabel(state.district || title || "강남"),
      gu: cleanLabel(state.gu || "")
    };
  }

  function fixDongLinks() {
    const root = document.querySelector("#regions");
    if (!root) return;
    const state = currentState(root);
    root.querySelectorAll("#dong-list a").forEach((link) => {
      const dong = normalizeDong(link.textContent);
      if (!dong) return;
      const url = sharedAreaUrl(state.city, state.district, dong);
      link.href = url;
      link.setAttribute("aria-label", `${state.city} ${state.district}${state.gu ? " " + state.gu : ""} ${dong} 지역 안내`);
      link.dataset.unifiedAreaLink = "true";
    });
  }

  function bindOnce() {
    const root = document.querySelector("#regions");
    if (!root || root.dataset.mainRegionUnified === "true") return;
    root.dataset.mainRegionUnified = "true";
    root.addEventListener("click", (event) => {
      const detailLink = event.target.closest("#dong-list a");
      if (detailLink && root.contains(detailLink)) {
        const state = currentState(root);
        const dong = normalizeDong(detailLink.textContent);
        const url = sharedAreaUrl(state.city, state.district, dong);
        detailLink.href = url;
        event.preventDefault();
        event.stopImmediatePropagation();
        location.href = url;
        return;
      }
      setTimeout(fixDongLinks, 0);
      setTimeout(fixDongLinks, 80);
      setTimeout(fixDongLinks, 250);
      setTimeout(fixDongLinks, 600);
    }, true);
  }

  function run() {
    bindOnce();
    fixDongLinks();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  setTimeout(run, 300);
  setTimeout(run, 900);
  setTimeout(run, 1800);
  setTimeout(run, 3000);
})();
