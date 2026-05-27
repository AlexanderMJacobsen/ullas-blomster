import { OccasionAPI } from '../api/OccasionAPI.js';
import { OccasionFilter } from '../api/OccasionFilter.js';
import productApi from "../api/productApi.js";
import { Navbar } from './Navbar.js';
import { Hero } from './Hero.js';
import { ProductCard } from './ProductCard.js';
import { Footer } from './Footer.js';
import { renderCustomBouquetPage } from './CustomBouquetPage.js';
import { Login, initLogin } from './Login.js';
import { renderCartPage } from './CartPage.js';
import { GiftBasketCard } from './GiftBasketCard.js';
import { GiftBasketAPI } from '../api/GiftBasketAPI.js';
import { renderGiftBasketPage } from './GiftBasketPage.js';
import { renderGiftBasketPage } from './GiftBasketPage.js';
import { renderCustomGiftBasketPage } from './CustomGiftBasketPage.js';

let giftBasketsData = [];
let currentView = 'home';
let productsData = [];
let occasionsData = [];

async function initApp() {
    try {
        productsData = await productApi.getAllProducts();
        occasionsData = await OccasionAPI.getAllOccasions();
        giftBasketsData = await GiftBasketAPI.getAllGiftBaskets();
        render();
    } catch (error) {
        console.error("Fejl under initialisering af app:", error);
    }
}

function navigateTo(view) {
    currentView = view;
    render();
}

function render() {
    const app = document.getElementById('app');

    if (currentView === 'home') {
        const bouquets = productsData.filter(p => p.productType === 'BOUQUET' || p.productType === 'CUSTOM_BOUQUET');
        app.innerHTML = `
        ${Navbar()}

        ${Hero(bouquets[0], "Sæson/Højtidlighed Fremvisning", "Oplev vores unikke udvalg af sæsonens smukkeste buketter.")}

        ${Hero(bouquets[1] || bouquets[0], "Byg din egen buket", "Sammensæt din helt egen personlige hilsen.", true)}

        <section class="catalog">
            <div class="container">
                <h2 class="section-title">Hele vores katalog</h2>
                <div class="product-grid">
                    ${productsData.map(p => ProductCard(p)).join('')}
                </div>
            </div>
        </section>

        <section class="gift-baskets-section">
            <div class="container">
                <h2 class="section-title">Gavekurve</h2>
                <div class="gift-basket-grid">
                    ${giftBasketsData.map(b => GiftBasketCard(b)).join('')}
                </div>
            </div>
        </section>

        ${Footer()}
        `;

        initLogin();
        const startButton = document.getElementById('start-build-bouquet-btn');
        if (startButton) {
            startButton.addEventListener('click', () => {
                window.history.pushState({}, '', '/custom-bouquet');
                renderCustomBouquetPage();
            });
        }

    } else if (currentView === 'giftbaskets') {
        app.innerHTML = Navbar() + '<div id="gift-basket-root"></div>' + Footer();
        renderGiftBasketPage(document.getElementById('gift-basket-root'));

    } else if (currentView === 'catalog') {
        app.innerHTML = `
            ${Navbar()}
            <div class="container" style="display: grid; grid-template-columns: 250px 1fr; gap: 40px; padding: 40px 20px;">
                <aside>
                    <h3>Anledninger</h3>
                    <div id="occasion-cards-container" class="filter-sidebar"></div>
                </aside>
                <main>
                    <h2 class="section-title">Anlednings Katalog</h2>
                    <div class="product-grid" id="product-cards-container">
                        <p style="color: #666;">Vælg en anledning i menuen til venstre for at se udvalget...</p>
                    </div>
                </main>
            </div>
            ${Footer()}
        `;

        const container = document.getElementById('occasion-cards-container');
        if (container) {
            occasionsData.forEach(occasion => {
                const el = document.createElement('div');
                el.classList.add('occasion-card');
                el.style.cssText = "padding: 15px; margin-bottom: 10px; background: #fff; border: 1px solid #ddd; cursor: pointer; border-radius: 4px;";
                el.dataset.occasion = occasion;
                el.textContent = occasion;
                container.appendChild(el);
            });
        }
        OccasionFilter.init();

    } else if (currentView === 'cart') {
        app.innerHTML = Navbar() + '<div id="cart-root"></div>' + Footer();
        renderCartPage(document.getElementById('cart-root'));
    } else if (currentView === 'gift-baskets') {
        renderGiftBasketPage();
    } else if (currentView === 'custom-gift-basket') {
    renderCustomGiftBasketPage();
    }

    setupNavbarListeners();
}

function setupNavbarListeners() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const text = link.textContent.trim();
            if (text === 'Katalog') {
                e.preventDefault();
                navigateTo('catalog');
            } else if (text === 'Gavekurve') {
                e.preventDefault();
                navigateTo('gift-baskets');
            } else if (text === 'Byg Selv Gavekurv') {
                e.preventDefault();
                navigateTo('custom-gift-basket');
            } else if (text === 'Hjem') {
                e.preventDefault();
                navigateTo('home');
            } else if (text === 'Kurv' || link.dataset.page === 'cart') {
                e.preventDefault();
                navigateTo('cart');
            } else if (text === 'Gavekurve') {
                e.preventDefault();
                navigateTo('giftbaskets');
            }
        });
    });

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('home');
        });
    }
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const text = link.textContent.trim();
            if (text === 'Katalog') {
                e.preventDefault();
                navigateTo('catalog');
            } else if (text === 'Hjem') {
                e.preventDefault();
                navigateTo('home');
            } else if (text === 'Indkøbskurv' || link.closest('.cart-icon-wrapper')) {
                e.preventDefault();
                navigateTo('cart');
            } else if (text === 'Gavekurve') {
                e.preventDefault();
                navigateTo('giftbaskets');
            }
        });
    });
}

window.addEventListener('popstate', initApp);
document.addEventListener('DOMContentLoaded', initApp);