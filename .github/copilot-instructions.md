# Copilot Instructions for Scrollytelling & Data Visualization Project

## Project Overview
Data journalism codebase combining **GSAP scrollytelling** with **D3.js interactive visualizations** for storytelling through data. Two distinct architectural patterns coexist: Vite-bundled scroll animations and standalone D3 chart modules.

## Architecture

### 1. GSAP Scrollytelling (`scrollytelling-gsap/`)
- **Build system**: Vite with `root: 'src'`, dev server on port 3000
- **Animation stack**: GSAP 3.12+ ScrollTrigger + Lenis smooth scroll (CDN-loaded)
- **Pattern**: Timeline-based animations with `scrub: true` linking to scroll position
- **Entry point**: `src/index.html` (NOT root `index.html`)

```js
// Standard ScrollTrigger pattern
gsap.timeline({
    scrollTrigger: {
        trigger: '.animated-element',
        start: 'top center',
        scrub: true,  // Animation progress = scroll progress
        markers: true, // Debug helper
        toggleActions: 'play reverse play reverse'
    }
});
```

### 2. D3.js Visualizations (`charts/`, `world_tour/`)
- **Architecture**: Static HTML/CSS/JS served via Python HTTP server
- **D3 version**: v7 (CDN from d3js.org) + TopoJSON v3 for geographic data
- **Data pattern**: Separate `data/data.js` files with `const` exports
- **Two versions per chart**:
  - `index.html`: Basic implementation
  - `demo.html`: Enhanced with controls, auto-play, theming

```js
// Geographic projection pattern (world_tour/js/demo.js)
const projection = d3.geoOrthographic()
  .scale(50)
  .translate([width/2, height/2 - verticalShift])
  .rotate([0, 0]);

const path = d3.geoPath().projection(projection);
```

## Critical Development Workflows

### Starting Dev Servers
```powershell
# GSAP project (Windows PowerShell)
cd scrollytelling-gsap; npm run dev

# D3 charts (from workspace root)
cd charts\zoomable_icicle; python -m http.server 8000
```

### Before Code Changes
**ALWAYS ask these questions:**
1. Which file? (`index.html` vs `demo.html` vs `js/main.js`)
2. Which chart? (8+ distinct chart types exist)
3. Read file contents first? (Prevents overwriting existing logic)

**Never assume or guess** - the codebase has duplicated file names across directories.

## Data Architecture

### Hierarchical Data (Icicle, Circles)
```js
// charts/zoomable_icicle/data/data.js
const rawData = {
  "name": "Lebanon",
  "children": [
    {
      "name": "Hezbollah",
      "count": 13,
      "children": [
        {"name": "Candidate", "value": 26363}
      ]
    }
  ]
};
```

### Geographic Data (Maps, World Tour)
```js
// charts/world_tour/data/data.js
const coords = [
  {
    "name": "Israel",
    "coords": [34.8516, 31.0461],
    "zoom": 10,
    "news": { "date": "2022", "title": "...", "description": "..." }
  }
];

// External TopoJSON loaded at runtime
d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
```

