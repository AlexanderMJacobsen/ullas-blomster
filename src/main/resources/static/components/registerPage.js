import { Navbar } from './Navbar.js';
import { Footer } from './Footer.js';
import { Register, initRegister } from './Register.js';

const app = document.getElementById('app');

app.innerHTML = `
    ${Navbar()}

    <section class="container">
        ${Register()}
    </section>

    ${Footer()}
`;

initRegister();