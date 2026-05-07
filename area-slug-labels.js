(() => {
  const registry = window.MAZZANG_AREA_SLUGS;
  if (!registry) return;

  const initial = ["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"];
  const medial = ["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"];
  const finalSound = ["","k","k","ks","n","nj","nh","t","l","lk","lm","lb","ls","lt","lp","lh","m","p","ps","t","t","ng","t","t","k","t","p","t"];

  function romanize(text) {
    return Array.from(String(text || "")).map((char) => {
      const code = char.charCodeAt(0) - 44032;
      if (code < 0 || code > 11171) return char;
      const jong = code % 28;
      const jung = ((code - jong) / 28) % 21;
      const cho = Math.floor((code - jong) / 28 / 21);
      return initial[cho] + medial[jung] + finalSound[jong];
    }).join("").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
  }

  function add(label, slug) {
    const cleanLabel = String(label || "").trim();
    if (!cleanLabel) return;
    const cleanSlug = slug || registry.slugOverrides[cleanLabel] || romanize(cleanLabel);
    registry.slugOverrides[cleanLabel] = cleanSlug;
    registry.reverseSlugs[cleanSlug] = cleanLabel;
  }

  const cities = ["서울","경기","인천","부산","대구","대전","세종","광주","전북","강원","제주"];
  const districts = [
    "강남","서초","송파","마포","영등포","용산","성동","광진","중구","종로","강서","관악","동작","강동","노원","은평","구로","금천","동대문","서대문","성북","양천","중랑","강북","도봉",
    "성남 분당","분당","수원","용인","고양 일산","일산","안양","부천","화성 동탄","동탄","연수 송도","송도","부평","남동","서구","미추홀","계양",
    "해운대","부산진","수영","동래","남구","사하","수성","달서","동구","북구","유성","신도심","조치원","대덕","광산","전주","익산","군산","춘천","원주","강릉","제주시","서귀포"
  ];
  const knownDongs = [
    "개포동","논현동","대치동","도곡동","삼성동","세곡동","수서동","신사동","압구정동","역삼동","일원동","자곡동","청담동",
    "내곡동","반포동","방배동","서초동","양재동","우면동","원지동","잠원동","가락동","거여동","마천동","문정동","방이동","삼전동","석촌동","송파동","신천동","오금동","잠실동","장지동","풍납동",
    "공덕동","노고산동","대흥동","도화동","동교동","망원동","상수동","상암동","서교동","성산동","아현동","연남동","합정동","당산동","대림동","도림동","문래동","신길동","양평동","여의도동","영등포동",
    "남영동","보광동","이촌동","이태원동","청파동","한남동","후암동","금호동","마장동","성수동","옥수동","행당동","구의동","군자동","자양동","중곡동","화양동",
    "명동","신당동","약수동","을지로","종로동","창신동","혜화동","가양동","공항동","등촌동","마곡동","방화동","염창동","화곡동","봉천동","신림동",
    "노량진동","대방동","사당동","상도동","흑석동","길동","둔촌동","명일동","상일동","성내동","암사동","천호동","공릉동","상계동","월계동","중계동","하계동",
    "갈현동","녹번동","불광동","응암동","진관동","구로동","신도림동","오류동","가산동","독산동","시흥동","장안동","청량리동","회기동","홍은동","홍제동",
    "길음동","돈암동","월곡동","정릉동","목동","신월동","신정동","면목동","상봉동","수유동","창동",
    "정자동","서현동","수내동","야탑동","판교동","이매동","인계동","광교동","영통동","매탄동","권선동","죽전동","보정동","동백동","장항동","마두동","주엽동","백석동","화정동",
    "송도동","연수동","동춘동","청학동","옥련동","부평동","산곡동","삼산동","청천동","구월동","만수동","간석동","청라동","주안동","학익동","계산동","작전동","효성동",
    "우동","중동","좌동","재송동","부전동","전포동","범천동","광안동","남천동","민락동","범어동","만촌동","황금동","지산동","상인동","월성동","두류동","둔산동","탄방동","봉명동","노은동","도룡동","전민동","은행동",
    "나성동","도담동","아름동","종촌동","치평동","수완동","첨단동","하남동","효자동","서신동","퇴계동","석사동","온의동","무실동","단계동","교동","입암동","포남동","연동","노형동","이도동","아라동","중문동","동홍동","서귀동"
  ];

  [...cities, ...districts, ...knownDongs].forEach(add);
  districts.forEach((district) => {
    const base = district.split(/\s+/).pop();
    [base, district].forEach((name) => {
      add(`${name}동`);
      add(`${name}1동`);
      add(`${name}2동`);
      add(`${name}중심가`);
      add(`${name}역권`);
    });
  });

  const originalFromSlug = registry.fromSlug;
  registry.fromSlug = (slug) => {
    let value = String(slug || "").trim();
    try { value = decodeURIComponent(value); } catch {}
    if (registry.reverseSlugs[value]) return registry.reverseSlugs[value];
    const original = originalFromSlug ? originalFromSlug(value) : value;
    if (original && original !== value) return original;
    const compact = value.replace(/-/g, "");
    for (const label of Object.values(registry.reverseSlugs)) {
      if (romanize(label).replace(/-/g, "") === compact) return label;
    }
    return value;
  };
})();
