import productApi from "../api/productApi.js";
import { Navbar } from "./Navbar.js";
import { Footer } from "./Footer.js";
import { ProductCard } from "./ProductCard.js";

export async function renderGiftBasketPage() {

    const app = document.getElementById('app');

    try {

        const products = await productApi.getAllProducts();

        const giftBaskets = products.filter(function(product) {

            return product.productType === 'GIFT_BASKET';

        });

        app.innerHTML = `

            ${Navbar()}

            <main class="container">
                <h1>Gavekurve</h1>
                <p>
                    Se vores udvalg af gavekurve til enhver anledning.
                </p>
                <section class="product-grid">

                    ${giftBaskets.map(function(product) {

            return ProductCard(product);

        }).join('')}
                </section>
            </main>

            ${Footer()}

        `;

        const cartButtons = document.querySelectorAll('.add-to-cart-btn');

        cartButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const productId = button.dataset.id;

                console.log("Tilføj til indkøbskurv:", productId);

                alert("Gavekurven er tilføjet til indkøbskurven");

                //Rigtig kode mangler for at få det ind i indkøbskurven
            });
        });

    } catch (error) {

        console.error("Fejl på GiftBasketPage:", error);

    }
}