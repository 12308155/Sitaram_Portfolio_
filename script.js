// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: false, // Changed to false for repeat animations
    offset: 100,
    mirror: true
});

// ── Custom Cursor ──────────────────────────────────────
const cursorDot = document.querySelector('.custom-cursor-dot');
const cursorOutline = document.querySelector('.custom-cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with a slight delay
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor Hover Effects
const interactiveElements = document.querySelectorAll('a, button, .magnetic-card, .project-card, .skill-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('cursor-hover');
        cursorDot.classList.add('cursor-hover-dot');
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('cursor-hover');
        cursorDot.classList.remove('cursor-hover-dot');
    });
});

// ── Dynamic Aura Background ─────────────────────────────
const auraBlobs = document.querySelectorAll('.aura-blob');
window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const x = clientX / window.innerWidth;
    const y = clientY / window.innerHeight;
    
    auraBlobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// ── Hero Section Typing Effect ──────────────────────────
const tagline = document.querySelector('.tagline');
if (tagline) {
    const text = tagline.innerHTML;
    tagline.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            tagline.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 40);
        }
    }
    
    // Start typing after initial load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

// ── Theme Toggle ────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
}

themeToggle.addEventListener('click', () => {
    // Page Flash effect on theme change
    const flash = document.createElement('div');
    flash.className = 'theme-transition-flash';
    body.appendChild(flash);
    
    setTimeout(() => {
        body.classList.toggle('light-theme');
        const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        setTimeout(() => flash.remove(), 500);
    }, 250);
});

// ── Navbar & Scroll Progress ───────────────────────────
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + "%";
    }
});

// ── Magnetic Cards with Spotlight ──────────────────────
document.querySelectorAll('.magnetic-card, .project-card, .summary-card, .cert-card, .skills-table').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (centerY - y) / 15;
        const rotateY = (x - centerX) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ── Parallax Elements ──────────────────────────────────
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for Background Huge Text
    document.querySelectorAll('.huge-text').forEach(text => {
        const coords = scrolled * 0.1;
        text.style.top = `calc(50% + ${coords}px)`;
    });

    // Parallax for section headers
    document.querySelectorAll('.section-header').forEach(header => {
        const speed = 0.15;
        const rect = header.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            header.style.transform = `translateY(${(rect.top - window.innerHeight/2) * speed}px)`;
        }
    });
});

// ── Particle Background Optimization ────────────────────
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
        particlesContainer.appendChild(particle);
    }
}

// ── Tab Switcher with Glide Animation ──────────────────
document.querySelectorAll('.edu-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;
        const scope = tab.closest('section');
        
        scope.querySelectorAll('.edu-tab').forEach(t => t.classList.remove('active'));
        scope.querySelectorAll('.edu-panel').forEach(p => {
            p.classList.remove('active');
            p.style.opacity = '0';
            p.style.transform = 'translateX(20px)';
        });

        tab.classList.add('active');
        const panel = document.getElementById(targetId);
        if (panel) {
            panel.classList.add('active');
            setTimeout(() => {
                panel.style.opacity = '1';
                panel.style.transform = 'translateX(0)';
            }, 50);
        }
    });
});

// ── Scroll Indicator Ripple ────────────────────────────
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        window.scrollTo({
            top: aboutSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
}

// ── Back to Top with Progress Ring ────────────────────
const bttBtn = document.getElementById('backToTop');
if (bttBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            bttBtn.classList.add('visible');
        } else {
            bttBtn.classList.remove('visible');
        }
    });
    bttBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Image Hover Parallax ───────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
    const img = card.querySelector('.project-preview-img');
    card.addEventListener('mousemove', (e) => {
        if (!img) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        img.style.transform = `scale(1.1) translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`;
    });
    card.addEventListener('mouseleave', () => {
        if (img) img.style.transform = 'scale(1) translate(0, 0)';
    });
});

// ── Mobile Menu ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// ── Form Success with Confetti Effect (Visual) ────────
function copyEmail() {
    const email = document.getElementById('contact-email').innerText;
    navigator.clipboard.writeText(email).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
            copyBtn.style.transform = 'scale(1)';
        }, 2000);
    });
}

console.log('%c✨ Animations Initialized!', 'color: #6366f1; font-weight: bold; font-size: 1.2rem;');
