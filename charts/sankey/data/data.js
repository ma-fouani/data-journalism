 const sankeyData = {
     nodes: [
         // 2012
         { name: "Progress Alliance 2012", category: "Shia" },
         { name: "Prosperity Front 2012", category: "Shia" },
         { name: "Faith Bloc 2012", category: "Shia" },
         { name: "Bright Future Party 2012", category: "Shia" },
         { name: "Liberty Movement 2012", category: "Sunna" },
         { name: "Unity Front 2012", category: "Sunna" },
         { name: "Kurdistan Voice 2012", category: "Kurd" },
         { name: "Christian Union 2012", category: "Christian" },
         { name: "Independent Reform 2012", category: "Non-religious" },
         // 2016
         { name: "Progress Alliance 2016", category: "Shia" },
         { name: "Prosperity Front 2016", category: "Shia" },
         { name: "Faith Bloc 2016", category: "Shia" },
         { name: "Bright Future Party 2016", category: "Shia" },
         { name: "Liberty Movement 2016", category: "Sunna" },
         { name: "Unity Front 2016", category: "Sunna" },
         { name: "Kurdistan Voice 2016", category: "Kurd" },
         { name: "Christian Union 2016", category: "Christian" },
         { name: "Independent Reform 2016", category: "Non-religious" },
         // 2020
         { name: "Progress Alliance 2020", category: "Shia" },
         { name: "Prosperity Front 2020", category: "Shia" },
         { name: "Faith Bloc 2020", category: "Shia" },
         { name: "Bright Future Party 2020", category: "Shia" },
         { name: "Liberty Movement 2020", category: "Sunna" },
         { name: "Unity Front 2020", category: "Sunna" },
         { name: "Kurdistan Voice 2020", category: "Kurd" },
         { name: "Christian Union 2020", category: "Christian" },
         { name: "Independent Reform 2020", category: "Non-religious" },
         // 2024
         { name: "Progress Alliance 2024", category: "Shia" },
         { name: "Prosperity Front 2024", category: "Shia" },
         { name: "Faith Bloc 2024", category: "Shia" },
         { name: "Bright Future Party 2024", category: "Shia" },
         { name: "Liberty Movement 2024", category: "Sunna" },
         { name: "Unity Front 2024", category: "Sunna" },
         { name: "Kurdistan Voice 2024", category: "Kurd" },
         { name: "Christian Union 2024", category: "Christian" },
         { name: "Independent Reform 2024", category: "Non-religious" }
     ],
     links: [
         // 2012 -> 2016
         { source: "Progress Alliance 2012", target: "Progress Alliance 2016", value: 35 },
         { source: "Prosperity Front 2012", target: "Progress Alliance 2016", value: 8 },  // Shia shift
         { source: "Faith Bloc 2012", target: "Prosperity Front 2016", value: 10 },       // Shia shift
         { source: "Bright Future Party 2012", target: "Faith Bloc 2016", value: 12 },   // Shia shift
         { source: "Liberty Movement 2012", target: "Liberty Movement 2016", value: 20 },
         { source: "Unity Front 2012", target: "Unity Front 2016", value: 15 },
         { source: "Christian Union 2012", target: "Liberty Movement 2016", value: 3 },   // Christian aligns with Sunna
         { source: "Independent Reform 2012", target: "Progress Alliance 2016", value: 2 }, // small gain for Shia
         { source: "Kurdistan Voice 2012", target: "Kurdistan Voice 2016", value: 22 },
         // 2016 -> 2020
         { source: "Progress Alliance 2016", target: "Progress Alliance 2020", value: 38 },
         { source: "Prosperity Front 2016", target: "Progress Alliance 2020", value: 5 },
         { source: "Faith Bloc 2016", target: "Faith Bloc 2020", value: 28 },
         { source: "Bright Future Party 2016", target: "Faith Bloc 2020", value: 8 },      // Shia shift
         { source: "Liberty Movement 2016", target: "Liberty Movement 2020", value: 18 },
         { source: "Unity Front 2016", target: "Liberty Movement 2020", value: 6 },        // Sunna shift
         { source: "Christian Union 2016", target: "Unity Front 2020", value: 3 },         // Christian aligns Sunna
         { source: "Independent Reform 2016", target: "Prosperity Front 2020", value: 4 }, // small Shia gain
         { source: "Kurdistan Voice 2016", target: "Kurdistan Voice 2020", value: 24 },
         // 2020 -> 2024
         { source: "Progress Alliance 2020", target: "Progress Alliance 2024", value: 42 },
         { source: "Prosperity Front 2020", target: "Prosperity Front 2024", value: 30 },
         { source: "Faith Bloc 2020", target: "Progress Alliance 2024", value: 5 },         // Shia shift
         { source: "Bright Future Party 2020", target: "Faith Bloc 2024", value: 10 },      // Shia shift
         { source: "Liberty Movement 2020", target: "Liberty Movement 2024", value: 20 },
         { source: "Unity Front 2020", target: "Liberty Movement 2024", value: 5 },        // Sunna shift
         { source: "Christian Union 2020", target: "Unity Front 2024", value: 3 },         // Christian aligns Sunna
         { source: "Independent Reform 2020", target: "Prosperity Front 2024", value: 4 }, // small Shia gain
         { source: "Kurdistan Voice 2020", target: "Kurdistan Voice 2024", value: 24 }
     ]
 };

