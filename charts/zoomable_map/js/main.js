// State management
let selectedGovernorate = null;
let currentTransform = d3.zoomIdentity;

// D3 setup
const svg = d3.select("#zoomable_map");
const container = d3.select("#zoomable_map_container");
const g = svg.append("g");

// Get dimensions
function getDimensions() {
    const containerNode = container.node();
    return {
        width: containerNode.clientWidth,
        height: containerNode.clientHeight
    };
}

let { width, height } = getDimensions();

// Projection and path - will be fitted to Iraq bounds
const projection = d3.geoMercator();
const path = d3.geoPath().projection(projection);

// Fit projection to Iraq bounds with padding
function fitProjection() {
    const padding = 40; // pixels of padding around the map
    projection.fitExtent(
        [[padding, padding], [width - padding, height - padding]], 
        iraqGeoJSON
    );
}

fitProjection();

// Zoom behavior with adaptive scale limits
const zoom = d3.zoom()
    .scaleExtent([0.8, 8])
    .on("zoom", (event) => {
        currentTransform = event.transform;
        g.attr("transform", event.transform);
    });

svg.call(zoom);

// Render map
function renderMap() {
    g.selectAll("path")
        .data(iraqGeoJSON.features)
        .join("path")
        .attr("class", "governorate")
        .attr("d", path)
        .on("click", handleGovernorateClick);
}

// Handle governorate click
function handleGovernorateClick(event, d) {
    event.stopPropagation();
    
    // If clicking the same governorate, close the panel
    if (selectedGovernorate === d) {
        resetView();
        return;
    }
    
    // Update selection
    selectedGovernorate = d;
    
    // Update visual selection
    g.selectAll(".governorate")
        .classed("selected", governorate => governorate === d);
    
    // Zoom to bounding box
    zoomToBoundingBox(d);
    
    // Show info panel
    showInfoPanel(d);
}

// Zoom to bounding box
function zoomToBoundingBox(feature) {
    const [[x0, y0], [x1, y1]] = path.bounds(feature);
    const dx = x1 - x0;
    const dy = y1 - y0;
    const x = (x0 + x1) / 2;
    const y = (y0 + y1) / 2;
    
    // Check orientation to adjust for info panel
    const isLandscape = window.matchMedia("(min-width: 768px) and (orientation: landscape)").matches;
    
    let scale, translate;
    
    if (isLandscape) {
        // Desktop: account for right panel (50% or 600px)
        const panelWidth = Math.min(600, width * 0.5);
        const availableWidth = width - panelWidth;
        const padding = 60; // padding around the zoomed governorate
        
        // Calculate scale to fit in available space
        scale = Math.min(6, 0.85 / Math.max(dx / (availableWidth - padding * 2), dy / (height - padding * 2)));
        
        // Center the governorate in the LEFT side (available space before panel)
        const centerX = availableWidth / 2;
        const centerY = height / 2;
        
        translate = [centerX - scale * x, centerY - scale * y];
    } else {
        // Mobile: account for bottom panel (75vh) but zoom to reasonable level
        const panelHeight = height * 0.75;
        const availableHeight = height - panelHeight;
        const availableWidth = width - 80;
        
        // Use a gentler scale calculation for mobile
        scale = Math.min(4, 0.7 / Math.max(dx / width, dy / availableHeight));
        
        // Center in available top space
        const centerY = availableHeight / 2;
        translate = [width / 2 - scale * x, centerY - scale * y + 40];
    }
    
    svg.transition()
        .duration(750)
        .call(
            zoom.transform,
            d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
        );
}

// Reset view
function resetView() {
    selectedGovernorate = null;
    
    // Remove selection styling
    g.selectAll(".governorate").classed("selected", false);
    
    // Reset zoom
    svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    
    // Hide info panel
    hideInfoPanel();
}

