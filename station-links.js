(() => {
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
      .station-link-panel{margin-top:28px;background:linear-gradient(145deg,rgba(35,35,35,.96),rgba(8,8,8,.99));border:1px solid rgba(255,138,29,.34);border-radius:10px;box-shadow:0 26px 70px rgba(0,0,0,.42),inset 0 1px 0 rgba(255,255,255,.06);padding:26px}
      .station-link-head{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin-bottom:20px}.station-link-panel h2{color:var(--orange);font-size:clamp(28px,3.2vw,42px);margin:0 0 8px}.station-link-panel p{color:rgba(255,255,255,.84);line-height:1.75;margin:0;max-width:860px}.station-count{border:1px solid rgba(255,138,29,.48);border-radius:999px;color:#ff9a35;font-weight:900;padding:10px 14px;white-space:nowrap;background:rgba(255,138,29,.08)}
      .station-group-list{display:grid;gap:18px}.station-group{border:1px solid rgba(255,255,255,.11);border-radius:10px;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.018));padding:18px}.station-group h3{color:#fff;font-size:20px;margin:0 0 12px;display:flex;align-items:center;gap:10px}.station-group h3::before{content:"";width:8px;height:24px;border-radius:999px;background:linear-gradient(180deg,#ff9a35,#ff720f);box-shadow:0 0 18px rgba(255,138,29,.45)}
      .station-chip-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.station-chip{background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.025));border:1px solid rgba(255,255,255,.16);border-radius:8px;color:#fff;padding:14px 15px;text-decoration:none;min-height:72px;display:flex;flex-direction:column;justify-content:center}.station-chip strong{display:block;font-size:17px;line-height:1.28}.station-chip span{color:rgba(255,255,255,.62);display:block;font-size:13px;margin-top:5px;line-height:1.35}.station-chip:hover,.station-chip:focus-visible{background:linear-gradient(180deg,#ff9a35,#ff7f0f);color:#050505;border-color:#ffb263;transform:translateY(-1px);box-shadow:0 16px 34px rgba(255,127,15,.18)}.station-chip:hover span,.station-chip:focus-visible span{color:rgba(0,0,0,.68)}
      .area-station-inline{margin:24px auto 0;max-width:1160px}
      @media(max-width:980px){.station-chip-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.station-link-head{display:grid}.station-count{width:max-content}}
      @media(max-width:620px){.station-link-panel{padding:18px}.station-chip-grid{grid-template-columns:1fr}.station-chip{min-height:64px}.station-group{padding:14px}}
    `;
    document.head.appendChild(style);
  }
  function stationHref(s) {
    return `/station/${s.citySlug}/${s.slug}/`;
  }
  function groupedStations() {
    const order = ["서울", "경기", "인천", "부산", "대구", "대전", "광주", "강원"];
    const groups = new Map(order.map((name) => [name, []]));
    (window.MAZZANG_STATIONS || []).forEach((station) => {
      if (!groups.has(station.region)) groups.set(station.region, []);
      groups.get(station.region).push(station);
    });
    return Array.from(groups.entries()).filter(([, list]) => list.length);
  }
  function chip(station) {
    return `<a class="station-chip" href="${stationHref(station)}"><strong>${station.name}</strong><span>${station.city} ${station.district} · ${station.line}</span></a>`;
  }
  function renderMainStationHub() {
    const regions = document.querySelector("#regions");
    if (!regions || document.querySelector("#main-station-hub")) return;
    styleOnce();
    const total = (window.MAZZANG_STATIONS || []).length;
    const panel = document.createElement("section");
    panel.className = "station-link-panel";
    panel.id = "main-station-hub";
    panel.innerHTML = `
      <div class="station-link-head">
        <div><h2>전국 주요 역세권 예약 안내</h2><p>검색량이 있는 역세권을 권역별로 정리했습니다. 역 이름만 반복하지 않고, 각 역의 출구·생활권·예약 기준을 따로 확인할 수 있게 구성했습니다.</p></div>
        <span class="station-count">주요 역 ${total}개</span>
      </div>
      <div class="station-group-list">
        ${groupedStations().map(([region, list]) => `<div class="station-group"><h3>${region} 역세권</h3><div class="station-chip-grid">${list.map(chip).join("")}</div></div>`).join("")}
      </div>`;
    regions.appendChild(panel);
  }
  function renderAreaStationLinks() {
    const path = location.pathname.split("/").filter(Boolean);
    if (path[0] !== "area" || !path[2] || path[3] || document.querySelector("#area-station-links")) return;
    const citySlug = path[1];
    const districtSlug = path[2];
    const stationList = (window.MAZZANG_STATIONS || []).filter((station) => station.citySlug === citySlug && station.slug.includes(districtSlug)).slice(0, 6);
    if (!stationList.length) return;
    const host = document.querySelector("#eeat-content") || document.querySelector(".hub-section .wrap:last-child");
    if (!host) return;
    styleOnce();
    const panel = document.createElement("div");
    panel.className = "station-link-panel area-station-inline";
    panel.id = "area-station-links";
    panel.innerHTML = `<div class="station-link-head"><div><h2>가까운 주요 역세권</h2><p>해당 지역과 실제로 연결되는 역세권 안내입니다. 역 주변 예약 기준과 가까운 생활권을 함께 확인하세요.</p></div></div><div class="station-chip-grid">${stationList.map(chip).join("")}</div>`;
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
