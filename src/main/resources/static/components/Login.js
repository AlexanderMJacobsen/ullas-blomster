import AuthAPI from '../api/authApi.js';

export const Login = () => `
<section class="login-container">
    <h2>Log Ind</h2>

    <form id="login-form">
        <input 
            type="email"
            id="email"
            placeholder="Email"
            required
        >

        <input
            type="password"
            id="password"
            placeholder="Password"
            required
        >

        <button type="submit">
            Log Ind
        </button>
    </form>
    
<p>Har du ikke en bruger? <a href="register.html">Opret bruger her</a></p>

    <p id="login-message"></p>
</section>
`;

export function initLogin() {
    const form = document.getElementById('login-form');

    if (!form) {
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const message = document.getElementById('login-message');

        try {
            const result = await AuthAPI.login(email, password);

            if (result && result.email) {
                message.textContent = 'Login lykkedes';
            } else {
                message.textContent = 'Forkert email eller password';
            }
        } catch (error) {
            console.error('Login fejl:', error);
            message.textContent = 'Der skete en fejl. Prøv igen.';
        }
    });
}