const fs = require('fs');
const path = require('path');

const siteUrl = 'https://mazzanng.netlify.app';
const phone = '0508-202-4683';

const citySlug = { '서울':'seoul', '경기':'gyeonggi', '인천':'incheon', '부산':'busan', '대구':'daegu', '대전':'daejeon', '광주':'gwangju', '강원':'gangwon', '제주':'jeju' };
const districtSlug = {
  '강남':'gangnam','서초':'seocho','송파':'songpa','마포':'mapo','영등포':'yeongdeungpo','용산':'yongsan','성동':'seongdong','광진':'gwangjin','중구':'jung','종로':'jongno','강서':'gangseo','관악':'gwanak','동작':'dongjak','강동':'gangdong','노원':'nowon','은평':'eunpyeong','구로':'guro','금천':'geumcheon','동대문':'dongdaemun','서대문':'seodaemun','성북':'seongbuk','양천':'yangcheon','중랑':'jungnang','강북':'gangbuk','도봉':'dobong',
  '성남 분당':'bundang','분당':'bundang','수원':'suwon','용인':'yongin','고양 일산':'ilsan','일산':'ilsan','안양':'anyang','부천':'bucheon','화성 동탄':'dongtan','동탄':'dongtan','남양주':'namyangju','김포':'gimpo','파주':'paju','광명':'gwangmyeong','하남':'hanam','의정부':'uijeongbu','시흥':'siheung','평택':'pyeongtaek','안산':'ansan','안성':'anseong','양주':'yangju','여주':'yeoju','오산':'osan','이천':'icheon','포천':'pocheon','가평':'gapyeong','과천':'gwacheon','구리':'guri','군포':'gunpo','동두천':'dongducheon','양평':'yangpyeong','연천':'yeoncheon','의왕':'uiwang','광주':'gwangju',
  '연수 송도':'songdo','송도':'songdo','부평':'bupyeong','남동':'namdong','서구':'seogu','미추홀':'michuhol','계양':'gyeyang','동구':'donggu','강화':'ganghwa','옹진':'ongjin',
  '해운대':'haeundae','부산진':'busanjin','수영':'suyeong','동래':'dongnae','남구':'namgu','사하':'saha','수성':'suseong','달서':'dalseo','유성':'yuseong','광산':'gwangsan','춘천':'chuncheon','원주':'wonju','강릉':'gangneung','제주시':'jejusi','서귀포':'seogwipo'
};

const districts = {
  '서울':['강남','서초','송파','마포','영등포','용산','성동','광진','중구','종로','강서','관악','동작','강동','노원','은평','구로','금천','동대문','서대문','성북','양천','중랑','강북','도봉'],
  '경기':['성남 분당','수원','용인','고양 일산','안양','부천','화성 동탄','남양주','김포','파주','광명','하남','의정부','시흥','평택','안산','안성','양주','여주','오산','이천','포천','가평','과천','구리','군포','동두천','양평','연천','의왕','광주'],
  '인천':['연수 송도','송도','부평','남동','서구','미추홀','계양','중구','동구','강화','옹진'],
  '부산':['해운대','부산진','수영','동래','남구','사하'],
  '대구':['수성','달서','중구','동구','북구','남구'],
  '대전':['유성','서구','중구','동구','대덕'],
  '광주':['광산','서구','동구','북구','남구'],
  '강원':['춘천','원주','강릉'],
  '제주':['제주시','서귀포']
};

const chosung = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
const jungsung = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
const jongsung = ['','k','k','ks','n','nj','nh','t','l','lk','lm','lb','ls','lt','lp','lh','m','p','ps','t','t','ng','t','t','k','t','p','t'];

function romanizeWord(word) {
  return Array.from(word).map((char) => {
    const code = char.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) return char;
    const cho = Math.floor(code / 588);
    const jung = Math.floor((code % 588) / 28);
    const jong = code % 28;
    return `${chosung[cho]}${jungsung[jung]}${jongsung[jong]}`;
  }).join('');
}

function romanize(label, separator = '') {
  return label.trim().split(/\s+/).map(romanizeWord).join(separator).toLowerCase();
}

function cleanSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function addSlug(set, value) {
  const slug = cleanSlug(value);
  if (slug) set.add(slug);
}

