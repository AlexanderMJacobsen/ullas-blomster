export const QuantityControls = {

    render(index, quantity) {
        return `
            <div class="cart-item-qty">
                <button class="qty-btn" data-action="decrease" data-index="${index}">−</button>
                <span class="qty-value">${quantity}</span>
                <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
            </div>
        `;
    },

    attachEvents(onChange) {
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                const action = btn.dataset.action;
                onChange(index, action);
            });
        });
    }
};