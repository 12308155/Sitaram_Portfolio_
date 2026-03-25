// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 50,
    easing: 'ease-out-quad'
});

// ── Page Preloader & Appearance ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const percentEl = document.getElementById('loader-percent');
    const statusEl = document.getElementById('loaderStatus');
    const progressFill = document.getElementById('loaderProgressFill');
    const progressRail = document.querySelector('.loader-progress-rail');

    if (preloader && percentEl && progressFill && progressRail) {
        let count = 0;
        const loadingSteps = [
            { threshold: 20, text: 'Booting interface...' },
            { threshold: 45, text: 'Rendering visuals...' },
            { threshold: 75, text: 'Connecting modules...' },
            { threshold: 96, text: 'Final polish...' },
            { threshold: 100, text: 'Ready to explore.' }
        ];

        const updateLoaderUI = (value) => {
            percentEl.textContent = value;
            progressFill.style.width = `${value}%`;
            progressRail.setAttribute('aria-valuenow', String(value));
            if (statusEl) {
                const step = loadingSteps.find(item => value <= item.threshold) || loadingSteps[loadingSteps.length - 1];
                statusEl.textContent = step.text;
            }
        };

        const animateLoader = () => {
            const firstLeg = 78;
            const dynamicIncrement = count < firstLeg ? Math.max(1, Math.ceil((firstLeg - count) / 9)) : 1;
            count = Math.min(100, count + dynamicIncrement);
            updateLoaderUI(count);

            if (count < 100) {
                setTimeout(animateLoader, count < firstLeg ? 28 : 58);
                return;
            }

            preloader.classList.add('hidden');
            document.body.classList.add('loaded');
            setTimeout(() => preloader.remove(), 580);
        };

        updateLoaderUI(0);
        setTimeout(animateLoader, 90);
    } else {
        document.body.classList.add('loaded');
    }
});

// ── Advanced Interactive Experience (V5.2 - Native Cursor) ────
const initInteractiveExperience = () => {
    // 1. Magnetic Interactivity
    const magneticItems = document.querySelectorAll('.btn, .nav-link, .social-hub-link, .cert-btn, .copy-btn, .back-to-top, .scroll-indicator-v2');
    magneticItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            item.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            item.style.transition = 'none';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = `translate(0, 0)`;
            item.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });

    // 2. Background Aura Parallax (Very Subtle)
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) * 0.03;
        const y = (e.clientY - window.innerHeight / 2) * 0.03;
        document.querySelectorAll('.aura-blob').forEach((blob, i) => {
            blob.style.transform = `translate(${x * (i+1) * 0.15}px, ${y * (i+1) * 0.15}px)`;
        });
    });
};

// ── Card 3D Interaction ─────────────────────────────────────
const initCardTilt = () => {
    const cards = document.querySelectorAll('.project-card, .cert-card, .stat-card, .summary-box, .info-card-v2, .profile-card-v2');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (rect.height / 2 - y) / 25;
            const rotateY = (x - rect.width / 2) / 25;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
};

// ── Functional Core Systems ───────────────────────────────
const initCoreSystems = () => {
    // Image Lazy Loading
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.onload = () => img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    }, { rootMargin: '100px' });
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));

    // Nav Link Highlighting
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));
    
    // Resume Tab Controller
    document.querySelectorAll('.edu-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const section = tab.closest('section');
            section.querySelectorAll('.edu-tab, .edu-panel').forEach(el => el.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.target)?.classList.add('active');
        });
    });

    // Back to Top Click
    const btt = document.getElementById('backToTop');
    if (btt) {
        btt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Custom Form Submission (No Redirect)
    const form = document.getElementById('comm-form');
    const formStatus = document.getElementById('form-status');
    if (form && formStatus) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            formStatus.innerHTML = '<div class="status-msg loading"><i class="fas fa-spinner fa-spin"></i> Sending message...</div>';
            
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    formStatus.innerHTML = '<div class="status-msg success"><i class="fas fa-check-circle"></i> Message sent successfully! I will get back to you soon.</div>';
                    form.reset();
                    setTimeout(() => formStatus.innerHTML = '', 5000);
                } else {
                    formStatus.innerHTML = '<div class="status-msg error"><i class="fas fa-exclamation-circle"></i> Oops! There was a problem submitting your form.</div>';
                }
            } catch (error) {
                formStatus.innerHTML = '<div class="status-msg error"><i class="fas fa-exclamation-circle"></i> Oops! There was a problem submitting your form.</div>';
            }
        });
    }
};

// ── Visual Particle Hub ─────────────────────────────────────
const initVisualHub = () => {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 2;
        p.style.cssText = `
            left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
            width: ${size}px; height: ${size}px;
            opacity: ${Math.random() * 0.4};
            animation: float ${Math.random() * 20 + 10}s infinite linear;
        `;
        container.appendChild(p);
    }
};

