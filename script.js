// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: false,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Remove cursor tracking code
document.addEventListener('mousemove', () => {});

// Typed.js initialization
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

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navBar = document.querySelector('.nav-bar');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Skills animation
const skillItems = document.querySelectorAll('.skill-item');

const animateSkills = () => {
    skillItems.forEach(item => {
        const progress = item.getAttribute('data-progress');
        item.style.setProperty('--progress', progress + '%');
    });
};

// Intersection Observer for navbar
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

navObserver.observe(document.querySelector('.hero'));

// Form submission with validation
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);
    
    // Basic validation
    if (!formProps.name || !formProps.email || !formProps.message) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formProps.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    try {
        console.log('Form submitted:', formProps);
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error sending your message. Please try again.');
    }
});

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
});

// Scroll progress indicator
const scrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    document.documentElement.style.setProperty('--scroll', progress + '%');
};

window.addEventListener('scroll', scrollProgress);

// Active section highlight in navigation
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const highlightNavigation = () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// Initialize highlight on page load
highlightNavigation();

// Glow effect on hover for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.classList.add('glow');
    });
    
    button.addEventListener('mouseleave', () => {
        button.classList.remove('glow');
    });
});
