const duration = 4000;

const zoomFactor = 70;
let currentLocationIndex = 0;
let isPlaying = false;
let playInterval;
let userPausedManually = false;
let wasPlayingBeforeScroll = false;
let hasInitiated = false;

const width = window.innerWidth;
const height = window.innerHeight;
let verticalShift = 0;

let stepTimer;
let stepStartTime;
let stepElapsedTime = 0;
let stepDuration = duration / 1000;
let stepProgressBars = [];

const isMobile = window.innerWidth <= 768 || window.innerHeight > window.innerWidth;
if (isMobile) {
  verticalShift = Math.min(240, height * 0.25);
}

// Simplified projection - start at very far zoom
const projection = d3.geoOrthographic()
  .scale(50)
  .translate([width / 2, height / 2 - verticalShift])
  .rotate([0, 0])
  .clipAngle(90);

const path = d3.geoPath().projection(projection);

const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const sphere = svg.append("path")
  .datum({ type: "Sphere" })
  .attr("class", "sphere")
  .attr("d", path);

let countryPaths, dots, routeLines;

// Load simplified world data
d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json").then(function (world) {
  const countries = topojson.feature(world, world.objects.countries);

  // Add countries with minimal styling
  countryPaths = svg.selectAll(".country")
    .data(countries.features)
    .enter().append("path")
    .attr("class", "country")
    .attr("d", path);

  // Create route lines (initially empty)
  routeLines = svg.append("g").attr("class", "route-lines");

  // Add location dots
  dots = svg.selectAll(".location-dot")
    .data(coords)
    .enter().append("circle")
    .attr("class", "location-dot")
    .attr("r", 3);

  // Show the panel initially
  setTimeout(() => {
    document.querySelector('.info-panel').classList.add('slide-up');
  }, 100);

  ///rotateToLocation(coords[currentLocationIndex], 2000); // Initial zoom-in with 2s duration
  setupEventListeners();
  updateControls();

  // Create individual step progress bars
  createStepProgressBars();

  // Start auto-play after initial zoom
  setTimeout(function () {
    // Don't auto-start playing - wait for scroll interaction
    updatePlayButtonIcon();

    // Set up scroll detection for auto-play
    setupScrollDetection();
  }, 2500); // Start auto-play 500ms after initial zoom completes
});

function createRoute(fromCoords, toCoords) {
  const interpolate = d3.geoInterpolate(fromCoords, toCoords);
  const points = d3.range(0, 1.01, 0.05).map(interpolate);

  return {
    type: "LineString",
    coordinates: points
  };
}

function rotateToLocation(location, animationDuration = 1200) {
  const targetRotation = [-location.coords[0], -location.coords[1]];
  const targetScale = location.zoom * zoomFactor;

  if (animationDuration === 0) {
    // Instant positioning
    projection.rotate(targetRotation).scale(targetScale);
    updateAll();
    return;
  }

  // Clear any existing route line
  routeLines.selectAll(".route-line").remove();

  // Get current state
  const currentRotation = projection.rotate();
  const currentScale = projection.scale();

  // Create interpolators
  const interpolateRotation = d3.interpolate(currentRotation, targetRotation);
  const interpolateScale = d3.interpolate(currentScale, targetScale);

  // Create animated route line if not the first location
  let routePath = null;
  if (currentLocationIndex > 0) {
    const currentLocation = coords[currentLocationIndex];
    const prevLocation = coords[currentLocationIndex - 1];

    routePath = routeLines.append("path")
      .attr("class", "route-line")
      .style("opacity", 0.8);
  }

  // Single transition for everything
  svg.transition("main")
    .duration(animationDuration)
    .ease(d3.easeCubicInOut)
    .tween("transform", function () {
      return function (t) {
        projection
          .rotate(interpolateRotation(t))
          .scale(interpolateScale(t));

        // Update static elements
        updateAll();

        // Update animated route line
        if (routePath && currentLocationIndex > 0) {
          const currentLocation = coords[currentLocationIndex];
          const prevLocation = coords[currentLocationIndex - 1];

          let routeData;
          if (t < 0.8) {
            // Growing phase: line grows from source to destination
            const growProgress = t / 0.8;
            const interpolate = d3.geoInterpolate(prevLocation.coords, currentLocation.coords);
            const endPoint = interpolate(growProgress);

            routeData = {
              type: "LineString",
              coordinates: [prevLocation.coords, endPoint]
            };
          } else {
            // Shrinking phase: line shrinks from source end
            const shrinkProgress = (t - 0.8) / 0.2;
            const interpolate = d3.geoInterpolate(prevLocation.coords, currentLocation.coords);
            const startPoint = interpolate(shrinkProgress);

            routeData = {
              type: "LineString",
              coordinates: [startPoint, currentLocation.coords]
            };
          }

          routePath.datum(routeData).attr("d", path);
        }
      };
    })
    .on("end", function () {
      // Remove the route line completely after animation
      if (routePath) {
        routePath.remove();
      }
    });
}

