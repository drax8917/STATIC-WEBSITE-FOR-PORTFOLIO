// Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const navbar = document.querySelector('.navbar');

// Toggle Navigation
burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Form Submission with Animation
const contactForm = document.getElementById('contact-form');
const formGroups = document.querySelectorAll('.form-group');

// Add focus effects to form inputs
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    input.addEventListener('focus', () => {
        group.classList.add('focused');
    });
    input.addEventListener('blur', () => {
        if (!input.value) {
            group.classList.remove('focused');
        }
    });
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Add loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        console.log('Form submitted:', { name, email, message });
        
        // Show success message with animation
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        contactForm.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        formGroups.forEach(group => group.classList.remove('focused'));
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }, 1500);
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('skill-card')) {
                entry.target.style.animationDelay = `${entry.target.dataset.delay}s`;
            }
        }
    });
}, observerOptions);

// Observe all sections and elements
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.dataset.delay = index * 0.1;
    observer.observe(card);
});

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Typing Effect for Hero Section
const heroTitle = document.querySelector('.hero h1');
const text = heroTitle.textContent;
heroTitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing effect when page loads
window.addEventListener('load', typeWriter);

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.cta-button, .submit-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        ripple.classList.add('active');
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}); 