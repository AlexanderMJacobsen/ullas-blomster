import { CartIcon } from './CartIcon.js';

export const Navbar = () => `
<nav class="navbar">
    <div class="logo">Ullas Blomster</div>
    <ul class="nav-links">
        <li><a href="#">Højtidlighed</a></li>
        <li><a href="#">Anledninger</a></li>
        <li><a href="#">Katalog</a></li>
        <li><a href="#">Kontakt</a></li>
        <li><a href="#">Gavekurve</a></li>
         <li><a href="#">${CartIcon.render()}</a></li>
        
        <li><a href="/login.html" class="btn-login">Log Ind</a></li>
        
    </ul>
</nav>`;