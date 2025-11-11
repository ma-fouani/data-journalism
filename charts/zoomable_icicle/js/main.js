const width = 1160;
const height = 800;

// Create scales for zooming
const xScale = d3.scaleLinear().range([0, width]);
const yScale = d3.scaleLinear().range([0, height]);

// Color scale based on hierarchy depth - Pure blue gradient
const colorScale = d3.scaleOrdinal()
    .domain(["Shia", "Sunni", "Minorities"])
    .range(["#1e3a8a", "#3b82f6", "#60a5fa"]);

// Format number with commas
const format = d3.format(",");

// Format numbers in Arabic - shorten to مليون or ألف
function formatArabicNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + ' مليون';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + ' ألف';
    }
    return num.toString();
}

// Create hierarchy
// Only sum leaf node values (nodes without children) to avoid double-counting
const hierarchy = d3.hierarchy(rawData)
    .sum(d => d.children ? 0 : d.value)
    .sort((a, b) => b.height - a.height || b.value - a.value);

// Create partition layout - vertical orientation like official D3 example
const partition = d3.partition()
    .size([height, (hierarchy.height + 1) * width / 3])
    .padding(0);

const root = partition(hierarchy);

// Color function - Creates blue gradient with variety
function color(d) {
    if (d.depth === 0) return "#0c1e47"; // Dark blue root

    // Create a blue gradient based on depth and position
    const baseHue = 210; // Blue hue
    const depth = d.depth;
    const maxDepth = 4;

    // Calculate lightness based on depth (darker to lighter as we go deeper)
    const lightnessRange = [35, 70]; // From dark blue to light blue
    const lightness = lightnessRange[0] + ((lightnessRange[1] - lightnessRange[0]) * (depth / maxDepth));

    // Add some variation based on the node's position among siblings
    const siblings = d.parent ? d.parent.children : [d];
    const siblingIndex = siblings.indexOf(d);
    const siblingCount = siblings.length;

    // Vary the saturation slightly based on sibling position
    const saturation = 60 + (20 * (siblingIndex / Math.max(1, siblingCount - 1)));

    return d3.hsl(baseHue, saturation / 100, lightness / 100).toString();
}

// Initialize scales to show full hierarchy
xScale.domain([root.y0, root.y1]);
yScale.domain([root.x0, root.x1]);

// Create SVG
const svg = d3.select("#chart")
    .attr("viewBox", [0, 0, width, height])
    .style("font", "10px sans-serif");

// Create cells - using vertical orientation (swap x and y)
let cell = svg
    .selectAll("g")
    .data(root.descendants())
    .join("g")
    .attr("transform", d => `translate(${d.y0},${d.x0})`);

const rect = cell.append("rect")
    .attr("width", d => d.y1 - d.y0 - 1)
    .attr("height", d => rectHeight(d))
    .attr("fill", d => color(d))
    .style("cursor", "pointer")
    .on("click", clicked);

// Create text groups instead of single text elements
const textGroup = cell.append("g")
    .attr("class", "text-group")
    .style("pointer-events", "none")
    .attr("transform", d => `translate(${(d.y1 - d.y0) / 2}, ${(d.x1 - d.x0) / 2})`);

// Apply initial text content
updateTextContent(cell, false);

// Function to get predominant religion from a party's children
function getPredominantReligion(node) {
    if (!node.children || node.children.length === 0) return null;
    
    const religionCounts = {};
    node.children.forEach(child => {
        if (child.data.classification && child.data.classification.length > 0) {
            const religion = child.data.classification[0];
            religionCounts[religion] = (religionCounts[religion] || 0) + 1;
        }
    });
    
    let maxCount = 0;
    let predominantReligion = null;
    for (const [religion, count] of Object.entries(religionCounts)) {
        if (count > maxCount) {
            maxCount = count;
            predominantReligion = religion;
        }
    }
    
    return predominantReligion;
}

