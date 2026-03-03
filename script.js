// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark theme
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    // Save theme preference
    const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    
    // Add ripple effect
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Particle Background
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = Math.random() * 5 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = Math.random() * 10 + 10 + 's';
    particlesContainer.appendChild(particle);
}

// Skill Progress Bars Animation - removed as no longer using progress bars

// Project Filter - removed as no longer using filters

// Contact Form Submission - Formspree Integration
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    // Prevent form spam with rate limiting
    let lastSubmitTime = 0;
    const submitCooldown = 5000; // 5 seconds
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission and redirect
        
        const currentTime = Date.now();
        
        // Check cooldown
        if (currentTime - lastSubmitTime < submitCooldown) {
            alert('Please wait a moment before submitting again.');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        lastSubmitTime = currentTime;
        
        // Get form data
        const formData = new FormData(this);
        
        try {
            // Submit to Formspree
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success - show popup message
                alert('✅ Submitted Successfully! Thank you for your message. I will get back to you soon.');
                this.reset(); // Clear the form
            } else {
                // Error
                alert('⚠️ Oops! There was a problem submitting your form. Please try again.');
            }
        } catch (error) {
            alert('⚠️ Error: Unable to submit form. Please check your connection.');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Smooth Scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Parallax Effect for sections - DISABLED
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const parallaxElements = document.querySelectorAll('.home-content');
//     
//     parallaxElements.forEach(element => {
//         const speed = 0.5;
//         element.style.transform = `translateY(${scrolled * speed}px)`;
//     });
// });

// Lazy Loading for images (when you add actual images)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add fade-in animation for cards on scroll with stagger effect
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Apply staggered fade-in to project cards
document.querySelectorAll('.project-card').forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeObserver.observe(element);
});

// Apply fade-in to skill items
document.querySelectorAll('.skill-item, .skills-table').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(element);
});

// Initialize tooltips for skill items
document.querySelectorAll('.tech-card, .skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// Add ripple effect to buttons and interactive elements
document.querySelectorAll('.btn, .social-link, .project-link, .theme-toggle').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Animated Counter for Statistics - removed as no longer using stats
const scrollIndicator = document.querySelector('.scroll-indicator');
const homeSection = document.getElementById('home');
const aboutSection = document.getElementById('about');

scrollIndicator.addEventListener('click', () => {
    const nextSectionOffsetTop = aboutSection.offsetTop;
    const scrollPosition = window.scrollY;
    const sectionHeight = aboutSection.offsetHeight;

    if (scrollPosition < nextSectionOffsetTop - sectionHeight) {
        window.scrollTo({
            top: nextSectionOffsetTop,
            behavior: 'smooth'
        });
    }
});
// Easter egg - Konami code
let konamiCode = [];
const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-pattern.length);
    
    if (konamiCode.join('') === pattern.join('')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

console.log('%c🚀 Welcome to my portfolio!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cBuilt with passion using HTML, CSS, and JavaScript', 'font-size: 14px; color: #94a3b8;');

// Add 3D tilt effect to about image
document.addEventListener('DOMContentLoaded', () => {
    const aboutImage = document.querySelector('.image-placeholder');
    if (aboutImage) {
        aboutImage.addEventListener('mousemove', (e) => {
            const rect = aboutImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            aboutImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        aboutImage.addEventListener('mouseleave', () => {
            aboutImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }
});
