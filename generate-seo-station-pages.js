const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SITE = 'https://mazzanng.netlify.app';
const TODAY = new Date().toISOString().slice(0, 10);

function readStations() {
  const code = fs.readFileSync(path.join(__dirname, 'station-data.js'), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox, { filename: 'station-data.js' });
  return sandbox.window.MAZZANG_STATIONS || [];
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, '&quot;');
}

function cleanStationSlug(station) {
  return String(station.slug || '')
    .replace(/-station$/i, '')
    .replace(/[^a-z0-9-]/gi, '')
    .toLowerCase();
}

function stationPath(station, legacy = false) {
  const slug = legacy ? station.slug : cleanStationSlug(station);
  return `/station/${station.citySlug}/${slug}/`;
}

function stationTitle(station) {
  return `${station.name} 출장마사지 예약 전 확인사항 | ${station.city} ${station.district} 역세권 안내`;
}

function stationDescription(station) {
  const nearby = Array.isArray(station.nearby) && station.nearby.length ? `${station.nearby.join('·')} 주변 ` : '';
  return `${station.name} 출장마사지 이용 전 확인하면 좋은 예약 기준, 방문 가능 범위, 출구별 생활권, 가격 차이와 코스 선택 방법을 정리했습니다. ${nearby}이용 전 참고하세요.`;
}

function patchStationRuntime(html, station) {
  const preset = `<script>window.MAZZANG_STATION_PRESET={slug:${JSON.stringify(station.slug)},citySlug:${JSON.stringify(station.citySlug)}};</script>`;
  let output = html.replace('<script src="/station-data.js"></script>', `${preset}\n  <script src="/station-data.js"></script>`);

  output = output.replace(
    'function currentSlug(){const parts=location.pathname.split("/").filter(Boolean);return parts[2]||new URLSearchParams(location.search).get("station")||"gangnam-station"}',
    'function currentSlug(){const preset=window.MAZZANG_STATION_PRESET?.slug;if(preset)return preset;const parts=location.pathname.split("/").filter(Boolean);return parts[2]||new URLSearchParams(location.search).get("station")||"gangnam-station"}'
  );

  output = output.replace(
    'function findStation(){const list=window.MAZZANG_STATIONS||[];return list.find((item)=>item.slug===currentSlug())||list[0]}',
    'function findStation(){const list=window.MAZZANG_STATIONS||[];const slug=currentSlug();const clean=(value)=>String(value||"").replace(/-station$/i,"");return list.find((item)=>item.slug===slug||clean(item.slug)===clean(slug)||item.slug===`${slug}-station`)||list[0]}'
  );

  output = output.replace(
    'function stationHref(s){return `/station/${s.citySlug}/${s.slug}/`}',
    'function stationHref(s){const clean=String(s.slug||"").replace(/-station$/i,"");return `/station/${s.citySlug}/${clean}/`}'
  );

  return output;
}

function injectHead(html, station, canonical) {
  const title = stationTitle(station);
  const description = stationDescription(station);
  const tags = [
    '<meta name="robots" content="index, follow">',
    `<link rel="canonical" href="${canonical}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="마짱">',
    `<meta property="og:title" content="${escapeAttr(title)}">`,
    `<meta property="og:description" content="${escapeAttr(description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    '<meta name="twitter:card" content="summary">',
    `<meta name="twitter:title" content="${escapeAttr(title)}">`,
    `<meta name="twitter:description" content="${escapeAttr(description)}">`
  ].join('\n  ');

  let output = html
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content=".*?">/s, `<meta name="description" content="${escapeAttr(description)}">`)
    .replace(/\s*<link rel="canonical".*?>/g, '')
    .replace(/\s*<meta name="robots".*?>/g, '')
    .replace(/\s*<meta property="og:[^"]+".*?>/g, '')
    .replace(/\s*<meta name="twitter:[^"]+".*?>/g, '');

  output = output.replace('</head>', `  ${tags}\n</head>`);
  output = output.replace(
    '<h1 id="station-title">역세권 예약 전 확인 기준</h1><p id="station-summary"></p>',
    `<h1 id="station-title">${escapeHtml(station.name)} 예약 전 확인 기준</h1><p id="station-summary">${escapeHtml(description)}</p>`
  );

  return output;
}

function writeStationPage(template, station, urlPath, canonicalPath) {
  const canonical = `${SITE}${canonicalPath}`;
  const html = injectHead(patchStationRuntime(template, station), station, canonical);
  const filePath = path.join(__dirname, urlPath, 'index.html');
  ensureDir(filePath);
  fs.writeFileSync(filePath, html, 'utf8');
}

function updateSitemap(stations) {
  const sitemapPath = path.join(__dirname, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return;
  let xml = fs.readFileSync(sitemapPath, 'utf8');
  xml = xml.replace(/\n\s*<url><loc>https:\/\/mazzanng\.netlify\.app\/station\/.*?<\/url>/g, '');
  const stationUrls = stations.map((station) => {
    const loc = `${SITE}${stationPath(station)}`;
    return `  <url><loc>${loc}</loc><lastmod>${TODAY}</lastmod><priority>0.68</priority></url>`;
  }).join('\n');
  xml = xml.replace('\n</urlset>', `\n\n${stationUrls}\n</urlset>`);
  fs.writeFileSync(sitemapPath, xml, 'utf8');
}

const template = fs.readFileSync(path.join(__dirname, 'station.html'), 'utf8');
const stations = readStations();
let count = 0;

for (const station of stations) {
  const cleanPath = stationPath(station);
  writeStationPage(template, station, cleanPath, cleanPath);
  count += 1;

  const legacyPath = stationPath(station, true);
  if (legacyPath !== cleanPath) {
    writeStationPage(template, station, legacyPath, cleanPath);
    count += 1;
  }
}

updateSitemap(stations);
console.log(`Generated ${count} SEO station pages from ${stations.length} stations.`);
