// ===== Page Loader =====
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('pageLoader');
    const progress = document.getElementById('loaderProgress');
    
    let loadProgress = 0;
    const loadInterval = setInterval(() => {
        loadProgress += Math.random() * 30;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadInterval);
            
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 600);
            }, 300);
        }
        progress.style.width = loadProgress + '%';
    }, 100);
});

// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
}, { passive: true });

// ===== Mobile Menu Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
    document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('mobile-open');
        document.body.style.overflow = '';
    });
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Hero Mouse Tracking Effect =====
const hero = document.getElementById('hero');
const heroCenter = document.querySelector('.hero-center');

if (hero && heroCenter && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('mousemove', function(e) {
        const rect = hero.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const offsetX = (mouseX - centerX) / centerX * 15;
        const offsetY = (mouseY - centerY) / centerY * 15;
        
        heroCenter.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    });
    
    hero.addEventListener('mouseleave', function() {
        heroCenter.style.transform = 'translate(-50%, -50%)';
    });
}

// ===== Scroll Animations with Intersection Observer =====
const animateElements = document.querySelectorAll('.section-header, .about-content, .about-images, .service-item, .portfolio-item, .portfolio-cta, .cta-content');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll', 'visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    el.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(el);
});

// ===== Service Items Parallax Effect =====
const serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach(item => {
    const serviceImage = item.querySelector('.service-image');
    
    if (serviceImage && window.matchMedia('(pointer: fine)').matches) {
        item.addEventListener('mousemove', function(e) {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / centerX * 20;
            const moveY = (y - centerY) / centerY * 10;
            
            serviceImage.style.transform = `translateY(-50%) translate(${moveX}px, ${moveY}px) scale(1)`;
        });
        
        item.addEventListener('mouseleave', function() {
            serviceImage.style.transform = 'translateY(-50%) scale(0.9)';
        });
    }
});

// ===== Testimonials Slider =====
const testimonialsTrack = document.getElementById('testimonialsTrack');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
const testimonialDots = document.querySelectorAll('.testimonials-dots .dot');

let currentSlide = 0;
let autoSlideInterval;

function goToSlide(index) {
    if (index < 0) index = testimonialSlides.length - 1;
    if (index >= testimonialSlides.length) index = 0;
    
    currentSlide = index;
    
    // Update track position
    testimonialsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update slides
    testimonialSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
    
    // Update dots
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 6000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Event listeners
if (testimonialPrev && testimonialNext) {
    testimonialPrev.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    testimonialNext.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });
}

// Dot navigation
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        stopAutoSlide();
        startAutoSlide();
    });
});

// Start auto-slide
startAutoSlide();

// Pause on hover
const testimonialsSlider = document.querySelector('.testimonials-slider');
if (testimonialsSlider) {
    testimonialsSlider.addEventListener('mouseenter', stopAutoSlide);
    testimonialsSlider.addEventListener('mouseleave', startAutoSlide);
}

// ===== Portfolio Items Hover Effect =====
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '';
    });
});

// ===== Stats Counter Animation =====
const statValues = document.querySelectorAll('.stat-value');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const finalValue = element.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, ''));
            const suffix = finalValue.replace(/[0-9]/g, '');
            
            let currentValue = 0;
            const increment = numericValue / 50;
            const duration = 1500;
            const stepTime = duration / 50;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(counter);
                }
                element.textContent = Math.floor(currentValue) + suffix;
            }, stepTime);
            
            statsObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

statValues.forEach(stat => statsObserver.observe(stat));

// ===== Navbar Hide/Show on Scroll Direction =====
let scrollDirection = 'up';
let scrollTimeout;

window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            scrollDirection = 'down';
            navbar.style.transform = 'translateY(-100%)';
        } else {
            scrollDirection = 'up';
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, 50);
}, { passive: true });

navbar.style.transition = 'transform 0.4s var(--ease-out-quart), background 0.4s var(--ease-out-quart), padding 0.4s var(--ease-out-quart)';

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinkElements = document.querySelectorAll('.nav-link');

const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            navLinkElements.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

sections.forEach(section => activeSectionObserver.observe(section));

// ===== Touch/Swipe Support for Testimonials =====
let touchStartX = 0;
let touchEndX = 0;

if (testimonialsTrack) {
    testimonialsTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    testimonialsTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        stopAutoSlide();
        startAutoSlide();
    }
}

// ===== Keyboard Navigation for Testimonials =====
document.addEventListener('keydown', (e) => {
    const testimonialsSection = document.getElementById('testimonials');
    const rect = testimonialsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    }
});

// ===== Reduced Motion Support =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable auto-slide for users who prefer reduced motion
    stopAutoSlide();
    
    // Remove transition delays
    animateElements.forEach(el => {
        el.style.transitionDelay = '0s';
    });
}

// ===== Console Welcome Message =====
console.log('%c Exvia Studio ', 'background: #131313; color: #fff; padding: 8px 16px; font-size: 14px; font-weight: bold;');
console.log('%c Welcome to our website! ', 'color: #131313; font-size: 12px;');
