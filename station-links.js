(() => {
  const stations = [
    ["강남역", "/station/seoul/gangnam-station/", "서울 강남"],
    ["선릉역", "/station/seoul/seolleung-station/", "서울 강남"],
    ["홍대입구역", "/station/seoul/hongik-station/", "서울 마포"],
    ["판교역", "/station/gyeonggi/pangyo-station/", "경기 분당"],
    ["부평역", "/station/incheon/bupyeong-station/", "인천 부평"],
    ["서면역", "/station/busan/seomyeon-station/", "부산 부산진"]
  ];
  const districtStations = {
    "gangnam": [["강남역", "/station/seoul/gangnam-station/"], ["선릉역", "/station/seoul/seolleung-station/"]],
    "mapo": [["홍대입구역", "/station/seoul/hongik-station/"]],
    "bundang": [["판교역", "/station/gyeonggi/pangyo-station/"]],
    "bupyeong": [["부평역", "/station/incheon/bupyeong-station/"]],
    "busanjin": [["서면역", "/station/busan/seomyeon-station/"]]
  };
  function styleOnce() {
    if (document.querySelector("#station-link-style")) return;
    const style = document.createElement("style");
    style.id = "station-link-style";
    style.textContent = `
      .station-link-panel{margin-top:24px;background:linear-gradient(145deg,rgba(34,34,34,.96),rgba(10,10,10,.99));border:1px solid rgba(255,138,29,.34);border-radius:10px;box-shadow:0 24px 64px rgba(0,0,0,.36);padding:24px}
      .station-link-panel h2{color:var(--orange);font-size:clamp(26px,3vw,38px);margin:0 0 10px}.station-link-panel p{color:rgba(255,255,255,.84);line-height:1.75;margin:0 0 16px}
      .station-chip-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.station-chip{background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.025));border:1px solid rgba(255,255,255,.15);border-radius:8px;color:#fff;padding:16px;text-decoration:none}.station-chip strong{display:block;font-size:18px}.station-chip span{color:rgba(255,255,255,.62);display:block;font-size:13px;margin-top:5px}.station-chip:hover{background:linear-gradient(180deg,#ff9a35,#ff7f0f);color:#050505}.station-chip:hover span{color:rgba(0,0,0,.65)}
      @media(max-width:760px){.station-chip-grid{grid-template-columns:1fr}.station-link-panel{padding:18px}}
    `;
    document.head.appendChild(style);
  }
  function renderMainStationHub() {
    const regions = document.querySelector("#regions");
    if (!regions || document.querySelector("#main-station-hub")) return;
    styleOnce();
    const panel = document.createElement("section");
    panel.className = "station-link-panel";
    panel.id = "main-station-hub";
    panel.innerHTML = `<h2>주요 역세권 예약 안내</h2><p>검색 의도가 강한 핵심 역세권만 먼저 정리했습니다. 역 주변 출구, 생활권, 방문 가능 시간, 가까운 행정동을 함께 확인할 수 있습니다.</p><div class="station-chip-grid">${stations.map(([name, href, area]) => `<a class="station-chip" href="${href}"><strong>${name}</strong><span>${area}</span></a>`).join("")}</div>`;
    regions.appendChild(panel);
  }
  function renderAreaStationLinks() {
    const path = location.pathname.split("/").filter(Boolean);
    if (path[0] !== "area" || !path[2] || path[3] || document.querySelector("#area-station-links")) return;
    const key = path[2];
    const list = districtStations[key];
    if (!list) return;
    const host = document.querySelector("#eeat-content") || document.querySelector(".hub-section .wrap:last-child");
    if (!host) return;
    styleOnce();
    const panel = document.createElement("div");
    panel.className = "station-link-panel";
    panel.id = "area-station-links";
    panel.innerHTML = `<h2>가까운 주요 역세권</h2><p>해당 지역과 실제로 연결되는 역세권 안내입니다. 역 주변 예약 기준과 가까운 행정동을 함께 확인하세요.</p><div class="station-chip-grid">${list.map(([name, href]) => `<a class="station-chip" href="${href}"><strong>${name}</strong><span>역세권 안내</span></a>`).join("")}</div>`;
    host.insertAdjacentElement("afterend", panel);
  }
  function run() { renderMainStationHub(); renderAreaStationLinks(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  setTimeout(run, 500);
})();
