const fs = require('fs');
const path = require('path');

const siteUrl = 'https://mazzanng.netlify.app';
const phone = '0508-202-4683';

const citySlug = {
  '서울': 'seoul',
  '경기': 'gyeonggi',
  '인천': 'incheon',
  '부산': 'busan',
  '대구': 'daegu',
  '대전': 'daejeon',
  '광주': 'gwangju',
  '강원': 'gangwon',
  '제주': 'jeju',
};

const districtSlug = {
  '강남': 'gangnam', '서초': 'seocho', '송파': 'songpa', '마포': 'mapo', '영등포': 'yeongdeungpo', '용산': 'yongsan', '성동': 'seongdong', '광진': 'gwangjin', '중구': 'jung', '종로': 'jongno', '강서': 'gangseo', '관악': 'gwanak', '동작': 'dongjak', '강동': 'gangdong', '노원': 'nowon', '은평': 'eunpyeong', '구로': 'guro', '금천': 'geumcheon', '동대문': 'dongdaemun', '서대문': 'seodaemun', '성북': 'seongbuk', '양천': 'yangcheon', '중랑': 'jungnang', '강북': 'gangbuk', '도봉': 'dobong',
  '성남 분당': 'seongnam-bundang', '수원': 'suwon', '용인': 'yongin', '고양 일산': 'goyang-ilsan', '안양': 'anyang', '부천': 'bucheon', '화성 동탄': 'hwaseong-dongtan', '남양주': 'namyangju', '김포': 'gimpo', '파주': 'paju', '광명': 'gwangmyeong', '하남': 'hanam', '의정부': 'uijeongbu', '시흥': 'siheung', '평택': 'pyeongtaek', '안산': 'ansan', '안성': 'anseong', '양주': 'yangju', '여주': 'yeoju', '오산': 'osan', '이천': 'icheon', '포천': 'pocheon', '가평': 'gapyeong', '과천': 'gwacheon', '구리': 'guri', '군포': 'gunpo', '동두천': 'dongducheon', '양평': 'yangpyeong', '연천': 'yeoncheon', '의왕': 'uiwang', '광주': 'gwangju',
  '연수 송도': 'yeonsu-songdo', '부평': 'bupyeong', '남동': 'namdong', '서구': 'seo', '미추홀': 'michuhol', '계양': 'gyeyang', '동구': 'dong', '강화': 'ganghwa', '옹진': 'ongjin',
};

