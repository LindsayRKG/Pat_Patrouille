// ============================================
// NAVIGATION ET SCROLL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le gestionnaire de thème
    const themeManager = new ThemeManager();

    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

      // Gestion du menu hamburger
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Styles pour le menu mobile
            if (navMenu.classList.contains('active')) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'rgba(255, 255, 255, 0.95)';
                navMenu.style.backdropFilter = 'blur(10px)';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = 'var(--shadow-md)';
            } else {
                navMenu.style.display = '';
            }
        });
    }

    // Navigation fluide
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Fermer le menu mobile
                if (navMenu) {
                    navMenu.classList.remove('active');
                    navMenu.style.display = '';
                }
                if (hamburger) hamburger.classList.remove('active');
                
                // Scroll vers la section
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Mettre à jour le lien actif
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Mettre à jour le lien actif lors du scrolll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

// ============================================
// ANIMATIONS AU SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer pour les cartes
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.projet-card, .team-card, .stat-card, .skill-item');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// ============================================
// COMPTEURS ANIMÉS
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observer pour les statistiques
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(number => {
                const text = number.textContent;
                const target = parseInt(text);
                if (!isNaN(target)) {
                    animateCounter(number, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// ============================================
// BARRES DE PROGRESSION ANIMÉES
// ============================================

const skillsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
        skillsObserver.observe(skillsContainer);
    }
});

// ============================================
// EFFETS DE PARALLAXE
// ============================================

window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// ============================================
// PARTICULES FLOTTANTES
// ============================================

function createFloatingParticles() {
    const container = document.querySelector('.hero-animation');
    if (!container) return;

    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 30 + 10}px;
            height: ${Math.random() * 30 + 10}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createFloatingParticles);

// ============================================
// GESTION DU FORMULAIRE DE CONTACT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const data = {
                nom: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                message: this.querySelector('textarea').value
            };

            // Afficher un message de succès
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '✓ Message envoyé!';
            submitBtn.style.background = '#10b981';
            
            // Réinitialiser le formulaire
            this.reset();
            
            // Restaurer le bouton après 3 secondes
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 3000);

            console.log('Formulaire soumis:', data);
        });
    }
});

// ============================================
// EFFETS DE HOVER AVANCÉS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.projet-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ============================================
// GESTION DU REDIMENSIONNEMENT
// ============================================

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recalculer les positions si nécessaire
        console.log('Fenêtre redimensionnée');
    }, 250);
});

// ============================================
// CHARGEMENT INITIAL
// ============================================

window.addEventListener('load', function() {
    // Ajouter une classe de chargement complété
    document.body.classList.add('loaded');
    
    // Déclencher les animations initiales
    const elements = document.querySelectorAll('[class*="animate-"]');
    elements.forEach(element => {
        element.style.animationPlayState = 'running';
    });
});

// ============================================
// GESTION DES ERREURS
// ============================================

window.addEventListener('error', function(event) {
    console.error('Erreur détectée:', event.error);
});

// ============================================
// PERFORMANCE - Lazy Loading
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// SMOOTH SCROLL FALLBACK
// ============================================

if (!('scrollBehavior' in document.documentElement.style)) {
    function smoothScroll(element) {
        const start = window.pageYOffset;
        const target = element.offsetTop;
        const distance = target - start;
        const duration = 1000;
        let start_time = null;

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function animation(currentTime) {
            if (start_time === null) start_time = currentTime;
            const elapsed = currentTime - start_time;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, start + distance * easeInOutQuad(progress));
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }
}

// ============================================
// GESTION DE LA VISIBILITÉ DE LA PAGE
// ============================================

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page cachée');
        // Pause les animations si nécessaire
    } else {
        console.log('Page visible');
        // Reprendre les animations
    }
});

// ============================================
// INITIALISATION GLOBALE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio chargé avec succès! 🚀');
});