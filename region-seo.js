(() => {
  const root = document.querySelector("#regions");
  if (!root) return;

  const baseTitle = "출장 마사지 바로 예약 | 실시간 관리사 매칭";
  const baseDescription = "내 지역으로 오는 출장 마사지. 전국 어디든 관리사 매칭. 강남, 인천, 수원, 부산 등 전국 50개 지역 예약 가능.";

  function metaDescription() {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    return meta;
  }

  function setMeta(title, description) {
    document.title = title;
    metaDescription().setAttribute("content", description);
    root.setAttribute("data-current-title", title);
    root.setAttribute("data-current-description", description);
  }

  function currentCity() {
    const active = root.querySelector("#subregion-list button.is-active");
    return active?.textContent.trim() || "";
  }

  function currentDistrict() {
    const active = root.querySelector("#dong-list button.is-active");
    return active?.textContent.trim() || "";
  }

  function cityTitle(city) {
    return `${city} 출장마사지 가능 지역 | 가격·코스·예약 안내`;
  }

  function cityDescription(city) {
    return `${city} 출장마사지 이용 전 확인하면 좋은 방문 가능 지역, 예약 기준, 코스 선택 방법, 가격 차이와 상담 전 확인사항을 안내합니다.`;
  }

  function districtTitle(city, district) {
    return `${district} 출장마사지 예약 전 확인사항 | ${city} 가격·지역·코스 안내`;
  }

  function districtDescription(city, district) {
    return `${district} 출장마사지 이용 전 확인하면 좋은 예약 기준, 가격 차이, 주요 생활권, 방문 가능 범위, 코스 선택 방법을 정리했습니다.`;
  }

  function regionTitle(label) {
    return `${label} 출장마사지 가능 지역 | 전국 권역별 예약 안내`;
  }

  function regionDescription(label) {
    return `${label} 출장마사지 가능 지역을 확인하고 주요 도시, 생활권, 예약 가능 시간, 코스와 가격 기준을 안내받을 수 있습니다.`;
  }

  function updateForCurrentSelection(depth = "city") {
    const city = currentCity();
    const district = currentDistrict();
    const regionLabel = root.querySelector(".region-tabs button.is-active")?.textContent.trim();

    if (depth === "region" && regionLabel) {
      setMeta(regionTitle(regionLabel), regionDescription(regionLabel));
      return;
    }

    if (depth === "district" && city && district) {
      setMeta(districtTitle(city, district), districtDescription(city, district));
      return;
    }

    if (city) {
      setMeta(cityTitle(city), cityDescription(city));
      return;
    }

    setMeta(baseTitle, baseDescription);
  }

  root.addEventListener("click", (event) => {
    const regionButton = event.target.closest(".region-tabs button[data-region]");
    const cityButton = event.target.closest("#subregion-list button[data-city]");
    const districtButton = event.target.closest("#dong-list button[data-district]");

    if (regionButton) {
      window.setTimeout(() => updateForCurrentSelection("region"), 120);
      return;
    }

    if (cityButton) {
      window.setTimeout(() => updateForCurrentSelection("city"), 120);
      return;
    }

    if (districtButton) {
      window.setTimeout(() => updateForCurrentSelection("district"), 120);
    }
  }, true);

  window.setTimeout(() => updateForCurrentSelection("city"), 350);
})();
