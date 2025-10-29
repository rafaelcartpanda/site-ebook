// Funções de Segurança
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function preventXSS(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Proteção contra ataques de força bruta
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutos

function checkLoginAttempts(identifier) {
    const attempts = loginAttempts.get(identifier) || { count: 0, timestamp: Date.now() };
    
    if (attempts.count >= MAX_ATTEMPTS) {
        const timeElapsed = Date.now() - attempts.timestamp;
        if (timeElapsed < LOCKOUT_TIME) {
            return false;
        }
        loginAttempts.delete(identifier);
    }
    return true;
}

function recordLoginAttempt(identifier) {
    const attempts = loginAttempts.get(identifier) || { count: 0, timestamp: Date.now() };
    attempts.count++;
    loginAttempts.set(identifier, attempts);
}

// Proteção contra CSRF
function generateCSRFToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

const csrfToken = generateCSRFToken();

// Proteção contra clickjacking
if (window.self !== window.top) {
    window.top.location = window.self.location;
}

// Proteção contra XSS em inputs
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function(e) {
            this.value = sanitizeInput(this.value);
        });
    });
});

// Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navList = document.querySelector('nav ul');
const menuClose = document.querySelector('.menu-close');

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('active');
    navList.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navList.querySelectorAll('li a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Fechar menu ao clicar fora
window.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Fechar menu ao clicar no botão X
if (menuClose) {
    menuClose.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.remove('active');
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
    });
}

// Garante que o menu mobile sempre inicie fechado ao carregar a página
// (corrige bug de menu aberto ao carregar no mobile)
document.addEventListener('DOMContentLoaded', function() {
    nav.classList.remove('active');
    navList.classList.remove('active');
    menuToggle.classList.remove('active');
    // Adiciona evento ao botão de fechar (caso não esteja dentro do DOMContentLoaded)
    if (menuClose) {
        menuClose.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.remove('active');
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    }
});

// FAQ Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os itens FAQ
    const faqItems = document.querySelectorAll('.faq-item, .benefit-faq .faq-item');
    
    // Adiciona evento de clique para cada item
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', () => {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
});

// Exibir/ocultar botão de voltar ao topo
const backToTopBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTopBtn.classList.add('active');
    } else {
    backToTopBtn.classList.remove('active');
  }
});

backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animação de entrada dos elementos
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.benefit-card, .testimonial-card, .faq-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Cookie Banner
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');

    // Verifica se o usuário já fez uma escolha
    const cookieChoice = localStorage.getItem('cookieChoice');
    if (!cookieChoice) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
            setTimeout(() => {
                cookieBanner.classList.add('active');
            }, 100);
        }, 1000);
    }

    // Função para aceitar cookies
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieChoice', 'accepted');
        cookieBanner.classList.remove('active');
        setTimeout(() => {
            cookieBanner.classList.remove('show');
        }, 300);
        // Aqui você pode adicionar o código para ativar os cookies
    });

    // Função para recusar cookies
    declineCookies.addEventListener('click', () => {
        localStorage.setItem('cookieChoice', 'declined');
        cookieBanner.classList.remove('active');
        setTimeout(() => {
            cookieBanner.classList.remove('show');
        }, 300);
        // Aqui você pode adicionar o código para desativar os cookies
    });
});

// Função para verificar a integridade dos links de checkout
function verifyCheckoutLink(link) {
    const originalLinks = {
        main: 'https://suporte-rafael.mycartpanda.com/checkout/200986715:1',
        combo: 'https://suporte-rafael.mycartpanda.com/checkout/200998019:1'
    };

    const linkType = link.getAttribute('data-checkout');
    const currentHref = link.getAttribute('href');

    if (linkType && originalLinks[linkType] && currentHref !== originalLinks[linkType]) {
        // Se o link foi modificado, restaura o original
        link.setAttribute('href', originalLinks[linkType]);
        console.warn('Link de checkout modificado detectado e restaurado');
    }

    return true;
}

// Verificação periódica dos links
setInterval(() => {
    document.querySelectorAll('a[data-checkout]').forEach(link => {
        verifyCheckoutLink(link);
    });
}, 5000);

// Registro do Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker registrado com sucesso:', registration.scope);
            })
            .catch(error => {
                console.log('Falha ao registrar o ServiceWorker:', error);
            });
    });
}

// Detecção de dispositivo e otimizações
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isTablet = /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);

// Otimizações para dispositivos móveis
if (isMobile) {
    // Reduz animações em dispositivos móveis
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    
    // Otimiza imagens para carregamento
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
    });
}

// Otimizações para tablets
if (isTablet) {
    // Ajusta tamanho de fonte para tablets
    document.documentElement.style.setProperty('--base-font-size', '16px');
}

// Detecção de conexão
window.addEventListener('online', () => {
    document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
    document.body.classList.add('offline');
});

// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80; // Ajuste conforme a altura do seu header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}); 