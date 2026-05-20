import { Navbar } from './Navbar.js';
import { Footer } from './Footer.js';

import { Login, initLogin } from './Login.js';

const app = document.getElementById('app');

app.innerHTML = `
    ${Navbar()}

    <section class="container">
        ${Login()}
    </section>

    ${Footer()}
`;

initLogin();