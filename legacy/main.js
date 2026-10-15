// Personal Website JavaScript - Main functionality and animations

// Global variables
let particleSystem;
let typed;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTypewriter();
    initializeScrollAnimations();
    initializeNavigation();
    initializeRevealAnimations();
    initializeHeadlineAnimations();
});

// Typewriter effect for hero section
function initializeTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;
    
    typed = new Typed('#typed-text', {
        strings: [
            'AI Developer',
            'Software Engineering Student',
            'Machine Learning Engineer',
            'Full-Stack Developer'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Headline animations using Splitting.js
function initializeHeadlineAnimations() {
    // Initialize Splitting.js for text animations
    if (typeof Splitting !== 'undefined') {
        Splitting();
        
        // Animate split text on scroll
        const splitTexts = document.querySelectorAll('[data-splitting]');
        const splitObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const chars = entry.target.querySelectorAll('.char');
                    anime({
                        targets: chars,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 800,
                        delay: anime.stagger(50),
                        easing: 'easeOutCubic'
                    });
                }
            });
        }, { threshold: 0.5 });
        
        splitTexts.forEach(text => splitObserver.observe(text));
    }
}

// Scroll animations and reveal effects
function initializeScrollAnimations() {
    // Smooth scroll for navigation links
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
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-bg');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Active navigation state
    function updateActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    updateActiveNav();
    
    // Scroll spy for sections
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Reveal animations on scroll
function initializeRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Stagger animation for cards
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Form handling (for contact page)
function handleFormSubmission(form) {
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            form.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Skills animation (for about page)
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const percentage = bar.dataset.percentage;
        const fill = bar.querySelector('.skill-fill');
        
        anime({
            targets: fill,
            width: `${percentage}%`,
            duration: 1000,
            easing: 'easeOutCubic',
            delay: 200
        });
    });
}

// Project filtering (for projects page)
function initializeProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.dataset.categories.split(',');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 500,
                        easing: 'easeOutCubic'
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: 0,
                        translateY: -20,
                        duration: 300,
                        easing: 'easeInCubic',
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Resume download functionality
function handleResumeDownload() {
    const downloadBtn = document.getElementById('download-resume');
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', function() {
        // Simulate download (replace with actual PDF URL)
        const link = document.createElement('a');
        link.href = '#'; // Replace with actual resume PDF URL
        link.download = 'Ken_Wu_Resume.pdf';
        link.click();
        
        showNotification('Resume download started!', 'success');
    });
}

// Initialize page-specific functionality
function initializePageSpecific() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'about.html':
            animateSkills();
            break;
        case 'projects.html':
            initializeProjectFiltering();
            break;
        case 'contact.html':
            const contactForm = document.getElementById('contact-form');
            handleFormSubmission(contactForm);
            break;
    }
}

// Call page-specific initialization
document.addEventListener('DOMContentLoaded', initializePageSpecific);

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Recalculate particle system if needed
    if (typeof p !== 'undefined' && p.windowResized) {
        p.windowResized();
    }
}, 250));

// Export functions for global access
window.PersonalWebsite = {
    showNotification,
    handleFormSubmission,
    animateSkills,
    initializeProjectFiltering
};