function slugVariants(label, mappedSlug) {
  const variants = new Set();
  variants.add(encodeURIComponent(label));
  if (mappedSlug) addSlug(variants, mappedSlug);
  addSlug(variants, romanize(label, ''));
  addSlug(variants, romanize(label, '-'));
  return [...variants];
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function pageHtml(city, district, label, canonicalPath) {
  const area = `${city} ${district} ${label}`;
  const title = `${area} 출장마사지 예약 전 확인 기준 | 마짱`;
  const description = `${area} 출장마사지 이용 전 확인하면 좋은 예약 기준, 가격 차이, 주요 생활권, 코스 선택 방법을 정리했습니다.`;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeArea = escapeHtml(area);
  const safeLabel = escapeHtml(label);
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDescription}">
  <link rel="canonical" href="${siteUrl}${canonicalPath}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDescription}">
  <meta property="og:url" content="${siteUrl}${canonicalPath}">
  <style>
    :root{color-scheme:dark;--bg:#050505;--text:#fff;--muted:#d8d8d8;--line:#3a2614;--accent:#ff8818}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.65}a{color:inherit;text-decoration:none}.top{height:64px;border-bottom:1px solid #242424;background:#050505;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(20px,4vw,40px)}.brand{display:flex;gap:12px;align-items:center}.mark{width:38px;height:38px;border-radius:8px;background:var(--accent);display:grid;place-items:center;color:#000;font-weight:800}.brand strong{display:block;font-size:15px}.brand span{display:block;color:#bdbdbd;font-size:12px}.nav{display:flex;gap:34px;font-size:15px;font-weight:700}.hero{padding:86px clamp(22px,4vw,42px) 70px;background:linear-gradient(110deg,#3b1d08 0,#080808 52%,#050505 100%);border-bottom:1px solid #7b3b05}.eyebrow{font-size:22px;font-weight:800;margin:0 0 10px}.hero h1{margin:0 0 14px;color:var(--accent);font-size:clamp(48px,7vw,86px);line-height:1.08;letter-spacing:0}.hero p{max-width:980px;margin:0 0 26px;font-size:clamp(18px,2.2vw,22px);color:#fff}.actions{display:flex;gap:12px;flex-wrap:wrap}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;border-radius:7px;border:1px solid var(--accent);font-weight:800}.btn.primary{background:var(--accent);color:#000}main{padding:48px clamp(22px,4vw,40px)}.grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,.9fr);gap:18px;max-width:1180px}.card{border:1px solid var(--line);border-radius:8px;background:linear-gradient(145deg,#171717,#0d0d0d);padding:26px}.card small{display:block;color:#ffae55;font-weight:800;margin-bottom:8px}.card h2{margin:0 0 22px;color:var(--accent);font-size:26px}.row{display:flex;justify-content:space-between;gap:20px;border-top:1px solid #2a2a2a;padding:14px 0}.row:first-child{border-top:0}.row b{text-align:right}.note{color:var(--muted)}@media(max-width:760px){.nav{display:none}.grid{grid-template-columns:1fr}.hero h1{font-size:44px}.row{display:block}.row b{display:block;text-align:left;margin-top:4px}}
  </style>
</head>
<body>
  <header class="top"><a class="brand" href="/"><span class="mark">M</span><span><strong>마짱</strong><span>전국 지역 안내</span></span></a><nav class="nav"><a href="/#regions">지역 출장마사지</a><a href="/services.html">서비스 안내</a><a href="/guide.html">이용안내</a><a href="/reviews.html">후기</a><a href="/support.html">고객센터</a></nav></header>
  <section class="hero"><p class="eyebrow">지역 안내</p><h1>${safeLabel} 예약 전 확인 기준</h1><p>${safeDescription}</p><div class="actions"><a class="btn primary" href="tel:${phone}">${phone} 전화예약</a><a class="btn" href="/booking.html">예약방법 보기</a></div></section>
  <main><div class="grid"><section class="card"><small>기본정보</small><h2>${safeLabel} 방문 안내</h2><div class="row"><span>방문 권역</span><b>${safeArea}</b></div><div class="row"><span>예약 방식</span><b>전화 문의 후 가능 시간 확인</b></div><div class="row"><span>운영 안내</span><b>지역·시간·코스별 가능 여부 확인</b></div><div class="row"><span>확인 항목</span><b>주소, 출입 방식, 결제, 변경 기준</b></div></section><section class="card"><small>프로필</small><h2>전문 관리사 배정</h2><p class="note">예약 목적과 코스에 맞춰 관리 경험, 이동 가능 시간, 요청 부위를 확인한 뒤 배정 안내를 진행합니다.</p><p><strong style="color:var(--accent)">스웨디시 · 아로마 · 타이 상담 가능</strong></p></section></div></main>
</body>
</html>
`;
}

const suffixes = ['역권', '상권', '중심권', '시내권', '주거권'];
let written = 0;

for (const [city, districtList] of Object.entries(districts)) {
  for (const district of districtList) {
    const cityVariants = slugVariants(city, citySlug[city]);
    const districtVariants = slugVariants(district, districtSlug[district]);
    for (const suffix of suffixes) {
      const label = `${district}${suffix}`;
      const labelVariants = slugVariants(label);
      for (const cityPart of cityVariants) {
        for (const districtPart of districtVariants) {
          for (const labelPart of labelVariants) {
            const route = `/area/${cityPart}/${districtPart}/${labelPart}/`;
            const filePath = path.join(process.cwd(), 'area', cityPart, districtPart, labelPart, 'index.html');
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            fs.writeFileSync(filePath, pageHtml(city, district, label, route), 'utf8');
            written += 1;
          }
        }
      }
    }
  }
}

console.log(`Generated ${written} menu area pages.`);
