(() => {
  const page = location.pathname.split('/').pop() || 'index.html';
  const site = 'https://mazzanng.netlify.app';
  const phone = '0508-202-4683';
  const pages = {
    'index.html': {
      title: '마짱 | 내 지역으로 오는 출장 마사지 예약 안내',
      description: '마짱은 서울, 경기, 인천, 부산 등 주요 지역의 방문 가능 여부, 코스와 요금, 예약 전 확인사항을 안내합니다. 지역과 희망 시간을 먼저 알려주시면 가능 여부를 확인합니다.',
      type: 'WebSite'
    },
    'booking.html': {
      title: '출장마사지 예약방법 | 지역·시간·코스 확인 순서 안내',
      description: '처음 문의부터 예약 확정까지 필요한 지역, 희망 시간, 코스, 방문 장소 전달 방법을 단계별로 안내합니다.',
      type: 'HowTo'
    },
    'process.html': {
      title: '출장마사지 이용순서 | 처음 고객을 위한 진행 절차 안내',
      description: '문의, 상담, 예약 확정, 방문 전 준비, 관리 진행, 종료 후 확인까지 실제 이용 흐름을 쉽게 정리했습니다.',
      type: 'HowTo'
    },
    'price.html': {
      title: '마사지 코스 및 요금 안내 | 타이·아로마·VIP 가격 기준',
      description: '타이, 아로마, VIP 코스별 요금 기준과 가격이 달라지는 이유, 예약 전 확인할 사항을 정리했습니다.',
      type: 'Service'
    },
    'coverage.html': {
      title: '방문 가능 지역 안내 | 서울·경기·인천·전국 주요 생활권',
      description: '방문 가능 지역을 주요 생활권 중심으로 정리하고, 지역별 도착 시간과 예약 전 확인 기준을 안내합니다.',
      type: 'CollectionPage'
    },
    'first.html': {
      title: '출장마사지 처음 이용 안내 | 첫 예약 전 확인사항',
      description: '처음 예약하는 고객이 궁금해하는 코스 선택, 문의 예시, 방문 전 준비사항, 주의사항을 안내합니다.',
      type: 'FAQPage'
    },
    'swedish.html': {
      title: '스웨디시 마사지 안내 | 처음 이용 전 관리 특징과 주의사항',
      description: '스웨디시 마사지의 특징, 추천 대상, 진행 방식, 예약 전 확인사항과 주의사항을 정리했습니다.',
      type: 'Service'
    },
    'thai.html': {
      title: '타이마사지 안내 | 전신 피로 완화와 스트레칭 관리 설명',
      description: '타이마사지를 처음 이용하는 분도 이해하기 쉽도록 관리 특징, 추천 대상, 진행 방식, 예약 전 확인사항을 정리했습니다.',
      type: 'Service'
    },
    'aroma.html': {
      title: '아로마 마사지 안내 | 오일 선택과 예약 전 주의사항',
      description: '아로마 마사지의 관리 방식, 오일 선택 기준, 피부 상태별 주의사항, 예약 전 확인할 내용을 안내합니다.',
      type: 'Service'
    },
    'sports.html': {
      title: '스포츠 마사지 안내 | 피로 관리와 예약 전 체크사항',
      description: '스포츠 마사지의 특징, 필요한 상황, 코스 선택 기준, 이용 전 주의사항을 과장 표현 없이 정리했습니다.',
      type: 'Service'
    },
    'reviews.html': {
      title: '고객 후기 | 지역별 이용 경험과 예약 전 참고사항',
      description: '마짱 이용 고객 후기를 별점, 지역, 이용 상황별로 정리했습니다. 예약 전 상담, 가격, 코스 만족도를 확인하세요.',
      type: 'ReviewPage'
    },
    'info.html': {
      title: '지역 정보 | 이용 전 확인하면 좋은 생활권별 예약 기준',
      description: '지역별 검색 의도와 생활권 특성, 예약 전 확인하면 좋은 기준을 정리한 정보 페이지입니다.',
      type: 'CollectionPage'
    },
    'notice.html': {
      title: '공지사항 | 운영시간·예약 변경·방문 가능 기준 안내',
      description: '마짱 운영시간, 예약 변경 및 취소, 방문 가능 지역 확인 기준, 안전 이용 안내를 공지합니다.',
      type: 'WebPage'
    },
    'policy.html': {
      title: '운영정책 | 예약 기준·변경·취소·안전 이용 안내',
      description: '예약 확정 기준, 변경 및 취소, 요금 안내, 안전 이용 기준과 개인정보 처리 관련 안내를 정리했습니다.',
      type: 'WebPage'
    },
    'checklist.html': {
      title: '예약 전 확인사항 | 가격·시간·주소·코스 체크리스트',
      description: '예약 전 확인해야 할 가격, 시간, 방문 주소, 출입 방식, 코스, 변경 기준을 체크리스트로 정리했습니다.',
      type: 'Checklist'
    }
  };
  const meta = pages[page] || null;
  if (meta) {
    document.title = meta.title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) { description = document.createElement('meta'); description.name = 'description'; document.head.appendChild(description); }
    description.content = meta.description;
  }
  function upsertLink(rel, href) {
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) { link = document.createElement('link'); link.rel = rel; document.head.appendChild(link); }
    link.href = href;
  }
  function upsertMeta(property, content) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag); }
    tag.content = content;
  }
  const canonicalPath = page === 'index.html' ? '/' : `/${page}`;
  const canonical = `${site}${canonicalPath}`;
  upsertLink('canonical', canonical);
  if (meta) {
    upsertMeta('og:title', meta.title);
    upsertMeta('og:description', meta.description);
    upsertMeta('og:url', canonical);
    upsertMeta('og:site_name', '마짱');
    upsertMeta('og:type', 'website');
  }
  if (!document.getElementById('ma-org-schema')) {
    const schema = document.createElement('script');
    schema.id = 'ma-org-schema';
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: '마짱',
      url: site,
      telephone: phone,
      address: { '@type': 'PostalAddress', addressCountry: 'KR', addressLocality: '서울', streetAddress: '서울시 강남구 테헤란로 313', postalCode: '06151' },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '16:00', closes: '08:00' }]
    });
    document.head.appendChild(schema);
  }
  const main = document.querySelector('main');
  if (main && !document.querySelector('.ma-eeat-tail') && ['booking.html','process.html','price.html','coverage.html','first.html','checklist.html'].includes(page)) {
    const section = document.createElement('section');
    section.className = 'section ma-eeat-tail';
    section.innerHTML = `<div class="section-heading"><p class="eyebrow">Trust guide</p><h2>예약 전 신뢰 기준</h2><p>마짱은 지역, 시간, 코스, 최종 요금, 변경 기준을 예약 전에 확인하는 흐름을 권장합니다. 가능 여부가 모호한 경우 바로 확정하지 않고 상담 과정에서 실제 이동 조건과 방문 기준을 함께 확인합니다.</p></div><div class="principles"><p>지역명만으로 가능 여부를 단정하지 않습니다. 세부 동, 건물 출입 방식, 주차 가능 여부, 희망 시간까지 확인해야 정확한 안내가 가능합니다.</p><p>건강 상태가 좋지 않거나 강한 압이 부담스러운 경우에는 예약 전 미리 알려주세요. 무리한 진행보다 컨디션에 맞는 코스 선택이 중요합니다.</p></div>`;
    main.appendChild(section);
  }
})();