### Modular Geographic Data (Zoomable Map)
Three-file pattern in `charts/zoomable_map/data/`:
1. **`governorate-data.js`** ← EDIT THIS: Statistics, populations, voting data
2. **`iraq-map.js`**: GeoJSON geometry (DON'T EDIT)
3. **`data.js`**: Auto-merges above two via `mergeGeoData()`

## State Management Patterns

### Play/Pause Controls (World Tour)
```js
// Global state - charts/world_tour/js/demo.js
let currentLocationIndex = 0;
let isPlaying = false;
let userPausedManually = false;  // Critical: Distinguishes user pause vs system pause
let stepTimer;  // setInterval reference for cleanup

// Timer management pattern
function startTimer() {
  if (stepTimer) clearInterval(stepTimer);  // ALWAYS clear before creating
  stepTimer = setInterval(() => { /* update */ }, 100);
}
```

### Animation Timing Standards
- **Geographic transitions**: 1200ms with `d3.easeCubicInOut`
- **Step counters**: 4000ms (4s) duration, 100ms update intervals
- **UI transitions**: 300ms for panel slides/opacity

## Styling Architecture

### Frosted Glass UI Pattern
```css
/* Standard across all charts */
.controls {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px) saturate(280%);
  -webkit-backdrop-filter: blur(4px) saturate(280%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}
```

### Mobile Responsiveness
```js
// Vertical shift pattern for portrait mode
const isMobile = window.innerWidth <= 768 || window.innerHeight > window.innerWidth;
if (isMobile) {
  verticalShift = Math.min(240, height * 0.25);
}
projection.translate([width/2, height/2 - verticalShift]);
```

### Dark/Light Theming
```js
// Standard theme toggle in demo files
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const theme = htmlElement.getAttribute('data-theme');
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
```

## Component Patterns

### D3 Chart Initialization Flow
```js
// 1. Load external TopoJSON/GeoJSON
d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json").then(world => {
  
  // 2. Create projection & path generator
  const projection = d3.geoOrthographic().scale(scale);
  const path = d3.geoPath().projection(projection);
  
  // 3. Append SVG elements (globe, countries, dots)
  svg.append("path").datum({type: "Sphere"}).attr("d", path);
  
  // 4. Add event listeners for interaction
  
  // 5. Initialize auto-play if in demo mode
});
```

### Zoomable Chart Pattern
```js
// Standard D3 zoom behavior (icicle, circles, map)
function clicked(event, d) {
  // Update root focus
  focus = focus === d ? d.parent : d;
  
  // Transition with d3.easeCubicInOut
  svg.transition()
    .duration(750)
    .ease(d3.easeCubicInOut)
    .tween("zoom", () => {
      const i = d3.interpolate(currentView, [d.x0, d.y0, d.x1 - d.x0]);
      return t => currentView = i(t);
    });
}
```

## Error Prevention

### Animation Cleanup
```js
// ALWAYS clear timers before creating new ones
if (playInterval) clearInterval(playInterval);
if (stepTimer) clearInterval(stepTimer);

// ALWAYS clear timeout references
if (transitionTimeout) clearTimeout(transitionTimeout);
```

### Scroll Detection
```js
// Auto-play trigger threshold
const visibilityPercentage = /* calculate */;
if (visibilityPercentage > 0.5 && !hasInitiated) {
  hasInitiated = true;
  startAutoPlay();
}
```

### SVG Text Wrapping
```js
// Font size scaling based on container height
function getFontSize(height) {
  const minSize = 16, maxSize = 60;
  return Math.min(maxSize, Math.max(minSize, height * 0.4));
}
```

## File Organization

```
charts/[chart-name]/
├── index.html          # Basic version
├── demo.html          # Enhanced with controls ⭐ USE THIS
├── css/styles.css     # Isolated styling
├── js/
│   ├── main.js        # Core logic
│   └── demo.js        # Demo enhancements
└── data/
    └── data.js        # Data exports

scrollytelling-gsap/
├── vite.config.js     # Port 3000, root: 'src'
├── src/               # Actual source ⭐
│   ├── index.html
│   └── styles/main.css
└── old/               # Legacy/reference implementations
```

## Naming Conventions
- **D3 containers**: `#container` for SVG mount point
- **Control panels**: `.controls` class with frosted glass styling
- **Step counters**: `.step-counter` class (NOT `#step-counter`)
- **Play buttons**: `.play-icon` / `.pause-icon` for SVG toggle visibility

## Key Dependencies
- **GSAP**: CDN `cdnjs.cloudflare.com/ajax/libs/gsap/3.12.0/`
- **Lenis**: CDN `cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.23/`
- **D3.js**: CDN `d3js.org/d3.v7.min.js`
- **TopoJSON**: CDN `d3js.org/topojson.v3.min.js`

## Windows PowerShell Specifics
- Join commands with `;` not `&&`
- Use `cd` not `cd .\` for navigation
- Python server: `python -m http.server 8000` (works from any directory)

## Testing Workflow
1. For GSAP changes: `cd scrollytelling-gsap; npm run dev` → `http://localhost:3000`
2. For chart changes: `cd charts\[name]; python -m http.server 8000` → `http://localhost:8000/demo.html`
3. Always test mobile: DevTools device emulation (portrait mode triggers `verticalShift`)

## Context Reference Priority
When implementing similar features, check these files in order:
1. `charts/world_tour/demo.html` - Full-featured globe with auto-play
2. `charts/zoomable_icicle/css/styles.css` - Complete frosted glass patterns
3. `charts/zoomable_map/data/README.md` - Data separation architecture
4. `scrollytelling-gsap/src/index.html` - GSAP + Lenis integration

**Principle**: Read existing implementations before suggesting modifications. This codebase prioritizes visual consistency and reusable animation patterns across all visualizations.