(() => {
  const regionGroups = {
    capital: ['서울', '경기', '인천'],
    yeongnam: ['부산', '대구'],
    chungcheong: ['대전'],
    honam: ['광주'],
    gangwonjeju: ['강원', '제주'],
  };

  const regionCopy = {
    capital: ['수도권', '서울, 경기, 인천의 세부 행정동을 선택해 방문 가능 지역과 예약 전 확인사항을 확인하세요.'],
    yeongnam: ['영남권', '부산과 대구 주요 생활권의 세부 행정동을 기준으로 예약 가능 지역을 확인하세요.'],
    chungcheong: ['충청권', '대전 주요 생활권과 행정동별 방문 가능 기준을 확인하세요.'],
    honam: ['호남권', '광주 주요 생활권의 행정동별 예약 기준을 확인하세요.'],
    gangwonjeju: ['강원·제주', '강원과 제주 지역의 세부 행정동 및 생활권별 안내를 확인하세요.'],
  };

  const initials = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
  const medials = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
  const finals = ['','k','k','ks','n','nj','nh','t','l','lk','lm','lb','ls','lt','lp','lh','m','p','ps','t','t','ng','t','t','k','t','p','t'];

  function romanize(text) {
    return String(text || '').split('').map((ch) => {
      const code = ch.charCodeAt(0) - 44032;
      if (code < 0 || code > 11171) return ch;
      const i = Math.floor(code / 588);
      const m = Math.floor((code % 588) / 28);
      const f = code % 28;
      return initials[i] + medials[m] + finals[f];
    }).join('').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function slugFor(label, type) {
    const slugs = window.MAZZANG_FULL_AREA_SLUGS || {};
    const table = type === 'city' ? slugs.citySlug : type === 'district' ? slugs.districtSlug : null;
    if (table && table[label]) return table[label];
    if (type === 'dong' && label.endsWith('동')) return `${romanize(label.slice(0, -1))}dong`;
    if (type === 'dong' && label.endsWith('읍')) return `${romanize(label.slice(0, -1))}eup`;
    if (type === 'dong' && label.endsWith('면')) return `${romanize(label.slice(0, -1))}myeon`;
    return romanize(label);
  }

  function areaUrl(city, district, dong) {
    return `/area/${slugFor(city, 'city')}/${slugFor(district, 'district')}/${slugFor(dong, 'dong')}/`;
  }

  function makeButton(text, className) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className || 'area-card';
    button.textContent = text;
    return button;
  }

  function makeLink(city, district, dong) {
    const link = document.createElement('a');
    link.className = 'area-card';
    link.href = areaUrl(city, district, dong);
    link.textContent = dong;
    link.setAttribute('aria-label', `${city} ${district} ${dong} 지역 안내`);
    return link;
  }

  function setActive(buttons, activeValue) {
    buttons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.value === activeValue);
    });
  }

  function init() {
    const data = window.MAZZANG_FULL_AREA_DATA;
    const root = document.querySelector('#regions');
    const tabs = root ? [...root.querySelectorAll('.region-tab')] : [];
    const title = document.querySelector('#region-title');
    const description = document.querySelector('#region-description');
    const cityList = document.querySelector('#subregion-list');
    const dongTitle = document.querySelector('#dong-title');
    const dongSummary = document.querySelector('#dong-summary');
    const dongList = document.querySelector('#dong-list');

    if (!data || !root || !cityList || !dongList || !dongTitle) {
      setTimeout(init, 150);
      return;
    }

    if (root.dataset.fullRegionSelector === 'true') return;
    root.dataset.fullRegionSelector = 'true';

    let currentRegion = 'capital';
    let currentCity = '서울';
    let currentDistrict = Object.keys(data[currentCity] || {})[0] || '';

    function renderRegion(region) {
      currentRegion = region;
      const [label, copy] = regionCopy[region] || regionCopy.capital;
      if (title) title.textContent = label;
      if (description) description.textContent = copy;
      setActive(tabs, region);
      const cities = (regionGroups[region] || []).filter((city) => data[city]);
      currentCity = cities.includes(currentCity) ? currentCity : cities[0];
      renderCities(cities);
      renderCity(currentCity);
    }

    function renderCities(cities) {
      cityList.replaceChildren(...cities.map((city) => {
        const button = makeButton(city, 'area-card');
        button.dataset.value = city;
        button.dataset.city = city;
        button.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          currentCity = city;
          renderCity(city);
        });
        return button;
      }));
    }

    function renderCity(city) {
      setActive([...cityList.querySelectorAll('button')], city);
      const districts = Object.keys(data[city] || {});
      currentDistrict = districts.includes(currentDistrict) ? currentDistrict : districts[0];
      dongTitle.textContent = `${city} 세부 지역 선택`;
      if (dongSummary) dongSummary.textContent = `${city}의 시·구를 선택하면 해당 행정동 전체가 표시됩니다.`;
      dongList.replaceChildren(...districts.map((district) => {
        const button = makeButton(district, 'area-card');
        button.dataset.value = district;
        button.dataset.district = district;
        button.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          currentDistrict = district;
          renderDistrict(city, district);
        });
        return button;
      }));
      root._mazzangRegionState = { city, district: currentDistrict };
    }

    function renderDistrict(city, district) {
      const dongs = [...new Set(data[city]?.[district] || [])].filter(Boolean);
      dongTitle.textContent = `${city} ${district} 행정동`;
      if (dongSummary) dongSummary.textContent = `${district}의 행정동 ${dongs.length}개를 모두 표시합니다.`;
      const back = makeButton('← 시·구 다시 선택', 'area-card');
      back.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        renderCity(city);
      });
      dongList.replaceChildren(back, ...dongs.map((dong) => makeLink(city, district, dong)));
      root._mazzangRegionState = { city, district };
    }

    tabs.forEach((tab) => {
      tab.dataset.value = tab.dataset.region;
      tab.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        renderRegion(tab.dataset.region || 'capital');
      });
    });

    root.addEventListener('click', (event) => {
      const link = event.target.closest('#dong-list a[href^="/area/"]');
      if (!link) return;
      link.href = link.getAttribute('href');
    }, true);

    renderRegion(currentRegion);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  setTimeout(init, 500);
  setTimeout(init, 1800);
})();
