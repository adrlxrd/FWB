// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme');
        if (theme === 'light') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Header Scroll Effect
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal, .card, .experience-card, .testimonial-card, .section-header');

// Add reveal class to elements
revealElements.forEach(el => el.classList.add('reveal'));

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    lerp: 0.05, // Slower interpolation for a smoother, heavier feel
    wheelMultiplier: 0.8, // Slower scrolling speed
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// EmailJS Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const submitBtn = document.getElementById('submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        emailjs.sendForm('fwbcontact', 'fwbmails', this)
            .then(() => {
                submitBtn.innerHTML = 'Sent Successfully! <span class="arrow">✓</span>';
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, (error) => {
                console.error('EmailJS Error:', error);
                submitBtn.innerHTML = 'Failed to Send <span class="arrow">✕</span>';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            });
    });
}

// ─── Mobile Menu ────────────────────────────────────────────────
const menuToggle = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('mobile-menu-overlay');

if (menuToggle && menuOverlay) {
    const openMenu = () => {
        menuToggle.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        menuToggle.setAttribute('aria-label', 'Close Menu');
    };

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        menuToggle.setAttribute('aria-label', 'Open Menu');
    };

    menuToggle.addEventListener('click', () => {
        menuOverlay.classList.contains('active') ? closeMenu() : openMenu();
    });

    // Close when a nav link is clicked
    menuOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMenu();
    });
}

// ─── Background Video Playback & Speed Control ──────────────────
const bgVideos = document.querySelectorAll('.bg-video');
if (bgVideos.length > 0) {
    const initBgVideos = () => {
        bgVideos.forEach(v => {
            v.playbackRate = 0.75; // Balanced smooth slow-down without frame stutter
            if (v.paused) {
                v.play().catch(() => {});
            }
        });
    };
    initBgVideos();
    document.addEventListener('touchstart', initBgVideos, { once: true, passive: true });
    document.addEventListener('click', initBgVideos, { once: true, passive: true });
}
