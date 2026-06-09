import { CartIcon } from './CartIcon.js';

export const Navbar = () => `
<nav class="navbar">
    <div class="logo" data-view="home" style="cursor: pointer;">Ullas Blomster</div>
    <ul class="nav-links">
        <li><a href="#" data-view="catalog">Katalog</a></li>
        <li><a href="#" data-view="gift-baskets">Gavekurve</a></li>
        <li><a href="#" data-view="custom-gift-basket">Byg Selv Gavekurv</a></li>
        <li>
            <a href="#" data-view="cart" class="cart-link-wrapper" aria-label="Vis indkøbskurv">
                ${CartIcon.render()}
            </a>
        </li>
        
        <li><a href="#" data-view="login" class="btn-login">Log Ind</a></li>
    </ul>
</nav>`;