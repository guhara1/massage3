const fs = require('fs');
const path = require('path');

const root = process.cwd();
const areaRoot = path.join(root, 'area');
const mixedPattern = /[a-z]{2,}(동|읍|면)/i;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.isFile() && entry.name === 'index.html') {
      files.push(fullPath);
    }
  }
  return files;
}

function assertFileContains(route, expected) {
  const filePath = path.join(root, ...route.split('/').filter(Boolean), 'index.html');
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing generated area page: ${route}`);
  }
  const html = fs.readFileSync(filePath, 'utf8');
  for (const text of expected) {
    if (!html.includes(text)) {
      throw new Error(`Generated page ${route} does not include "${text}"`);
    }
  }
  if (mixedPattern.test(html)) {
    throw new Error(`Generated page ${route} still includes mixed English/Korean dong text.`);
  }
  if (!/<title>[^<]*(동|읍|면)[^<]*<\/title>/.test(html)) {
    throw new Error(`Generated page ${route} is missing Korean title metadata.`);
  }
  if (!/<meta name="description" content="[^"]*(동|읍|면)[^"]*"/.test(html)) {
    throw new Error(`Generated page ${route} is missing Korean description metadata.`);
  }
}

const files = walk(areaRoot);
const badFiles = [];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  if (mixedPattern.test(html)) {
    badFiles.push(path.relative(root, file));
  }
}

if (badFiles.length > 0) {
  throw new Error(`Mixed English/Korean dong labels found:\n${badFiles.slice(0, 20).join('\n')}`);
}

assertFileContains('/area/gyeonggi/yongin/sanggaldong/', ['상갈동', '경기 용인 상갈동']);
assertFileContains('/area/gyeonggi/yongin/dongbaekdong/', ['동백동', '경기 용인 동백동']);
assertFileContains('/area/gyeonggi/yongin/yeongdeokdong/', ['영덕동', '경기 용인 영덕동']);
assertFileContains('/area/gyeonggi/anseong/geumgwangmyeon/', ['금광면', '경기 안성 금광면']);

console.log(`Verified ${files.length} generated area pages with Korean labels and metadata.`);
