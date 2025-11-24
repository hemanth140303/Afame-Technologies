// ===================================
// MODERN PORTFOLIO JAVASCRIPT
// Mobile-first responsive functionality
// ===================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: false,
    offset: 100,
    easing: 'ease-out-cubic',
    disable: 'mobile' // Disable animations on mobile for better performance
});

// ===================================
// TYPED.JS INITIALIZATION
// ===================================

const typed = new Typed('.typed-text', {
    strings: [
        'Yeruva Hemanth Reddy',
        'a Computer Science Student',
        'a Problem Solver'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|',
    autoInsertCss: true
});

// ===================================
// MOBILE MENU FUNCTIONALITY
// ===================================

const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navBar = document.querySelector('.nav-bar');
const body = document.body;
let focusableElements = [];
let firstFocusableElement = null;
let lastFocusableElement = null;
let previousFocusElement = null;

// Get all focusable elements within the navigation
const getFocusableElements = () => {
    const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ];
    return Array.from(navLinks.querySelectorAll(focusableSelectors.join(', ')))
        .filter(element => {
            return element.offsetWidth > 0 || element.offsetHeight > 0;
        });
};

// Set up focus trap
const setupFocusTrap = () => {
    focusableElements = getFocusableElements();
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    if (firstFocusableElement) {
        firstFocusableElement.focus();
    }
};

// Handle focus trap keydown events
const handleFocusTrap = (e) => {
    if (!navLinks.classList.contains('active')) return;
    
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                lastFocusableElement?.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                firstFocusableElement?.focus();
            }
        }
    }
};

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
    const isActive = menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active', isActive);
    
    // Update ARIA attributes for accessibility
    menuBtn.setAttribute('aria-expanded', isActive);
    
    // Prevent body scroll when menu is open
    body.style.overflow = isActive ? 'hidden' : '';
    
    // Handle focus trap
    if (isActive) {
        previousFocusElement = document.activeElement;
        setupFocusTrap();
        document.addEventListener('keydown', handleFocusTrap);
    } else {
        document.removeEventListener('keydown', handleFocusTrap);
        previousFocusElement?.focus();
    }
    
    // Add backdrop blur effect
    if (isActive) {
        navBar.style.backdropFilter = 'blur(20px)';
    } else {
        setTimeout(() => {
            if (!navLinks.classList.contains('active')) {
                navBar.style.backdropFilter = 'blur(10px)';
            }
        }, 300);
    }
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && 
        !navLinks.contains(e.target) && 
        navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Helper function to close mobile menu
function closeMobileMenu() {
    menuBtn.classList.remove('active');
    navLinks.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
    navBar.style.backdropFilter = 'blur(10px)';
    
    // Clean up focus trap
    document.removeEventListener('keydown', handleFocusTrap);
    previousFocusElement?.focus();
}

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Account for fixed header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navOptions = {
    rootMargin: '-100px 0px 0px 0px'
};

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
    });
}, navOptions);

// Observe hero section for navbar effects
const heroSection = document.querySelector('.hero');
if (heroSection) {
    navObserver.observe(heroSection);
}

// ===================================
// ACTIVE NAVIGATION HIGHLIGHT
// ===================================

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const highlightNavigation = () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 150; // Offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && 
            scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
};

// Throttle scroll events for better performance
let scrollTimer;
window.addEventListener('scroll', () => {
    if (scrollTimer) {
        clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
        highlightNavigation();
    }, 100);
});

// Initialize on page load
highlightNavigation();

// ===================================
// SKILLS ANIMATION
// ===================================

const skillItems = document.querySelectorAll('.skill-card');
const skillsAnimated = new Set();

const animateSkills = () => {
    skillItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !skillsAnimated.has(item)) {
            const progress = item.getAttribute('data-progress');
            const progressBar = item.querySelector('.progress-bar');
            
            if (progressBar) {
                progressBar.style.setProperty('--progress', progress + '%');
                skillsAnimated.add(item);
            }
        }
    });
};

// Observe skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            }
        });
    }, { threshold: 0.1 });
    
    skillsObserver.observe(skillsSection);
}

// ===================================
// PROJECT CARD INTERACTIONS - TILT EFFECTS DISABLED
// ===================================

const projectCards = document.querySelectorAll('.project-card');

// Tilt effects have been removed - project cards are now static

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================

const updateScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    document.documentElement.style.setProperty('--scroll', progress + '%');
};

// Throttle scroll progress updates
window.addEventListener('scroll', () => {
    if (scrollTimer) {
        clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
        updateScrollProgress();
    }, 50);
});

// ===================================
// CONTACT ITEM INTERACTIONS
// ===================================

const contactItems = document.querySelectorAll('.contact-item');

contactItems.forEach(item => {
    // Add ripple effect on click
    item.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(100, 255, 218, 0.3);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

// Lazy load images when they come into view
const images = document.querySelectorAll('img[loading="lazy"]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// ERROR HANDLING
// ===================================

// Handle any JavaScript errors gracefully
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Handle promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===================================
// INITIALIZATION
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    updateScrollProgress();
    animateSkills();
    
    // Add loading complete class
    body.classList.add('loaded');
    
    console.log('Portfolio initialized successfully 🚀');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page is visible
        document.body.style.animationPlayState = 'running';
    }
});
