import ProductAPI from '../api/productApi.js';
import { Navbar } from './Navbar.js';
import { Hero } from './Hero.js';
import { ProductCard } from './ProductCard.js';
import { Footer } from './Footer.js';
import { renderCustomBouquetPage } from './CustomBouquetPage.js';

async function init() {
    const app = document.getElementById('app');

    try {
        const products = await ProductAPI.getAllProducts();

        app.innerHTML = `
            ${Navbar()}

            ${Hero(products[0], "Sæson/Højtidlighed", "Naturens elegance i dit hjem.")}

            ${Hero(products[1] || products[0], "Byg din egen buket", "Skab noget unikt.", true)}

            <section class="catalog">
                <div class="container">
                    <h2 class="section-title">Katalog</h2>
                    <div class="product-grid">
                        ${products.map(p => ProductCard(p)).join('')}
                    </div>
                </div>
            </section>

            ${Footer()}
        `;

        const startButton = document.getElementById('start-build-bouquet-btn');

        if (startButton) {
            startButton.addEventListener('click', function () {
                window.history.pushState({}, '', '/custom-bouquet');
                renderCustomBouquetPage();
            });
        }
    } catch (error) {
        console.error("Render fejl:", error);
    }
}
//Eventlistener så man kan gå tilbage til forrige side på hjemmesiden
window.addEventListener('popstate', function () {
    init();
});

init();