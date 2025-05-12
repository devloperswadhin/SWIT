// DOM Elements
const contactForm = document.getElementById('contact-form');
const projectCards = document.querySelectorAll('.project-card');

// Form Handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you can add form submission logic
    console.log('Form submitted:', data);
    
    // Reset form
    contactForm.reset();
    
    // Show success message (can be enhanced)
    alert('Message sent successfully!');
});

// Smooth Scroll for Navigation (can be added when navigation is implemented)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations (prepared for future use)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Future animation elements can be observed here
// Example: document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Prepared for future dark/light mode toggle
const toggleTheme = () => {
    document.body.classList.toggle('light-mode');
    // Add theme switching logic here
};

// Project filtering function (for future use)
const filterProjects = (category) => {
    projectCards.forEach(card => {
        // Add filtering logic here
    });
};

// Window load event for potential preloader
window.addEventListener('load', () => {
    // Add page load animations or functionality here
});

// Intro Animation Handler
document.addEventListener('DOMContentLoaded', () => {
    const introSound = document.getElementById('intro-sound');
    const body = document.body;

    // Add class to prevent scroll during intro
    body.classList.add('intro-playing');

    // Play sound with user interaction
    const playIntro = () => {
        introSound.play().catch(error => console.log('Audio playback failed:', error));
        document.removeEventListener('click', playIntro);
    };

    document.addEventListener('click', playIntro);

    // Remove intro-playing class after animation
    setTimeout(() => {
        body.classList.remove('intro-playing');
    }, 4000);
});