// const sankeyData = {
//   nodes: [
//     // eras for U.S.
//     { name: "USA WW1", category: "USA" },
//     { name: "USA WW2", category: "USA" },
//     { name: "USA 1950s‑60s (Korea/Vietnam)", category: "USA" },
//     { name: "USA 1990s (Iraq ’90s, Somalia, Lebanon)", category: "USA" },
//     { name: "USA 2000s‑2010s (Iraq ’03, Afghanistan, Syria)", category: "USA" },

//     // eras for USSR/Russia
//     { name: "USSR/Russia WW1", category: "USSR/Russia" },
//     { name: "USSR/Russia WW2", category: "USSR/Russia" },
//     { name: "USSR/Russia 1950s‑60s (Cold War, limited wars)", category: "USSR/Russia" },
//     { name: "USSR/Russia 1990s (Chechnya, post‑Cold war)", category: "USSR/Russia" },
//     { name: "Russia 2000s‑2020s (Ukraine, recent conflicts)", category: "USSR/Russia" }
//   ],
//   links: [
//     // U.S. flows
//     { source: "USA WW1", target: "USA WW2", value: 116516 },  // U.S. military deaths WW1 ~116,516 :contentReference[oaicite:0]{index=0}
//     { source: "USA WW2", target: "USA 1950s‑60s (Korea/Vietnam)", value: 405399 }, // U.S. deaths WW2 ~405,399 :contentReference[oaicite:1]{index=1}
//     { source: "USA 1950s‑60s (Korea/Vietnam)", target: "USA 1990s (Iraq ’90s, Somalia, Lebanon)", value: (36568 + 254 + 29) },
//       // Korea ~36,568 :contentReference[oaicite:2]{index=2} + Lebanon ~254 :contentReference[oaicite:3]{index=3} + Somalia ~29 :contentReference[oaicite:4]{index=4}
//     { source: "USA 1990s (Iraq ’90s, Somalia, Lebanon)", target: "USA 2000s‑2010s (Iraq ’03, Afghanistan, Syria)", value: (3500 + 2080) },
//       // Iraq ’03 U.S. battle deaths ~3,504 :contentReference[oaicite:5]{index=5} + Afghanistan early U.S. ~1,208 :contentReference[oaicite:6]{index=6}

//     // USSR/Russia flows
//     { source: "USSR/Russia WW1", target: "USSR/Russia WW2", value: 1700000 },
//       // Russia/USSR WW1 military deaths ~1,700,000 :contentReference[oaicite:7]{index=7}
//     { source: "USSR/Russia WW2", target: "USSR/Russia 1950s‑60s (Cold War, limited wars)", value: 8668400 },
//       // USSR WW2 military deaths ~8,668,400 :contentReference[oaicite:8]{index=8}
//     { source: "USSR/Russia 1950s‑60s (Cold War, limited wars)", target: "USSR/Russia 1990s (Chechnya, post‑Cold war)", value: 14453 },
//       // Soviet‐Afghan war Soviet deaths ~14,453 :contentReference[oaicite:9]{index=9}
//     { source: "USSR/Russia 1990s (Chechnya, post‑Cold war)", target: "Russia 2000s‑2020s (Ukraine, recent conflicts)", value: 250000 },
//       // Russia recent war Ukraine deaths ~ up to ~250,000 according to CSIS etc :contentReference[oaicite:10]{index=10}
//   ]
// };