// Function to update text content based on node depth and dimensions
function updateTextContent(selection, animate = true) {
    const duration = animate ? 500 : 0;
    
    selection.each(function (d) {
        const textGroup = d3.select(this).select(".text-group");
        // Use scaled dimensions for accurate box size calculations
        const boxHeight = yScale(d.x1) - yScale(d.x0);
        const boxWidth = xScale(d.y1) - xScale(d.y0);
        
        // Clear existing content
        textGroup.selectAll("*").remove();
        
        // Don't show text if box is too small
        if (boxWidth < 0 || boxHeight < 15) {
            return;
        }
        
        // Position the group at the center
        if (animate) {
            textGroup
                .transition()
                .duration(duration)
                .ease(d3.easeCubicInOut)
                .attr("transform", `translate(${boxWidth / 2}, ${boxHeight / 2})`);
        } else {
            textGroup.attr("transform", `translate(${boxWidth / 2}, ${boxHeight / 2})`);
        }
        
        // Calculate title font size proportionate to height (20px - 60px range)
        let titleFontSize = Math.min(60, Math.max(20, boxHeight * 0.15));
        
        // DEPTH 0: Country level - show total members, parties, independents, voters
        if (d.depth === 0 && boxHeight > 300) {
            const totalParties = d.children ? d.children.length : 0;
            const independent = d.children ? d.children.find(c => c.data.name === "مستقل") : null;
            const independentCount = independent ? independent.data.count : 0;
            
            const foreignObject = textGroup.append("foreignObject")
                .attr("x", -boxWidth / 2)
                .attr("y", -boxHeight / 2)
                .attr("width", boxWidth)
                .attr("height", boxHeight);
            
            const div = foreignObject.append("xhtml:div")
                .attr("class", "text-wrapper")
                .style("opacity", animate ? 0 : 1);
            
            div.append("xhtml:div")
                .attr("class", "title")
                .style("font-size", `${titleFontSize}px`)
                .style("font-weight", 700)
                .style("margin-bottom", "20px")
                .text(d.data.name);
            
            const infoDiv = div.append("xhtml:div").attr("class", "info");
            infoDiv.append("xhtml:div").text(`إجمالي النواب: 128`);
            infoDiv.append("xhtml:div").text(`عدد الأحزاب: ${totalParties}`);
            infoDiv.append("xhtml:div").text(`المستقلون: ${independentCount}`);
            infoDiv.append("xhtml:div")
                .attr("class", "info-highlight")
                .text(`إجمالي الأصوات: ${formatArabicNumber(d.value)}`);
            
            if (animate) {
                div.transition().duration(duration).style("opacity", 1);
            }
        }
        // DEPTH 1: Political party level - show voters, percentage, members count, religion
        else if (d.depth === 1 && boxHeight > 300) {
            const percentage = d.parent ? ((d.value / d.parent.value) * 100).toFixed(1) : 0;
            const religion = getPredominantReligion(d);
            const memberCount = d.data.count || 0;
            
            const foreignObject = textGroup.append("foreignObject")
                .attr("x", -boxWidth / 2)
                .attr("y", -boxHeight / 2)
                .attr("width", boxWidth)
                .attr("height", boxHeight);
            
            const div = foreignObject.append("xhtml:div")
                .attr("class", "text-wrapper")
                .style("opacity", animate ? 0 : 1);
            
            div.append("xhtml:div")
                .attr("class", "title")
                .style("font-size", `${titleFontSize}px`)
                .style("font-weight", 700)
                .style("margin-bottom", "20px")
                .text(d.data.name);
            
            const infoDiv = div.append("xhtml:div").attr("class", "info");
            infoDiv.append("xhtml:div")
                .attr("class", "info-highlight")
                .text(`الأصوات: ${formatArabicNumber(d.value)}`);
            infoDiv.append("xhtml:div").text(`${percentage}% من الإجمالي`);
            infoDiv.append("xhtml:div").text(`عدد النواب: ${memberCount}`);
            
            if (religion) {
                infoDiv.append("xhtml:div").text(`الطائفة الغالبة: ${religion}`);
            }
            
            if (animate) {
                div.transition().duration(duration).style("opacity", 1);
            }
        }
        // DEPTH 2: Parliament member level - show votes and classification
        else if (d.depth === 2 && boxHeight > 300) {
            const classification = d.data.classification || [];
            
            const foreignObject = textGroup.append("foreignObject")
                .attr("x", -boxWidth / 2)
                .attr("y", -boxHeight / 2)
                .attr("width", boxWidth)
                .attr("height", boxHeight);
            
            const div = foreignObject.append("xhtml:div")
                .attr("class", "text-wrapper")
                .style("opacity", animate ? 0 : 1);
            
            div.append("xhtml:div")
                .attr("class", "title")
                .style("font-size", `${titleFontSize}px`)
                .style("font-weight", 700)
                .style("margin-bottom", "15px")
                .text(d.data.name);
            
            const infoDiv = div.append("xhtml:div").attr("class", "info");
            infoDiv.append("xhtml:div")
                .attr("class", "info-highlight")
                .text(`الأصوات: ${formatArabicNumber(d.value)}`);
            
            if (classification.length > 0) {
                infoDiv.append("xhtml:div")
                    .style("margin-top", "10px")
                    .text(`التصنيف:`);
                classification.forEach(cls => {
                    infoDiv.append("xhtml:div").text(cls);
                });
            }
            
            if (animate) {
                div.transition().duration(duration).style("opacity", 1);
            }
        }
        // For boxes with height < 300px - only show name (no details)
        else if (boxHeight > 40) {
            const text = textGroup.append("text")
                .attr("y", 0)
                .attr("fill", "white")
                .attr("fill-opacity", 0)
                .style("font-size", animate ? "10px" : `${titleFontSize}px`)
                .style("font-weight", 700)
                .style("text-anchor", "middle")
                .text(d.data.name);
            
            if (animate) {
                text.transition()
                    .duration(duration)
                    .ease(d3.easeCubicInOut)
                    .style("font-size", `${titleFontSize}px`)
                    .attr("fill-opacity", 0.9);
            } else {
                text.attr("fill-opacity", 0.9);
            }
        }
        // Very small boxes - just the name with smaller font
        else {
            const smallFontSize = Math.min(14, boxHeight * 0.5, boxWidth * 0.04);
            const text = textGroup.append("text")
                .attr("y", 0)
                .attr("fill", "white")
                .attr("fill-opacity", 0)
                .style("font-size", animate ? "8px" : `${smallFontSize}px`)
                .style("font-weight", 500)
                .style("text-anchor", "middle")
                .text(d.data.name);
            
            if (animate) {
                text.transition()
                    .duration(duration)
                    .ease(d3.easeCubicInOut)
                    .style("font-size", `${smallFontSize}px`)
                    .attr("fill-opacity", 0.9);
            } else {
                text.attr("fill-opacity", 0.9);
            }
        }
    });
}

