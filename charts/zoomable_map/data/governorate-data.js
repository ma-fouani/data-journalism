// Governorate Statistics and Information
// This file contains population, voters, GDP, political info, and voting history
// Update these values as needed without touching the map geometry

const governorateData = {
  "IQDA": {
    "name": "Dohuk",
    "name_ar": "دهوك",
    "population": 1320000,
    "voters": 820000,
    "gdp": 12.8,
    "political": "Northernmost governorate in Kurdistan Region. KDP dominance with some ethnic minority representation. Strong emphasis on security and stability due to proximity to Turkish and Syrian borders.",
    "votingHistory": { "2012": 71, "2016": 73, "2020": 70 }
  },
  "IQAR": {
    "name": "Erbil",
    "name_ar": "أربيل",
    "population": 1750000,
    "voters": 1100000,
    "gdp": 28.7,
    "political": "Capital of Kurdistan Region with strong Kurdish identity. Dominated by Kurdish parties, particularly KDP (Kurdistan Democratic Party). Pro-business orientation with emphasis on regional autonomy and development.",
    "votingHistory": { "2012": 72, "2016": 76, "2020": 69 }
  },
  "IQBA": {
    "name": "Basra",
    "name_ar": "البصرة",
    "population": 2750000,
    "voters": 1800000,
    "gdp": 38.5,
    "political": "Iraq's primary port city and economic hub. Known for its oil wealth and diverse population. Politics often center around resource distribution and local autonomy, with strong representation of Shia parties and tribal influences.",
    "votingHistory": { "2012": 55, "2016": 52, "2020": 45 }
  },
  "IQMU": {
    "name": "Muthanna",
    "name_ar": "المثنى",
    "population": 780000,
    "voters": 470000,
    "gdp": 6.8,
    "political": "Sparsely populated desert governorate. Predominantly Shia with strong tribal structures. Politics dominated by tribal leadership and issues of service delivery in challenging environment.",
    "votingHistory": { "2012": 56, "2016": 53, "2020": 43 }
  },
  "IQSU": {
    "name": "Sulaymaniyah",
    "name_ar": "السليمانية",
    "population": 2050000,
    "voters": 1350000,
    "gdp": 19.4,
    "political": "Part of Kurdistan Region with strong civil society and intellectual traditions. PUK (Patriotic Union of Kurdistan) stronghold with more progressive and left-leaning politics compared to other Kurdish areas.",
    "votingHistory": { "2012": 74, "2016": 71, "2020": 67 }
  },
  "IQDI": {
    "name": "Diyala",
    "name_ar": "ديالى",
    "population": 1565000,
    "voters": 960000,
    "gdp": 13.9,
    "political": "Ethnically and religiously mixed governorate bordering Iran. Politics reflect sectarian and ethnic divisions with representation from Shia, Sunni, and Kurdish parties. Agricultural economy with ongoing security challenges.",
    "votingHistory": { "2012": 59, "2016": 51, "2020": 46 }
  },
  "IQWA": {
    "name": "Wasit",
    "name_ar": "واسط",
    "population": 1340000,
    "voters": 820000,
    "gdp": 10.2,
    "political": "Agricultural governorate bordering Iran. Predominantly Shia with strong tribal structures. Politics influenced by agricultural interests and cross-border trade relationships.",
    "votingHistory": { "2012": 60, "2016": 56, "2020": 47 }
  },
  "IQMA": {
    "name": "Maysan",
    "name_ar": "ميسان",
    "population": 1070000,
    "voters": 650000,
    "gdp": 12.6,
    "political": "Oil-producing region in southern Iraq bordering Iran. Predominantly Shia with tribal influences. Politics focus on oil revenue distribution and marsh restoration projects.",
    "votingHistory": { "2012": 58, "2016": 54, "2020": 46 }
  },
  "IQAN": {
    "name": "Anbar",
    "name_ar": "الأنبار",
    "population": 1820000,
    "voters": 1100000,
    "gdp": 15.6,
    "political": "Largest governorate by area with predominantly Sunni Arab population. Politics influenced by tribal structures and Sunni political parties. Focus on reconstruction and reconciliation after years of conflict.",
    "votingHistory": { "2012": 64, "2016": 38, "2020": 43 }
  },
  "IQNA": {
    "name": "Najaf",
    "name_ar": "النجف",
    "population": 1470000,
    "voters": 910000,
    "gdp": 13.8,
    "political": "One of holiest cities in Shia Islam with influential religious seminaries. Politics closely tied to religious authorities and Shia parties. Important center for Islamic scholarship and jurisprudence.",
    "votingHistory": { "2012": 67, "2016": 63, "2020": 54 }
  },
  "IQNI": {
    "name": "Nineveh",
    "name_ar": "نينوى",
    "population": 3720000,
    "voters": 2200000,
    "gdp": 22.3,
    "political": "Ethnically and religiously diverse with Arab, Kurdish, Assyrian, and Yazidi populations. Politics reflect this diversity with representation from secular, Islamic, and ethnic minority parties. Recovering from recent conflicts.",
    "votingHistory": { "2012": 68, "2016": 42, "2020": 51 }
  },
  "IQSD": {
    "name": "Salah al-Din",
    "name_ar": "صلاح الدين",
    "population": 1510000,
    "voters": 920000,
    "gdp": 16.2,
    "political": "Home to important historical and religious sites. Mixed Sunni and Shia population with tribal influences. Politics often center on reconciliation efforts and balancing sectarian interests.",
    "votingHistory": { "2012": 61, "2016": 44, "2020": 48 }
  },
  "IQKI": {
    "name": "Kirkuk",
    "name_ar": "كركوك",
    "population": 1610000,
    "voters": 980000,
    "gdp": 24.1,
    "political": "Disputed territory with Arab, Kurdish, and Turkmen populations. Complex political situation with competing claims. Oil-rich region where politics revolve around resource control and ethnic representation.",
    "votingHistory": { "2012": 60, "2016": 54, "2020": 49 }
  },
  "IQBG": {
    "name": "Baghdad",
    "name_ar": "بغداد",
    "population": 8126755,
    "voters": 5284000,
    "gdp": 45.2,
    "political": "The capital and most populous governorate, Baghdad has a diverse political landscape with representation from various secular, religious, and ethnic parties. Historical stronghold of centrist and nationalist movements.",
    "votingHistory": { "2012": 62, "2016": 58, "2020": 48 }
  },
  "IQBB": {
    "name": "Babil",
    "name_ar": "بابل",
    "population": 2065000,
    "voters": 1280000,
    "gdp": 17.5,
    "political": "Agricultural heartland with ancient historical sites. Predominantly Shia population with tribal influences. Politics mix religious conservatism with agricultural and development interests.",
    "votingHistory": { "2012": 63, "2016": 59, "2020": 50 }
  },
  "IQQA": {
    "name": "Qadisiyyah",
    "name_ar": "القادسية",
    "population": 1320000,
    "voters": 800000,
    "gdp": 9.5,
    "political": "Agricultural region in central Iraq. Predominantly Shia with tribal influences. Named after historic battle, politics blend traditional tribal authority with religious party representation.",
    "votingHistory": { "2012": 62, "2016": 58, "2020": 49 }
  },
  "IQDQ": {
    "name": "Dhi Qar",
    "name_ar": "ذي قار",
    "population": 2080000,
    "voters": 1260000,
    "gdp": 14.7,
    "political": "Home to ancient Sumerian sites including Ur. Predominantly Shia with strong tribal presence. Known for active civil society and protest movements advocating for better services and governance.",
    "votingHistory": { "2012": 61, "2016": 57, "2020": 44 }
  },
  "IQKA": {
    "name": "Karbala",
    "name_ar": "كربلاء",
    "population": 1220000,
    "voters": 750000,
    "gdp": 11.4,
    "political": "Holy city for Shia Muslims, hosting millions of pilgrims annually. Politics heavily influenced by religious institutions and Shia political parties. Economy tied to religious tourism and associated services.",
    "votingHistory": { "2012": 65, "2016": 61, "2020": 52 }
  }
};
