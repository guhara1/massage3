(() => {
  if (!document.querySelector("#regions") || typeof regionData === "undefined" || typeof renderRegion !== "function") return;

  const nationwideData = {
    capital: {
      title: "수도권",
      description: "서울, 경기, 인천 주요 생활권을 중심으로 당일 예약 가능 시간과 이동 동선을 확인합니다.",
      areas: {
        "서울 핵심권": ["강남", "서초", "송파", "마포", "영등포", "용산", "성동", "광진"],
        "서울 북부권": ["종로", "중구", "성북", "노원", "은평", "강북", "도봉", "동대문"],
        "서울 서남권": ["강서", "관악", "동작", "구로", "금천", "양천", "서대문", "중랑"],
        "경기 남부": ["수원", "성남 분당", "용인", "화성 동탄", "안양", "군포", "의왕", "평택"],
        "경기 북서부": ["고양 일산", "김포", "파주", "부천", "광명", "의정부", "남양주", "구리"],
        "인천권": ["연수 송도", "부평", "남동", "서구 청라", "미추홀", "계양", "중구", "동구"]
      }
    },
    yeongnam: {
      title: "영남권",
      description: "부산, 대구, 울산, 경남, 경북 주요 도시를 권역별로 나눠 방문 가능 여부를 확인합니다.",
      areas: {
        "부산": ["해운대", "수영", "부산진", "동래", "남구", "연제", "사하", "기장"],
        "대구": ["수성", "중구", "동성로", "달서", "북구", "동구", "서구", "달성"],
        "울산": ["남구", "중구", "동구", "북구", "울주"],
        "경남": ["창원", "김해", "양산", "진주", "거제", "통영", "사천", "밀양"],
        "경북": ["포항", "경주", "구미", "안동", "김천", "영주", "경산", "칠곡"]
      }
    },
    chungcheong: {
      title: "충청권",
      description: "대전, 세종, 충북, 충남 주요 도시의 예약 가능 시간과 이동 거리 기준을 확인합니다.",
      areas: {
        "대전": ["둔산", "유성", "서구", "중구", "동구", "대덕", "노은", "관저"],
        "세종": ["나성", "도담", "아름", "종촌", "어진", "고운", "조치원", "새롬"],
        "충북": ["청주", "충주", "제천", "진천", "음성", "오송", "오창", "증평"],
        "충남": ["천안", "아산", "당진", "서산", "공주", "논산", "보령", "홍성"]
      }
    },
    honam: {
      title: "호남권",
      description: "광주, 전북, 전남 주요 생활권을 중심으로 지역별 방문 가능 범위를 안내합니다.",
      areas: {
        "광주": ["상무", "첨단", "수완", "충장로", "동구", "서구", "북구", "광산"],
        "전북": ["전주", "익산", "군산", "완주", "정읍", "남원", "김제", "부안"],
        "전남": ["목포", "여수", "순천", "광양", "나주", "무안", "화순", "담양"]
      }
    },
    gangwonjeju: {
      title: "강원·제주",
      description: "강원 주요 도시와 제주 생활권은 이동 거리와 예약 시간 확인이 특히 중요합니다.",
      areas: {
        "강원 영서": ["춘천", "원주", "홍천", "횡성", "평창", "영월"],
        "강원 영동": ["강릉", "속초", "동해", "삼척", "양양", "고성"],
        "제주": ["제주시", "노형", "연동", "아라", "이도", "서귀포", "중문", "성산"]
      }
    }
  };

  Object.keys(regionData).forEach((key) => delete regionData[key]);
  Object.assign(regionData, nationwideData);

  const tabsWrap = document.querySelector(".region-tabs");
  if (tabsWrap) {
    tabsWrap.innerHTML = [
      ["capital", "수도권"],
      ["yeongnam", "영남권"],
      ["chungcheong", "충청권"],
      ["honam", "호남권"],
      ["gangwonjeju", "강원·제주"]
    ].map(([key, label], index) => `<button class="region-tab ${index === 0 ? "is-active" : ""}" type="button" data-region="${key}">${label}</button>`).join("");
  }

  const cleanLabels = () => {
    document.querySelectorAll("#region-title, #dong-title, #subregion-list button, #dong-list a").forEach((item) => {
      item.textContent = item.textContent.replace(/\s*출장마사지/g, "").trim();
    });
  };

  const setActive = (regionKey) => {
    document.querySelectorAll(".region-tab").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.region === regionKey);
    });
  };

  document.querySelectorAll(".region-tab").forEach((button) => {
    button.addEventListener("click", () => {
      renderRegion(button.dataset.region);
      setActive(button.dataset.region);
      cleanLabels();
    });
  });

  renderRegion("capital", "서울 핵심권");
  setActive("capital");
  cleanLabels();
})();
