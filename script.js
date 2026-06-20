// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .stat-item').forEach(el => {
    observer.observe(el);
});

// Subscribe form validation
const subscribeBtn = document.querySelector('.cta .btn-primary');
const emailInput = document.querySelector('.email-input');

if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            showNotification('Thank you for subscribing! 🎉', 'success');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address!', 'error');
        }
    });

    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            subscribeBtn.click();
        }
    });
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        background: rgba(15, 23, 42, 0.98);
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;
        z-index: 999;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translateY(10px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translateY(-10px);
    }
`;
document.head.appendChild(style);

// Navbar active link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for background shapes
window.addEventListener('scroll', () => {
    const shapes = document.querySelectorAll('.shape');
    const scrollPosition = window.pageYOffset;
    
    shapes.forEach((shape, index) => {
        shape.style.transform = `translateY(${scrollPosition * (0.5 + index * 0.1)}px)`;
    });
});

// Console message
console.log('%cWelcome to BrainToCode! 👋', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cSubscribe to the YouTube channel for more amazing content!', 'color: #ec4899; font-size: 14px;');