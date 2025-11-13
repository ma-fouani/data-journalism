const width = 1200;
const height = 800;

const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, rawData.children.length + 1));

const hierarchy = d3.hierarchy(rawData)
    .sum(d => d.value)
    .sort((a, b) => b.height - a.height || b.value - a.value);

const root = d3.partition()
    .size([height, width])
    (hierarchy);

const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%; height: auto;");

// Append cells with clip paths
const cell = svg
    .selectAll("g")
    .data(root.descendants())
    .join("g")
    .attr("transform", d => `translate(${d.y0},${d.x0})`);

// Add clip path for each cell
cell.append("clipPath")
    .attr("id", (d, i) => `clip-${i}`)
    .append("rect")
    .attr("width", d => Math.max(0, d.y1 - d.y0)) // removed - 1
    .attr("height", d => d.x1 - d.x0);

const rect = cell.append("rect")
    .attr("width", d => Math.max(0, d.y1 - d.y0)) // removed - 1
    .attr("height", d => d.x1 - d.x0)
    .attr("fill-opacity", 0.8) // set initial opacity
    .attr("fill", d => {
        if (!d.parent) {
            return d3.color(d.data.color).darker(0.1).formatHex();
        }
        if (d.depth === 1) {
            return d.data.color;
        }
        return d3.color(d.data.color).brighter(0.1).formatHex();
    })
    .style("cursor", "pointer")
    .on("click", clicked);

function getFontSize(height) {
    const minSize = 10;
    const maxSize = 48; // reduce max for Noto Kufi Arabic
    const size = Math.min(maxSize, Math.max(minSize, height * 0.15)); // reduce scaling factor
    return size;
}

function getTextOpacity(height) {
    if (height < 20) {
        return height / 20;
    }
    return 1;
}

// Function to wrap text into multiple lines
function wrapText(text, maxWidth, fontSize) {
    const words = text.split(/\s+/);
    const lines = [];
    let currentLine = words[0] || '';

    // Use Noto Kufi Arabic for measurement
    const tempText = svg.append("text")
        .attr("font-size", fontSize)
        .attr("font-weight", "500")
        .attr("font-family", "'Noto Kufi Arabic', sans-serif")
        .style("visibility", "hidden");

    for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + " " + words[i];
        tempText.text(testLine);
        const testWidth = tempText.node().getComputedTextLength();

        if (testWidth > maxWidth - 4 && currentLine.length > 0) { // add small padding
            lines.push(currentLine);
            currentLine = words[i];
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) {
        lines.push(currentLine);
    }
    tempText.remove();

    return lines;
}

// Format numbers with K/M suffixes
function formatValue(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return value.toString();
}

const format = d3.format(",d");

// Apply clip path to text groups
const text = cell.append("text")
    .attr("clip-path", (d, i) => `url(#clip-${i})`)
    .style("user-select", "none")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .attr("fill", "#fff")
    .attr("font-weight", "500")
    .attr("fill-opacity", d => getTextOpacity(d.x1 - d.x0))
    .classed("hide-text", d => (d.x1 - d.x0) < 20)
    .attr("direction", "rtl"); // RTL alignment for all text

// Add wrapped text for each cell
text.each(function (d) {
    const textElement = d3.select(this);
    const width = d.y1 - d.y0 - 10; // subtract padding
    const height = d.x1 - d.x0;
    const fontSize = getFontSize(height);
    const lines = wrapText(d.data.name, width, fontSize);

    const centerX = (d.y1 - d.y0) / 2;
    const lineHeight = fontSize * 1.1;
    const totalTextHeight = lines.length * lineHeight + lineHeight * 0.35;
    const startY = (height - totalTextHeight) / 2 + lineHeight / 2;

    textElement.selectAll("tspan").remove();

    if (height < 60) {
        // Title and value on same line
        const label = lines.join(" ") + "  " + formatValue(d.value);
        textElement.append("tspan")
            .attr("x", centerX)
            .attr("y", height / 2)
            .attr("font-size", `${fontSize}px`)
            .attr("direction", "rtl") // RTL for tspan
            .text(label);
    } else {
        // Add each line as a tspan
        lines.forEach((line, i) => {
            textElement.append("tspan")
                .attr("x", centerX)
                .attr("y", startY + (i * lineHeight))
                .attr("font-size", `${fontSize}px`)
                .attr("direction", "rtl") // RTL for tspan
                .text(line);
        });

        // Add value below the name (50% smaller)
        textElement.append("tspan")
            .attr("x", centerX)
            .attr("y", startY + (lines.length * lineHeight) - (lineHeight * 0.3))
            .attr("dy", "0.05em") // less padding between title and value
            .attr("fill-opacity", 0.8)
            .attr("font-size", `${fontSize * 0.5}px`)
            .attr("direction", "rtl") // RTL for tspan
            .text(formatValue(d.value));
    }
});

cell.append("title")
    .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

let focus = root;