const areaData = {
  '서울': {
    '강남': ['개포동', '논현동', '대치동', '도곡동', '삼성동', '세곡동', '수서동', '신사동', '압구정동', '역삼동', '일원동', '자곡동', '청담동'],
    '서초': ['내곡동', '반포동', '방배동', '서초동', '양재동', '우면동', '원지동', '잠원동'],
    '송파': ['가락동', '거여동', '마천동', '문정동', '방이동', '삼전동', '석촌동', '송파동', '신천동', '오금동', '잠실동', '장지동', '풍납동'],
    '마포': ['공덕동', '구수동', '노고산동', '대흥동', '도화동', '동교동', '망원동', '상수동', '상암동', '서교동', '성산동', '신공덕동', '아현동', '연남동', '염리동', '용강동', '합정동'],
    '영등포': ['당산동', '대림동', '도림동', '문래동', '신길동', '양평동', '여의도동', '영등포동'],
    '용산': ['갈월동', '남영동', '동빙고동', '동자동', '문배동', '보광동', '서빙고동', '신계동', '용문동', '용산동', '원효로', '이촌동', '이태원동', '청파동', '한강로', '한남동', '효창동', '후암동'],
    '성동': ['금호동', '마장동', '사근동', '상왕십리동', '성수동', '송정동', '옥수동', '용답동', '응봉동', '하왕십리동', '행당동'],
    '광진': ['광장동', '구의동', '군자동', '능동', '자양동', '중곡동', '화양동'],
    '중구': ['광희동', '남대문로', '다산동', '동화동', '명동', '신당동', '약수동', '을지로', '장충동', '중림동', '필동', '회현동', '황학동'],
    '종로': ['가회동', '교남동', '무악동', '부암동', '사직동', '삼청동', '숭인동', '이화동', '종로동', '창신동', '청운효자동', '혜화동'],
    '강서': ['가양동', '개화동', '공항동', '내발산동', '등촌동', '마곡동', '방화동', '염창동', '외발산동', '화곡동'],
    '관악': ['남현동', '봉천동', '신림동'],
    '동작': ['노량진동', '대방동', '동작동', '본동', '사당동', '상도동', '신대방동', '흑석동'],
    '강동': ['강일동', '고덕동', '길동', '둔촌동', '명일동', '상일동', '성내동', '암사동', '천호동'],
    '노원': ['공릉동', '상계동', '월계동', '중계동', '하계동'],
    '은평': ['갈현동', '구산동', '녹번동', '대조동', '불광동', '수색동', '신사동', '역촌동', '응암동', '증산동', '진관동'],
    '구로': ['가리봉동', '개봉동', '고척동', '구로동', '궁동', '신도림동', '오류동', '온수동', '천왕동', '항동'],
    '금천': ['가산동', '독산동', '시흥동'],
    '동대문': ['답십리동', '신설동', '용두동', '이문동', '장안동', '전농동', '제기동', '청량리동', '회기동', '휘경동'],
    '서대문': ['남가좌동', '냉천동', '대현동', '북가좌동', '북아현동', '연희동', '영천동', '창천동', '충정로', '홍은동', '홍제동'],
    '성북': ['길음동', '돈암동', '동선동', '보문동', '삼선동', '석관동', '성북동', '안암동', '월곡동', '장위동', '정릉동', '종암동', '하월곡동'],
    '양천': ['목동', '신월동', '신정동'],
    '중랑': ['망우동', '면목동', '묵동', '상봉동', '신내동', '중화동'],
    '강북': ['미아동', '번동', '수유동', '우이동'],
    '도봉': ['도봉동', '방학동', '쌍문동', '창동'],
  },
  '경기': {
    '성남 분당': ['구미동', '금곡동', '백현동', '분당동', '삼평동', '서현동', '수내동', '야탑동', '운중동', '이매동', '정자동', '판교동'],
    '수원': ['권선동', '금곡동', '매탄동', '망포동', '세류동', '영통동', '우만동', '원천동', '이의동', '인계동', '정자동', '조원동', '천천동', '호매실동'],
    '용인': ['구갈동', '기흥동', '김량장동', '동백동', '마북동', '보라동', '보정동', '상갈동', '상하동', '상현동', '서농동', '성복동', '수지동', '신갈동', '역북동', '영덕동', '죽전동', '중동', '풍덕천동'],
    '고양 일산': ['대화동', '마두동', '백석동', '식사동', '장항동', '정발산동', '주엽동', '탄현동', '풍동', '화정동', '행신동'],
    '안양': ['관양동', '박달동', '비산동', '석수동', '안양동', '평촌동', '호계동'],
    '부천': ['괴안동', '상동', '소사본동', '송내동', '심곡동', '역곡동', '옥길동', '원미동', '중동'],
    '화성 동탄': ['남양읍', '능동', '동탄동', '반송동', '반월동', '병점동', '봉담읍', '산척동', '새솔동', '오산동', '청계동', '향남읍'],
    '남양주': ['다산동', '별내동', '오남읍', '와부읍', '진건읍', '진접읍', '퇴계원읍', '평내동', '호평동', '화도읍'],
    '김포': ['감정동', '걸포동', '고촌읍', '구래동', '마산동', '사우동', '양촌읍', '운양동', '장기동', '풍무동'],
    '파주': ['교하동', '금촌동', '동패동', '목동동', '문산읍', '아동동', '야당동', '와동동', '운정동', '조리읍'],
    '광명': ['광명동', '소하동', '일직동', '철산동', '하안동'],
    '하남': ['감일동', '덕풍동', '망월동', '미사동', '신장동', '위례동', '창우동', '풍산동'],
    '의정부': ['가능동', '금오동', '녹양동', '민락동', '신곡동', '용현동', '의정부동', '장암동', '호원동'],
    '시흥': ['거모동', '능곡동', '대야동', '배곧동', '신천동', '월곶동', '은행동', '장곡동', '정왕동'],
    '평택': ['고덕동', '동삭동', '비전동', '서정동', '세교동', '송탄동', '안중읍', '용이동', '지산동', '팽성읍'],
    '안산': ['고잔동', '본오동', '사동', '선부동', '성포동', '와동', '월피동', '이동', '초지동', '호수동'],
    '안성': ['공도읍', '금광면', '대덕면', '미양면', '보개면', '서운면', '아양동', '안성동', '원곡면', '일죽면', '죽산면'],
    '양주': ['고암동', '고읍동', '광사동', '덕계동', '덕정동', '백석읍', '옥정동', '은현면', '장흥면', '회천동'],
    '여주': ['가남읍', '강천면', '금사면', '대신면', '북내면', '산북면', '오학동', '점동면', '중앙동', '흥천면'],
    '오산': ['가수동', '갈곶동', '궐동', '금암동', '내삼미동', '누읍동', '부산동', '수청동', '오산동', '원동'],
    '이천': ['갈산동', '관고동', '마장면', '모가면', '부발읍', '신둔면', '안흥동', '장호원읍', '증포동', '창전동'],
    '포천': ['가산면', '군내면', '내촌면', '소흘읍', '신북면', '영북면', '영중면', '이동면', '일동면', '포천동'],
    '가평': ['가평읍', '북면', '상면', '설악면', '조종면', '청평면'],
    '과천': ['갈현동', '과천동', '막계동', '문원동', '별양동', '부림동', '원문동', '중앙동'],
    '구리': ['갈매동', '교문동', '동구동', '수택동', '아천동', '인창동', '토평동'],
    '군포': ['광정동', '군포동', '궁내동', '금정동', '당동', '대야미동', '산본동', '송부동', '오금동', '재궁동'],
    '동두천': ['걸산동', '광암동', '동두천동', '보산동', '불현동', '상봉암동', '생연동', '송내동', '안흥동', '지행동'],
    '양평': ['강상면', '강하면', '개군면', '단월면', '서종면', '양동면', '양서면', '양평읍', '옥천면', '용문면', '지평면', '청운면'],
    '연천': ['군남면', '미산면', '백학면', '신서면', '연천읍', '왕징면', '장남면', '전곡읍', '중면', '청산면'],
    '의왕': ['고천동', '내손동', '부곡동', '삼동', '오전동', '왕곡동', '청계동', '포일동'],
    '광주': ['경안동', '곤지암읍', '남종면', '능평동', '도척면', '목현동', '송정동', '쌍령동', '오포동', '초월읍', '탄벌동', '퇴촌면'],
  },
  '인천': {
    '연수 송도': ['동춘동', '선학동', '송도동', '연수동', '옥련동', '청학동'],
    '부평': ['갈산동', '구산동', '부개동', '부평동', '산곡동', '삼산동', '십정동', '일신동', '청천동'],
    '남동': ['간석동', '고잔동', '구월동', '논현동', '도림동', '만수동', '서창동', '장수동'],
    '서구': ['가정동', '가좌동', '검암동', '경서동', '당하동', '마전동', '석남동', '심곡동', '연희동', '오류동', '왕길동', '원당동', '청라동'],
    '미추홀': ['관교동', '도화동', '문학동', '숭의동', '용현동', '주안동', '학익동'],
    '계양': ['계산동', '귤현동', '동양동', '박촌동', '병방동', '서운동', '용종동', '작전동', '효성동'],
    '중구': ['관동', '답동', '도원동', '북성동', '사동', '선린동', '송월동', '신포동', '운남동', '운서동', '을왕동', '중산동', '항동'],
    '동구': ['금곡동', '만석동', '송림동', '송현동', '창영동', '화수동', '화평동'],
    '강화': ['강화읍', '교동면', '길상면', '내가면', '불은면', '삼산면', '선원면', '송해면', '양도면', '양사면', '하점면', '화도면'],
    '옹진': ['대청면', '덕적면', '백령면', '북도면', '연평면', '영흥면', '자월면'],
  },
};

