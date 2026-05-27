import AuthAPI from '../api/authApi.js';

export const Register = () => `
<section class="login-container">
    <h2>Opret bruger</h2>

    <form id="register-form">
        <input 
            type="text"
            id="firstName"
            placeholder="Fornavn"
            required
        >

        <input 
            type="text"
            id="lastName"
            placeholder="Efternavn"
            required
        >

        <input 
            type="email"
            id="register-email"
            placeholder="Email"
            required
        >

        <input
            type="password"
            id="register-password"
            placeholder="Password"
            required
        >

        <button type="submit">
            Opret bruger
        </button>
    </form>

    <p id="register-message"></p>
</section>
`;

export function initRegister() {
    const form = document.getElementById('register-form');

    if (!form) {
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const user = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('register-email').value,
            password: document.getElementById('register-password').value
        };

        try {
            const result = await AuthAPI.register(user);

            const message = document.getElementById('register-message');

            if (result && result.email) {
                message.textContent = 'Bruger oprettet';
            } else {
                message.textContent = 'Bruger kunne ikke oprettes';
            }
        } catch (error) {
            console.error('Register fejl:', error);
            document.getElementById('register-message').textContent = 'Der skete en fejl. Prøv igen.';
        }
    });
}