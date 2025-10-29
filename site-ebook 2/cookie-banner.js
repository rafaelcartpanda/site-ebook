document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptButton = document.querySelector('.cookie-accept');
    const settingsButton = document.querySelector('.cookie-settings');

    // Verifica se o usuário já aceitou os cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Mostra o banner após um pequeno delay
        setTimeout(() => {
            cookieBanner.classList.add('show');
            // Adiciona a classe active após um pequeno delay para a animação
            setTimeout(() => {
                cookieBanner.classList.add('active');
            }, 100);
        }, 1000);
    }

    // Função para aceitar cookies
    function acceptCookies() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('active');
        setTimeout(() => {
            cookieBanner.classList.remove('show');
        }, 300);
    }

    // Função para abrir configurações
    function openSettings() {
        // Aqui você pode adicionar a lógica para abrir as configurações de cookies
        console.log('Abrir configurações de cookies');
    }

    // Adiciona os event listeners
    if (acceptButton) {
        acceptButton.addEventListener('click', acceptCookies);
    }

    if (settingsButton) {
        settingsButton.addEventListener('click', openSettings);
    }
});