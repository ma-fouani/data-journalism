// Node.js script to merge GeoJSON with governorate data
const fs = require('fs');

// Read the raw GeoJSON
const rawGeoJSON = JSON.parse(fs.readFileSync('iraq_raw.json', 'utf8'));

// Governorate data
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

const governorateData = {
    "IQBG": {
        "name": "Baghdad",
        "name_ar": "بغداد",
        "population": 8780422,
        "voters": null,
        "gdp": null,
        "political": "As the capital and largest governorate, Baghdad is the centre of Iraq's political and administrative power. It hosts the national government, key ministries and major party offices. It is ethnically and religiously diverse, with Shi’a, Sunni and Kurdish populations, and has been the site of protests and political upheaval in recent years including the 2019 Tishreen movement. The security situation is comparatively better than some provinces but remains challenged by militia influence, corruption and service delivery problems.\nElection turnout has been low in Baghdad, reflecting disenchantment with politics and a competitive but fragmented party system. Major parties – both Shi’a and Sunni – vie for influence, but independents and reform‑lists have struggled to break through the dominance of old blocs.",
        "votingHistory": {
            "2018": 44.52,
            "2021": 31.0,
            "2023": 19.0
        }
    },
    "IQDO": {
        "name": "Dohuk",
        "name_ar": "دهوك",
        "population": 1772367,
        "voters": null,
        "gdp": null,
        "political": "Located in the semi‑autonomous Kurdistan Region, Dohuk is largely Kurdish and governed by the Kurdistan Democratic Party (KDP) stronghold. The KDP dominates local politics, with relatively stable security and infrastructure compared to many other Iraqi provinces. It also houses many internally‑displaced persons and refugees due to its border with Turkey and Syria.\nElection participation in Dohuk has been among the highest in Iraq – for example 54% turnout in the 2021 parliamentary elections, showing stronger civic engagement compared to national averages. The local political landscape is more monolithic than in mixed provinces, although tensions with Baghdad over autonomy and revenue sharing remain significant.",
        "votingHistory": {
            "2021": 54.0
        }
    },
    "IQSD": {
        "name": "Salah al‑Din",
        "name_ar": "صلاح الدين",
        "population": 1600000,
        "voters": null,
        "gdp": null,
        "political": "Salah al‑Din is a mixed province (Arab Sunni majority with minorities) with a history of insurgency, inter‑communal tensions and influence from tribal, Ba’athist and militia actors. It includes strategic cities such as Tikrit and Samarra. The governance environment remains fragile, and reconstruction remains incomplete after conflict with Islamic State of Iraq and the Levant (ISIL) and subsequent security operations.\nPolitically, the province has seen competition between Sunni‑Arab tribal networks, former regime loyalists, and emerging reform‑oriented lists. Turnout in recent parliamentary elections has been higher than average in Iraq, reflecting local dynamics and mobilization around security and identity issues.",
        "votingHistory": {
            "2021": 48.0
        }
    },
    "IQBA": {
        "name": "Basra",
        "name_ar": "البصرة",
        "population": 3223158,
        "voters": null,
        "gdp": null,
        "political": "Basra sits in southern Iraq and is Iraq’s oil‑rich maritime gateway, which gives it significant economic importance. Shi’a Arab dominance is strong here, with major parties tied to national Shi’a blocs and local patronage networks. However, the province also suffers from poor public services, environmental degradation (especially from oil operations), and recurring protests demanding reform and accountability.\nIn elections, Basra has shown middling turnout, and local politics are influenced by a mix of national party competition, local coalitions and independent movements arising from protest politics (for example the 2018/19 Tishreen wave). The interplay between oil wealth, provincial autonomy and central government oversight makes Basra a pivotal arena in Iraqi national politics.",
        "votingHistory": {
            "2018": 44.52,
            "2021": 40.0
        }
    },
    "IQDY": {
        "name": "Diyala",
        "name_ar": "ديالى",
        "population": 1700000,
        "voters": null,
        "gdp": null,
        "political": "Diyala is an ethnically and religiously mixed governorate (Sunni Arab, Shi’a Arab, Kurdish, Turkmen) east of Baghdad and shares a border with Iran. It has been a site of insurgency, sectarian violence and contested territorial control (especially in the Khanaqin area). Security remains a challenge, and governance is fragmented among multiple community actors and political parties.\nPolitically, Diyala features competition among Sunni Arab tribal networks, Kurdish parties, Shi’a blocs, and local independent lists. Voter turnout has often been modest; for example, around 40% in the December 2023 provincial elections, signalling both security concerns and public disengagement from politics in the region.",
        "votingHistory": {
            "2023": 40.0
        }
    }
}


// Merge data
rawGeoJSON.features = rawGeoJSON.features.map(feature => {
    const id = feature.properties.id;
    const data = governorateData[id];

    if (data) {
        feature.properties = {
            ...feature.properties,
            ...data
        };
    }

    return feature;
});

// Output as JavaScript file
const output = `// Iraq Governorates GeoJSON data with actual geometries
// Source: https://simplemaps.com
const iraqGeoJSON = ${JSON.stringify(rawGeoJSON, null, 2)};

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = iraqGeoJSON;
}`;

fs.writeFileSync('data.js', output, 'utf8');
console.log('✅ data.js created successfully with', rawGeoJSON.features.length, 'governorates');