function updateAll() {
  // Update all paths in one go
  sphere.attr("d", path);
  countryPaths.attr("d", path);

  // Update existing route lines
  routeLines.selectAll(".route-line").attr("d", path);

  // Highlight current country
  countryPaths.classed("current", function (d) {
    const currentLocation = coords[currentLocationIndex];
    return d.properties.ISO_A3 === currentLocation.id ||
      d.properties.ADM0_A3 === currentLocation.id ||
      d.properties.name === currentLocation.name ||
      d.properties.NAME === currentLocation.name;
  });

  // Update dots efficiently
  dots
    .attr("cx", function (d) {
      const pos = projection(d.coords);
      return pos ? pos[0] : -1000;
    })
    .attr("cy", function (d) {
      const pos = projection(d.coords);
      return pos ? pos[1] : -1000;
    })
    .style("opacity", function (d, i) {
      const pos = projection(d.coords);
      const visible = pos && pos[0] >= 0 && pos[0] <= width && pos[1] >= 0 && pos[1] <= height;
      return visible ? (i === currentLocationIndex ? 1 : 0.6) : 0;
    })
    .attr("r", function (d, i) {
      return i === currentLocationIndex ? 5 : 3;
    })
    .classed("current", function (d, i) {
      return i === currentLocationIndex;
    });
}

function updateLocationInfo(location) {
  const panel = document.querySelector('.info-panel');

  // Slide down animation
  panel.classList.remove('slide-up');
  panel.classList.add('slide-down');

  setTimeout(() => {
    // Update content
    document.getElementById('location-title').textContent = location.news.title || location.name;
    document.getElementById('location-date').textContent = location.news.date || '';
    document.getElementById('location-description').textContent = location.news.description || '';

    // Handle image
    const imageEl = document.getElementById('location-image');
    if (location.news.image) {
      imageEl.src = location.news.image;
      imageEl.style.display = 'block';
      imageEl.alt = location.news.title || location.name;
    } else {
      imageEl.style.display = 'none';
    }

    // Slide up animation
    panel.classList.remove('slide-down');
    panel.classList.add('slide-up');
  }, 300);
}

function updateControls() {
  document.getElementById('prev-btn').disabled = currentLocationIndex === 0;
  document.getElementById('next-btn').disabled = currentLocationIndex === coords.length - 1;
}

function createStepProgressBars() {
  const container = document.querySelector('.step-progress-container');
  stepProgressBars = [];

  // Clear existing progress bars
  container.innerHTML = '';

  // Create progress bars for each step (exclude last step since there's no transition after it)
  for (let i = 0; i < coords.length - 1; i++) {
    const stepItem = document.createElement('div');
    stepItem.className = 'step-progress-item';
    if (i < currentLocationIndex) {
      stepItem.classList.add('completed');
    } else if (i === currentLocationIndex) {
      stepItem.classList.add('current');
    }

    const progressBar = document.createElement('div');
    progressBar.className = 'step-progress-bar';

    const progressFill = document.createElement('div');
    progressFill.className = 'step-progress-fill';

    progressBar.appendChild(progressFill);
    stepItem.appendChild(progressBar);
    container.appendChild(stepItem);

    stepProgressBars.push({
      item: stepItem,
      fill: progressFill
    });
  }

  updateStepProgressBars();
}

function updateStepProgressBars() {
  stepProgressBars.forEach((bar, index) => {
    bar.item.classList.remove('completed', 'current');
    bar.fill.style.width = '0%';

    if (index < currentLocationIndex) {
      bar.item.classList.add('completed');
      bar.fill.style.width = '100%';
    } else if (index === currentLocationIndex && currentLocationIndex < coords.length - 1) {
      bar.item.classList.add('current');
      // The current bar will be animated by updateStepCounter
    }
  });
}

function startStepCounter() {
  stopStepCounter(); // Clear any existing timer
  stepStartTime = Date.now() - (stepElapsedTime * 1000); // Account for elapsed time
  updateStepCounter();

  stepTimer = setInterval(function () {
    updateStepCounter();
  }, 100); // Update every 100ms for smooth animation
}

