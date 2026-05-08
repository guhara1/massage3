(() => {
  const root = document.querySelector("#regions");
  if (!root) return;

  const regionTabs = root.querySelector(".region-tabs");
  const regionTitle = root.querySelector("#region-title");
  const regionDescription = root.querySelector("#region-description");
  const subregionList = root.querySelector("#subregion-list");
  const detailTitle = root.querySelector("#dong-title");
  const detailSummary = root.querySelector("#dong-summary");
  const detailList = root.querySelector("#dong-list");

  const slug = {
    city: {"서울":"seoul","경기":"gyeonggi","인천":"incheon","부산":"busan","대구":"daegu","대전":"daejeon","광주":"gwangju","강원":"gangwon","제주":"jeju","세종":"sejong","전북":"jeonbuk"},
    district: {"강남":"gangnam","서초":"seocho","송파":"songpa","마포":"mapo","영등포":"yeongdeungpo","용산":"yongsan","성동":"seongdong","광진":"gwangjin","중구":"junggu","종로":"jongno","강서":"gangseo","관악":"gwanak","동작":"dongjak","강동":"gangdong","노원":"nowon","은평":"eunpyeong","구로":"guro","금천":"geumcheon","동대문":"dongdaemun","서대문":"seodaemun","성북":"seongbuk","양천":"yangcheon","중랑":"jungnang","강북":"gangbuk","도봉":"dobong","성남 분당":"bundang","수원":"suwon","용인":"yongin","고양 일산":"ilsan","안양":"anyang","부천":"bucheon","화성 동탄":"dongtan","남양주":"namyangju","김포":"gimpo","파주":"paju","광명":"gwangmyeong","하남":"hanam","의정부":"uijeongbu","시흥":"siheung","평택":"pyeongtaek","안산":"ansan","안성":"anseong","양주":"yangju","여주":"yeoju","오산":"osan","이천":"icheon","포천":"pocheon","가평":"gapyeong","과천":"gwacheon","구리":"guri","군포":"gunpo","동두천":"dongducheon","양평":"yangpyeong","연천":"yeoncheon","의왕":"uiwang","연수 송도":"songdo","부평":"bupyeong","남동":"namdong","서구":"seogu","미추홀":"michuhol","계양":"gyeyang","해운대":"haeundae","부산진":"busanjin","수영":"suyeong","수성":"suseong","달서":"dalseo","유성":"yuseong","광산":"gwangsan","춘천":"chuncheon","원주":"wonju","강릉":"gangneung","제주시":"jeju-si","서귀포":"seogwipo"}
  };

  const data = {
    capital: {
      label: "수도권",
      description: "서울, 경기, 인천을 먼저 선택한 뒤 구·시·생활권과 세부 동까지 확인할 수 있습니다.",
      cities: {
        "서울": { note: "서울은 구별 이동 시간, 주차·출입 방식, 예약 가능 시간을 함께 확인하는 것이 좋습니다.", districts: {
          "강남": ["개포동","논현동","대치동","도곡동","삼성동","세곡동","수서동","신사동","압구정동","역삼동","일원동","자곡동","청담동"],
          "서초": ["내곡동","반포동","방배동","서초동","양재동","우면동","원지동","잠원동"],
          "송파": ["가락동","거여동","마천동","문정동","방이동","삼전동","석촌동","송파동","신천동","오금동","잠실동","장지동","풍납동"],
          "마포": ["공덕동","노고산동","대흥동","도화동","동교동","망원동","상수동","상암동","서교동","성산동","아현동","연남동","합정동"],
          "영등포": ["당산동","대림동","도림동","문래동","신길동","양평동","여의도동","영등포동"],
          "용산": ["남영동","보광동","이촌동","이태원동","청파동","한강로","한남동","후암동"],
          "성동": ["금호동","마장동","성수동","송정동","옥수동","왕십리동","행당동"],
          "광진": ["광장동","구의동","군자동","능동","자양동","중곡동","화양동"],
          "중구": ["광희동","남대문로","다산동","명동","신당동","약수동","을지로","장충동","회현동","황학동"],
          "종로": ["가회동","교남동","무악동","부암동","사직동","삼청동","숭인동","이화동","종로동","창신동","혜화동"],
          "강서": ["가양동","개화동","공항동","내발산동","등촌동","마곡동","방화동","염창동","화곡동"],
          "관악": ["남현동","봉천동","신림동"],
          "동작": ["노량진동","대방동","동작동","본동","사당동","상도동","신대방동","흑석동"],
          "강동": ["강일동","고덕동","길동","둔촌동","명일동","상일동","성내동","암사동","천호동"],
          "노원": ["공릉동","상계동","월계동","중계동","하계동"],
          "은평": ["갈현동","구산동","녹번동","대조동","불광동","수색동","신사동","역촌동","응암동","증산동","진관동"],
          "구로": ["가리봉동","개봉동","고척동","구로동","궁동","신도림동","오류동","온수동","천왕동","항동"],
          "금천": ["가산동","독산동","시흥동"],
          "동대문": ["답십리동","신설동","용두동","이문동","장안동","전농동","제기동","청량리동","회기동","휘경동"],
          "서대문": ["남가좌동","대현동","북가좌동","북아현동","연희동","창천동","홍은동","홍제동"],
          "성북": ["길음동","돈암동","동선동","보문동","삼선동","석관동","성북동","안암동","월곡동","장위동","정릉동","종암동"],
          "양천": ["목동","신월동","신정동"],
          "중랑": ["망우동","면목동","묵동","상봉동","신내동","중화동"],
          "강북": ["미아동","번동","수유동","우이동"],
          "도봉": ["도봉동","방학동","쌍문동","창동"]
        }},
        "경기": { note: "경기는 도시별 이동 거리가 달라 희망 시간과 출입 조건을 함께 확인하는 흐름이 중요합니다.", districts: {
          "성남 분당": ["구미동","금곡동","백현동","분당동","삼평동","서현동","수내동","야탑동","운중동","이매동","정자동","판교동"],
          "수원": ["권선동","금곡동","매탄동","망포동","세류동","영통동","우만동","원천동","이의동","인계동","정자동","조원동","호매실동"],
          "용인": ["구갈동","동백동","마북동","보정동","상현동","성복동","수지동","영덕동","죽전동","풍덕천동"],
          "고양 일산": ["대화동","마두동","백석동","식사동","장항동","정발산동","주엽동","탄현동","풍동","화정동"],
          "안양": ["관양동","박달동","비산동","석수동","안양동","평촌동","호계동"],
          "부천": ["괴안동","상동","소사본동","송내동","심곡동","역곡동","옥길동","원미동","중동"],
          "화성 동탄": ["남양읍","능동","동탄동","반송동","반월동","병점동","봉담읍","산척동","새솔동","오산동","청계동","향남읍"],
          "남양주": ["다산동","별내동","오남읍","와부읍","진건읍","진접읍","퇴계원읍","평내동","호평동","화도읍"],
          "김포": ["감정동","걸포동","고촌읍","구래동","마산동","사우동","양촌읍","운양동","장기동","풍무동"],
          "파주": ["교하동","금촌동","동패동","목동동","문산읍","아동동","야당동","와동동","운정동","조리읍"],
          "광명": ["광명동","소하동","일직동","철산동","하안동"],
          "하남": ["감일동","덕풍동","망월동","미사동","신장동","위례동","창우동","풍산동"],
          "의정부": ["가능동","금오동","녹양동","민락동","신곡동","용현동","의정부동","장암동","호원동"],
          "시흥": ["거모동","능곡동","대야동","배곧동","신천동","월곶동","은행동","장곡동","정왕동"],
          "평택": ["고덕동","동삭동","비전동","서정동","세교동","송탄동","안중읍","용이동","지산동","팽성읍"],
          "안산": ["고잔동","본오동","사동","선부동","성포동","와동","월피동","이동","초지동","호수동"],
          "안성": ["공도읍","금광면","대덕면","미양면","보개면","서운면","아양동","안성동","원곡면","일죽면","죽산면"],
          "양주": ["고암동","고읍동","광사동","덕계동","덕정동","백석읍","옥정동","은현면","장흥면","회천동"],
          "여주": ["가남읍","강천면","금사면","대신면","북내면","산북면","오학동","점동면","중앙동","흥천면"],
          "오산": ["가수동","갈곶동","궐동","금암동","내삼미동","누읍동","부산동","수청동","오산동","원동"],
          "이천": ["갈산동","관고동","마장면","모가면","부발읍","신둔면","안흥동","장호원읍","증포동","창전동"],
          "포천": ["가산면","군내면","내촌면","소흘읍","신북면","영북면","영중면","이동면","일동면","포천동"],
          "가평": ["가평읍","북면","상면","설악면","조종면","청평면"],
          "과천": ["갈현동","과천동","막계동","문원동","별양동","부림동","원문동","중앙동"],
          "구리": ["갈매동","교문동","동구동","수택동","아천동","인창동","토평동"],
          "군포": ["광정동","군포동","궁내동","금정동","당동","대야미동","산본동","송부동","오금동","재궁동"],
          "동두천": ["걸산동","광암동","동두천동","보산동","불현동","상봉암동","생연동","송내동","안흥동","지행동"],
          "양평": ["강상면","강하면","개군면","단월면","서종면","양동면","양서면","양평읍","옥천면","용문면","지평면","청운면"],
          "연천": ["군남면","미산면","백학면","신서면","연천읍","왕징면","장남면","전곡읍","중면","청산면"],
          "의왕": ["고천동","내손동","부곡동","삼동","오전동","왕곡동","청계동","포일동"],
          "광주": ["경안동","곤지암읍","남종면","능평동","도척면","목현동","송정동","쌍령동","오포동","초월읍","탄벌동","퇴촌면"]
        }},
        "인천": { note: "인천은 송도, 청라, 부평, 미추홀처럼 생활권 성격이 달라 예약 전 위치 확인이 필요합니다.", districts: {
          "연수 송도": ["동춘동","선학동","송도동","연수동","옥련동","청학동"],
          "부평": ["갈산동","구산동","부개동","부평동","산곡동","삼산동","십정동","일신동","청천동"],
          "남동": ["간석동","고잔동","구월동","논현동","도림동","만수동","서창동","장수동"],
          "서구": ["가정동","가좌동","검암동","경서동","당하동","마전동","석남동","심곡동","연희동","청라동"],
          "미추홀": ["관교동","도화동","문학동","숭의동","용현동","주안동","학익동"],
          "계양": ["계산동","귤현동","동양동","박촌동","병방동","서운동","용종동","작전동","효성동"]
        }}
      }
    },
    yeongnam: { label: "영남권", description: "부산, 대구 주요 생활권을 선택한 뒤 세부 지역을 확인합니다.", cities: {
      "부산": { note: "부산은 해운대와 서면처럼 생활권별 이동 시간이 달라 예약 가능 시간 확인이 중요합니다.", districts: {"해운대":["우동","중동","좌동","재송동"],"부산진":["부전동","전포동","범천동","양정동"],"수영":["광안동","남천동","민락동","망미동"]}},
      "대구": { note: "대구는 수성구, 동성로, 달서권 이용 목적이 달라 코스와 시간을 나눠 확인합니다.", districts: {"수성":["범어동","만촌동","황금동","지산동"],"중구":["동성로","삼덕동","대봉동"],"달서":["상인동","월성동","두류동","성서"]}}
    }},
    chungcheong: { label: "충청권", description: "대전, 세종 주요 생활권을 도시별로 나눠 확인합니다.", cities: {
      "대전": { note: "대전은 둔산, 유성, 관저처럼 상담 수요가 다른 생활권을 먼저 확인하면 편합니다.", districts: {"서구":["둔산동","탄방동","갈마동","관저동"],"유성":["봉명동","노은동","도룡동","전민동"],"중구":["은행동","대흥동","문화동"]}},
      "세종": { note: "세종은 신도시 생활권과 조치원권 이동 기준이 달라 위치를 먼저 알려주는 것이 좋습니다.", districts: {"신도심":["나성동","도담동","아름동","종촌동"],"조치원":["조치원읍","연서면","전의면"]}}
    }},
    honam: { label: "호남권", description: "광주, 전북 주요 지역을 도시별 생활권으로 나눠 확인합니다.", cities: {
      "광주": { note: "광주는 상무, 첨단, 수완처럼 상권과 주거권이 달라 시간 확인이 필요합니다.", districts: {"서구":["치평동","상무지구","화정동","풍암동"],"광산":["수완동","첨단","하남동","월계동"],"동구":["충장로","계림동","학동"]}},
      "전북": { note: "전북은 전주와 익산, 군산의 이동 동선이 달라 예약 전 지역을 구체적으로 확인합니다.", districts: {"전주":["효자동","서신동","중화산동","혁신도시"],"익산":["영등동","모현동","부송동"],"군산":["수송동","나운동","조촌동"]}}
    }},
    gangwonjeju: { label: "강원·제주", description: "강원과 제주는 이동 거리와 예약 시간 변동이 커서 세부 위치 확인이 특히 중요합니다.", cities: {
      "강원": { note: "강원은 영서와 영동 이동 시간이 크게 달라 도시와 생활권을 함께 확인합니다.", districts: {"춘천":["퇴계동","석사동","효자동","온의동"],"원주":["무실동","단계동","혁신도시","반곡동"],"강릉":["교동","입암동","포남동","유천동"]}},
      "제주": { note: "제주는 제주시와 서귀포 동선 차이가 커서 예약 전 위치 안내가 꼭 필요합니다.", districts: {"제주시":["연동","노형동","이도동","아라동"],"서귀포":["중문","동홍동","서귀동","성산"]}}
    }}
  };

  const tabOrder = ["capital", "yeongnam", "chungcheong", "honam", "gangwonjeju"];
  let selectedRegion = "capital";
  let selectedCity = "서울";
  let selectedDistrict = "강남";

  const normalizeDong = (dong) => encodeURIComponent(dong.replace(/\s+/g, "-").replace(/동$/, "-dong").replace(/읍$/, "-eup").replace(/면$/, "-myeon").replace(/역$/, "-station"));
  const makeAreaUrl = (city, district, dong) => `/area/${slug.city[city] || encodeURIComponent(city)}/${slug.district[district] || encodeURIComponent(district)}/${normalizeDong(dong)}/`;
  const button = (text, attrs = "", active = false) => `<button type="button" class="${active ? "is-active" : ""}" ${attrs}>${text}</button>`;

  function renderTabs() {
    regionTabs.innerHTML = tabOrder.map((key) => button(data[key].label, `data-region="${key}"`, key === selectedRegion)).join("");
  }

  function renderCities() {
    const region = data[selectedRegion];
    const cities = Object.keys(region.cities);
    if (!cities.includes(selectedCity)) selectedCity = cities[0];
    regionTitle.textContent = region.label;
    regionDescription.textContent = region.description;
    subregionList.innerHTML = cities.map((city) => button(city, `data-city="${city}"`, city === selectedCity)).join("");
    renderDistricts();
  }

  function renderDistricts() {
    const city = data[selectedRegion].cities[selectedCity];
    const districts = Object.keys(city.districts);
    if (!districts.includes(selectedDistrict)) selectedDistrict = districts[0];
    detailTitle.textContent = selectedCity;
    detailSummary.textContent = city.note;
    detailList.innerHTML = districts.map((district) => button(district, `data-district="${district}"`, district === selectedDistrict)).join("");
  }

  function renderDongs() {
    const city = data[selectedRegion].cities[selectedCity];
    const dongs = city.districts[selectedDistrict] || [];
    detailTitle.textContent = selectedDistrict;
    detailSummary.textContent = `${selectedCity} ${selectedDistrict} 세부 지역을 선택하면 해당 동 안내 페이지로 이동합니다. 예약 전에는 정확한 위치, 희망 시간, 코스 기준을 함께 확인하는 것이 좋습니다.`;
    detailList.innerHTML = dongs.map((dong) => `<a href="${makeAreaUrl(selectedCity, selectedDistrict, dong)}" aria-label="${selectedCity} ${selectedDistrict} ${dong} 지역 안내">${dong}</a>`).join("");
  }

  regionTabs.addEventListener("click", (event) => {
    const target = event.target.closest("button[data-region]");
    if (!target) return;
    selectedRegion = target.dataset.region;
    selectedCity = Object.keys(data[selectedRegion].cities)[0];
    selectedDistrict = Object.keys(data[selectedRegion].cities[selectedCity].districts)[0];
    renderTabs();
    renderCities();
  });

  subregionList.addEventListener("click", (event) => {
    const target = event.target.closest("button[data-city]");
    if (!target) return;
    selectedCity = target.dataset.city;
    selectedDistrict = Object.keys(data[selectedRegion].cities[selectedCity].districts)[0];
    renderCities();
  });

  detailList.addEventListener("click", (event) => {
    const districtButton = event.target.closest("button[data-district]");
    if (!districtButton) return;
    selectedDistrict = districtButton.dataset.district;
    renderDongs();
  });

  renderTabs();
  renderCities();
})();
