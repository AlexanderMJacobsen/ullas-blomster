import { QuantityControls } from './QuantityControls.js';
import { CartSummary } from './CartSummary.js';
import { CartIcon } from './CartIcon.js';

export function renderCartPage(container) {
    container.innerHTML = `
        <div class="container cart-page">
            <div class="cart-header">
                <h1>Din Kurv</h1>
                <!-- Fixed: Changed href to data-view to prevent hard reloading the browser -->
                <a href="#" data-view="home" class="btn-secondary cart-continue-link">← Fortsæt med at handle</a>
            </div>

            <div class="cart-layout">
                <div class="cart-items-section">
                    <div class="cart-items-header">
                        <span>Produkt</span>
                        <span>Pris</span>
                        <span>Antal</span>
                        <span>Total</span>
                        <span></span>
                    </div>
                    <div id="cart-items-list">
                        <!-- Populated by JS -->
                    </div>
                    <div id="cart-empty-msg" class="cart-empty" style="display:none;">
                        <p>Din kurv er tom.</p>
                        <!-- Fixed: Changed href to data-view to prevent hard reloading the browser -->
                        <a href="#" data-view="home" class="btn-primary">Se vores produkter</a>
                    </div>
                </div>

                ${CartSummary.render()}
            </div>
        </div>
    `;

    renderCartItems();
}

function getCart() {
    try {
        return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Automatically keep the header icon count synced up when state mutations happen
    if (CartIcon && typeof CartIcon.update === 'function') {
        CartIcon.update();
    }
}

function formatPrice(amount) {
    return amount.toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' kr.';
}

function renderCartItems() {
    const cart = getCart();
    const listEl = document.getElementById('cart-items-list');
    const emptyEl = document.getElementById('cart-empty-msg');
    const checkoutBtn = document.getElementById('cart-checkout-btn');

    if (!listEl) return;

    if (cart.length === 0) {
        listEl.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'block';
        if (checkoutBtn) checkoutBtn.disabled = true;
        // Fixed: Pass a literal 0 directly instead of targeting an undefined variable string
        CartSummary.update(0);
        return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    if (checkoutBtn) checkoutBtn.disabled = false;

    listEl.innerHTML = cart.map((item, index) => `
        <div class="cart-item" data-index="${index}">
            <div class="cart-item-product">
                <div class="cart-item-image">
                    ${item.imageUrl
        ? `<img src="${item.imageUrl}" alt="${item.name}">`
        : `<div class="cart-item-image-placeholder"></div>`
    }
                </div>
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    ${item.occasion ? `<p class="cart-item-meta">${item.occasion}</p>` : ''}
                </div>
            </div>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            
            ${QuantityControls.render(index, item.quantity)}
            
            <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
            <button class="cart-remove-btn" data-index="${index}" aria-label="Fjern produkt">✕</button>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    CartSummary.update(subtotal);

    attachCartEvents();
}

function attachCartEvents() {
    // 1. Quantity Controls Event Listener Handling
    QuantityControls.attachEvents((index, action) => {
        const cart = getCart();
        if (!cart[index]) return;

        if (action === 'increase') {
            cart[index].quantity += 1;
        } else if (action === 'decrease') {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
        }
        saveCart(cart);
        renderCartItems();
    });

    // 2. Remove Button Event Listener Handling (Moved into attachEvents scope)
    document.querySelectorAll('.cart-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index, 10);
            const cart = getCart();
            cart.splice(index, 1);
            saveCart(cart);
            renderCartItems();
        });
    });

    // 3. Checkout Button Event Listener Handling
    CartSummary.attachEvents(() => {
        alert('Betalingsflow ikke implementeret endnu.');
    });
}

export function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += product.quantity ?? 1;
    } else {
        cart.push({ ...product, quantity: product.quantity ?? 1 });
    }

    saveCart(cart);
}

export function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}