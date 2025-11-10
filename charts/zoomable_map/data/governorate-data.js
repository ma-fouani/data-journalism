// Governorate Statistics and Information
// This file contains population, voters, GDP, political info, and voting history
// Update these values as needed without touching the map geometry


const governorateData = {
  "IQAN": {
    "name": "Anbar",
    "name_ar": "الأنبار",
    "population": 1771656,
    "voters": 1027474,
    "gdp": 5.0,
    "votingHistory": { "2012": 74, "2016": 71, "2020": 67 },
    "political": "Anbar is a vast western province of Iraq, mostly inhabited by Sunni Arab tribes. It includes cities like Fallujah and Ramadi which saw heavy conflict after 2003. Agriculture is limited to the Euphrates River valley and palm groves. Security and tribal loyalties dominate local life due to its history of insurgency and its proximity to Syria.\n\nPolitically, Anbar is dominated by tribal and nationalist parties. Local lists such as Anbar is Our Identity compete with broader Sunni coalitions like Al-Wataniya. Shiite parties have virtually no presence here. Voter turnout has been moderate (often around 40-50% in recent elections) due to security concerns and political disenchantment."
  },
  "IQBA": {
    "name": "Basra",
    "name_ar": "البصرة",
    "population": 2908491,
    "voters": 5480661,
    "gdp": 70.0,
    "political": "Basra is Iraq’s southernmost province and its economic powerhouse, with a Shia Arab majority. It contains Iraq’s largest oil fields and port. The local economy revolves around petroleum exports, shipping, and related industries. Basra city has seen periodic protests over services and corruption.\n\nPolitically, Basra is dominated by Shiite coalitions. The Sadrist movement, the State of Law coalition (led by Nuri al-Maliki), and the Fatah bloc all have strong support here. Secular or Sunni parties have minimal presence. Voter turnout tends to be very high, often well above the national average, reflecting strong local mobilization."
  },
  "IQBB": {
    "name": "Babil",
    "name_ar": "بابل",
    "population": 2065042,
    "voters": 1193512,
    "gdp": 5.0,
    "political": "Babil (Babylon) is a central province south of Baghdad, predominantly Shia Arab with a small Sunni minority. It is known for its fertile farmland along the Euphrates and historic sites (ancient Babylon). The economy is based on agriculture and trade.\n\nPolitically, Babil is contested by Shiite parties. Sadrist-aligned lists typically win a plurality, followed by the State of Law coalition and allied Fatah blocs. Secular or Sunni-oriented parties play a minor role. Voter turnout is relatively high, reflecting active participation of local communities."
  },
  "IQBG": {
    "name": "Baghdad",
    "name_ar": "بغداد",
    "population": 8126755,
    "voters": 5480661,
    "gdp": 60.0,
    "votingHistory": { "2012": 74, "2016": 71, "2020": 67 },
    "political": "Baghdad governorate is the capital region and has the most diverse population. It includes Shiites, Sunnis, Kurds, and other minorities across urban districts. As the political and economic center of Iraq, it has dense infrastructure and a recovering cityscape.\n\nPolitically, Baghdad is fiercely competitive. Shiite parties (such as the Sadrists and State of Law) compete with secular and Sunni coalitions, while Kurdish parties field lists in Kurdish-majority districts. Voter turnout is moderate, typically around half of registered voters, reflecting both national mobilization and local security concerns."
  },
  "IQDA": {
    "name": "Dohuk",
    "name_ar": "دهوك",
    "population": 1292535,
    "voters": 1010445,
    "gdp": 8.0,
    "political": "Dohuk (Dahuk) is a northern province in Iraqi Kurdistan. Its population is overwhelmingly Kurdish, with small Assyrian, Yazidi, and Arab minorities. The terrain is mostly mountainous with fertile valleys. The economy is based on agriculture and cross-border trade with Turkey. It is one of Iraq’s more secure and stable provinces.\n\nPolitically, Dohuk is dominated by Kurdish parties. The Kurdistan Democratic Party (KDP) consistently wins the majority of seats. Other Kurdish parties (PUK, Gorran) and a few minority lists have presence. Election turnout is high (often above 70%), reflecting strong local engagement."
  },
  "IQDI": {
    "name": "Diyala",
    "name_ar": "ديالى",
    "population": 1637226,
    "voters": 1253036,
    "gdp": 5.0,
    "political": "Diyala is an eastern province bordering Iran, with a mixed population: Shia Arabs in the south, Sunni Arabs in the north and west, and Kurds in some districts. The terrain is mountainous in the north and fertile in river valleys. Diyala experienced intense conflict during the ISIS period, and parts of the province still deal with security and sectarian tensions.\n\nPolitically, Diyala is highly contested. Sunni-majority districts often elect Arab nationalist or Sunni lists, while Shia districts lean toward Sadrist or State of Law candidates. Kurdish parties (KDP, PUK) also compete in Kurdish areas. Turnout varies: lower in insecure zones, higher elsewhere, averaging around the national level."
  },
  "IQDQ": {
    "name": "Dhi Qar",
    "name_ar": "ذي قار",
    "population": 2095172,
    "voters": 1786330,
    "gdp": 5.0,
    "political": "Dhi Qar is a southern Shia-majority province with its capital at Nasiriyah. It is rich in ancient heritage and features marshlands. The economy is mainly agricultural and service-based. The province has struggled with infrastructure and water issues, leading to protests.\n\nPolitically, Dhi Qar is dominated by Shiite coalitions. The Sadrist alliance (Alliance Towards Reforms) and Fatah bloc have strong support. Other Shiite lists like State of Law also compete. Voting patterns are driven by local tribal affiliations and demands for reform; turnout is moderate."
  },
  "IQAR": {
    "name": "Erbil",
    "name_ar": "أربيل",
    "population": 1854778,
    "voters": 716300,
    "gdp": 20.0,
    "political": "Erbil is the capital of the Kurdistan Region and a major Kurdish city. It is a commercial and cultural center with many internally displaced persons. The economy is robust (oil, gas, trade, tourism). Kurdish is the main language of administration and culture.\n\nPolitically, Erbil is a KDP stronghold. The Kurdistan Democratic Party wins the vast majority of seats (often well over 70%). Other Kurdish parties (PUK, Gorran) and Christian/Turkman minority lists have smaller presence. Election turnout is high, reflecting engagement in the regional government."
  },
  "IQKA": {
    "name": "Karbala",
    "name_ar": "كربلاء",
    "population": 1218732,
    "voters": 1123219,
    "gdp": 5.0,
    "votingHistory": { "2012": 74, "2016": 71, "2020": 67 },
    "political": "Karbala is a central province hosting the holy city of Karbala, a major Shia pilgrimage site (Imam Hussein shrine). The population is almost entirely Shia Arab. The economy is driven by religious tourism, seminaries, and small industry. The province is conservative and stable.\n\nPolitically, Karbala is a Shia stronghold. Sadrist-aligned candidates dominate elections. Other Shiite coalitions (e.g. State of Law) also compete, but secular or Sunni parties are virtually absent. Voter turnout is very high, as the devout population mobilizes around the shrine."
  },
  "IQKI": {
    "name": "Kirkuk",
    "name_ar": "كركوك",
    "population": 1597876,
    "voters": 721416,
    "gdp": 10.0,
    "votingHistory": { "2012": 74, "2016": 71, "2020": 67 },
    "political": "Kirkuk is an oil-rich, multi-ethnic province with Kurds, Turkmen, Arabs, and Assyrians. It is a disputed territory under the constitution. The economy is heavily based on oil production. Political control is sensitive due to its resources and demographics.\n\nPolitically, Kirkuk is fragmented. Kurdish parties (mainly PUK) perform strongly in Kurdish areas. Turkmen and Arab lists compete in the city and south. Shiite parties have little support. Election results are often disputed; turnout is generally low (around one-third in 2021) due to mistrust."
  },
  "IQMA": {
    "name": "Maysan",
    "name_ar": "ميسان",
    "population": 1112673,
    "voters": 956262,
    "gdp": 3.0,
    "votingHistory": { "2012": 74, "2016": 71, "2020": 67 },
    "political": "Maysan is a southeastern Shia province on the Iranian border, with Amarah as its capital. It contains marshlands and agriculture. The economy is underdeveloped, relying on farming and cross-border trade. Tribal groups (including Marsh Arabs) play a large role.\n\nPolitically, Maysan is controlled by Shia alliances. The Sadrist coalition is very influential here (the current prime minister is from Maysan). Other Shiite groups (State of Law, Fatah) also hold seats. Voter turnout is moderate; local tribal leaders and border dynamics shape its politics."
  },
  "IQMU": {
    "name": "Muthanna",
    "name_ar": "المثنى",
    "population": 814371,
    "voters": 711585,
    "gdp": 3.0,
    "votingHistory": { "2012": 74, "2016": 71, "2020": 67 },
    "political": "Muthanna is a remote southern province, mostly desert, with its capital at Samawah. It has some oil fields, but much land is arid. The economy centers on limited agriculture (date palms) and government jobs. The population is overwhelmingly Shia Arab.\n\nPolitically, Muthanna votes almost entirely for Shiite lists. Sadrist-aligned candidates typically win the majority, followed by State of Law and Fatah allies. Independent tribal candidates can also succeed. Turnout is high (often over 60%) as tribes are mobilized by national networks."
  },
  "IQNA": {
    "name": "Najaf",
    "name_ar": "النجف",
    "population": 1471592,
    "voters": 489763,
    "gdp": 5.0,
    "votingHistory": { "2012": 74, "2016": 71, "2020": 67 },
    "political": "Najaf province surrounds the city of Najaf, one of Shia Islam\u2019s holiest sites (shrine of Imam Ali). It is predominantly Shia Arab, with an economy based on pilgrimage (hundreds of thousands visit annually), religious education, and services. The city is conservative and clerically oriented.\n\nPolitically, Najaf is a Sadrist stronghold. Muqtada al-Sadr\u2019s movement wins large majorities, and allied Shiite parties also perform well. There is virtually no support for Sunni or secular parties. Voter turnout is high, and elections are often decisive for Shiite factions."
  },
  "IQNI": {
    "name": "Nineveh",
    "name_ar": "نينوى",
    "population": 3729998,
    "voters": 895877,
    "gdp": 10.0,
    "political": "Nineveh is a northern province containing Mosul and a diverse population of Sunni Arabs, Kurds, Yazidis, Christians, Shabaks, etc. It was heavily impacted by ISIS and is rebuilding. The economy includes agriculture, some oil fields (e.g., Qayyarah), and trade.\n\nPolitically, Nineveh is very mixed. Sunni Arab lists (often led by local leaders) win seats in Mosul. Kurdish parties win in Kurdish-majority districts of the north. Minority parties (Christian, Yazidi, Shabak, etc.) claim reserved seats. Shiite parties are weak here. Turnout is moderate, reflecting ethnic and security challenges."
  },
  "IQQA": {
    "name": "Qadisiyah",
    "name_ar": "القادسية",
    "population": 1291048,
    "voters": 2039728,
    "gdp": 3.0,
    "political": "Qadisiyah (Al-Diwaniyah) is a Shia-majority province west of Baghdad. Its capital is Diwaniyah. The economy is mainly agricultural, with some industry in the city. The province is largely rural, with strong tribal networks.\n\nPolitically, Qadisiyah votes overwhelmingly for Shiite parties. The Sadrist alliance usually wins most seats, followed by other Shiite blocs and independents. There are no significant Sunni or Kurdish groups here. Voter turnout is very high (often above 65%), reflecting a mobilized rural electorate."
  },
  "IQSD": {
    "name": "Saladin",
    "name_ar": "صلاح الدين",
    "population": 1595235,
    "voters": 754425,
    "gdp": 3.0,
    "political": "Saladin is a central-northern province (capital Tikrit) with a mostly Sunni Arab population and small Kurdish communities in the northeast. It was Saddam Hussein\u2019s home region. The terrain includes the Tigris River valley and northern mountains. The economy is agricultural, with some oil (Ajeel field). It saw major conflict during the ISIS occupation.\n\nPolitically, Saladin is contested by Sunni Arab and some Kurdish lists. Tribal and nationalist coalitions (often referencing Tikriti figures) win many seats. Shiite parties are weak here. Voter turnout is moderate (around 40%), influenced by local tribal ties."
  },
  "IQSU": {
    "name": "Sulaymaniyah",
    "name_ar": "السليمانية",
    "population": 2053305,
    "voters": 868440,
    "gdp": 10.0,
    "political": "Sulaymaniyah is a mountainous Kurdish-majority province in the Kurdistan Region. The capital is Sulaymaniyah city, a cultural and educational center. The economy is relatively diversified (government, academia, small industry). The population is urban and well-educated.\n\nPolitically, Sulaymaniyah is a stronghold of the Patriotic Union of Kurdistan (PUK). The PUK wins most seats; the Kurdistan Democratic Party (KDP) and Gorran are minor players. There is no significant presence of Iraqi national parties. Voter turnout is lower (around 40% in 2021), reflecting some disillusionment with local politics."
  },
  "IQWA": {
    "name": "Wasit",
    "name_ar": "واسط",
    "population": 1378723,
    "voters": 807055,
    "gdp": 5.0,
    "political": "Wasit is an eastern province on the Iran border, with Kut as its capital. It is majority Shia Arab, with some Feyli Kurdish tribes. The economy is based on agriculture (rice, dates) along the Tigris and Diyala rivers. The province has been economically neglected, causing local grievances over water and services.\n\nPolitically, Wasit is dominated by Shiite parties. Sadrists, Fatah, and other Shiite coalitions all have support here. Independent tribal candidates can also win seats. There is minimal Sunni or Kurdish influence. Voter turnout is moderate (around 47%), reflecting broader trends in southern Shia Iraq."
  }
};



/*
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
*/