import { getCartCount } from './CartPage.js';

export const CartIcon = {

    render() {
        const count = getCartCount();
        return `
            <li class="cart-icon-wrapper">
                <a href="#" class="cart-icon-link">
                    <span class="cart-icon">🛒</span>
                    <span class="cart-badge ${count === 0 ? 'cart-badge-hidden' : ''}" id="cart-badge">
                        ${count}
                    </span>
                </a>
            </li>
        `;
    },

    update() {
        const badge = document.getElementById('cart-badge');
        if (!badge) return;
        const count = getCartCount();
        badge.textContent = count;
        badge.classList.toggle('cart-badge-hidden', count === 0);
    }
};