gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5, // Smoothness factor
    effects: true // Enable parallax effects
});

const data = [
    {
        title: "The Billion Dollar Target",
        summary: "In February 2016, hackers targeted the Bangladesh Bank, attempting to steal $1 billion from the Federal Reserve Bank of New York using stolen SWIFT credentials.",
        image: "https://i.ytimg.com/vi/NlcP-yeq2dg/hq720.jpg"
    },
    {
        title: "The Heist Begins",
        summary: "Over a weekend, 35 fraudulent transfer requests were sent. Five requests totaling $101 million were successfully processed before suspicions were raised.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=80"
    },
    {
        title: "The Billion Dollar Typo",
        summary: "A spelling error—'Foundation' typed as 'Fandation'—in a transfer request alerted a routing bank, halting the remaining transactions and saving $850 million.",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1000&q=80"
    },
    {
        title: "The Aftermath",
        summary: "The heist exposed critical vulnerabilities in the global banking system. While some funds were recovered, the identity of the hackers remains a subject of investigation.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1000&q=80"
    }
];

// Populate text sections dynamically
const contentContainer = document.getElementById('content-container');

data.forEach((item, index) => {
    const section = document.createElement('div');
    section.classList.add('text-section');
    section.id = `section-${index + 1}`;

    const h2 = document.createElement('h2');
    h2.textContent = item.title;

    const p = document.createElement('p');
    p.textContent = item.summary;

    section.appendChild(h2);
    section.appendChild(p);
    contentContainer.appendChild(section);
});

// Set initial tablet image
if (data.length > 0) {
    const tabletImage = document.getElementById('tablet-image');
    tabletImage.src = data[0].image;
}

// Hero Parallax
gsap.to(".hero-bg", {
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    yPercent: 20,
    ease: "none"
});

const rightContent = document.querySelector('.right-content');
const tabletImage = document.getElementById('tablet-image');
const textSections = gsap.utils.toArray('.text-section');

// Pin the right content
ScrollTrigger.create({
    trigger: ".main-container",
    start: "top top",
    end: "bottom bottom",
    pin: ".right-content",
    scrub: false,
    // markers: true // Debugging
});

// Animate text sections and swap images
textSections.forEach((section, index) => {
    ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => updateContent(index),
        onEnterBack: () => updateContent(index),
        toggleClass: "active"
    });
});

function updateContent(index) {
    if (data[index]) {

        // Create a temporary image to preload
        const newImg = new Image();
        newImg.src = data[index].image;
        newImg.onload = () => {
            // Fade out
            gsap.to(tabletImage, {
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    tabletImage.src = data[index].image;
                    // Fade in
                    gsap.to(tabletImage, { opacity: 1, duration: 0.2 });
                }
            });
        };
    }
}
// Smart Header Logic
const header = document.querySelector('.glass-header');
let lastScrollY = 0;

ScrollTrigger.create({
    start: 'top top',
    end: 99999,
    onUpdate: (self) => {
        const currentScrollY = self.scroll();
        const direction = self.direction; // 1 = down, -1 = up

        // Only trigger if scrolled past a certain threshold (e.g., 100px)
        if (currentScrollY > 100) {
            if (direction === 1) {
                // Scrolling down - hide header
                gsap.to(header, { yPercent: -150, duration: 0.3, ease: "power2.out" });
            } else {
                // Scrolling up - show header
                gsap.to(header, { yPercent: 0, duration: 0.3, ease: "power2.out" });
            }
        } else {
            // At the top - always show
            gsap.to(header, { yPercent: 0, duration: 0.3, ease: "power2.out" });
        }
    }
});
