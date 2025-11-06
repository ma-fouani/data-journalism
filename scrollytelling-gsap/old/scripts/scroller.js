// This file contains the logic for handling scroll events. It manages the scroll position and triggers animations using GSAP based on the scroll position.

// Use GSAP globals provided by the CDN (no `import` when loading as a normal script)
if (typeof gsap === "undefined") {
    throw new Error("GSAP not found. Make sure gsap.min.js is loaded before this script.");
}
if (typeof ScrollTrigger === "undefined" && gsap && gsap.ScrollTrigger) {
    // If ScrollTrigger is available on gsap global
    // (some CDN builds attach it to gsap.ScrollTrigger)
    window.ScrollTrigger = gsap.ScrollTrigger;
}

if (typeof ScrollTrigger === "undefined") {
    throw new Error("ScrollTrigger not found. Include ScrollTrigger.min.js before scroller.js");
}

gsap.registerPlugin(ScrollTrigger);

function initScroller() {
    const sections = document.querySelectorAll("section, [data-section], #hero, #story");
    if (!sections.length) return;
    sections.forEach(section => {
        gsap.fromTo(section, { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                scrub: true,
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", initScroller);
document.addEventListener("includes:loaded", initScroller);