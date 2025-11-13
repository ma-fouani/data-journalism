// Color mapping for religions
const RELIGION_COLORS = {
    shia: "#85c980",
    sunni: "#8380c9",
    christian: "#c98080",
    druz: "#bc80c9",
    others: "#c8c8c8"
};

// Helper: hex to rgb
function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

// Helper: rgb to hex
function rgbToHex([r, g, b]) {
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}

// Helper: average colors
function averageColors(colors) {
    if (!colors.length) return RELIGION_COLORS.others;
    let sum = [0, 0, 0];
    colors.forEach(hex => {
        const rgb = hexToRgb(hex);
        sum[0] += rgb[0];
        sum[1] += rgb[1];
        sum[2] += rgb[2];
    });
    return rgbToHex([
        Math.round(sum[0] / colors.length),
        Math.round(sum[1] / colors.length),
        Math.round(sum[2] / colors.length)
    ]);
}

function getReligionColor(classification) {
    if (!classification) return RELIGION_COLORS.others;
    const arr = Array.isArray(classification) ? classification : [classification];
    for (const str of arr) {
        const s = str.toLowerCase();
        if (s.includes("شيعة")) return RELIGION_COLORS.shia;
        if (s.includes("سني")) return RELIGION_COLORS.sunni;
        if (s.includes("مسيحي") || s.includes("ماروني") || s.includes("كاثوليك") || s.includes("أرثوذكس")) return RELIGION_COLORS.christian;
        if (s.includes("دروز")) return RELIGION_COLORS.druz;
    }
    return RELIGION_COLORS.others;
}

// Helper: get religion key for counting
function getReligionKey(classification) {
    if (!classification) return "others";
    const arr = Array.isArray(classification) ? classification : [classification];
    for (const str of arr) {
        const s = str.toLowerCase();
        if (s.includes("شيعة")) return "shia";
        if (s.includes("سني")) return "sunni";
        if (s.includes("مسيحي") || s.includes("ماروني") || s.includes("كاثوليك") || s.includes("أرثوذكس")) return "christian";
        if (s.includes("دروز")) return "druz";
    }
    return "others";
}

function assignNodeColors(node) {
    if (node.children && node.children.length) {
        node.children.forEach(assignNodeColors);

        // Gather all leaf religions and their values under this node
        let leafReligionValues = {};
        function collectLeafReligions(n) {
            if (n.children && n.children.length) {
                n.children.forEach(collectLeafReligions);
            } else {
                const key = getReligionKey(n.classification);
                leafReligionValues[key] = (leafReligionValues[key] || 0) + (n.value || 0);
            }
        }
        node.children.forEach(collectLeafReligions);

        // Find religion with highest sum of values
        let maxSum = -Infinity, predominant = "others";
        for (const r in leafReligionValues) {
            if (leafReligionValues[r] > maxSum) {
                maxSum = leafReligionValues[r];
                predominant = r;
            }
        }
        node.color = RELIGION_COLORS[predominant] || RELIGION_COLORS.others;
    } else {
        node.color = getReligionColor(node.classification);
    }
}

// Assign colors to all nodes in rawData
assignNodeColors(rawData);
