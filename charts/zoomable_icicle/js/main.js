const width = 1160;
const height = 800;

// Color scale based on hierarchy depth - Pure blue gradient
const colorScale = d3.scaleOrdinal()
    .domain(["Shia", "Sunni", "Minorities"])
    .range(["#1e3a8a", "#3b82f6", "#60a5fa"]);

// Format number with commas
const format = d3.format(",");

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

const text = cell.append("text")
    .style("user-select", "none")
    .attr("pointer-events", "none")
    .style("transition", "font-size 0.75s ease")
    .attr("x", d => (d.y1 - d.y0) / 2)
    .attr("y", d => (d.x1 - d.x0) / 2)
    .attr("fill-opacity", d => +labelVisible(d));

text.append("tspan")
    .attr("class", "name-tspan")
    .text(d => d.data.name);

// Add value to text - will be positioned dynamically
const tspan = text.append("tspan")
    .attr("class", "value-tspan")
    .style("transition", "font-size 0.75s ease")
    .attr("fill-opacity", d => labelVisible(d) * 0.7)
    .text(d => ` ${format(d.value)}`);

// Apply initial font sizing and positioning
updateTextSizing(cell, false);

// Function to update text sizing based on box dimensions
function updateTextSizing(selection, animate = true) {
    selection.each(function (d) {
        const textElement = d3.select(this).select("text");
        const nameTspan = textElement.select(".name-tspan");
        const valueTspan = textElement.select(".value-tspan");

        const boxHeight = d.x1 - d.x0;
        const boxWidth = d.y1 - d.y0;

        // Get the text content to check if we have a name
        const nameText = d.data.name;
        const hasValidName = nameText && nameText.trim().length > 0;

        // Don't manage visibility here - let fill-opacity from labelVisible handle it
        // Only update font sizing and positioning

        // Center horizontally and vertically
        const centerX = boxWidth / 2;
        const centerY = boxHeight / 2;

        // Calculate appropriate font size based on box height
        let fontSize;
        const duration = animate ? 750 : 0;

        if (boxHeight > 100 && boxWidth > 200) {
            // Very large boxes - huge title with number underneath
            fontSize = Math.min(32, boxHeight * 0.2);
            textElement.style("font-size", `${fontSize}px`);

            if (animate) {
                textElement
                    .transition()
                    .duration(duration)
                    .ease(d3.easeCubicInOut)
                    .attr("x", centerX)
                    .attr("y", centerY - fontSize * 0.3);
            } else {
                textElement
                    .attr("x", centerX)
                    .attr("y", centerY - fontSize * 0.3);
            }

            // Reset the name tspan
            nameTspan.attr("x", null).attr("dy", null);

            // Position value underneath, centered
            if (animate) {
                valueTspan
                    .transition()
                    .duration(duration)
                    .ease(d3.easeCubicInOut)
                    .attr("x", centerX)
                    .attr("dy", fontSize * 1.2)
                    .text(` ${format(d.value)}`)
                    .style("font-size", `${fontSize * 0.7}px`);
            } else {
                valueTspan
                    .attr("x", centerX)
                    .attr("dy", fontSize * 1.2)
                    .text(` ${format(d.value)}`)
                    .style("font-size", `${fontSize * 0.7}px`);
            }
        } else if (boxHeight > 60) {
            // Large boxes - inline with slight spacing
            fontSize = Math.min(20, boxHeight * 0.25);
            textElement.style("font-size", `${fontSize}px`);

            if (animate) {
                textElement
                    .transition()
                    .duration(duration)
                    .ease(d3.easeCubicInOut)
                    .attr("x", centerX)
                    .attr("y", centerY);
            } else {
                textElement
                    .attr("x", centerX)
                    .attr("y", centerY);
            }

            // Reset the name tspan
            nameTspan.attr("x", null).attr("dy", null);

            if (animate) {
                valueTspan
                    .transition()
                    .duration(duration)
                    .ease(d3.easeCubicInOut)
                    .attr("x", null)
                    .attr("dy", 0)
                    .text(` (${format(d.value)})`)
                    .style("font-size", `${fontSize * 0.85}px`);
            } else {
                valueTspan
                    .attr("x", null)
                    .attr("dy", 0)
                    .text(` (${format(d.value)})`)
                    .style("font-size", `${fontSize * 0.85}px`);
            }
        } else if (boxHeight > 40) {
            // Medium boxes
            fontSize = Math.min(14, boxHeight * 0.3);
            textElement.style("font-size", `${fontSize}px`);

            if (animate) {
                textElement
                    .transition()
                    .duration(duration)
                    .ease(d3.easeCubicInOut)
                    .attr("x", centerX)
                    .attr("y", centerY);
            } else {
                textElement
                    .attr("x", centerX)
                    .attr("y", centerY);
            }

            // Reset the name tspan
            nameTspan.attr("x", null).attr("dy", null);

            if (animate) {
                valueTspan
                    .transition()
                    .duration(duration)
                    .ease(d3.easeCubicInOut)
                    .attr("x", null)
                    .attr("dy", 0)
                    .text(` (${format(d.value)})`)
                    .style("font-size", `${fontSize}px`);
            } else {
                valueTspan
                    .attr("x", null)
                    .attr("dy", 0)
                    .text(` (${format(d.value)})`)
                    .style("font-size", `${fontSize}px`);
            }
        } else {
            // Small boxes - tight spacing, smaller font
            fontSize = Math.min(11, boxHeight * 0.4);
            textElement.style("font-size", `${fontSize}px`);

            if (animate) {
                textElement
                    .transition()
                    .duration(duration)
                    .ease(d3.easeCubicInOut)
                    .attr("x", centerX)
                    .attr("y", centerY);
            } else {
                textElement
                    .attr("x", centerX)
                    .attr("y", centerY);
            }

            // Reset the name tspan
            nameTspan.attr("x", null).attr("dy", null);

            if (animate) {
                valueTspan
                    .transition()
                    .duration(duration)
                    .ease(d3.easeCubicInOut)
                    .attr("x", null)
                    .attr("dy", 0)
                    .text(` (${format(d.value)})`)
                    .style("font-size", `${fontSize}px`);
            } else {
                valueTspan
                    .attr("x", null)
                    .attr("dy", 0)
                    .text(` (${format(d.value)})`)
                    .style("font-size", `${fontSize}px`);
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

    // Calculate zoom targets - swapped for vertical orientation
    root.each(d => d.target = {
        x0: (d.x0 - p.x0) / (p.x1 - p.x0) * height,
        x1: (d.x1 - p.x0) / (p.x1 - p.x0) * height,
        y0: d.y0 - p.y0,
        y1: d.y1 - p.y0
    });

    const t = cell.transition().duration(750)
        .attr("transform", d => `translate(${d.target.y0},${d.target.x0})`);

    rect.transition(t)
        .attr("width", d => d.target.y1 - d.target.y0 - 1)
        .attr("height", d => rectHeight(d.target));

    text.transition(t)
        .attr("fill-opacity", d => +labelVisible(d.target));

    tspan.transition(t)
        .attr("fill-opacity", d => labelVisible(d.target) * 0.7);

    // Update dimensions immediately for smooth text transitions
    root.each(d => {
        d.x0 = d.target.x0;
        d.x1 = d.target.x1;
        d.y0 = d.target.y0;
        d.y1 = d.target.y1;
    });

    // Apply text sizing immediately to trigger CSS transitions
    updateTextSizing(cell);

    // After transition completes, update visibility again to ensure text appears for newly large boxes
    t.on("end", function() {
        // Update fill-opacity based on the new dimensions
        text.attr("fill-opacity", d => +labelVisible(d));
        tspan.attr("fill-opacity", d => labelVisible(d) * 0.7);
    });

    // Update breadcrumb
    updateBreadcrumb(p);

    // Update info panel
    updateInfo(p);
}

function rectHeight(d) {
    return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
}

function labelVisible(d) {
    return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 15;
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

// Info panel
function updateInfo(node) {
    const info = d3.select("#info");
    const infoTitle = d3.select("#infoTitle");
    const infoCount = d3.select("#infoCount");
    const infoSource = d3.select("#infoSource");

    if (node.depth > 0) {
        info.classed("active", true);
        infoTitle.text(node.data.name);
        infoCount.text(format(node.value));
        infoSource.text(node.data.source || "No source information available");
    } else {
        info.classed("active", false);
    }
}

// Initialize breadcrumb and info
updateBreadcrumb(root);
