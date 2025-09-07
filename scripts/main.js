// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Navbar Scroll Effect - Add shadow on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }

    // Pricing Toggle - Bill Monthly/Yearly
    const billingButtons = document.querySelectorAll('.billing-btn');
    if (billingButtons.length > 0) {
        billingButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                billingButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Here you can add logic to update pricing based on selection
                updatePricing(this.textContent.includes('Yearly'));
            });
        });
    }

    // Update pricing function (placeholder for actual pricing logic)
    function updatePricing(isYearly) {
        const prices = document.querySelectorAll('.amount');
        const basePrices = [0, 8, 16]; // Base monthly prices
        
        prices.forEach((price, index) => {
            if (isYearly && basePrices[index] > 0) {
                // Calculate yearly price with discount
                const yearlyPrice = Math.floor(basePrices[index] * 10); // ~17% discount
                price.textContent = yearlyPrice;
            } else {
                price.textContent = basePrices[index];
            }
        });
        
        // Update save text visibility
        const saveTexts = document.querySelectorAll('.save-text');
        saveTexts.forEach(text => {
            text.style.display = isYearly ? 'block' : 'none';
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .benefits-list li');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Form Validation and Submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');
            
            // Basic validation
            if (!validateEmail(email.value)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (message && message.value.trim().length < 10) {
                showNotification('Please enter a message with at least 10 characters', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    });

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]');
            
            if (!validateEmail(email.value)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            showNotification('Successfully subscribed to newsletter!', 'success');
            email.value = '';
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#54D4C8' : type === 'error' ? '#FF6B6B' : '#333'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            font-size: 14px;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
            max-width: 350px;
        `;
        
        notification.querySelector('button').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: white;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                padding-top: 50px;
                transition: left 0.3s ease;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                z-index: 1000;
            }
            
            .nav-menu.active {
                left: 0;
                display: flex;
            }
            
            .nav-menu li {
                margin: 20px 0;
            }
            
            .nav-menu a {
                font-size: 18px;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
        
        .floating-card {
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        .hero-image img {
            animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.02);
            }
        }
        
        .feature-card:hover .feature-illustration {
            animation: bounce 0.5s ease;
        }
        
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(style);

    // Testimonial Carousel (if multiple testimonials)
    let currentTestimonial = 0;
    const testimonials = [
        {
            quote: "I am very helped by this E-wallet application , my days are very easy to use this application and its very helpful in my life , even I can pay a short time 💰",
            author: "Aria Zinanrio"
        },
        {
            quote: "This productivity dashboard has completely transformed how I manage my daily tasks. The interface is intuitive and the features are exactly what I needed.",
            author: "Sarah Johnson"
        },
        {
            quote: "The collaboration features are outstanding. Our team's efficiency has improved by 40% since we started using Biccas.",
            author: "Michael Chen"
        }
    ];

    const playTestimonialBtn = document.querySelector('.play-testimonial');
    if (playTestimonialBtn) {
        playTestimonialBtn.addEventListener('click', function() {
            nextTestimonial();
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        const quoteElement = document.querySelector('.testimonial-quote p');
        const authorElement = document.querySelector('.testimonial-author');
        
        if (quoteElement && authorElement) {
            // Add fade out effect
            quoteElement.style.opacity = '0';
            authorElement.style.opacity = '0';
            
            setTimeout(() => {
                quoteElement.textContent = testimonials[currentTestimonial].quote;
                authorElement.textContent = `_ ${testimonials[currentTestimonial].author}`;
                
                // Fade back in
                quoteElement.style.opacity = '1';
                authorElement.style.opacity = '1';
            }, 300);
        }
    }

    // Counter Animation for Stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Trigger counter animations when elements come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                if (target && !entry.target.classList.contains('animated')) {
                    animateCounter(entry.target, target);
                    entry.target.classList.add('animated');
                }
            }
        });
    });

    // Add data-target attributes to stat numbers (you can add these in HTML)
    const statNumbers = document.querySelectorAll('.amount, .income-amount, .income-value');
    statNumbers.forEach(stat => {
        const value = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        if (value > 0) {
            stat.dataset.target = value;
            stat.textContent = '0';
            statsObserver.observe(stat);
        }
    });

    // Particle effect for hero section (optional enhancement)
    function createParticles() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(84, 212, 200, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: float-particle ${Math.random() * 3 + 2}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 1;
            `;
            heroSection.appendChild(particle);
        }

        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(0px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }

    // Initialize particles (commented out by default for performance)
    // createParticles();

    // Loading Animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements in sequence
        const heroElements = [
            '.hero-text h1',
            '.hero-underline',
            '.hero-text p',
            '.hero-buttons',
            '.hero-image'
        ];
        
        heroElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    });

    // Scroll Progress Indicator
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(135deg, #54D4C8 0%, #4BC8BC 100%);
                z-index: 10001;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrolled + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Lazy loading for images
    const images = document.querySelectorAll('img[src*="public/assets/"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                const newImg = new Image();
                newImg.onload = () => {
                    img.src = newImg.src;
                    img.style.opacity = '1';
                };
                newImg.src = img.src;
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Console welcome message
    console.log(`
    🚀 Biccas Dashboard loaded successfully!
    
    ✨ Features:
    - Responsive design
    - Smooth scrolling
    - Form validation
    - Mobile navigation
    - Scroll animations
    - Progress indicator
    
    Built with vanilla JavaScript, HTML5, and CSS3
    `);
});

// Utility Functions
const Utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format number with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};