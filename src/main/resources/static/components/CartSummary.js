const SHIPPING_THRESHOLD = 499;
const SHIPPING_COST = 49;

function formatPrice(amount) {
    return amount.toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' kr.';
}

export const CartSummary = {

    render() {
        return `
            <div class="cart-summary">
                <h2>Ordreoversigt</h2>
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span id="cart-subtotal">0,00 kr.</span>
                </div>
                <div class="summary-row">
                    <span>Levering</span>
                    <span id="cart-shipping">Gratis</span>
                </div>
                <div class="summary-divider"></div>
                <div class="summary-row summary-total">
                    <span>Total</span>
                    <span id="cart-total">0,00 kr.</span>
                </div>
                <button class="btn-primary cart-checkout-btn" id="cart-checkout-btn">
                    Gå til betaling
                </button>
                <p class="cart-summary-note">Moms inkluderet · Sikker betaling</p>
            </div>
        `;
    },

    update(subtotal) {
        const subtotalEl = document.getElementById('cart-subtotal');
        const totalEl = document.getElementById('cart-total');
        const shippingEl = document.getElementById('cart-shipping');
        const checkoutBtn = document.getElementById('cart-checkout-btn');

        const shippingCost = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;

        if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
        if (shippingEl) shippingEl.textContent = shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost);
        if (totalEl) totalEl.textContent = formatPrice(subtotal + shippingCost);
        if (checkoutBtn) checkoutBtn.disabled = subtotal === 0;
    },

    attachEvents(onCheckout) {
        const checkoutBtn = document.getElementById('cart-checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', onCheckout);
        }
    }
};