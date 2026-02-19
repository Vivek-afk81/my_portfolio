/* ============================================================
   VIVEK CHAUHAN PORTFOLIO — script.js
   Sections: Cursor, Progress Bar, Navbar, Mobile Menu,
             Nav Tracking, Scroll Reveal, Typewriter, Particles
============================================================ */

/* =======================
   CUSTOM CURSOR
======================= */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0; // mouse position
let rx = 0, ry = 0; // ring position (lags behind)

// Move cursor dot instantly
document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
});

// Animate ring with smooth lag
function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

// Grow cursor on interactive elements
document.querySelectorAll('a, button, .skill-tag, .project, .info-card, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.opacity   = '0.5';
        cursorRing.style.width  = '60px';
        cursorRing.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.opacity   = '1';
        cursorRing.style.width  = '36px';
        cursorRing.style.height = '36px';
    });
});

/* =======================
   SCROLL PROGRESS BAR
======================= */
window.addEventListener('scroll', () => {
    const scrollTop    = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress     = (scrollTop / scrollHeight) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
});

/* =======================
   NAVBAR SHRINK ON SCROLL
======================= */
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* =======================
   MOBILE MENU TOGGLE
======================= */
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navMenu').classList.remove('open');
    });
});

/* =======================
   ACTIVE NAV + SIDE DOTS ON SCROLL
======================= */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar ul li a');
const dotLinks  = document.querySelectorAll('.nav-dot a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            current = section.id;
        }
    });

    // Highlight navbar links
    navLinks.forEach(a => {
        a.parentElement.classList.toggle(
            'active',
            a.getAttribute('href') === '#' + current
        );
    });

    // Highlight side nav dots
    dotLinks.forEach(a => {
        a.classList.toggle(
            'active',
            a.getAttribute('href') === '#' + current
        );
    });
});

/* =======================
   SCROLL REVEAL (INTERSECTION OBSERVER)
======================= */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    revealObserver.observe(section);
});

/* =======================
   TYPEWRITER EFFECT
======================= */
const roles = [
    'CS Student',
    'AI & ML Enthusiast',
    'Problem Solver',
    'Tech Explorer',
];

let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
const typedEl   = document.getElementById('typedText');

function typeWriter() {
    const currentWord = roles[roleIndex];

    if (!isDeleting) {
        // Typing forward
        typedEl.textContent = currentWord.slice(0, ++charIndex);

        if (charIndex === currentWord.length) {
            // Pause before deleting
            isDeleting = true;
            setTimeout(typeWriter, 1600);
            return;
        }
    } else {
        // Deleting backward
        typedEl.textContent = currentWord.slice(0, --charIndex);

        if (charIndex === 0) {
            isDeleting  = false;
            roleIndex   = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeWriter, isDeleting ? 50 : 90);
}

typeWriter();

/* =======================
   FLOATING PARTICLES
======================= */
const particleContainer = document.getElementById('particles');
const PARTICLE_COUNT    = 28;

for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const isLarge = Math.random() > 0.6;
    const size    = isLarge ? '3px' : '2px';

    particle.style.cssText = `
        left:               ${Math.random() * 100}%;
        width:              ${size};
        height:             ${size};
        animation-duration: ${8 + Math.random() * 16}s;
        animation-delay:    ${Math.random() * -20}s;
        opacity:            0;
    `;

    particleContainer.appendChild(particle);
}