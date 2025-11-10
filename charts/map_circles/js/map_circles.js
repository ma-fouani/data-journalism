const mapContainer = document.getElementById('map-container');
const casualties_w = mapContainer.clientWidth;
const casualties_h = mapContainer.clientHeight;
let tip_horizantal_adjust = 125;
const casualties_svg = d3.select("#map-container")
    .append("svg")
    .attr("width", casualties_w)
    .attr("height", casualties_h);

const casualties_projection = d3.geoMercator()
    .center([35.8, 33.9])
    .scale(13000)
    .translate([casualties_w / 2, casualties_h / 2]);

const casualties_path = d3.geoPath().projection(casualties_projection);

const colorScale = {
    "pager": "#a55951ff",
    "walkie-talkie": "#917b57ff",
    "both": "#557f9bff"
};

const radiusScale = d3.scaleSqrt()
    .domain([0, d3.max(incidentData, d => d.casualties)])
    .range([5, 50]);

casualties_svg.selectAll(".lebanon-region")
    .data(lebanonGeoJSON.features)
    .enter().append("path")
    .attr("class", "lebanon-region")
    .attr("d", casualties_path);

// Add incident circles
const circles = casualties_svg.selectAll(".incident-circle")
    .data(incidentData)
    .enter().append("circle")
    .attr("class", "incident-circle")
    .attr("cx", d => casualties_projection(d.coords)[0])
    .attr("cy", d => casualties_projection(d.coords)[1])
    .attr("r", 0)
    .attr("fill", d => colorScale[d.type])
    .attr("opacity", 0.7)
    .attr("stroke", "#fff")
    .attr("stroke-width", 2);

// Animate circles appearing
circles.transition()
    .duration(1000)
    .delay((d, i) => i * 100)
    .attr("r", d => radiusScale(d.casualties * 0.2));

// Add city labels
casualties_svg.selectAll(".city-label")
    .data(incidentData)
    .enter().append("text")
    .attr("class", "city-label")
    .attr("x", d => casualties_projection(d.coords)[0])
    .attr("y", d => casualties_projection(d.coords)[1] + radiusScale(d.casualties) + 15)
    .attr("text-anchor", "middle")
    .text(d => d.location)
    .style("opacity", 0)
    .transition()
    .duration(1000)
    .delay((d, i) => i * 100 + 500)
    .style("opacity", 1);

// Tooltip functionality
const tooltip = d3.select("#tooltip");

circles.on("mouseover", function (event, d) {
    d3.select(this)
        .attr("stroke-width", 4)
        .attr("opacity", 0.9);

    tooltip.select(".tooltip-title").text(d.location);
    tooltip.select(".tooltip-content").html(`
                <div class="tooltip-detail"><strong>Date:</strong> ${d.date}</div>
                <div class="tooltip-detail"><strong>Total Casualties:</strong> ${d.casualties}</div>
                <div class="tooltip-detail"><strong>Deaths:</strong> ${d.deaths}</div>
                <div class="tooltip-detail"><strong>Injured:</strong> ${d.injured}</div>
                <div class="tooltip-detail"><strong>Type:</strong> ${d.type === 'both' ? 'Pager & Walkie-Talkie' : d.type.charAt(0).toUpperCase() + d.type.slice(1)}</div>
                <div class="tooltip-detail" style="margin-top: 8px; font-style: italic;">${d.description}</div>
            `);

    tooltip.classed("visible", true);
})
    .on("mousemove", function (event) {
        //tooltip.style("left", tip_horizantal_adjust + "px");
    })
    .on("mouseout", function () {
        d3.select(this)
            .attr("stroke-width", 2)
            .attr("opacity", 0.7);
        tooltip.classed("visible", false);
    });

// Responsive resize
let casualties_resizeTimeout;
window.addEventListener('resize', function () {
    clearTimeout(casualties_resizeTimeout);
    casualties_resizeTimeout = setTimeout(() => {
        const newWidth = mapContainer.clientWidth;
        const newHeight = mapContainer.clientHeight;

        casualties_svg.attr("width", newWidth).attr("height", newHeight);
        casualties_projection.translate([newWidth / 2, newHeight / 2]);

        // Update all elements
        casualties_svg.selectAll(".lebanon-region").attr("d", casualties_path);
        circles
            .attr("cx", d => casualties_projection(d.coords)[0])
            .attr("cy", d => casualties_projection(d.coords)[1]);
        casualties_svg.selectAll(".city-label")
            .attr("x", d => casualties_projection(d.coords)[0])
            .attr("y", d => casualties_projection(d.coords)[1] + radiusScale(d.casualties));
    }, 100);
});