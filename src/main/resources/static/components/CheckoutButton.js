

const CheckoutButton = {
    render(containerId, cartId) {
        const container = document.getElementById(containerId);
        container.innerHTML = `
        <button id="checkout-btn" onclick="CheckoutButton.handleCheckout(${cartId})">
        Gå til Checkout
        </button>`;
    }

    async handleCheckout(cartId) {
        //TO DO: Implementer API kald til checkout, right??
    },
};

export default CheckoutButton;

