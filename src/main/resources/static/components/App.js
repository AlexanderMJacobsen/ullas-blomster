import ProductAPI from '../services/productApi.js';
import { Navbar } from './Navbar.js';
import { Hero } from './Hero.js';
import { ProductCard } from './ProductCard.js';
import { Footer } from './Footer.js';

async function init() {
    const app = document.getElementById('app');

    //Routing til indkøbskurv
    if (window.location.hash === '#cart') {
        renderCartPage(1);
        return;
    }

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
    } catch (error) {
        console.error("Render fejl:", error);
    }
}

init();