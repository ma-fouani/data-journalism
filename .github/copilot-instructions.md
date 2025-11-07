# Copilot Instructions for Scrollytelling & Data Visualization Project

## Project Architecture

This is a **data journalism and scrollytelling project** with two main architectural patterns:

### 1. GSAP-Based Scrollytelling (`scrollytelling-gsap/`)
- **Entry point**: `src/index.html` with Vite build system (`vite.config.js`)
- **Animation engine**: GSAP + ScrollTrigger for scroll-driven animations
- **Pattern**: Timeline-based animations with `scrollTrigger` configuration
- **Key dependencies**: GSAP CDN, Lenis for smooth scrolling

### 2. D3.js Interactive Visualizations (`charts/`, `world_tour/`)
- **Framework**: Vanilla D3.js v7 with TopoJSON for geographic data
- **Pattern**: SVG-based interactive charts with data-driven DOM manipulation
- **Styling**: Custom CSS with frosted glass effects and responsive design

## Critical Development Patterns

### Before Making Code Changes
**ALWAYS ask clarifying questions first:**
- Which specific file should be modified?
- What feature/element is being referenced?
- Should you check current file contents before proceeding?
- **Never assume or guess - ask for confirmation**

### D3.js Visualization Workflow
```js
// Standard pattern in charts/world_tour/demo.html
const projection = d3.geoOrthographic().scale(scale).translate([width/2, height/2]);
const path = d3.geoPath().projection(projection);
// Update pattern: updateAll() function redraws all elements
```

### GSAP ScrollTrigger Configuration
```js
// Standard pattern from src/index.html
gsap.timeline({
    scrollTrigger: {
        trigger: '.element',
        start: 'top center',
        scrub: true,  // Links animation to scroll position
        toggleActions: 'play reverse play reverse'
    }
});
```

### CSS Architecture
- **Frosted glass UI**: `backdrop-filter: blur(4px) saturate(280%)` pattern
- **Mobile-first responsive**: Vertical shift calculations for mobile layouts
- **Component isolation**: Each chart has its own CSS file

## Key Integration Points

### Data Sources
- **Geographic data**: External TopoJSON from unpkg.com (`world-atlas@2.0.2`)
- **Chart data**: Local `data.js` files with structured JSON
- **News content**: `news.json` for world tour timeline data

### Animation Timing
- **Globe rotations**: 1200ms transitions with `d3.easeCubicInOut`
- **Step counters**: 15-second intervals with 100ms update frequency
- **UI feedback**: 300ms transitions for panel slides and opacity changes

### State Management
```js
// Global state pattern in world_tour visualizations
let currentLocationIndex = 0;
let isPlaying = false;
let userPausedManually = false; // Distinguishes user vs. system pauses
```

## Essential Commands

### Development Servers
```bash
# GSAP project (Vite)
cd scrollytelling-gsap && npm run dev

# Charts (static files)
python -m http.server 8000  # Serve charts/ directory
```

### File Structure Navigation
- **Interactive demos**: `charts/[chart-name]/demo.html` (enhanced versions)
- **Basic versions**: `charts/[chart-name]/index.html` 
- **Reusable components**: `scrollytelling-gsap/old/components/`

## Project-Specific Conventions

### Naming Patterns
- Counter elements: Always use `step-counter` class with countdown logic
- Chart containers: `#container` for D3 SVG mounting
- Control panels: Frosted glass styling with `controls` class

### Error Prevention
- **Mobile responsiveness**: Always include `verticalShift` calculations for portrait mode
- **Scroll detection**: Use `visibilityPercentage > 0.5` threshold for auto-play triggers
- **Animation cleanup**: Clear intervals/timers before creating new ones

### Data Flow
1. **Chart initialization**: Load external data → create projection → render static elements
2. **User interaction**: Update global state → trigger transition → update UI elements
3. **Animation loop**: Start timers → update displays → handle completion

## Context Files to Reference
- `demo.html`: Advanced implementations with full interaction controls
- `css/styles.css`: Complete styling patterns including animations
- `data.js`: Data structure examples for D3 hierarchies and geographic coordinates

When working on this codebase, prioritize understanding the existing animation timing and state management patterns before suggesting modifications.