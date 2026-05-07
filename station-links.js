(() => {
  const regionOrder = ["서울", "경기", "인천", "부산", "대구", "대전", "광주", "강원"];
  function ensureData(callback) {
    if (window.MAZZANG_STATIONS) {
      callback();
      return;
    }
    const existing = document.querySelector('script[src="/station-data.js"]');
    const script = existing || document.createElement("script");
    script.src = "/station-data.js";
    script.onload = callback;
    if (!existing) document.head.appendChild(script);
  }
  function styleOnce() {
    if (document.querySelector("#station-link-style")) return;
    const style = document.createElement("style");
    style.id = "station-link-style";
    style.textContent = `
      .station-link-panel{margin:28px 0 0;background:linear-gradient(145deg,rgba(35,35,35,.96),rgba(8,8,8,.99));border:1px solid rgba(255,138,29,.34);border-radius:10px;box-shadow:0 26px 70px rgba(0,0,0,.42),inset 0 1px 0 rgba(255,255,255,.06);padding:26px}
      .station-link-head{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin-bottom:18px}.station-link-panel h2{color:var(--orange);font-size:clamp(28px,3.2vw,42px);margin:0 0 8px}.station-link-panel p{color:rgba(255,255,255,.84);line-height:1.75;margin:0;max-width:860px}.station-count{border:1px solid rgba(255,138,29,.48);border-radius:999px;color:#ff9a35;font-weight:900;padding:10px 14px;white-space:nowrap;background:rgba(255,138,29,.08)}
      .station-region-tabs{display:flex;gap:10px;overflow-x:auto;padding:2px 0 16px;margin-bottom:18px;scrollbar-width:thin}.station-region-tab{appearance:none;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.025));color:#fff;cursor:pointer;font-weight:900;min-width:82px;padding:12px 18px}.station-region-tab.is-active{background:linear-gradient(180deg,#ff9a35,#ff7f0f);border-color:#ffb263;color:#050505;box-shadow:0 12px 28px rgba(255,127,15,.18)}
      .station-active-head{border:1px solid rgba(255,138,29,.25);border-radius:8px;background:linear-gradient(135deg,rgba(255,138,29,.13),rgba(255,255,255,.035));padding:18px 20px;margin-bottom:16px}.station-active-head h3{color:var(--orange);font-size:clamp(24px,2.6vw,34px);margin:0 0 6px}.station-active-head p{font-size:15px;color:rgba(255,255,255,.78)}
      .station-group-list{display:block}.station-group{display:none}.station-group.is-active{display:block}.station-chip-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.station-chip{background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.025));border:1px solid rgba(255,255,255,.16);border-radius:8px;color:#fff;padding:14px 15px;text-decoration:none;min-height:72px;display:flex;flex-direction:column;justify-content:center}.station-chip strong{display:block;font-size:17px;line-height:1.28}.station-chip span{color:rgba(255,255,255,.62);display:block;font-size:13px;margin-top:5px;line-height:1.35}.station-chip:hover,.station-chip:focus-visible{background:linear-gradient(180deg,#ff9a35,#ff7f0f);color:#050505;border-color:#ffb263;transform:translateY(-1px);box-shadow:0 16px 34px rgba(255,127,15,.18)}.station-chip:hover span,.station-chip:focus-visible span{color:rgba(0,0,0,.68)}
      .area-station-inline{margin:24px auto 0;max-width:1160px}.area-station-inline .station-link-head{margin-bottom:16px}
      @media(max-width:980px){.station-chip-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.station-link-head{display:grid}.station-count{width:max-content}}
      @media(max-width:620px){.station-link-panel{padding:18px}.station-chip-grid{grid-template-columns:1fr}.station-chip{min-height:64px}.station-region-tab{min-width:74px;padding:11px 15px}.station-active-head{padding:15px}}
    `;
    document.head.appendChild(style);
  }
  function stationHref(s) {
    return `/station/${s.citySlug}/${s.slug}/`;
  }
  function groupedStations() {
    const groups = new Map(regionOrder.map((name) => [name, []]));
    (window.MAZZANG_STATIONS || []).forEach((station) => {
      if (!groups.has(station.region)) groups.set(station.region, []);
      groups.get(station.region).push(station);
    });
    return Array.from(groups.entries()).filter(([, list]) => list.length);
  }
  function chip(station) {
    return `<a class="station-chip" href="${stationHref(station)}"><strong>${station.name}</strong><span>${station.city} ${station.district} · ${station.line}</span></a>`;
  }
  function regionCopy(region, count) {
    const copy = {
      "서울": "강남, 선릉, 잠실, 홍대입구 등 검색 수요가 있는 서울 주요 역을 먼저 확인할 수 있습니다.",
      "경기": "판교, 정자, 수원, 동탄처럼 생활권과 이동 거리가 다른 경기 주요 역을 따로 정리했습니다.",
      "인천": "부평, 송도, 청라, 주안 등 인천 안에서도 상권과 주거권이 다른 주요 역 기준입니다.",
      "부산": "서면, 해운대, 센텀시티, 부산역처럼 관광·상권·교통 수요가 나뉘는 부산 주요 역입니다.",
      "대구": "동대구, 반월당, 수성구청 등 대구 도심과 주거권을 함께 비교할 수 있습니다.",
      "대전": "둔산, 유성, 정부청사 주변처럼 업무와 숙박 수요가 있는 대전 주요 역입니다.",
      "광주": "상무, 금남로 등 광주 도심 생활권과 상권 중심 역을 확인할 수 있습니다.",
      "강원": "춘천역처럼 철도 이동과 시내 생활권이 연결되는 강원 주요 역 안내입니다."
    };
    return `${copy[region] || `${region} 주요 역을 확인할 수 있습니다.`} 현재 ${count}개 역을 안내합니다.`;
  }
  function setActive(panel, region) {
    panel.querySelectorAll(".station-region-tab").forEach((button) => {
      const active = button.dataset.region === region;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    panel.querySelectorAll(".station-group").forEach((group) => {
      const active = group.dataset.region === region;
      group.classList.toggle("is-active", active);
      group.hidden = !active;
    });
    const group = groupedStations().find(([name]) => name === region);
    const count = group ? group[1].length : 0;
    panel.querySelector("#station-active-title").textContent = `${region} 주요 역`;
    panel.querySelector("#station-active-copy").textContent = regionCopy(region, count);
  }
  function renderMainStationHub() {
    const regions = document.querySelector("#regions");
    if (!regions || document.querySelector("#main-station-hub")) return;
    styleOnce();
    const groups = groupedStations();
    const total = (window.MAZZANG_STATIONS || []).length;
    const firstRegion = groups[0]?.[0] || "서울";
    const panel = document.createElement("section");
    panel.className = "station-link-panel";
    panel.id = "main-station-hub";
    panel.innerHTML = `
      <div class="station-link-head">
        <div><h2>전국 주요 지하철역 안내</h2><p>지역과 생활권을 먼저 확인한 뒤, 역 이름으로 바로 찾는 고객을 위해 주요 지하철역만 따로 정리했습니다. 필요한 권역을 선택하면 같은 자리에서 역 목록이 바뀝니다.</p></div>
        <span class="station-count">주요 역 ${total}개</span>
      </div>
      <div class="station-region-tabs" role="tablist" aria-label="주요 역 권역 선택">
        ${groups.map(([region]) => `<button class="station-region-tab" type="button" role="tab" data-region="${region}" aria-selected="false">${region}</button>`).join("")}
      </div>
      <div class="station-active-head"><h3 id="station-active-title">${firstRegion} 주요 역</h3><p id="station-active-copy"></p></div>
      <div class="station-group-list">
        ${groups.map(([region, list]) => `<div class="station-group" data-region="${region}"><div class="station-chip-grid">${list.map(chip).join("")}</div></div>`).join("")}
      </div>`;
    const anchor = regions.querySelector(".region-layout") || regions.querySelector(".region-panel") || regions.lastElementChild;
    if (anchor) anchor.insertAdjacentElement("afterend", panel);
    else regions.appendChild(panel);
    panel.querySelectorAll(".station-region-tab").forEach((button) => button.addEventListener("click", () => setActive(panel, button.dataset.region)));
    setActive(panel, firstRegion);
  }
  function renderAreaStationLinks() {
    const path = location.pathname.split("/").filter(Boolean);
    if (path[0] !== "area" || !path[2] || path[3] || document.querySelector("#area-station-links")) return;
    const citySlug = path[1];
    const stationList = (window.MAZZANG_STATIONS || []).filter((station) => station.citySlug === citySlug).slice(0, 8);
    if (!stationList.length) return;
    const host = document.querySelector("#eeat-content") || document.querySelector(".hub-section .wrap:last-child");
    if (!host) return;
    styleOnce();
    const panel = document.createElement("div");
    panel.className = "station-link-panel area-station-inline";
    panel.id = "area-station-links";
    panel.innerHTML = `<div class="station-link-head"><div><h2>가까운 주요 역</h2><p>해당 지역과 함께 확인하기 좋은 역 주변 안내입니다. 역 이름을 클릭하면 출구, 생활권, 예약 기준을 따로 확인할 수 있습니다.</p></div></div><div class="station-chip-grid">${stationList.map(chip).join("")}</div>`;
    host.insertAdjacentElement("afterend", panel);
  }
  function run() {
    ensureData(() => {
      renderMainStationHub();
      renderAreaStationLinks();
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  setTimeout(run, 500);
})();
