document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ticketForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const avatarInput = document.getElementById('avatar');

    const ticketSection = document.getElementById('ticket-section');
    const ticketName = document.getElementById('ticket-name');
    const ticketEmail = document.getElementById('ticket-email');
    const ticketAvatar = document.getElementById('ticket-avatar');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        const isNameValid = validateRequired(nameInput);
        const isEmailValid = validateEmail(emailInput);
        const isAvatarValid = validateAvatar(avatarInput);

        if (isNameValid && isEmailValid && isAvatarValid) {
            // Se tudo for válido, gere o ingresso
            generateTicket();
        }
    });

    function validateRequired(input) {
        clearError(input);
        if (input.value.trim() === '') {
            showError(input, 'Este campo é obrigatório.');
            return false;
        }
        return true;
    }

    function validateEmail(input) {
        if (!validateRequired(input)) return false;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            showError(input, 'Por favor, insira um email válido.');
            return false;
        }
        return true;
    }

    function validateAvatar(input) {
        if (!validateRequired(input)) return false;

        const file = input.files[0];
        const allowedTypes = ['image/png', 'image/jpeg'];
        const maxSize = 1 * 1024 * 1024; // 1MB

        if (!allowedTypes.includes(file.type)) {
            showError(input, 'Formato de arquivo inválido. Use PNG ou JPG.');
            return false;
        }

        if (file.size > maxSize) {
            showError(input, 'A imagem é muito grande. O máximo é 1MB.');
            return false;
        }
        return true;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        input.classList.add('error');
        errorElement.textContent = message;
    }

    function clearError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        input.classList.remove('error');
        errorElement.textContent = '';
    }

    function generateTicket() {
        ticketName.textContent = nameInput.value;
        ticketEmail.textContent = emailInput.value;
        
        const file = avatarInput.files[0];
        if (file) {
            ticketAvatar.src = URL.createObjectURL(file);
        }

        ticketSection.style.display = 'block';
        // Opcional: esconder o formulário
        // form.style.display = 'none';
    }
});