// ── Hero Focus Animations (Main Section) ─────────────────────
const initHeroFocusAnimations = () => {
    const home = document.getElementById('home');
    if (!home || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const parallaxTargets = {
        greeting: home.querySelector('.greeting'),
        name: home.querySelector('.name-text'),
        tagline: home.querySelector('.tagline'),
        actions: home.querySelector('.hero-actions'),
        scrollHint: home.querySelector('.scroll-indicator-v2')
    };

    let rafId = null;
    home.addEventListener('mousemove', (event) => {
        const rect = home.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        home.style.setProperty('--hero-mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
        home.style.setProperty('--hero-my', `${((event.clientY - rect.top) / rect.height) * 100}%`);

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            if (parallaxTargets.greeting) parallaxTargets.greeting.style.transform = `translate3d(${x * 5}px, ${y * 4}px, 0)`;
            if (parallaxTargets.name) parallaxTargets.name.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0)`;
            if (parallaxTargets.tagline) parallaxTargets.tagline.style.transform = `translate3d(${x * 4}px, ${y * 3}px, 0)`;
            if (parallaxTargets.actions) parallaxTargets.actions.style.transform = `translate3d(${x * 3}px, ${y * 2}px, 0)`;
            if (parallaxTargets.scrollHint) parallaxTargets.scrollHint.style.transform = `translate3d(${x * 2}px, ${y * 2}px, 0)`;
        });
    });

    home.addEventListener('mouseleave', () => {
        home.style.setProperty('--hero-mx', '50%');
        home.style.setProperty('--hero-my', '45%');
        Object.values(parallaxTargets).forEach((el) => {
            if (!el) return;
            el.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
            el.style.transform = 'translate3d(0, 0, 0)';
            setTimeout(() => {
                el.style.transition = '';
            }, 480);
        });
    });
};

const initHeroTypewriter = () => {
    const roleEl = document.querySelector('.type-roles');
    if (!roleEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const roles = [
        'Software Engineer & Data Scientist',
        'Machine Learning Builder',
        'Data Analytics Storyteller',
        'Scalable Systems Developer'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
        const current = roles[roleIndex];
        roleEl.textContent = current.slice(0, charIndex);

        if (!deleting && charIndex < current.length) {
            charIndex += 1;
            setTimeout(tick, 52);
            return;
        }

        if (!deleting && charIndex >= current.length) {
            deleting = true;
            setTimeout(tick, 1400);
            return;
        }

        if (deleting && charIndex > 0) {
            charIndex -= 1;
            setTimeout(tick, 30);
            return;
        }

        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, 240);
    };

    tick();
};

// ── Global Motion Engine (Remaining Sections) ───────────────
const initGlobalMotionEngine = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealTargets = document.querySelectorAll(
        '.section-header, .about-card, .skills-category-node, .summary-box, .edu-panel, .project-card, .cert-card, .contact-card, .contact-form-wrapper'
    );

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const target = entry.target;
            const index = Number(target.dataset.motionIndex || 0);
            target.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
            target.classList.add('motion-revealed');
            observer.unobserve(target);
        });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach((el, index) => {
        el.dataset.motionIndex = String(index % 8);
        revealObserver.observe(el);
    });

    const floatTargets = document.querySelectorAll('.summary-box, .cert-card, .project-card');
    floatTargets.forEach((el, index) => {
        if (index % 2 === 0) el.classList.add('motion-float');
        el.classList.add('motion-glow-ring');
    });
};

const initSkillsHubCounters = () => {
    const hub = document.querySelector('.skills-summary-hub');
    if (!hub) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const runCounters = () => {
        hub.querySelectorAll('.box-num[data-count-target]').forEach((el) => {
            const target = parseInt(el.getAttribute('data-count-target'), 10);
            const suffix = el.getAttribute('data-count-suffix') || '';
            if (Number.isNaN(target)) return;

            const apply = (n) => {
                el.textContent = `${n}${suffix}`;
            };

            if (reduced) {
                apply(target);
                return;
            }

            const duration = 1100;
            const start = performance.now();

            const tick = (now) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - (1 - t) ** 3;
                apply(Math.round(eased * target));
                if (t < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
        });
    };

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                runCounters();
                obs.disconnect();
            });
        },
        { threshold: 0.2, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(hub);
};

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initInteractiveExperience();
    initCardTilt();
    initCoreSystems();
    initVisualHub();
    initHeroFocusAnimations();
    initHeroTypewriter();
    initGlobalMotionEngine();
    initSkillsHubCounters();
});

// Navbar & Scroll Progress
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    const scrollVal = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const progress = document.getElementById('scrollProgress');
    
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    if (progress) progress.style.width = `${scrollVal}%`;
    
    const btt = document.getElementById('backToTop');
    if (btt) btt.classList.toggle('visible', window.scrollY > 300);
});

console.log('%c🚀 Interactive Hub V5.2 Fully Functional!', 'color: #8b5cf6; font-weight: bold; font-size: 14px;');