const chosung = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
const jungsung = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];
const jongsung = ['', 'k', 'k', 'ks', 'n', 'nj', 'nh', 't', 'l', 'lk', 'lm', 'lb', 'ls', 'lt', 'lp', 'lh', 'm', 'p', 'ps', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 't'];

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
  return label.trim().split(/\s+/).map(romanizeWord).join(separator);
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

  const suffix = { '동': 'dong', '읍': 'eup', '면': 'myeon', '리': 'ri', '로': 'ro' }[label.slice(-1)];
  if (suffix) {
    const base = label.slice(0, -1);
    addSlug(variants, `${romanize(base, '')}${suffix}`);
    addSlug(variants, `${romanize(base, '')}-${suffix}`);
  }

  if (label === '광주') variants.add('gwangju-gyeonggi');
  return [...variants];
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function pageHtml(city, district, dong, canonicalPath) {
  const area = `${city} ${district} ${dong}`;
  const title = `${area} 출장마사지 예약 전 확인 기준 | 마짱`;
  const description = `${area} 출장마사지 이용 전 확인하면 좋은 예약 기준, 가격 차이, 주요 생활권, 코스 선택 방법을 정리했습니다.`;
  const canonical = `${siteUrl}${canonicalPath}`;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeArea = escapeHtml(area);
  const safeDong = escapeHtml(dong);

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDescription}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDescription}">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary">
  <style>
    :root{color-scheme:dark;--bg:#050505;--panel:#151515;--text:#fff;--muted:#d8d8d8;--line:#3a2614;--accent:#ff8818}
    *{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.65}
    a{color:inherit;text-decoration:none}.top{height:64px;border-bottom:1px solid #242424;background:#050505;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(20px,4vw,40px)}
    .brand{display:flex;gap:12px;align-items:center}.mark{width:38px;height:38px;border-radius:8px;background:var(--accent);display:grid;place-items:center;color:#000;font-weight:800}.brand strong{display:block;font-size:15px}.brand span{display:block;color:#bdbdbd;font-size:12px}
    .nav{display:flex;gap:34px;font-size:15px;font-weight:700}.hero{padding:86px clamp(22px,4vw,42px) 70px;background:linear-gradient(110deg,#3b1d08 0,#080808 52%,#050505 100%);border-bottom:1px solid #7b3b05}
    .eyebrow{font-size:22px;font-weight:800;margin:0 0 10px}.hero h1{margin:0 0 14px;color:var(--accent);font-size:clamp(48px,7vw,86px);line-height:1.08;letter-spacing:0}.hero p{max-width:980px;margin:0 0 26px;font-size:clamp(18px,2.2vw,22px);color:#fff}
    .actions{display:flex;gap:12px;flex-wrap:wrap}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;border-radius:7px;border:1px solid var(--accent);font-weight:800}.btn.primary{background:var(--accent);color:#000}
    main{padding:48px clamp(22px,4vw,40px)}.grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,.9fr);gap:18px;max-width:1180px}.card{border:1px solid var(--line);border-radius:8px;background:linear-gradient(145deg,#171717,#0d0d0d);padding:26px}
    .card small{display:block;color:#ffae55;font-weight:800;margin-bottom:8px}.card h2{margin:0 0 22px;color:var(--accent);font-size:26px}.rows{display:grid;gap:0}.row{display:flex;justify-content:space-between;gap:20px;border-top:1px solid #2a2a2a;padding:14px 0}.row:first-child{border-top:0}.row b{text-align:right}
    .profile{display:grid;grid-template-columns:180px minmax(0,1fr);gap:26px;align-items:center}.portrait{aspect-ratio:3/4;border-radius:7px;background:linear-gradient(145deg,#4b2b19,#151515);border:1px solid #6d3b18}.note{color:var(--muted)}
    @media(max-width:760px){.nav{display:none}.hero{padding-top:70px}.grid,.profile{grid-template-columns:1fr}.hero h1{font-size:44px}.row{display:block}.row b{display:block;text-align:left;margin-top:4px}.portrait{max-width:240px}}
  </style>
</head>
<body>
  <header class="top">
    <a class="brand" href="/">
      <span class="mark">M</span>
      <span><strong>마짱</strong><span>전국 지역 안내</span></span>
    </a>
    <nav class="nav" aria-label="주요 메뉴">
      <a href="/#regions">지역 출장마사지</a>
      <a href="/#services">서비스 안내</a>
      <a href="/#guide">이용안내</a>
      <a href="/#reviews">후기</a>
      <a href="/#contact">고객센터</a>
    </nav>
  </header>
  <section class="hero">
    <p class="eyebrow">지역 안내</p>
    <h1>${safeDong} 예약 전 확인 기준</h1>
    <p>${escapeHtml(description)}</p>
    <div class="actions">
      <a class="btn primary" href="tel:${phone}">${phone} 전화예약</a>
      <a class="btn" href="/#guide">예약방법 보기</a>
    </div>
  </section>
  <main>
    <div class="grid">
      <section class="card">
        <small>기본정보</small>
        <h2>${safeDong} 방문 안내</h2>
        <div class="rows">
          <div class="row"><span>방문 권역</span><b>${safeArea}</b></div>
          <div class="row"><span>예약 방식</span><b>전화 문의 후 가능 시간 확인</b></div>
          <div class="row"><span>운영 안내</span><b>지역·시간·코스별 가능 여부 확인</b></div>
          <div class="row"><span>확인 항목</span><b>주소, 출입 방식, 결제, 변경 기준</b></div>
        </div>
      </section>
      <section class="card profile">
        <div class="portrait" aria-hidden="true"></div>
        <div>
          <small>프로필</small>
          <h2>전문 관리사 배정</h2>
          <p class="note">예약 목적과 코스에 맞춰 관리 경험, 이동 가능 시간, 요청 부위를 확인한 뒤 배정 안내를 진행합니다.</p>
          <p><strong style="color:var(--accent)">스웨디시 · 아로마 · 타이 상담 가능</strong></p>
        </div>
      </section>
    </div>
  </main>
</body>
</html>
`;
}

let written = 0;
const representative = [];

for (const [city, districts] of Object.entries(areaData)) {
  for (const [district, dongs] of Object.entries(districts)) {
    for (const dong of dongs) {
      const cityVariants = slugVariants(city, citySlug[city]);
      const districtVariants = slugVariants(district, districtSlug[district]);
      const dongVariants = slugVariants(dong);
      for (const cityPart of cityVariants) {
        for (const districtPart of districtVariants) {
          for (const dongPart of dongVariants) {
            const route = `/area/${cityPart}/${districtPart}/${dongPart}/`;
            const filePath = path.join(process.cwd(), 'area', cityPart, districtPart, dongPart, 'index.html');
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            fs.writeFileSync(filePath, pageHtml(city, district, dong, route), 'utf8');
            written += 1;
          }
        }
      }
      representative.push(`/area/${cityVariants[1] || cityVariants[0]}/${districtVariants[1] || districtVariants[0]}/${dongVariants[1] || dongVariants[0]}/`);
    }
  }
}

console.log(`Generated ${written} area detail pages.`);
console.log(`Representative route: ${representative.find((route) => route.includes('/gyeonggi/yongin/sanggaldong/')) || representative[0]}`);
