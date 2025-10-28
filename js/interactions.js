// ============================================
// INTERACTIONS AVANCÉES
// ============================================

// ============================================
// SYSTÈME DE NOTIFICATION
// ============================================

class Notification {
    constructor(message, type = 'info', duration = 3000) {
        this.message = message;
        this.type = type;
        this.duration = duration;
        this.show();
    }

    show() {
        const notification = document.createElement('div');
        notification.className = `notification notification-${this.type}`;
        notification.textContent = this.message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${this.getBackground()};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }, this.duration);
    }

    getBackground() {
        const backgrounds = {
            'success': '#10b981',
            'error': '#ef4444',
            'warning': '#f59e0b',
            'info': '#3b82f6'
        };
        return backgrounds[this.type] || backgrounds['info'];
    }
}

// ============================================
// GESTIONNAIRE DE THÈME
// ============================================

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        this.createThemeToggle();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.theme = theme;
    }

    toggle() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    createThemeToggle() {
        // Peut être implémenté si nécessaire
    }
}

// ============================================
// GESTIONNAIRE D'ÉVÉNEMENTS PERSONNALISÉS
// ============================================

class EventManager {
    constructor() {
        this.events = {};
    }

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    off(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
        }
    }

    emit(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => callback(data));
        }
    }
}

const eventManager = new EventManager();

// ============================================
// GESTIONNAIRE DE SCROLL FLUIDE
// ============================================

class SmoothScroller {
    constructor() {
        this.isScrolling = false;
    }

    scrollTo(element, duration = 1000) {
        if (this.isScrolling) return;

        const start = window.pageYOffset;
        const target = element.getBoundingClientRect().top + start;
        const distance = target - start;
        const startTime = performance.now();

        this.isScrolling = true;

        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = this.easeInOutCubic(progress);
            
            window.scrollTo(0, start + distance * ease);

            if (progress < 1) {
                requestAnimationFrame(scroll);
            } else {
                this.isScrolling = false;
            }
        };

        requestAnimationFrame(scroll);
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
}

const smoothScroller = new SmoothScroller();

// ============================================
// GESTIONNAIRE D'ANIMATION DE COMPTEUR
// ============================================

class CounterAnimator {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.current = 0;
        this.increment = target / (duration / 16);
    }

    start() {
        const timer = setInterval(() => {
            this.current += this.increment;
            if (this.current >= this.target) {
                this.element.textContent = this.target;
                clearInterval(timer);
            } else {
                this.element.textContent = Math.floor(this.current);
            }
        }, 16);
    }
}

// ============================================
// GESTIONNAIRE DE MODAL
// ============================================

class Modal {
    constructor(title, content) {
        this.title = title;
        this.content = content;
        this.element = null;
    }

    create() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${this.title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${this.content}
                </div>
            </div>
        `;

        // Styles du modal
        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 5000;
        `;

        const overlay = modal.querySelector('.modal-overlay');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            cursor: pointer;
        `;

        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 12px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            animation: scaleIn 0.3s ease-out;
        `;

        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #64748b;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        this.element = modal;
        document.body.appendChild(modal);

        // Événements
        closeBtn.addEventListener('click', () => this.close());
        overlay.addEventListener('click', () => this.close());

        return this;
    }

    open() {
        if (!this.element) this.create();
        this.element.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (this.element) {
            this.element.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
}

// ============================================
// GESTIONNAIRE DE GALERIE
// ============================================

class Gallery {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.images = [];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        if (!this.container) return;
        this.images = Array.from(this.container.querySelectorAll('img'));
        this.addEventListeners();
    }

    addEventListeners() {
        this.images.forEach((img, index) => {
            img.addEventListener('click', () => this.open(index));
        });
    }

    open(index) {
        this.currentIndex = index;
        const modal = new Modal('Galerie', this.createGalleryContent());
        modal.open();
    }

    createGalleryContent() {
        const img = this.images[this.currentIndex];
        return `
            <img src="${img.src}" style="width: 100%; border-radius: 8px;">
            <p style="margin-top: 15px; text-align: center; color: #64748b;">
                ${this.currentIndex + 1} / ${this.images.length}
            </p>
        `;
    }
}

// ============================================
// GESTIONNAIRE DE VALIDATION DE FORMULAIRE
// ============================================

class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.errors = {};
        this.init();
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => this.validate(e));
    }

    validate(e) {
        e.preventDefault();
        this.errors = {};

        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.type === 'email') {
                this.validateEmail(input);
            } else if (input.type === 'text' || input.tagName === 'TEXTAREA') {
                this.validateRequired(input);
            }
        });

        if (Object.keys(this.errors).length === 0) {
            new Notification('Formulaire valide!', 'success');
            return true;
        } else {
            new Notification('Veuillez corriger les erreurs', 'error');
            return false;
        }
    }

    validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            this.errors[input.name] = 'Email invalide';
        }
    }

    validateRequired(input) {
        if (input.value.trim() === '') {
            this.errors[input.name] = 'Ce champ est requis';
        }
    }
}

// ============================================
// GESTIONNAIRE DE CACHE
// ============================================

class CacheManager {
    constructor(prefix = 'portfolio_') {
        this.prefix = prefix;
    }

    set(key, value, expiryMinutes = 60) {
        const item = {
            value: value,
            expiry: Date.now() + expiryMinutes * 60 * 1000
        };
        localStorage.setItem(this.prefix + key, JSON.stringify(item));
    }

    get(key) {
        const item = localStorage.getItem(this.prefix + key);
        if (!item) return null;

        const parsed = JSON.parse(item);
        if (Date.now() > parsed.expiry) {
            localStorage.removeItem(this.prefix + key);
            return null;
        }

        return parsed.value;
    }

    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }

    clear() {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }
}

const cacheManager = new CacheManager();

// ============================================
// GESTIONNAIRE DE PERFORMANCE
// ============================================

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
    }

    start(label) {
        this.metrics[label] = performance.now();
    }

    end(label) {
        if (this.metrics[label]) {
            const duration = performance.now() - this.metrics[label];
            console.log(`${label}: ${duration.toFixed(2)}ms`);
            return duration;
        }
    }

    getMetrics() {
        return this.metrics;
    }
}

const performanceMonitor = new PerformanceMonitor();

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le gestionnaire de thème
    const themeManager = new ThemeManager();

    // Initialiser le validateur de formulaire
    const formValidator = new FormValidator('#contactForm');

    // Log de démarrage
    console.log('Interactions avancées chargées avec succès!');
});

// ============================================
// UTILITAIRES GLOBAUX
// ============================================

window.showNotification = (message, type = 'info') => {
    new Notification(message, type);
};

window.showModal = (title, content) => {
    const modal = new Modal(title, content);
    modal.open();
};

window.scrollToElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
        smoothScroller.scrollTo(element);
    }
};

