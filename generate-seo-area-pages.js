const fs = require('fs');
const path = require('path');

const SITE = 'https://mazzanng.netlify.app';

const citySlug = { 서울:'seoul', 경기:'gyeonggi', 인천:'incheon', 부산:'busan', 대구:'daegu', 대전:'daejeon', 광주:'gwangju', 강원:'gangwon', 제주:'jeju' };
const districtSlug = { 강남:'gangnam', 서초:'seocho', 송파:'songpa', 마포:'mapo', 영등포:'yeongdeungpo', 용산:'yongsan', 성동:'seongdong', 광진:'gwangjin', 중구:'junggu', 종로:'jongno', 강서:'gangseo', 관악:'gwanak', 동작:'dongjak', 강동:'gangdong', 노원:'nowon', 은평:'eunpyeong', 구로:'guro', 금천:'geumcheon', 동대문:'dongdaemun', 서대문:'seodaemun', 성북:'seongbuk', 양천:'yangcheon', 중랑:'jungnang', 강북:'gangbuk', 도봉:'dobong', '성남 분당':'bundang', 수원:'suwon', 용인:'yongin', '고양 일산':'ilsan', 안양:'anyang', 부천:'bucheon', '화성 동탄':'dongtan', 남양주:'namyangju', 김포:'gimpo', 파주:'paju', 광명:'gwangmyeong', 하남:'hanam', 의정부:'uijeongbu', 시흥:'siheung', 평택:'pyeongtaek', 안산:'ansan', 안성:'anseong', 양주:'yangju', 여주:'yeoju', 오산:'osan', 이천:'icheon', 포천:'pocheon', 가평:'gapyeong', 과천:'gwacheon', 구리:'guri', 군포:'gunpo', 동두천:'dongducheon', 양평:'yangpyeong', 연천:'yeoncheon', 의왕:'uiwang', 부산진:'busanjin', 해운대:'haeundae', 수영:'suyeong', 동래:'dongnae', 남구:'namgu', 사하:'saha', 수성:'suseong', 달서:'dalseo', 동구:'donggu', 북구:'bukgu', 유성:'yuseong', 대덕:'daedeok', 광산:'gwangsan', 미추홀:'michuhol', 부평:'bupyeong', 남동:'namdong', 서구:'seogu', 계양:'gyeyang', '연수 송도':'songdo', 춘천:'chuncheon', 원주:'wonju', 강릉:'gangneung', 제주시:'jeju-si', 서귀포:'seogwipo' };
const dongSlug = { 개포동:'gaepo-dong', 논현동:'nonhyeon-dong', 대치동:'daechi-dong', 도곡동:'dogok-dong', 삼성동:'samseong-dong', 세곡동:'segok-dong', 수서동:'suseo-dong', 신사동:'sinsa-dong', 압구정동:'apgujeong-dong', 역삼동:'yeoksam-dong', 일원동:'irwon-dong', 자곡동:'jagok-dong', 청담동:'cheongdam-dong', 서초동:'seocho-dong', 반포동:'banpo-dong', 방배동:'bangbae-dong', 양재동:'yangjae-dong', 잠원동:'jamwon-dong', 내곡동:'naegok-dong', 잠실동:'jamsil-dong', 문정동:'munjeong-dong', 방이동:'bangi-dong', 석촌동:'seokchon-dong', 가락동:'garak-dong', 오금동:'ogeum-dong', 송파동:'songpa-dong', 공덕동:'gongdeok-dong', 합정동:'hapjeong-dong', 상암동:'sangam-dong', 서교동:'seogyo-dong', 망원동:'mangwon-dong', 도화동:'dohwa-dong', 여의도동:'yeouido-dong', 문래동:'mullae-dong', 당산동:'dangsan-dong', 신길동:'singil-dong', 영등포동:'yeongdeungpo-dong', 대림동:'daerim-dong', 한남동:'hannam-dong', 이태원동:'itaewon-dong', 성수동:'seongsu-dong', 왕십리동:'wangsimni-dong', 금호동:'geumho-dong', 옥수동:'oksu-dong', 행당동:'haengdang-dong', 구의동:'guui-dong', 자양동:'jayang-dong', 화양동:'hwayang-dong', 군자동:'gunja-dong', 중곡동:'junggok-dong', 남현동:'namhyeon-dong', 봉천동:'bongcheon-dong', 신림동:'sillim-dong', 정자동:'jeongja-dong', 서현동:'seohyeon-dong', 수내동:'sunae-dong', 야탑동:'yatap-dong', 판교동:'pangyo-dong', 이매동:'imae-dong', 인계동:'ingye-dong', 광교동:'gwanggyo-dong', 영통동:'yeongtong-dong', 매탄동:'maetan-dong', 권선동:'gwonseon-dong', 죽전동:'jukjeon-dong', 보정동:'bojeong-dong', 동백동:'dongbaek-dong', 장항동:'janghang-dong', 마두동:'madu-dong', 주엽동:'juyeop-dong', 백석동:'baekseok-dong', 화정동:'hwajeong-dong', 송도동:'songdo-dong', 연수동:'yeonsu-dong', 동춘동:'dongchun-dong', 청학동:'cheonghak-dong', 옥련동:'ongnyeon-dong', 부전동:'bujeon-dong', 전포동:'jeonpo-dong', 범천동:'beomcheon-dong', 가야동:'gaya-dong', 개금동:'gaegeum-dong', 우동:'u-dong', 중동:'jung-dong', 좌동:'jwa-dong', 재송동:'jaesong-dong', 반여동:'banyeo-dong', 범어동:'beomeo-dong', 만촌동:'manchon-dong', 두산동:'dusan-dong', 지산동:'jisan-dong', 황금동:'hwanggeum-dong', 상인동:'sangin-dong', 월성동:'wolseong-dong', 두류동:'duryu-dong', 본리동:'bonri-dong', 성당동:'seongdang-dong', 봉명동:'bongmyeong-dong', 도룡동:'doryong-dong', 관평동:'gwanpyeong-dong', 전민동:'jeonmin-dong', 노은동:'noeun-dong', 수완동:'suwan-dong', 첨단동:'cheomdan-dong', 월계동:'wolgyedong', 신창동:'sinchang-dong', 운남동:'unnam-dong', 퇴계동:'toegye-dong', 석사동:'seoksa-dong', 후평동:'hupyeong-dong', 온의동:'onui-dong', 무실동:'musil-dong', 단계동:'dangye-dong', 반곡동:'bangok-dong', 명륜동:'myeongnyun-dong', 교동:'gyo-dong', 포남동:'ponam-dong', 입암동:'ibam-dong', 유천동:'yuchon-dong', 연동:'yeon-dong', 노형동:'nohyeong-dong', 이도동:'ido-dong', 아라동:'ara-dong', 서귀동:'seogwi-dong', 동홍동:'donghong-dong', 중문동:'jungmun-dong', 대정읍:'daejeong-eup' };