function stopStepCounter() {
  if (stepTimer) {
    // Save elapsed time before stopping
    if (stepStartTime) {
      stepElapsedTime = (Date.now() - stepStartTime) / 1000;
      stepElapsedTime = Math.min(stepElapsedTime, stepDuration);
    }
    clearInterval(stepTimer);
    stepTimer = null;
  }
}

function resetStepCounter() {
  stopStepCounter();
  stepElapsedTime = 0; // Reset elapsed time
  
  // Immediately reset the visual progress bar
  if (currentLocationIndex < stepProgressBars.length) {
    const currentBar = stepProgressBars[currentLocationIndex];
    if (currentBar) {
      currentBar.fill.style.width = '0%';
    }
  }
}

function updateStepCounter() {
  if (!stepStartTime) return;

  const elapsed = (Date.now() - stepStartTime) / 1000;
  const clampedElapsed = Math.min(elapsed, stepDuration);
  const progress = (clampedElapsed / stepDuration) * 100; // Progress percentage

  // Update current step progress bar
  if (currentLocationIndex < stepProgressBars.length) {
    const currentBar = stepProgressBars[currentLocationIndex];
    if (currentBar && currentBar.item.classList.contains('current')) {
      currentBar.fill.style.width = progress + '%';
    }
  }

  if (clampedElapsed >= stepDuration) {
    stopStepCounter();
  }
}

function nextLocation() {
  if (currentLocationIndex < coords.length - 1) {
    currentLocationIndex++;
    const location = coords[currentLocationIndex];
    rotateToLocation(location);
    updateLocationInfo(location);
    updateControls();
    updateStepProgressBars(); // Update individual progress bars

    // Reset counter for new step
    resetStepCounter();
    if (isPlaying && currentLocationIndex < coords.length - 1) {
      startStepCounter();
    }
  }
}

function previousLocation() {
  if (currentLocationIndex > 0) {
    currentLocationIndex--;
    const location = coords[currentLocationIndex];
    rotateToLocation(location);
    updateLocationInfo(location);
    updateControls();
    updateStepProgressBars(); // Update individual progress bars

    // Reset counter for new step
    resetStepCounter();
    if (isPlaying && currentLocationIndex < coords.length - 1) {
      startStepCounter();
    }
  }
}

function togglePlay() {
  if (isPlaying) {
    clearInterval(playInterval);
    stopStepCounter(); // Stop the counter when paused
    isPlaying = false;
    userPausedManually = true; // Mark as manually paused
  } else {
    // If we're at the end, restart the tour
    if (currentLocationIndex >= coords.length - 1) {
      currentLocationIndex = 0;
      const location = coords[currentLocationIndex];
      rotateToLocation(location);
      updateLocationInfo(location);
      updateControls();
      updateStepProgressBars(); // Update individual progress bars
      resetStepCounter();
    }

    isPlaying = true;
    userPausedManually = false; // Clear manual pause flag

    // Start counter if not at last slide
    if (currentLocationIndex < coords.length - 1) {
      startStepCounter();
    }

    startPlayInterval();
  }
  
  // Update button icon
  updatePlayButtonIcon();
}

function updatePlayButtonIcon() {
  const playBtn = document.getElementById('play-btn');
  const pauseIcon = playBtn.querySelector('.pause-icon');
  const playIcon = playBtn.querySelector('.play-icon');
  const restartIcon = playBtn.querySelector('.restart-icon');

  // Reset all icons first
  pauseIcon.style.display = 'none';
  playIcon.style.display = 'none';
  restartIcon.style.display = 'none';

  // Show the appropriate icon based on state
  if (isPlaying) {
    pauseIcon.style.display = 'block';
  } else if (currentLocationIndex >= coords.length - 1) {
    restartIcon.style.display = 'block';
  } else {
    playIcon.style.display = 'block';
  }
}

function startPlayInterval() {
  playInterval = setInterval(function () {
    if (currentLocationIndex < coords.length - 1) {
      nextLocation();
    } else {
      // When reaching the end, stop and show restart symbol
      clearInterval(playInterval);
      stopStepCounter(); // Stop the counter
      isPlaying = false;
      updatePlayButtonIcon();
    }
  }, duration + 800); // Extra time for route animation
}

