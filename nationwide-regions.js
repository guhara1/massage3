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

  const data = {
    capital: {
      label: "수도권",
      description: "서울, 경기, 인천을 먼저 선택한 뒤 구·시·생활권과 세부 동까지 확인할 수 있습니다.",
      cities: {
        "서울": {
          note: "서울은 구별 이동 시간, 주차·출입 방식, 예약 가능 시간을 함께 확인하는 것이 좋습니다.",
          districts: {
            "강남": ["개포동", "논현동", "대치동", "도곡동", "삼성동", "세곡동", "수서동", "신사동", "압구정동", "역삼동", "일원동", "자곡동", "청담동"],
            "서초": ["내곡동", "반포동", "방배동", "서초동", "양재동", "우면동", "원지동", "잠원동"],
            "송파": ["가락동", "거여동", "마천동", "문정동", "방이동", "삼전동", "석촌동", "송파동", "신천동", "오금동", "잠실동", "장지동", "풍납동"],
            "마포": ["공덕동", "노고산동", "대흥동", "도화동", "동교동", "망원동", "상수동", "상암동", "서교동", "성산동", "아현동", "연남동", "합정동"],
            "영등포": ["당산동", "대림동", "도림동", "문래동", "신길동", "양평동", "여의도동", "영등포동"],
            "용산": ["남영동", "동빙고동", "동자동", "보광동", "서빙고동", "용문동", "이촌동", "이태원동", "청파동", "한강로", "한남동", "후암동"],
            "성동": ["금호동", "마장동", "사근동", "성수동", "송정동", "옥수동", "용답동", "응봉동", "행당동"],
            "광진": ["광장동", "구의동", "군자동", "능동", "자양동", "중곡동", "화양동"],
            "중구": ["광희동", "남대문로", "다산동", "명동", "신당동", "약수동", "을지로", "장충동", "회현동", "황학동"],
            "종로": ["가회동", "교남동", "무악동", "부암동", "사직동", "삼청동", "숭인동", "이화동", "종로동", "창신동", "혜화동"],
            "강서": ["가양동", "개화동", "공항동", "내발산동", "등촌동", "마곡동", "방화동", "염창동", "화곡동"],
            "관악": ["남현동", "봉천동", "신림동"],
            "동작": ["노량진동", "대방동", "동작동", "본동", "사당동", "상도동", "신대방동", "흑석동"],
            "강동": ["강일동", "고덕동", "길동", "둔촌동", "명일동", "상일동", "성내동", "암사동", "천호동"],
            "노원": ["공릉동", "상계동", "월계동", "중계동", "하계동"],
            "은평": ["갈현동", "구산동", "녹번동", "대조동", "불광동", "수색동", "신사동", "역촌동", "응암동", "증산동", "진관동"],
            "구로": ["가리봉동", "개봉동", "고척동", "구로동", "궁동", "신도림동", "오류동", "온수동", "천왕동", "항동"],
            "금천": ["가산동", "독산동", "시흥동"],
            "동대문": ["답십리동", "신설동", "용두동", "이문동", "장안동", "전농동", "제기동", "청량리동", "회기동", "휘경동"],
            "서대문": ["남가좌동", "대현동", "북가좌동", "북아현동", "연희동", "창천동", "홍은동", "홍제동"],
            "성북": ["길음동", "돈암동", "동선동", "보문동", "삼선동", "석관동", "성북동", "안암동", "월곡동", "장위동", "정릉동", "종암동"],
            "양천": ["목동", "신월동", "신정동"],
            "중랑": ["망우동", "면목동", "묵동", "상봉동", "신내동", "중화동"],
            "강북": ["미아동", "번동", "수유동", "우이동"],
            "도봉": ["도봉동", "방학동", "쌍문동", "창동"]
          }
        },
        "경기": {
          note: "경기는 도시별 이동 거리가 달라 희망 시간과 출입 조건을 함께 확인하는 흐름이 중요합니다.",
          districts: {
            "성남 분당": ["구미동", "금곡동", "백현동", "분당동", "삼평동", "서현동", "수내동", "야탑동", "운중동", "이매동", "정자동", "판교동"],
            "수원": ["권선동", "금곡동", "매탄동", "망포동", "세류동", "영통동", "우만동", "원천동", "이의동", "인계동", "정자동", "조원동", "호매실동"],
            "용인": ["구갈동", "동백동", "마북동", "보정동", "상현동", "성복동", "수지동", "영덕동", "죽전동", "풍덕천동"],
            "고양 일산": ["대화동", "마두동", "백석동", "식사동", "장항동", "정발산동", "주엽동", "탄현동", "풍동", "화정동"],
            "안양": ["관양동", "박달동", "비산동", "석수동", "안양동", "평촌동", "호계동"],
            "부천": ["상동", "소사본동", "송내동", "심곡동", "역곡동", "옥길동", "중동"],
            "화성 동탄": ["능동", "동탄동", "반송동", "반월동", "병점동", "산척동", "오산동", "청계동"]
          }
        },
        "인천": {
          note: "인천은 송도, 청라, 부평, 미추홀처럼 생활권 성격이 달라 예약 전 위치 확인이 필요합니다.",
          districts: {
            "연수 송도": ["동춘동", "선학동", "송도동", "연수동", "옥련동", "청학동"],
            "부평": ["갈산동", "구산동", "부개동", "부평동", "산곡동", "삼산동", "십정동", "일신동", "청천동"],
            "남동": ["간석동", "고잔동", "구월동", "논현동", "도림동", "만수동", "서창동", "장수동"],
            "서구": ["가정동", "가좌동", "검암동", "경서동", "당하동", "마전동", "석남동", "심곡동", "연희동", "청라동"],
            "미추홀": ["관교동", "도화동", "문학동", "숭의동", "용현동", "주안동", "학익동"],
            "계양": ["계산동", "귤현동", "동양동", "박촌동", "병방동", "서운동", "용종동", "작전동", "효성동"]
          }
        }
      }
    },
    yeongnam: {
      label: "영남권",
      description: "부산, 대구, 울산, 경남, 경북 주요 도시를 선택한 뒤 세부 생활권을 확인합니다.",
      cities: {
        "부산": { note: "부산은 해운대와 서면처럼 생활권별 이동 시간이 달라 예약 가능 시간 확인이 중요합니다.", districts: { "해운대": ["우동", "중동", "좌동", "재송동"], "부산진": ["부전동", "전포동", "범천동", "양정동"], "수영": ["광안동", "남천동", "민락동", "망미동"] } },
        "대구": { note: "대구는 수성구, 동성로, 달서권 이용 목적이 달라 코스와 시간을 나눠 확인합니다.", districts: { "수성": ["범어동", "만촌동", "황금동", "지산동"], "중구": ["동성로", "삼덕동", "대봉동"], "달서": ["상인동", "월성동", "두류동", "성서"] } }
      }
    },
    chungcheong: {
      label: "충청권",
      description: "대전, 세종, 충북, 충남의 주요 생활권을 도시별로 나눠 확인합니다.",
      cities: {
        "대전": { note: "대전은 둔산, 유성, 관저처럼 상담 수요가 다른 생활권을 먼저 확인하면 편합니다.", districts: { "서구": ["둔산동", "탄방동", "갈마동", "관저동"], "유성": ["봉명동", "노은동", "도룡동", "전민동"], "중구": ["은행동", "대흥동", "문화동"] } },
        "세종": { note: "세종은 신도시 생활권과 조치원권 이동 기준이 달라 위치를 먼저 알려주는 것이 좋습니다.", districts: { "신도심": ["나성동", "도담동", "아름동", "종촌동"], "조치원": ["조치원읍", "연서면", "전의면"] } }
      }
    },
    honam: {
      label: "호남권",
      description: "광주, 전북, 전남 주요 지역을 도시별 생활권으로 나눠 확인합니다.",
      cities: {
        "광주": { note: "광주는 상무, 첨단, 수완처럼 상권과 주거권이 달라 시간 확인이 필요합니다.", districts: { "서구": ["치평동", "상무지구", "화정동", "풍암동"], "광산": ["수완동", "첨단", "하남동", "월계동"], "동구": ["충장로", "계림동", "학동"] } },
        "전북": { note: "전북은 전주와 익산, 군산의 이동 동선이 달라 예약 전 지역을 구체적으로 확인합니다.", districts: { "전주": ["효자동", "서신동", "중화산동", "혁신도시"], "익산": ["영등동", "모현동", "부송동"], "군산": ["수송동", "나운동", "조촌동"] } }
      }
    },
    gangwonjeju: {
      label: "강원·제주",
      description: "강원과 제주는 이동 거리와 예약 시간 변동이 커서 세부 위치 확인이 특히 중요합니다.",
      cities: {
        "강원": { note: "강원은 영서와 영동 이동 시간이 크게 달라 도시와 생활권을 함께 확인합니다.", districts: { "춘천": ["퇴계동", "석사동", "효자동", "온의동"], "원주": ["무실동", "단계동", "혁신도시", "반곡동"], "강릉": ["교동", "입암동", "포남동", "유천동"] } },
        "제주": { note: "제주는 제주시와 서귀포 동선 차이가 커서 예약 전 위치 안내가 꼭 필요합니다.", districts: { "제주시": ["연동", "노형동", "이도동", "아라동"], "서귀포": ["중문", "동홍동", "서귀동", "성산"] } }
      }
    }
  };

  const tabOrder = ["capital", "yeongnam", "chungcheong", "honam", "gangwonjeju"];
  let selectedRegion = "capital";
  let selectedCity = "서울";
  let selectedDistrict = "강남";

  const makeAreaUrl = (city, district, dong) => `area.html?city=${encodeURIComponent(city)}&district=${encodeURIComponent(district)}&dong=${encodeURIComponent(dong)}`;

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
