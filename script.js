// Initialize AOS (Animate on Scroll) only on larger screens
if (window.innerWidth > 768) {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });
}

// WhatsApp JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing WhatsApp...');
    
    const whatsappButton = document.getElementById('whatsapp-button');
    const whatsappPopup = document.getElementById('whatsapp-popup');
    const whatsappClose = document.getElementById('whatsapp-close');
    const whatsappOptions = document.querySelectorAll('.whatsapp-option');
    const whatsappNumber = '+27638629975';
    
    if (!whatsappButton || !whatsappPopup || !whatsappClose) {
        console.error('WhatsApp elements not found!');
        return;
    }
    
    let popupOpen = false;
    
    function openWhatsApp(message = 'Hi! I found your website and would like to know more about your services.') {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        console.log('Opening WhatsApp:', whatsappUrl);
        window.open(whatsappUrl, '_blank');
        
        popupOpen = false;
        whatsappPopup.classList.remove('active');
    }
    
    function togglePopup() {
        popupOpen = !popupOpen;
        console.log('Toggle popup:', popupOpen);
        
        if (popupOpen) {
            whatsappPopup.classList.add('active');
        } else {
            whatsappPopup.classList.remove('active');
        }
    }
    
    // Button click
    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('WhatsApp button clicked');
        
        if (popupOpen) {
            openWhatsApp();
        } else {
            togglePopup();
        }
    });
    
    // Close button
    whatsappClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        togglePopup();
    });
    
    // Option clicks
    whatsappOptions.forEach(function(option) {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const message = this.getAttribute('data-message');
            openWhatsApp(message);
        });
    });
    
    // Click outside to close
    document.addEventListener('click', function(e) {
        if (popupOpen && !whatsappButton.contains(e.target) && !whatsappPopup.contains(e.target)) {
            popupOpen = false;
            whatsappPopup.classList.remove('active');
        }
    });
    
    console.log('✅ WhatsApp initialized successfully!');
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Service Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Remove active class from all filter buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter project cards
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Project Gallery Modal
const modal = document.getElementById('gallery-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalClose = document.querySelector('.modal-close');

// Add click handlers to project cards
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('.project-image img');
        const title = card.querySelector('.project-info h4').textContent;
        const description = card.querySelector('.project-info p').textContent;
        
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Testimonials Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const navDots = document.querySelectorAll('.nav-dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach(card => card.classList.remove('active'));
    navDots.forEach(dot => dot.classList.remove('active'));
    
    // Show current testimonial
    testimonialCards[index].classList.add('active');
    navDots[index].classList.add('active');
    
    currentTestimonial = index;
}

// Navigation dots
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const elementPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling with Google Sheets
const contactForm = document.getElementById('contact-form');
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzdEjBW8cpfs8UZmWk195lcI_NX2AJSzc7EVe6T3XaxBN5VH2aXqm-Xe5tr3KVuCXE/exec';

// Form inputs selection - SINGLE DECLARATION
const formInputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');

// Enhanced form validation with real-time feedback
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
        clearFieldError(this);
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
        validateField(this);
    });
    
    // Real-time validation for better UX
    input.addEventListener('input', function() {
        if (this.value) {
            this.parentElement.classList.add('focused');
            clearFieldError(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'firstName':
            if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters';
                isValid = false;
            } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                errorMessage = 'Name can only contain letters, spaces, hyphens and apostrophes';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'phone':
            const cleanPhone = value.replace(/\D/g, '');
            if (cleanPhone.length < 10) {
                errorMessage = 'Please enter a valid phone number (at least 10 digits)';
                isValid = false;
            }
            break;
            
        case 'service':
            if (value === '') {
                errorMessage = 'Please select a service';
                isValid = false;
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters';
                isValid = false;
            } else if (value.length > 1000) {
                errorMessage = 'Message cannot exceed 1000 characters';
                isValid = false;
            }
            break;
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 13px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
        animation: shakeError 0.3s ease-in-out;
    `;
    
    field.parentElement.appendChild(errorElement);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Form validation before submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isFormValid = true;
    
    formInputs.forEach(input => {
        if (input.hasAttribute('required')) {
            if (!validateField(input)) {
                isFormValid = false;
            }
        }
    });
    
    if (!isFormValid) {
        // Scroll to first error
        const firstError = document.querySelector('.field-error');
        if (firstError) {
            firstError.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
        
        // Show validation error message
        const validationMessage = document.createElement('div');
        validationMessage.className = 'form-message error-message';
        validationMessage.innerHTML = `
            <div class="message-content">
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Please Fix the Errors Below</h4>
                <p>Some fields need your attention before we can submit your form.</p>
            </div>
        `;
        
        removeExistingMessages();
        this.parentNode.insertBefore(validationMessage, this);
        
        setTimeout(() => validationMessage.remove(), 5000);
        return false;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(this);
    
    // Convert FormData to a JSON object
    const payload = {
        formType: "AMS-Projects23" // Set the formType as required
    };
    for (let [key, value] of formData) {
        payload[key] = value;
    }
    
    console.log('Submitting form data:', payload);
    
    // Submit to Google Apps Script
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json', // Change content type to JSON
        },
        body: JSON.stringify(payload) // Send JSON string in the body
    })
    .then(() => {
        console.log('Form submitted successfully');
        // Show success message
        showSuccessMessage();
        
        // Track form submission
        if (typeof trackFormSubmit === 'function') {
            trackFormSubmit('google_sheets_contact');
        }
        
        // Track with Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'lead_generation',
                'event_label': 'contact_form_success',
                'value': 1
            });
        }
        
        // Reset form
        this.reset();
        
        // Remove focused classes
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('focused');
        });
        
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorMessage();
        
        // Track error
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_error', {
                'event_category': 'lead_generation',
                'event_label': 'contact_form_error',
                'value': 0
            });
        }
    })
    .finally(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});

function showSuccessMessage() {
    // Remove any existing messages
    removeExistingMessages();
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-message success-message';
    successMessage.innerHTML = `
        <div class="message-content">
            <i class="fas fa-check-circle"></i>
            <h4>Thank You!</h4>
            <p>Your message has been sent successfully. We'll get back to you within <strong>24 hours</strong>.</p>
            <div class="message-actions">
                <a href="tel:+27638629975" class="btn-call" onclick="trackCall('form_success')">
                    <i class="fas fa-phone"></i> Need Urgent Help? Call Now
                </a>
                <a href="https://wa.me/27638629975" target="_blank" class="btn-call" style="background: #25d366;">
                    <i class="fab fa-whatsapp"></i> Chat on WhatsApp
                </a>
            </div>
            <div class="success-details">
                <p><small>📧 Confirmation email sent to your inbox<br>
                🕒 Our team will contact you within 24 hours<br>
                📞 For emergencies, call +27 63 862 9975</small></p>
            </div>
        </div>
    `;
    
    // Insert message
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(successMessage, form);
    
    // Scroll to message with smooth animation
    setTimeout(() => {
        successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 100);
    
    // Auto-remove after 12 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.style.animation = 'slideOutToTop 0.5s ease-in';
            setTimeout(() => successMessage.remove(), 500);
        }
    }, 12000);
}

function showErrorMessage() {
    // Remove any existing messages
    removeExistingMessages();
    
    // Create error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'form-message error-message';
    errorMessage.innerHTML = `
        <div class="message-content">
            <i class="fas fa-exclamation-triangle"></i>
            <h4>Oops! Something went wrong</h4>
            <p>There was an error sending your message. Please try one of the options below:</p>
            <div class="message-actions">
                <button class="btn-retry" onclick="retryFormSubmission()">
                    <i class="fas fa-redo"></i> Try Again
                </button>
                <a href="tel:+27638629975" class="btn-call" onclick="trackCall('form_error')">
                    <i class="fas fa-phone"></i> Call Us Instead
                </a>
                <a href="mailto:info@amsprojects23.co.za" class="btn-call" style="background: #3b82f6;">
                    <i class="fas fa-envelope"></i> Send Email
                </a>
            </div>
            <div class="error-details">
                <p><small>📞 Alternative contact methods:<br>
                📱 Phone: +27 63 862 9975<br>
                📧 Email: info@amsprojects23.co.za<br>
                💬 WhatsApp: <a href="https://wa.me/27638629975" target="_blank" style="color: #25d366;">Chat Now</a></small></p>
            </div>
        </div>
    `;
    
    // Insert message
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(errorMessage, form);
    
    // Scroll to message
    setTimeout(() => {
        errorMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 100);
}

function retryFormSubmission() {
    removeExistingMessages();
    document.getElementById('contact-form').dispatchEvent(new Event('submit'));
}

function removeExistingMessages() {
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => {
        msg.style.animation = 'slideOutToTop 0.3s ease-in';
        setTimeout(() => msg.remove(), 300);
    });
}

// Test function - you can call this from browser console to test
function testFormSubmission() {
    const testData = {
        firstName: 'Test User',
        email: 'test@example.com',
        phone: '+27123456789',
        service: 'solar',
        budget: '50k-100k',
        message: 'This is a test submission to verify the form is working correctly.'
    };
    
    const params = new URLSearchParams();
    Object.keys(testData).forEach(key => {
        params.append(key, testData[key]);
    });
    
    console.log('Testing form submission...');
    
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
    })
    .then(() => {
        console.log('✅ Test submission successful!');
        alert('Test submission sent! Check your Google Sheet and email.');
    })
    .catch(error => {
        console.error('❌ Test submission failed:', error);
        alert('Test submission failed. Check console for details.');
    });
}

// Header Scroll Effect
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Hero Slideshow
const heroSlides = document.querySelectorAll('.hero-slide');
const slideIndicators = document.querySelectorAll('.slideshow-indicators .indicator');
let currentSlide = 0;

function showSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        slideIndicators[i].classList.remove('active');
    });
    heroSlides[index].classList.add('active');
    slideIndicators[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
}

// Auto-advance slides
setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Manual navigation via indicators
slideIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Prevent horizontal scroll on mobile
function preventHorizontalScroll() {
    const body = document.body;
    const html = document.documentElement;
    
    body.style.overflowX = 'hidden';
    html.style.overflowX = 'hidden';
    body.style.maxWidth = '100vw';
    html.style.maxWidth = '100vw';
}

// Run on load
preventHorizontalScroll();

// Re-run on resize
window.addEventListener('resize', preventHorizontalScroll);

// Performance optimization: Reduce main thread blocking
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        console.log('🔧 AMS Projects 23 - Mobile optimizations complete!');
    });
}

// Touch-friendly interactions for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch feedback for buttons
    document.querySelectorAll('.btn, .tab-btn, .filter-btn').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Enhanced WhatsApp Button with Cool Interactions
document.addEventListener('DOMContentLoaded', function() {
    const whatsappContainer = document.querySelector('.whatsapp-container');
    const whatsappFloat = document.getElementById('whatsapp-float');
    const whatsappPopup = document.getElementById('whatsapp-popup');
    
    if (whatsappContainer && whatsappFloat && whatsappPopup) {
        // Auto-show popup after 10 seconds
        setTimeout(() => {
            whatsappPopup.style.opacity = '1';
            whatsappPopup.style.visibility = 'visible';
            whatsappPopup.style.transform = 'translateY(0) scale(1)';
            
            // Auto-hide popup after 4 seconds
            setTimeout(() => {
                whatsappPopup.style.opacity = '0';
                whatsappPopup.style.visibility = 'hidden';
                whatsappPopup.style.transform = 'translateY(10px) scale(0.8)';
            }, 4000);
        }, 10000);
        
        // Show popup on hover
        whatsappContainer.addEventListener('mouseenter', function() {
            whatsappPopup.style.opacity = '1';
            whatsappPopup.style.visibility = 'visible';
            whatsappPopup.style.transform = 'translateY(0) scale(1)';
        });
        
        // Hide popup when not hovering
        whatsappContainer.addEventListener('mouseleave', function() {
            whatsappPopup.style.opacity = '0';
            whatsappPopup.style.visibility = 'hidden';
            whatsappPopup.style.transform = 'translateY(10px) scale(0.8)';
        });
        
        // Add click animation
        whatsappFloat.addEventListener('click', function(e) {
            // Create ripple effect on click
            const ripple = document.createElement('div');
            ripple.className = 'click-ripple';
            ripple.style.cssText = `
                position: absolute;
                width: 30px;
                height: 30px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: clickRipple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    }
});

// Add click ripple animation CSS
const clickRippleCSS = `
@keyframes clickRipple {
    to {
        transform: translate(-50%, -50%) scale(2);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = clickRippleCSS;
document.head.appendChild(style);

console.log('🚀 AMS Projects 23 - Complete Mobile-First Website Loaded Successfully!');