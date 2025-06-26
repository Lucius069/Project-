// Simple form submission handler
 document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('formMsg').style.display = 'block';
    setTimeout(function(){
        document.getElementById('formMsg').style.display = 'none';
        document.getElementById('contactForm').reset();
    }, 2000);
});

// Toggle navigation menu visibility
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
    }
});

// Optional: Hide nav when clicking outside on mobile/desktop
document.addEventListener('click', function(event) {
    if (
        navMenu.style.display === 'flex' &&
        !navMenu.contains(event.target) &&
        !navToggle.contains(event.target)
    ) {
        navMenu.style.display = 'none';
    }
});

// Optional: Pause carousel on hover
document.addEventListener('DOMContentLoaded', function() {
    const logoCarousel = document.querySelector('.logo-carousel');
    const logoSlides = document.querySelectorAll('.logo-slide');
    
    if (logoCarousel && logoSlides.length) {
        logoCarousel.addEventListener('mouseenter', function() {
            logoSlides.forEach(slide => {
                slide.style.animationPlayState = 'paused';
            });
        });
        
        logoCarousel.addEventListener('mouseleave', function() {
            logoSlides.forEach(slide => {
                slide.style.animationPlayState = 'running';
            });
        });
    }
    
    // Optional: Add entrance animations on scroll
    function revealOnScroll() {
        const footer = document.querySelector('.site-footer');
        
        if (footer) {
            const footerPosition = footer.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (footerPosition < screenPosition) {
                // Add animation classes when footer comes into view
                document.querySelectorAll('.link-column').forEach((column, index) => {
                    column.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
                    column.style.opacity = '0';
                });
            }
        }
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check initial state
});
 
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-links');
    
    toggle.addEventListener('click', function() {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
    });
  });
  
// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const mainNav = document.querySelector('.main-nav');

if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
}

// Hero Slider
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function showSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    
    if (index >= heroSlides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = heroSlides.length - 1;
    } else {
        currentSlide = index;
    }
    
    heroSlides[currentSlide].classList.add('active');
}

// Auto-rotate hero slides (uncomment for production)
// setInterval(() => showSlide(currentSlide + 1), 6000);

// Campus Slider
const campusSlides = document.querySelectorAll('.campus-slide');
const prevBtn = document.querySelector('.campus-nav .prev');
const nextBtn = document.querySelector('.campus-nav .next');
let currentCampusSlide = 0;

// Hide all slides except the first one
for (let i = 1; i < campusSlides.length; i++) {
    campusSlides[i].style.opacity = 0;
}

function showCampusSlide(index) {
    // Hide current slide
    campusSlides[currentCampusSlide].style.opacity = 0;
    
    // Update index
    if (index >= campusSlides.length) {
        currentCampusSlide = 0;
    } else if (index < 0) {
        currentCampusSlide = campusSlides.length - 1;
    } else {
        currentCampusSlide = index;
    }
    
    // Show new slide
    campusSlides[currentCampusSlide].style.opacity = 1;
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => showCampusSlide(currentCampusSlide - 1));
    nextBtn.addEventListener('click', () => showCampusSlide(currentCampusSlide + 1));
}

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial-card');
const indicators = document.querySelectorAll('.indicator');
let currentTestimonial = 0;

function showTestimonial(index) {
    // Remove active class from all
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Update index
    if (index >= testimonials.length) {
        currentTestimonial = 0;
    } else if (index < 0) {
        currentTestimonial = testimonials.length - 1;
    } else {
        currentTestimonial = index;
    }
    
    // Add active class to current
    testimonials[currentTestimonial].classList.add('active');
    indicators[currentTestimonial].classList.add('active');
}

// Add click events to indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showTestimonial(index));
});

// Auto-rotate testimonials (uncomment for production)
// setInterval(() => showTestimonial(currentTestimonial + 1), 5000);

// Animated Counter for Stats
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // ms
    const step = Math.ceil(target / (duration / 50)); // Update every 50ms
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = current;
        }
    }, 50);
}

// Intersection Observer for Stats Animation
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            animateCounter(statNumber);
            observer.unobserve(statNumber);
        }
    });
}, observerOptions);

statNumbers.forEach(statNumber => {
    statsObserver.observe(statNumber);
});

// Search button feedback
document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    searchBtn.addEventListener('click', function () {
      const query = searchInput.value.trim();
      if (query) {
        alert('Searching for: ' + query);
        // Implement actual search logic here
      } else {
        alert('Please enter a course to search.');
      }
    });
  
    // Card animation on scroll
    const cards = document.querySelectorAll('.info-card, .program-card');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.opacity = 1;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    cards.forEach(card => {
      card.style.transform = 'translateY(30px)';
      card.style.opacity = 0;
      observer.observe(card);
    });
  });
 
  /* Scroll behavior JS (add to your main script) */
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// Unified scroll event for .site-header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Unified mobile menu toggle logic
document.addEventListener('DOMContentLoaded', function () {
    // Try all possible toggles and navs for compatibility
    const toggles = [
        document.querySelector('.menu-toggle'),
        document.querySelector('.nav-toggle'),
        document.querySelector('.mobile-toggle')
    ].filter(Boolean);

    const navs = [
        document.querySelector('.main-nav'),
        document.getElementById('navMenu'),
        document.querySelector('.nav-links')
    ].filter(Boolean);

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navs.forEach(nav => nav.classList.toggle('active'));
        });
    });
});

