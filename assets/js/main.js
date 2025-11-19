// ============================================
// JAFF STUDIO - MAIN JAVASCRIPT
// ============================================

// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Active Navigation Link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Smooth Scroll for Anchor Links
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

// Form Submission Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to a server
        console.log('Form submitted:', data);

        // Show success message
        alert('Thank you for your message! We will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .feature-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stats Counter Animation
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumbers = entry.target.querySelectorAll('.stat-item h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (!isNaN(target)) {
                    stat.textContent = '0+';
                    animateCounter(stat, target);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection.parentElement);
}

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// INTERACTIVE ELEMENTS
// ============================================

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

if (backToTopBtn) {
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress');

if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Animate testimonial cards on scroll
document.querySelectorAll('.testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Animate portfolio items on scroll
document.querySelectorAll('.portfolio-item, .blog-card, .team-member, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// LANGUAGE SWITCHING
// ============================================

// Language selector functionality
document.addEventListener('DOMContentLoaded', () => {
    const languageBtn = document.getElementById('language-btn');
    const languageDropdown = document.getElementById('language-dropdown');
    const currentLangSpan = document.getElementById('current-lang');
    const langOptions = document.querySelectorAll('.lang-option');

    if (!languageBtn || !languageDropdown) return;

    // Load saved language
    const savedLang = getCurrentLanguage();
    updateLanguageDisplay(savedLang);

    // Toggle dropdown
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-selector')) {
            languageDropdown.classList.remove('show');
        }
    });

    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const selectedLang = option.getAttribute('data-lang');

            if (setLanguage(selectedLang)) {
                updateLanguageDisplay(selectedLang);
                languageDropdown.classList.remove('show');

                // Dispatch event for other components (like chatbot)
                window.dispatchEvent(new CustomEvent('languageChanged', {
                    detail: { language: selectedLang }
                }));

                // Update page content if needed
                updatePageLanguage(selectedLang);
            }
        });
    });

    function updateLanguageDisplay(lang) {
        const langMap = {
            'en': 'EN',
            'fr': 'FR',
            'de': 'DE'
        };
        if (currentLangSpan) {
            currentLangSpan.textContent = langMap[lang] || 'EN';
        }

        // Update active state
        langOptions.forEach(opt => {
            if (opt.getAttribute('data-lang') === lang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    function updatePageLanguage(lang) {
        // Update navigation links (data-translate attributes)
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = getTranslation(key, lang);
        });

        // Update any buttons or CTAs with translations
        updateCommonElements(lang);
    }

    function updateCommonElements(lang) {
        // Update common buttons if they exist
        const bookButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
        bookButtons.forEach(btn => {
            const href = btn.getAttribute('href');
            if (href && href.includes('booking.html')) {
                btn.textContent = getTranslation('common.bookConsultation', lang);
            }
        });
    }
});

// Add CSS for language selector
const style = document.createElement('style');
style.textContent = `
    .language-selector {
        position: relative;
        margin-left: 1rem;
    }

    .language-btn {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid var(--border-color);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        color: var(--white);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        transition: all 0.3s;
    }

    .language-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: var(--white);
    }

    .language-dropdown {
        position: absolute;
        top: calc(100% + 0.5rem);
        right: 0;
        background: rgba(10, 10, 10, 0.98);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        padding: 0.5rem;
        min-width: 150px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s;
        z-index: 1000;
        backdrop-filter: blur(10px);
    }

    .language-dropdown.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .lang-option {
        width: 100%;
        background: transparent;
        border: none;
        padding: 0.75rem 1rem;
        color: var(--white);
        cursor: pointer;
        text-align: left;
        border-radius: 6px;
        transition: all 0.2s;
        font-size: 0.95rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .lang-option:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .lang-option.active {
        background: rgba(255, 255, 255, 0.15);
        font-weight: 600;
    }

    .quick-option-btn {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid var(--border-color);
        padding: 0.8rem 1rem;
        border-radius: 8px;
        color: var(--white);
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.95rem;
        text-align: left;
    }

    .quick-option-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: var(--white);
        transform: translateX(5px);
    }

    @media (max-width: 768px) {
        .language-selector {
            margin-left: 0;
            margin-right: 1rem;
        }
    }
`;
document.head.appendChild(style);