const cityData = {
  서울:['강남','서초','송파','마포','영등포','용산','성동','광진','중구','종로','강서','관악','동작','강동','노원','은평','구로','금천','동대문','서대문','성북','양천','중랑','강북','도봉'],
  경기:['성남 분당','수원','용인','고양 일산','안양','부천','화성 동탄','남양주','김포','파주','광명','하남','의정부','시흥','평택','안산','안성','양주','여주','오산','이천','포천','가평','과천','구리','군포','동두천','양평','연천','의왕'],
  인천:['연수 송도','부평','남동','서구','미추홀','계양'],
  부산:['해운대','부산진','수영','동래','남구','사하'],
  대구:['수성','달서','중구','동구','북구','남구'],
  대전:['유성','서구','중구','동구','대덕'],
  광주:['광산','서구','동구','북구','남구'],
  강원:['춘천','원주','강릉'],
  제주:['제주시','서귀포']
};

const dongData = {
  강남:['개포동','논현동','대치동','도곡동','삼성동','세곡동','수서동','신사동','압구정동','역삼동','일원동','자곡동','청담동'],
  서초:['서초동','반포동','방배동','양재동','잠원동','내곡동'], 송파:['잠실동','문정동','방이동','석촌동','가락동','오금동','송파동'], 마포:['공덕동','합정동','상암동','서교동','망원동','도화동'], 영등포:['여의도동','문래동','당산동','신길동','영등포동','대림동'], 용산:['한남동','이태원동'], 성동:['성수동','왕십리동','금호동','옥수동','행당동'], 광진:['구의동','자양동','화양동','군자동','중곡동'], 관악:['남현동','봉천동','신림동'],
  '성남 분당':['정자동','서현동','수내동','야탑동','판교동','이매동'], 수원:['인계동','광교동','영통동','매탄동','권선동','정자동'], 용인:['죽전동','보정동','동백동'], '고양 일산':['장항동','마두동','주엽동','백석동','화정동'],
  '연수 송도':['송도동','연수동','동춘동','청학동','옥련동'], 해운대:['우동','중동','좌동','재송동','반여동'], 부산진:['부전동','전포동','범천동','가야동','개금동'], 수성:['범어동','만촌동','두산동','지산동','황금동'], 달서:['상인동','월성동','두류동','본리동','성당동'], 유성:['봉명동','도룡동','관평동','전민동','노은동'], 광산:['수완동','첨단동','월계동','신창동','운남동'], 춘천:['퇴계동','석사동','후평동','온의동'], 원주:['무실동','단계동','반곡동','명륜동'], 강릉:['교동','포남동','입암동','유천동'], 제주시:['연동','노형동','이도동','아라동'], 서귀포:['서귀동','동홍동','중문동','대정읍']
};

