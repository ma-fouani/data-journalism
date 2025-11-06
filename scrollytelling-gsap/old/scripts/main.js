import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initScroller } from "./scroller";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    initScroller();
    
    // Example GSAP animation on scroll
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            },
        });
    });
});

(async function loadIncludes() {
    try {
        const includeEls = Array.from(document.querySelectorAll('[data-include]'));
        await Promise.all(includeEls.map(async el => {
            const url = el.getAttribute('data-include');
            if (!url) return;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
            el.innerHTML = await res.text();
        }));
        // signal that includes are ready
        document.dispatchEvent(new Event('includes:loaded'));
    } catch (err) {
        console.error('Error loading includes:', err);
    }
})();