function setupScrollDetection() {
  const container = document.getElementById('container');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const isInView = entry.intersectionRatio > 0.5; // 50% visible

      console.log('Visibility:', {
        isVisible: isInView,
        visibleRatio: (entry.intersectionRatio * 100).toFixed(2) + '%',
        isIntersecting: entry.isIntersecting
      });

      if (isInView && !isPlaying && !userPausedManually) {
        if (!hasInitiated) {
          hasInitiated = true;
          rotateToLocation(coords[currentLocationIndex], 2000); // Initial zoom-in with 2s duration
          updateLocationInfo(coords[currentLocationIndex]);
        }
        // Auto-play logic
        isPlaying = true;
        updatePlayButtonIcon();
        startStepCounter();
        startPlayInterval();
      } else if (!isInView && isPlaying) {
        // Auto-pause logic
        clearInterval(playInterval);
        stopStepCounter();
        isPlaying = false;
        updatePlayButtonIcon();
      }
    });
  }, {
    threshold: [0, 0.25, 0.5, 0.75, 1.0] // Fire at multiple visibility levels
  });

  observer.observe(container);
}

function setupEventListeners() {
  document.getElementById('prev-btn').addEventListener('click', previousLocation);
  document.getElementById('next-btn').addEventListener('click', nextLocation);
  document.getElementById('play-btn').addEventListener('click', togglePlay);

  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const tour = document.getElementById('tour');

  // Check for saved dark mode preference or default to light mode
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    tour.classList.add('dark-mode');
    darkModeToggle.classList.add('dark');
  }

  darkModeToggle.addEventListener('click', function () {
    const isDarkMode = tour.classList.toggle('dark-mode');
    darkModeToggle.classList.toggle('dark', isDarkMode);

    // Save preference
    localStorage.setItem('darkMode', isDarkMode.toString());
  });

  // Action bar scroll behavior
  setupActionBarScroll();

  // Info button toggle
  const infoButton = document.getElementById('info-button');
  let isExpanded = false;

  infoButton.addEventListener('click', function (e) {
    // Prevent link clicks when collapsed
    if (!isExpanded && e.target.tagName === 'A') {
      e.preventDefault();
      return;
    }

    isExpanded = !isExpanded;
    infoButton.classList.toggle('expanded', isExpanded);
  });

  // Close info when clicking outside
  document.addEventListener('click', function (e) {
    if (!infoButton.contains(e.target) && isExpanded) {
      isExpanded = false;
      infoButton.classList.remove('expanded');
    }
  });

  // Touch-friendly keyboard controls
  document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowLeft') previousLocation();
    if (event.code === 'ArrowRight') nextLocation();
    if (event.code === 'Space') {
      event.preventDefault();
      togglePlay();
    }
  });
}

function setupActionBarScroll() {
  console.log('🎬 setupActionBarScroll() called - Initializing action bar scroll behavior');
  const actionBar = document.getElementById('action-bar');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateActionBar() {
    console.log('🎯 updateActionBar() triggered');
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    const scrollingUp = currentScrollY < lastScrollY;

    console.log(`📐 Action bar scroll stats:`, {
      'currentScrollY': currentScrollY,
      'lastScrollY': lastScrollY,
      'scrollingDown': scrollingDown,
      'scrollingUp': scrollingUp,
      'threshold': 100
    });

    // Hide when scrolling down, show when scrolling up
    if (scrollingDown && currentScrollY > 100) { // Start hiding after 100px
      console.log('⬇️ Scrolling down - HIDING action bar');
      actionBar.classList.add('hidden');
    } else if (scrollingUp || currentScrollY <= 100) {
      console.log('⬆️ Scrolling up or at top - SHOWING action bar');
      actionBar.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  function onScroll() {
    console.log('📜 [ActionBar] onScroll() fired');
    if (!ticking) {
      console.log('⚡ [ActionBar] Scheduling updateActionBar via requestAnimationFrame');
      requestAnimationFrame(updateActionBar);
      ticking = true;
    } else {
      console.log('⏭️ [ActionBar] Skipping - already ticking');
    }
  }

  console.log('👂 [ActionBar] Adding scroll event listener to window');
  window.addEventListener('scroll', onScroll);
}

// Optimized resize handler
let resizeTimeout;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Recalculate vertical shift for new dimensions using same logic
    let newVerticalShift = 0;
    const isMobile = newWidth <= 768 || newHeight > newWidth;
    if (isMobile) {
      newVerticalShift = Math.min(240, newHeight * 0.25);
    }

    svg.attr("width", newWidth).attr("height", newHeight);
    projection.translate([newWidth / 2, newHeight / 2 - newVerticalShift]);
    updateAll();
  }, 100);
});