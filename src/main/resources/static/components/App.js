import { OccasionAPI } from '../api/OccasionAPI.js';
import productApi from "../api/productApi.js";
import { GiftBasketAPI } from '../api/GiftBasketAPI.js';
import { Navbar } from './Navbar.js';
import { Footer } from './Footer.js';

// Clean, modular page component imports
import { renderHomePage } from './HomePage.js';
import { renderCatalogPage } from './CatalogPage.js';
import { renderCartPage } from './CartPage.js';
import { renderGiftBasketPage } from './GiftBasketPage.js';
import { renderCustomGiftBasketPage } from './CustomGiftBasketPage.js';
import { renderLoginPage } from './loginPage.js';

let giftBasketsData = [];
let currentView = 'home';
let productsData = [];
let occasionsData = [];

async function initApp() {
    try {
        productsData = await productApi.getAllProducts();
        occasionsData = await OccasionAPI.getAllOccasions();
        giftBasketsData = await GiftBasketAPI.getAllGiftBaskets();

        setupGlobalNavigation();
        render();
    } catch (error) {
        console.error("Fejl under initialisering af app:", error);
    }
}

function navigateTo(view) {
    currentView = view;
    render();
    window.scrollTo(0, 0);
}

function render() {
    const app = document.getElementById('app');
    if (!app) return;

    if (currentView === 'home') {
        renderHomePage(app, productsData, giftBasketsData);

    } else if (currentView === 'catalog') {
        renderCatalogPage(app, occasionsData);

    } else if (currentView === 'login') {
        renderLoginPage(app); // 2. Added the login conditional branch

    } else if (currentView === 'gift-baskets') {
        app.innerHTML = Navbar() + '<div id="gift-basket-root"></div>' + Footer();
        renderGiftBasketPage(document.getElementById('gift-basket-root'));

    } else if (currentView === 'custom-gift-basket') {
        app.innerHTML = Navbar() + '<div id="custom-gift-basket-root"></div>' + Footer();
        renderCustomGiftBasketPage(document.getElementById('custom-gift-basket-root'));

    } else if (currentView === 'cart') {
        app.innerHTML = Navbar() + '<div id="cart-root"></div>' + Footer();
        renderCartPage(document.getElementById('cart-root'));
    }
}

function setupGlobalNavigation() {
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-view]');

        if (target) {
            e.preventDefault();
            const view = target.getAttribute('data-view');
            navigateTo(view);
        }
    });
}

window.addEventListener('popstate', initApp);
document.addEventListener('DOMContentLoaded', initApp);