// Show info panel
function showInfoPanel(feature) {
    const props = feature.properties;
    
    // Hide default card
    d3.select("#default-card").classed("hidden", true);
    
    // Update panel content with null safety
    d3.select("#gov-name").text(props.name || "Unknown");
    d3.select("#stat-population").text(
        props.population != null ? formatNumberShort(props.population) : "N/A"
    );
    d3.select("#stat-voters").text(
        props.voters != null ? formatNumberShort(props.voters) : "N/A"
    );
    d3.select("#stat-gdp").text(
        props.gdp != null ? `$${props.gdp.toFixed(1)}B` : "N/A"
    );
    d3.select("#political-description").text(
        props.political || "No political information available for this governorate."
    );
    
    // Render voting chart
    renderVotingChart(props.votingHistory);
    
    // Show panel
    d3.select("#info-panel").classed("hidden", false);
}

// Hide info panel
function hideInfoPanel() {
    d3.select("#info-panel").classed("hidden", true);
    d3.select("#default-card").classed("hidden", false);
}

// Format number with M/K suffixes
function formatNumberShort(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// Format number with commas (kept for reference)
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Render voting chart
function renderVotingChart(votingHistory) {
    const chartSvg = d3.select("#voting-chart");
    chartSvg.selectAll("*").remove();
    
    // Handle missing voting history data
    if (!votingHistory || Object.keys(votingHistory).length === 0) {
        chartSvg.append("text")
            .attr("x", "50%")
            .attr("y", "50%")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("class", "chart-axis-text")
            .text("No voting history data available");
        return;
    }
    
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = parseInt(chartSvg.style("width")) - margin.left - margin.right;
    const chartHeight = 150 - margin.top - margin.bottom;
    
    const g = chartSvg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Data
    const data = Object.entries(votingHistory).map(([year, percentage]) => ({
        year,
        percentage
    }));
    
    // Scales
    const x = d3.scaleBand()
        .domain(data.map(d => d.year))
        .range([0, chartWidth])
        .padding(0.3);
    
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([chartHeight, 0]);
    
    // Draw bars
    g.selectAll(".chart-bar")
        .data(data)
        .join("rect")
        .attr("class", "chart-bar")
        .attr("x", d => x(d.year))
        .attr("y", d => y(d.percentage))
        .attr("width", x.bandwidth())
        .attr("height", d => chartHeight - y(d.percentage))
        .attr("rx", 4);
    
    // Add percentage labels on bars
    g.selectAll(".bar-label")
        .data(data)
        .join("text")
        .attr("class", "chart-label")
        .attr("x", d => x(d.year) + x.bandwidth() / 2)
        .attr("y", d => y(d.percentage) - 5)
        .attr("text-anchor", "middle")
        .text(d => `${d.percentage}%`);
    
    // X axis
    g.append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("class", "chart-axis-text");
    
    g.selectAll(".domain, .tick line")
        .attr("class", "chart-axis-line");
    
    // Y axis
    g.append("g")
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`))
        .selectAll("text")
        .attr("class", "chart-axis-text");
    
    g.selectAll(".domain, .tick line")
        .attr("class", "chart-axis-line");
}

// Close button handler
d3.select("#close-btn").on("click", resetView);

// Click on map background to reset
svg.on("click", function(event) {
    if (event.target === this) {
        resetView();
    }
});

// Handle window resize
window.addEventListener("resize", () => {
    const dimensions = getDimensions();
    width = dimensions.width;
    height = dimensions.height;
    
    // Refit projection to new dimensions
    fitProjection();
    
    g.selectAll("path").attr("d", path);
    
    // Re-render voting chart if panel is open
    if (!d3.select("#info-panel").classed("hidden")) {
        const props = selectedGovernorate.properties;
        renderVotingChart(props.votingHistory);
    }
    
    // Re-zoom if a governorate is selected
    if (selectedGovernorate) {
        zoomToBoundingBox(selectedGovernorate);
    }
});

// Initialize
renderMap();