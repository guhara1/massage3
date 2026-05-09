const fs = require('fs');
const path = require('path');

function extractObject(source, name) {
  const marker = `const ${name} =`;
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`Cannot find ${name}`);
  const braceStart = source.indexOf('{', start);
  if (braceStart === -1) throw new Error(`Cannot find ${name} object start`);
  let depth = 0;
  for (let index = braceStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === '{') depth += 1;
    if (char === '}') depth -= 1;
    if (depth === 0) return source.slice(braceStart, index + 1);
  }
  throw new Error(`Cannot find ${name} object end`);
}

function read(file) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf8');
}

const aliasSource = read('generate-area-alias-pages.js');
const seoSource = read('generate-seo-area-pages.js');
const commercialSource = read('generate-area-commercial-pages.js');

const areaData = eval(`(${extractObject(aliasSource, 'areaData')})`);
const aliasCitySlug = eval(`(${extractObject(aliasSource, 'citySlug')})`);
const aliasDistrictSlug = eval(`(${extractObject(aliasSource, 'districtSlug')})`);
const cityData = eval(`(${extractObject(seoSource, 'cityData')})`);
const dongData = eval(`(${extractObject(seoSource, 'dongData')})`);
const commercialDistricts = eval(`(${extractObject(commercialSource, 'districts')})`);
const commercialCitySlug = eval(`(${extractObject(commercialSource, 'citySlug')})`);
const commercialDistrictSlug = eval(`(${extractObject(commercialSource, 'districtSlug')})`);

function ensureCity(city) {
  if (!areaData[city]) areaData[city] = {};
}

function mergeDongList(city, district, dongs) {
  ensureCity(city);
  if (!areaData[city][district]) areaData[city][district] = [];
  const set = new Set(areaData[city][district]);
  for (const dong of dongs || []) {
    if (dong) set.add(dong);
  }
  areaData[city][district] = [...set];
}

for (const [city, districts] of Object.entries(cityData)) {
  for (const district of districts) {
    const fallback = [`${district.replace(/\s+/g, '')}동`];
    mergeDongList(city, district, dongData[district] && dongData[district].length ? dongData[district] : fallback);
  }
}

for (const [city, districts] of Object.entries(commercialDistricts)) {
  for (const district of districts) {
    const labels = new Set([`${district.replace(/\s+/g, '')}동`]);
    const words = district.split(/\s+/).filter(Boolean);
    if (words.length > 1) labels.add(`${words[words.length - 1]}동`);
    mergeDongList(city, district, [...labels]);
  }
}

const citySlug = { ...aliasCitySlug, ...commercialCitySlug };
const districtSlug = { ...aliasDistrictSlug, ...commercialDistrictSlug };
const runtime = `window.MAZZANG_FULL_AREA_DATA=${JSON.stringify(areaData)};\nwindow.MAZZANG_FULL_AREA_SLUGS=${JSON.stringify({ citySlug, districtSlug })};\n`;

fs.writeFileSync(path.join(process.cwd(), 'area-data-full.js'), runtime, 'utf8');
console.log(`Generated area-data-full.js with ${Object.keys(areaData).length} cities.`);
