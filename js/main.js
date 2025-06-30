// Language Management
let currentLanguage = localStorage.getItem('cv_lang') || 'en';

// Language data
const translations = {
    en: {
        'Home': 'Home',
        'Ana Sayfa': 'Home',
        'About': 'About',
        'Hakkında': 'About',
        'Experience': 'Experience',
        'Deneyim': 'Experience',
        'Projects': 'Projects',
        'Projeler': 'Projects',
        'Blog': 'Blog',
        'Contact': 'Contact',
        'İletişim': 'Contact',
        'Top Skills': 'Top Skills',
        'Temel Beceriler': 'Top Skills',
        'Recent Experience': 'Recent Experience',
        'Son Deneyimler': 'Recent Experience',
        'Jr. System Administrator': 'Jr. System Administrator',
        'Jr. Sistem Yöneticisi': 'Jr. System Administrator',
        'IEEE UTAA Vice Chair': 'IEEE UTAA Vice Chair',
        'IEEE UTAA Başkan Yardımcısı': 'IEEE UTAA Vice Chair',
        'Learn More': 'Learn More',
        'Daha Fazla': 'Learn More',
        'Get in Touch': 'Get in Touch',
        'İletişime Geç': 'Get in Touch',
        'View All Experience': 'View All Experience',
        'Tüm Deneyimleri Gör': 'View All Experience',
        'Current Position': 'Current Position',
        'Mevcut Pozisyon': 'Current Position',
        'Education': 'Education',
        'Eğitim': 'Education',
        'Quick Links': 'Quick Links',
        'Hızlı Bağlantılar': 'Quick Links',
        'Connect': 'Connect',
        'Bağlantı': 'Connect',
        'All rights reserved.': 'All rights reserved.',
        'Tüm hakları saklıdır.': 'All rights reserved.',
        'System Administrator & Computer Engineer': 'System Administrator & Computer Engineer',
        'Sistem Yöneticisi & Bilgisayar Mühendisi': 'System Administrator & Computer Engineer'
    },
    tr: {
        'Home': 'Ana Sayfa',
        'Ana Sayfa': 'Ana Sayfa',
        'About': 'Hakkında',
        'Hakkında': 'Hakkında',
        'Experience': 'Deneyim',
        'Deneyim': 'Deneyim',
        'Projects': 'Projeler',
        'Projeler': 'Projeler',
        'Blog': 'Blog',
        'Contact': 'İletişim',
        'İletişim': 'İletişim',
        'Top Skills': 'Temel Beceriler',
        'Temel Beceriler': 'Temel Beceriler',
        'Recent Experience': 'Son Deneyimler',
        'Son Deneyimler': 'Son Deneyimler',
        'Jr. System Administrator': 'Jr. Sistem Yöneticisi',
        'Jr. Sistem Yöneticisi': 'Jr. Sistem Yöneticisi',
        'IEEE UTAA Vice Chair': 'IEEE UTAA Başkan Yardımcısı',
        'IEEE UTAA Başkan Yardımcısı': 'IEEE UTAA Başkan Yardımcısı',
        'Learn More': 'Daha Fazla',
        'Daha Fazla': 'Daha Fazla',
        'Get in Touch': 'İletişime Geç',
        'İletişime Geç': 'İletişime Geç',
        'View All Experience': 'Tüm Deneyimleri Gör',
        'Tüm Deneyimleri Gör': 'Tüm Deneyimleri Gör',
        'Current Position': 'Mevcut Pozisyon',
        'Mevcut Pozisyon': 'Mevcut Pozisyon',
        'Education': 'Eğitim',
        'Eğitim': 'Eğitim',
        'Quick Links': 'Hızlı Bağlantılar',
        'Hızlı Bağlantılar': 'Hızlı Bağlantılar',
        'Connect': 'Bağlantı',
        'Bağlantı': 'Bağlantı',
        'All rights reserved.': 'Tüm hakları saklıdır.',
        'Tüm hakları saklıdır.': 'Tüm hakları saklıdır.',
        'System Administrator & Computer Engineer': 'Sistem Yöneticisi & Bilgisayar Mühendisi',
        'Sistem Yöneticisi & Bilgisayar Mühendisi': 'Sistem Yöneticisi & Bilgisayar Mühendisi'
    }
};

// Toggle language function
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'tr' : 'en';
    localStorage.setItem('cv_lang', currentLanguage);
    updateLanguage();
    updateLanguageButton();
    updateBlogLanguage();
}

