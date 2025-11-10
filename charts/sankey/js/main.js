// Theme management
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Wait for data to be loaded
if (typeof sankeyData === 'undefined') {
    console.error('sankeyData is not defined. Make sure data.js is loaded before main.js');
    document.getElementById('sankey-chart').innerHTML = '<p style="text-align: center; padding: 2rem;">Error: Data not loaded. Please check the console.</p>';
} else {
    initializeSankey();
}

function initializeSankey() {
    console.log("Initializing Sankey diagram...");
    console.log("Data:", sankeyData);
    
    // Sankey Diagram Configuration
    const width = 1200;
    const height = 600;
    const format = d3.format(",.0f");
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    
    let activeCategory = null;

    // Create SVG container
    const svg = d3.select("#sankey-chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    // Create a copy of the data to avoid mutation
    const data = {
        nodes: sankeyData.nodes.map(d => Object.assign({}, d)),
        links: sankeyData.links.map(d => Object.assign({}, d))
    };
    
    console.log("Data prepared:", data);

    // Create Sankey generator
    const sankey = d3.sankey()
        .nodeId(d => d.name)
        .nodeAlign(d3.sankeyJustify)
        .nodeWidth(15)
        .nodePadding(10)
        .extent([[1, 5], [width - 1, height - 5]]);

    console.log("Sankey generator created");
    
    // Process the data
    let nodes, links;
    try {
        const graph = sankey(data);
        nodes = graph.nodes;
        links = graph.links;
        console.log("Sankey processed:", nodes.length, "nodes,", links.length, "links");
    } catch(error) {
        console.error("Error processing Sankey:", error);
        document.getElementById('sankey-chart').innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-primary);">Error processing diagram: ' + error.message + '</p>';
        return;
    }

    // Create tooltip
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip");

    // Add links
    const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.5)
        .selectAll("g")
        .data(links)
        .join("g")
        .style("mix-blend-mode", "multiply");

    // Add gradient definitions for links
    const gradient = svg.append("defs")
        .selectAll("linearGradient")
        .data(links)
        .join("linearGradient")
        .attr("id", (d, i) => `gradient-${i}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", d => d.source.x1)
        .attr("x2", d => d.target.x0);

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d => color(d.source.category));

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d => color(d.target.category));

    // Draw link paths
    link.append("path")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", (d, i) => `url(#gradient-${i})`)
        .attr("stroke-width", d => Math.max(1, d.width))
        .attr("class", "link")
        .on("mouseover", function(event, d) {
            d3.select(this)
                .attr("stroke-opacity", 0.8);
            
            tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px")
                .html(`
                    <strong>${d.source.name} → ${d.target.name}</strong><br/>
                    Value: ${format(d.value)}
                `)
                .classed("show", true);
        })
        .on("mouseout", function(event, d) {
            d3.select(this)
                .attr("stroke-opacity", 0.5);
            
            tooltip.classed("show", false);
        });

    // Add link titles (for accessibility)
    link.append("title")
        .text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)}`);

    // Add nodes
    const node = svg.append("g")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .attr("class", "node");

    // Add node rectangles
    node.append("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("fill", d => color(d.category))
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .attr("class", d => `node-${d.category.replace(/\s+/g, '')}`)
        .on("mouseover", function(event, d) {
            // Highlight connected links
            link.selectAll("path")
                .attr("stroke-opacity", l => 
                    l.source === d || l.target === d ? 0.8 : 0.2
                );
            
            // Calculate total value
            const totalValue = d.sourceLinks.reduce((sum, link) => sum + link.value, 0) ||
                              d.targetLinks.reduce((sum, link) => sum + link.value, 0);
            
            tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px")
                .html(`
                    <strong>${d.name}</strong><br/>
                    Category: ${d.category}<br/>
                    Total flow: ${format(totalValue)}
                `)
                .classed("show", true);
        })
        .on("mouseout", function() {
            link.selectAll("path")
                .attr("stroke-opacity", 0.5);
            
            tooltip.classed("show", false);
        });

    // Add node labels
    node.append("text")
        .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
        .attr("y", d => (d.y1 + d.y0) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
        .text(d => d.name)
        .filter(d => (d.y1 - d.y0) > 20); // Only show text if node is tall enough

    // Add animation on load
    svg.style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1);

    // Animate links
    link.selectAll("path")
        .style("stroke-dasharray", function() {
            const length = this.getTotalLength();
            return `${length} ${length}`;
        })
        .style("stroke-dashoffset", function() {
            return this.getTotalLength();
        })
        .transition()
        .duration(2000)
        .ease(d3.easeQuadInOut)
        .style("stroke-dashoffset", 0);

    // Animate nodes
    node.selectAll("rect")
        .attr("height", 0)
        .transition()
        .delay((d, i) => i * 10)
        .duration(800)
        .attr("height", d => d.y1 - d.y0);

        console.log("Sankey diagram loaded successfully with", nodes.length, "nodes and", links.length, "links");
    
    // Calculate cumulative value per category and sort
    const categoryValues = {};
    links.forEach(link => {
        const sourceCategory = link.source.category;
        const targetCategory = link.target.category;
        categoryValues[sourceCategory] = (categoryValues[sourceCategory] || 0) + link.value;
        categoryValues[targetCategory] = (categoryValues[targetCategory] || 0) + link.value;
    });
    
    const categories = Object.keys(categoryValues).sort((a, b) => categoryValues[b] - categoryValues[a]);
    
    // Create category filter buttons
    createCategoryFilters(categories);
    
    // Create alignment controls
    createAlignmentControls();
    
    // Filter function
    function filterByCategory(category) {
        activeCategory = activeCategory === category ? null : category;
        
        // Update button states
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === activeCategory);
        });
        
        if (activeCategory) {
            // Get all connected nodes
            const connectedNodes = new Set();
            links.forEach(link => {
                if (link.source.category === activeCategory || link.target.category === activeCategory) {
                    connectedNodes.add(link.source);
                    connectedNodes.add(link.target);
                }
            });
            
            // Filter nodes and links
            node.style("opacity", d => {
                return connectedNodes.has(d) ? 1 : 0.1;
            });
            
            link.style("opacity", d => {
                return d.source.category === activeCategory || d.target.category === activeCategory ? 1 : 0.05;
            });
            
            // Update text visibility - show all connected node names
            node.selectAll("text").style("opacity", d => {
                return connectedNodes.has(d) ? 1 : 0.2;
            });
        } else {
            // Reset all
            node.style("opacity", 1);
            link.style("opacity", 1);
            node.selectAll("text").style("opacity", 1);
        }
    }
    
    // Create category filter buttons
    function createCategoryFilters(categories) {
        const filterContainer = document.getElementById('category-filters');
        const maxVisible = 5;
        let showingAll = false;
        
        // Add "All" button
        const allBtn = document.createElement('button');
        allBtn.className = 'filter-btn active';
        allBtn.textContent = 'All';
        allBtn.dataset.category = 'all';
        allBtn.addEventListener('click', () => {
            activeCategory = null;
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            allBtn.classList.add('active');
            node.style("opacity", 1);
            link.style("opacity", 1);
            node.selectAll("text").style("opacity", 1);
        });
        filterContainer.appendChild(allBtn);
        
        // Add category buttons
        categories.forEach((category, index) => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            if (index >= maxVisible) {
                btn.classList.add('hidden');
            }
            btn.textContent = category;
            btn.dataset.category = category;
            btn.addEventListener('click', () => {
                allBtn.classList.remove('active');
                filterByCategory(category);
            });
            filterContainer.appendChild(btn);
        });
        
        // Add "More" button if needed
        if (categories.length > maxVisible) {
            const moreBtn = document.createElement('button');
            moreBtn.className = 'more-btn';
            moreBtn.textContent = 'More';
            moreBtn.addEventListener('click', () => {
                showingAll = !showingAll;
                document.querySelectorAll('.filter-btn.hidden').forEach(btn => {
                    btn.classList.toggle('hidden', !showingAll);
                });
                moreBtn.textContent = showingAll ? 'Less' : 'More';
            });
            filterContainer.appendChild(moreBtn);
        }
    }
    
    // Create alignment controls
    function createAlignmentControls() {
        const alignmentBtns = document.querySelectorAll('.alignment-btn');
        
        alignmentBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const alignment = btn.dataset.align;
                
                // Update button states
                alignmentBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update sankey alignment
                let alignFunc;
                switch(alignment) {
                    case 'left':
                        alignFunc = d3.sankeyLeft;
                        break;
                    case 'right':
                        alignFunc = d3.sankeyRight;
                        break;
                    case 'center':
                        alignFunc = d3.sankeyCenter;
                        break;
                    case 'justify':
                    default:
                        alignFunc = d3.sankeyJustify;
                        break;
                }
                
                // Recreate sankey with new alignment
                sankey.nodeAlign(alignFunc);
                
                // Create fresh copies of the data
                const freshData = {
                    nodes: sankeyData.nodes.map(d => Object.assign({}, d)),
                    links: sankeyData.links.map(d => Object.assign({}, d))
                };
                
                const updatedGraph = sankey(freshData);
                
                // REMOVE OLD LINKS COMPLETELY
                link.selectAll("path").remove();
                
                // REDRAW ALL LINKS FROM SCRATCH
                link.data(updatedGraph.links)
                    .select("path")
                    .remove();
                
                link.data(updatedGraph.links)
                    .append("path")
                    .attr("d", d3.sankeyLinkHorizontal())
                    .attr("stroke", (d, i) => `url(#gradient-${i})`)
                    .attr("stroke-width", d => Math.max(1, d.width))
                    .attr("class", "link")
                    .on("mouseover", function(event, d) {
                        d3.select(this).attr("stroke-opacity", 0.8);
                        tooltip
                            .style("left", (event.pageX + 10) + "px")
                            .style("top", (event.pageY - 10) + "px")
                            .html(`<strong>${d.source.name} → ${d.target.name}</strong><br/>Value: ${format(d.value)}`)
                            .classed("show", true);
                    })
                    .on("mouseout", function(event, d) {
                        d3.select(this).attr("stroke-opacity", 0.5);
                        tooltip.classed("show", false);
                    });
                
                // Update gradients
                svg.select("defs").selectAll("linearGradient")
                    .data(updatedGraph.links)
                    .attr("x1", d => d.source.x1)
                    .attr("x2", d => d.target.x0);
                
                // Update node positions
                node.data(updatedGraph.nodes)
                    .select("rect")
                    .transition()
                    .duration(800)
                    .attr("x", d => d.x0)
                    .attr("y", d => d.y0)
                    .attr("width", d => d.x1 - d.x0)
                    .attr("height", d => d.y1 - d.y0);
                
                // Update text positions
                node.data(updatedGraph.nodes)
                    .select("text")
                    .transition()
                    .duration(800)
                    .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
                    .attr("y", d => (d.y1 + d.y0) / 2)
                    .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end");
            });
        });
    }
}