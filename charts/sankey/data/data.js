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