// Update all text elements with new language
function updateLanguage() {
    const elements = document.querySelectorAll('[data-lang-en], [data-lang-tr]');
    
    elements.forEach(element => {
        const enText = element.getAttribute('data-lang-en');
        const trText = element.getAttribute('data-lang-tr');
        
        if (currentLanguage === 'en' && enText) {
            element.textContent = enText;
        } else if (currentLanguage === 'tr' && trText) {
            element.textContent = trText;
        }
    });
}

// Update language button text
function updateLanguageButton() {
    const langText = document.getElementById('lang-text');
    if (langText) {
        langText.textContent = currentLanguage.toUpperCase();
    }
}

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Active navigation highlighting
function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const path = window.location.pathname;
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (
            (path === '/' && (link.getAttribute('href') === '/' || link.getAttribute('href') === '/index.html')) ||
            (path !== '/' && link.getAttribute('href') && path.startsWith(link.getAttribute('href')))
        ) {
            link.classList.add('active');
        }
    });
}

// Navbar background on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Animate elements on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    const elementsToAnimate = document.querySelectorAll('.skill-card, .experience-card, .hero-content');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Form handling for contact form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        default:
            notification.style.background = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Blog functionality (dynamic loading)
async function loadBlogPosts() {
    const blogContainer = document.querySelector('.container .blog-posts-dynamic');
    if (!blogContainer) return;
    try {
        const res = await fetch('blog-posts.json');
        const posts = await res.json();
        blogContainer.innerHTML = '';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'blog-post';
            const titleLink = document.createElement('a');
            titleLink.href = `blog-post.html#${post.id}`;
            titleLink.style = 'text-decoration:none;color:inherit;';
            const title = document.createElement('h2');
            title.className = 'blog-title';
            title.textContent = currentLanguage === 'tr' ? post.title_tr : post.title_en;
            titleLink.appendChild(title);
            const content = document.createElement('div');
            content.className = 'blog-content';
            content.innerHTML = `<p>${currentLanguage === 'tr' ? post.content_tr : post.content_en}</p>`;
            postDiv.appendChild(titleLink);
            postDiv.appendChild(content);
            blogContainer.appendChild(postDiv);
        });
    } catch (e) {
        blogContainer.innerHTML = '<p>Blog posts could not be loaded.</p>';
    }
}

// Update blog posts on language change
function updateBlogLanguage() {
    if (window.location.pathname.includes('blog')) {
        loadBlogPosts();
    }
}

// Blog search (dynamic)
function initBlogSearchDynamic() {
    const searchInput = document.getElementById('blog-search');
    if (!searchInput) return;
    searchInput.addEventListener('input', async (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const blogContainer = document.querySelector('.container .blog-posts-dynamic');
        if (!blogContainer) return;
        const res = await fetch('blog-posts.json');
        const posts = await res.json();
        blogContainer.innerHTML = '';
        posts.filter(post => {
            const title = (currentLanguage === 'tr' ? post.title_tr : post.title_en).toLowerCase();
            const content = (currentLanguage === 'tr' ? post.content_tr : post.content_en).toLowerCase();
            return title.includes(searchTerm) || content.includes(searchTerm);
        }).forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'blog-post';
            const titleLink = document.createElement('a');
            titleLink.href = `blog-post.html#${post.id}`;
            titleLink.style = 'text-decoration:none;color:inherit;';
            const title = document.createElement('h2');
            title.className = 'blog-title';
            title.textContent = currentLanguage === 'tr' ? post.title_tr : post.title_en;
            titleLink.appendChild(title);
            const content = document.createElement('div');
            content.className = 'blog-content';
            content.innerHTML = `<p>${currentLanguage === 'tr' ? post.content_tr : post.content_en}</p>`;
            postDiv.appendChild(titleLink);
            postDiv.appendChild(content);
            blogContainer.appendChild(postDiv);
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language from localStorage FIRST
    updateLanguage();
    updateLanguageButton();
    
    // Initialize other functions
    initMobileNav();
    initSmoothScrolling();
    initActiveNav();
    initNavbarScroll();
    initScrollAnimations();
    initContactForm();
    
    // Initialize blog if on blog page
    if (window.location.pathname.includes('blog')) {
        loadBlogPosts();
        initBlogSearchDynamic();
    }
    
    // Update blog language after a small delay to ensure elements are loaded
    setTimeout(() => {
        updateBlogLanguage();
    }, 100);

    window.addEventListener('scroll', initActiveNav);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page became visible again
        updateLanguage();
    }
});

// Export functions for use in other scripts
window.CVWebsite = {
    toggleLanguage,
    updateLanguage,
    showNotification,
    currentLanguage
}; 