let currentNode = root;

function clicked(event, p) {
    // If clicking the current zoomed node, zoom out to its parent
    if (p === currentNode) {
        if (currentNode.parent) {
            p = currentNode.parent;
            currentNode = currentNode.parent;
        } else {
            return; // Already at root
        }
    } else {
        currentNode = p;
    }

    // Update scale domains based on clicked node - vertical orientation (x and y swapped)
    xScale.domain([p.y0, p.y1]); // horizontal is based on y coordinates
    yScale.domain([p.x0, p.x1]); // vertical is based on x coordinates

    // Fade out all text first
    cell.selectAll(".text-group")
        .transition()
        .duration(150)
        .ease(d3.easeCubicInOut)
        .style("opacity", 0);

    // Create transition
    const t = d3.transition()
        .duration(500)
        .ease(d3.easeCubicInOut);

    // Update all cells using scales - position and size change together
    cell.transition(t)
        .attr("transform", d => `translate(${xScale(d.y0)},${yScale(d.x0)})`);

    cell.select("rect")
        .transition(t)
        .attr("width", d => xScale(d.y1) - xScale(d.y0) - 1)
        .attr("height", d => yScale(d.x1) - yScale(d.x0) - Math.min(1, (yScale(d.x1) - yScale(d.x0)) / 2));

    // Update text groups during the transition
    cell.select(".text-group")
        .transition(t)
        .attr("transform", d => {
            const w = xScale(d.y1) - xScale(d.y0);
            const h = yScale(d.x1) - yScale(d.x0);
            return `translate(${w / 2}, ${h / 2})`;
        });

    // Update text content after transition completes
    setTimeout(() => {
        updateTextContent(cell, true);
    }, 200);

    // Update breadcrumb
    updateBreadcrumb(p);
}

// Breadcrumb navigation
function updateBreadcrumb(node) {
    const breadcrumb = d3.select("#breadcrumb");
    const ancestors = node.ancestors().reverse();

    breadcrumb.selectAll("*").remove();

    ancestors.forEach((d, i) => {
        if (i > 0) {
            breadcrumb.append("span")
                .attr("class", "zoom_icicle_breadcrumb_separator")
                .text("›");
        }

        breadcrumb.append("span")
            .attr("class", "zoom_icicle_breadcrumb_item")
            .text(d.data.name)
            .on("click", () => clicked(null, d));
    });
}

// Initialize breadcrumb
updateBreadcrumb(root);