function ensureDir(filePath) { fs.mkdirSync(path.dirname(filePath), { recursive: true }); }
function slugCity(city) { return citySlug[city] || fallbackSlug(city); }
function slugDistrict(district) { return districtSlug[district] || fallbackSlug(district); }
function slugDong(dong) { return dongSlug[dong] || fallbackSlug(dong); }
function fallbackSlug(label) { return encodeURIComponent(String(label).trim().replace(/\s+/g, '-')); }
function injectMeta(html, title, description, canonical) {
  let output = html
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content=".*?">/s, `<meta name="description" content="${escapeAttr(description)}">`);
  const canonicalTag = `<link rel="canonical" href="${canonical}">`;
  if (/<link rel="canonical".*?>/s.test(output)) output = output.replace(/<link rel="canonical".*?>/s, canonicalTag);
  else output = output.replace('</head>', `  ${canonicalTag}\n</head>`);
  output = output.replace(/<meta property="og:title" content=".*?">/s, `<meta property="og:title" content="${escapeAttr(title)}">`)
    .replace(/<meta property="og:description" content=".*?">/s, `<meta property="og:description" content="${escapeAttr(description)}">`)
    .replace(/<meta property="og:url" content=".*?">/s, `<meta property="og:url" content="${canonical}">`);
  return output;
}
function escapeHtml(value) { return String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function escapeAttr(value) { return escapeHtml(value).replace(/"/g,'&quot;'); }
function writePage(urlPath, template, title, description) {
  const cleanPath = urlPath.endsWith('/') ? urlPath : `${urlPath}/`;
  const filePath = path.join(__dirname, cleanPath, 'index.html');
  ensureDir(filePath);
  fs.writeFileSync(filePath, injectMeta(template, title, description, `${SITE}${cleanPath}`));
}

const landingTemplate = fs.readFileSync(path.join(__dirname, 'area-landing.html'), 'utf8');
const detailTemplate = fs.readFileSync(path.join(__dirname, 'area.html'), 'utf8');
let count = 0;

for (const [city, districts] of Object.entries(cityData)) {
  const cityPath = `/area/${slugCity(city)}/`;
  writePage(cityPath, landingTemplate, `${city} 출장마사지 가능 지역 | 행정구별 예약 안내`, `${city} 출장마사지 가능 지역을 행정구별로 확인하고, 원하는 지역의 세부 동과 예약 전 확인사항을 살펴보세요.`);
  count += 1;
  for (const district of districts) {
    const districtPath = `${cityPath}${slugDistrict(district)}/`;
    writePage(districtPath, landingTemplate, `${district} 출장마사지 가능 지역 | ${city} 세부 동 예약 안내`, `${district} 출장마사지 이용 전 확인하면 좋은 세부 동, 방문 가능 범위, 예약 기준, 가격 차이와 코스 선택 방법을 안내합니다.`);
    count += 1;
    const dongs = dongData[district] || [];
    for (const dong of dongs) {
      writePage(`${districtPath}${slugDong(dong)}/`, detailTemplate, `${dong} 출장마사지 예약 전 확인사항 | ${district} 가격·지역·코스 안내`, `${city} ${district} ${dong} 출장마사지 이용 전 확인하면 좋은 예약 기준, 가격 차이, 주요 생활권, 코스 선택 방법을 정리했습니다.`);
      count += 1;
    }
  }
}

console.log(`Generated ${count} SEO area pages.`);
