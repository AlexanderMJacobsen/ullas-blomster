import { Navbar } from './Navbar.js';
import { Footer } from './Footer.js';
import AuthAPI from '../api/authApi.js';

export const renderLoginPage = (container) => {
    // 1. Render the HTML Layout Structure inside the central app wrapper
    container.innerHTML = `
        ${Navbar()}

        <section class="container">
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

                <p id="login-message"></p>
            </section>
        </section>

        ${Footer()}
    `;

    // 2. Immediately wire up the submit event handlers since elements are on screen
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const message = document.getElementById('login-message');

        try {
            // Trigger your production backend authorization API
            const result = await AuthAPI.login(email, password);

            if (result && result.email) {
                message.textContent = 'Login lykkedes';
                message.style.color = 'green';

                // Optional: Automatically route them back home after a short delay
                // setTimeout(() => {
                //     document.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }));
                // }, 1000);
            } else {
                message.textContent = 'Forkert email eller password';
                message.style.color = 'red';
            }
        } catch (error) {
            console.error('Login fejl:', error);
            message.textContent = 'Der skete en fejl. Prøv igen.';
            message.style.color = 'red';
        }
    });
};