function clicked(event, p) {
    focus = focus === p ? p = p.parent : p;

    // Calculate targets for ALL descendants first
    root.each(d => d.target = {
        x0: (d.x0 - p.x0) / (p.x1 - p.x0) * height,
        x1: (d.x1 - p.x0) / (p.x1 - p.x0) * height,
        y0: d.y0 - p.y0,
        y1: d.y1 - p.y0
    });

    const transition = svg.transition().duration(750);

    cell.transition(transition)
        .attr("transform", d => `translate(${d.target.y0},${d.target.x0})`);

    // Animate clip path rectangles
    cell.select("clipPath rect")
        .transition(transition)
        .attr("width", d => Math.max(0, d.target.y1 - d.target.y0)) // removed - 1
        .attr("height", d => Math.max(0, d.target.x1 - d.target.x0));

    rect.transition(transition)
        .attr("width", d => Math.max(0, d.target.y1 - d.target.y0)) // removed - 1
        .attr("height", d => Math.max(0, d.target.x1 - d.target.x0))
        .attr("fill-opacity", 0.8);

    // Update text - targets are already calculated
    text.transition(transition)
        .attr("fill-opacity", d => getTextOpacity(d.target.x1 - d.target.x0))
        .each(function (d) {
            const targetHeight = d.target.x1 - d.target.x0;
            const targetWidth = d.target.y1 - d.target.y0 - 10;
            const fontSize = getFontSize(targetHeight);

            d3.select(this).classed("hide-text", targetHeight < 20);

            const lines = wrapText(d.data.name, targetWidth, fontSize);
            const centerX = (d.target.y1 - d.target.y0) / 2;
            const lineHeight = fontSize * 1.1;
            const totalTextHeight = lines.length * lineHeight + lineHeight * 0.35;
            const startY = (targetHeight - totalTextHeight) / 2 + lineHeight / 2;

            const textElement = d3.select(this);
            textElement.selectAll("tspan").remove();

            if (targetHeight < 60) {
                // Title and value on same line
                const label = lines.join(" ") + "  " + formatValue(d.value);
                textElement.append("tspan")
                    .attr("x", centerX)
                    .attr("y", targetHeight / 2)
                    .attr("font-size", `${fontSize}px`)
                    .attr("direction", "rtl") // RTL for tspan
                    .text(label);
            } else {
                // Update existing tspans for name lines
                lines.forEach((line, i) => {
                    textElement.append("tspan")
                        .attr("x", centerX)
                        .attr("y", startY + (i * lineHeight))
                        .attr("font-size", `${fontSize}px`)
                        .attr("direction", "rtl") // RTL for tspan
                        .text(line);
                });

                // Add value tspan (last one)
                textElement.append("tspan")
                    .attr("x", centerX)
                    .attr("y", startY + (lines.length * lineHeight) - (lineHeight * 0.3))
                    .attr("dy", "0.05em")
                    .attr("font-size", `${fontSize * 0.5}px`)
                    .attr("direction", "rtl") // RTL for tspan
                    .text(formatValue(d.value));
            }
        });

    // Show/hide details div based on focus
    if (focus === p) {
        showDetailsDiv(p);
    } else {
        removeDetailsDiv();
    }

    // Update legend percentages for current focus
    updateLegendPercentages(p);
}

// Update legend percentages based on current focus
function updateLegendPercentages(node) {
    let counts = { shia: 0, sunni: 0, christian: 0, druz: 0, others: 0 };
    let total = 0;
    function collect(n) {
        if (n.children && n.children.length) {
            n.children.forEach(collect);
        } else {
            const key = getReligionKey(n.data?.classification ?? n.classification);
            counts[key] = (counts[key] || 0) + (n.value || n.data?.value || 0);
            total += (n.value || n.data?.value || 0);
        }
    }
    node.leaves ? node.leaves().forEach(collect) : collect(node);

    Object.entries(counts).forEach(([key, val]) => {
        const percent = total ? Math.round(val / total * 100) : 0;
        const el = document.getElementById(`legend-percent-${key}`);
        const item = el?.parentElement;
        if (el) el.textContent = percent + "%";
        if (item) item.style.display = percent === 0 ? "none" : "";
    });
}

// Search function to find and zoom to leaf nodes
function searchAndZoom(query) {
    if (!query) {
        // Reset to root if query is empty
        clicked(null, root);
        return;
    }

    // Find all leaf nodes (candidates)
    const leaves = root.leaves();
    const queryLower = query.toLowerCase();

    // Search for matching candidate (third level)
    let match = leaves.find(d =>
        d.data.name.toLowerCase().includes(queryLower)
    );

    // If not found, search for matching party (second level)
    if (!match) {
        const parties = root.descendants().filter(d =>
            d.depth === 1 && d.data.name && d.data.name.toLowerCase().includes(queryLower)
        );
        if (parties.length > 0) {
            match = parties[0];
        }
    }

    if (match) {
        // Zoom to the matched node
        clicked(null, match);
    } else {
        // Show alert if no match found
        alert('لم يتم العثور على مرشح أو حزب بهذا الاسم');
    }
}

// Expose search function to global scope
searchFunction = searchAndZoom;

document.getElementById('chart-container').appendChild(svg.node());

// Search functionality - initialize after chart is created
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const searchContainer = document.querySelector('.search-container');

// Show/hide buttons and animate input based on input value
searchInput.addEventListener('input', (e) => {
    const hasValue = e.target.value.trim().length > 0;
    searchBtn.classList.toggle('hidden', !hasValue);
    clearBtn.classList.toggle('hidden', !hasValue);
    if (searchContainer) {
        searchContainer.classList.toggle('has-value', hasValue);
    }
});

// Search on button click
searchBtn.addEventListener('click', () => {
    if (searchFunction) {
        searchFunction(searchInput.value.trim());
    }
});

// Search on Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim().length > 0) {
        if (searchFunction) {
            searchFunction(searchInput.value.trim());
        }
    }
});

// Clear search
clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchBtn.classList.add('hidden');
    clearBtn.classList.add('hidden');
    if (searchFunction) {
        searchFunction(''); // Reset to root view
    }
});

// Initial legend percentages for root
updateLegendPercentages(root);