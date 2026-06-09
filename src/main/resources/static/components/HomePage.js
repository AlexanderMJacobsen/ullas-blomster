import { Navbar } from './Navbar.js';
import { Hero } from './Hero.js';
import { ProductCard } from './ProductCard.js';
import { GiftBasketCard } from './GiftBasketCard.js';
import { Footer } from './Footer.js';
import { initLogin } from './Login.js';
import { renderCustomBouquetPage } from './CustomBouquetPage.js';

export const renderHomePage = (container, productsData, giftBasketsData) => {
    const bouquets = productsData.filter(p => p.productType === 'BOUQUET' || p.productType === 'CUSTOM_BOUQUET');

    container.innerHTML = `
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

    // Initialize scripts that depend on the DOM elements being loaded
    initLogin();

    const startButton = document.getElementById('start-build-bouquet-btn');
    if (startButton) {
        startButton.addEventListener('click', () => {
            window.history.pushState({}, '', '/custom-bouquet');
            renderCustomBouquetPage();
        });
    }
};