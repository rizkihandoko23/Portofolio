// 1. NAVBAR HAMBURGER MENU
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const header = document.querySelector('header');

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
    navList.classList.toggle('show');
});

// Close menu saat klik link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('show');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// 2. SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 3. HEADER SCROLL EFFECT
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 4. TYPING EFFECT HERO SECTION
const typingTexts = [
    'Graphic Designer',
    'Network Technician',
    'Basic Programmer', 
    'Content Creator'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeWriter() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        // Hapus karakter
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Tambah karakter
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    // Jika selesai mengetik, mulai hapus
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause sebelum hapus
        isDeleting = true;
    } 
    // Jika selesai hapus, ganti teks
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500; // Pause sebelum teks baru
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Mulai typing effect saat page load
document.addEventListener('DOMContentLoaded', () => {
    if (typingElement) {
        typeWriter();
    }
});

// 5. SCROLL ANIMATIONS (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate progress bars di skills
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const width = progressBar.getAttribute('data-width');
                    progressBar.style.width = width + '%';
                }
            }
            
            // Animate counter di about stats
            if (entry.target.classList.contains('stat-item')) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    const target = parseInt(statNumber.getAttribute('data-target'));
                    animateNumber(statNumber, target);
                }
            }
        }
    });
}, observerOptions);

// Observe semua elemen yang perlu animasi
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section, .skill-card, .project-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});

// Fungsi animate number counter
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// 6. PARTICLES BACKGROUND (50 titik)
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: var(--accent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 10}s;
                animation-duration: ${Math.random() * 5 + 8}s;
                box-shadow: 0 0 10px var(--accent);
            `;
            particlesContainer.appendChild(particle);
        }
    }
});

// 7. PARALLAX EFFECT (Optional - subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// 8. CTA BUTTON SHINE EFFECT (Mouse hover)
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        const shine = this.querySelector('.btn-shine');
        if (shine) {
            shine.style.left = '100%';
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        const shine = this.querySelector('.btn-shine');
        if (shine) {
            shine.style.left = '-100%';
        }
    });
});

// 9. PROJECT CARD HOVER ENHANCEMENT
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-20px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 10. PERFOMANCE OPTIMIZATION
let ticking = false;
function updateScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Header scroll effect
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateScroll, { passive: true });

// END OF SCRIPT
console.log('🚀 Portfolio Mochamad Rizki Handoko - Fully Loaded!');