import productApi from "../api/productApi.js";
import { Navbar } from './Navbar.js';
import { Footer } from './Footer.js';
import CustomGiftBasketAPI from '../api/CustomGiftBasketApi.js';

export async function renderCustomGiftBasketPage() {

    const app = document.getElementById('app');

    try {

        const products = await productApi.getAllProducts();

        const giftItems = products.filter(function(product) {

            return product.productType === 'GIFT_ITEM';

        });

        app.innerHTML = `

            ${Navbar()}

            <main class="container bouquet-page">
                <h1>Byg din egen gavekurv</h1>
                <p>
                    Vælg produkter og sammensæt din egen gavekurv.
                </p>
                <section class="bouquet-builder-layout">
                    <div>
                        <h2>Vælg produkter</h2>
                        <section class="product-grid">

                            ${giftItems.map(function(item) {
            return `

                                    <div class="product-card">
                                        <img
                                            src="${item.imageUrl}"
                                            alt="${item.name}"
                                            style="width:100%; height:180px; object-fit:contain;"
                                        >
                                        <h3>${item.name}</h3>
                                        <p>${item.description ?? ""}</p>
                                        <p>${item.price} kr.</p>
                                        <button
                                            class="add-gift-item-btn"
                                            data-id="${item.id}"
                                            data-name="${item.name}"
                                            data-price="${item.price}"
                                        >
                                            Tilføj til gavekurv
                                        </button>
                                    </div>
                                `;

        }).join('')}

                        </section>
                    </div>
                    <section class="bouquet-summary">
                        <h2>Din gavekurv</h2>
                        <div id="selected-gift-items"></div>
                        <p class="total-price-row">
                            <strong>Total pris:</strong>
                            <span id="total-price">0</span> kr.
                        </p>
                        <div class="bouquet-actions">
                            <button id="save-gift-basket-btn">
                                Gem gavekurv
                            </button>
                            <button id="add-to-cart-btn">
                                Tilføj til indkøbskurv
                            </button>
                        </div>
                    </section>
                </section>
            </main>
            
            ${Footer()}

        `;

        setupGiftBasketEvents();

    } catch (error) {

        console.error(
            "Fejl på CustomGiftBasketPage:",
            error
        );

    }

    function setupGiftBasketEvents() {

        const selectedGiftItems = [];

        const selectedGiftItemsList =
            document.getElementById('selected-gift-items');

        const totalPriceElement =
            document.getElementById('total-price');

        const addButtons =
            document.querySelectorAll('.add-gift-item-btn');

        const saveButton =
            document.getElementById('save-gift-basket-btn');


        addButtons.forEach(function(button) {

            button.addEventListener('click', function() {

                const item = {
                    id: button.dataset.id,
                    name: button.dataset.name,
                    price: Number(button.dataset.price)
                };

                selectedGiftItems.push(item);

                updateGiftBasketView(selectedGiftItems, selectedGiftItemsList, totalPriceElement);

            });

        });

        saveButton.addEventListener('click', async function() {

            const groupedGiftItems =
                groupGiftItemsById(selectedGiftItems);

            const itemsText =
                groupedGiftItems.map(function(item) {

                    return `${item.quantity}x ${item.name}`;

                }).join(', ');

            const giftBasket = {

                itemsText: itemsText,
                totalPrice:
                    calculateTotalPrice(selectedGiftItems)
            };

            const result =
                await CustomGiftBasketAPI
                    .createCustomGiftBasket(giftBasket);

            if (result !== null) {
                alert('Gavekurven blev gemt!');
            } else {
                alert('Noget gik galt.');
            }

        });

    }

    //Listen som viser valgte items
    function updateGiftBasketView(selectedGiftItems, selectedGiftItemsList, totalPriceElement) {
        const groupedGiftItems = groupGiftItemsById(selectedGiftItems);

        selectedGiftItemsList.innerHTML = groupedGiftItems.map(function(item) {
            return `
            <div class="selected-flower-row">
                <span>${item.name}</span>
                <span>${item.quantity} stk.</span>
                <span>${item.price} kr./stk.</span>
                <span>${item.price * item.quantity} kr.</span>
                <button class="remove-gift-item-btn" data-id="${item.id}">
                    Fjern
                </button>
            </div>
        `;
        }).join('');

        totalPriceElement.textContent = calculateTotalPrice(selectedGiftItems);

        const removeButtons = document.querySelectorAll('.remove-gift-item-btn');

        removeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const id = button.dataset.id;

                const index = selectedGiftItems.findIndex(function(item) {
                    return item.id === id;
                });

                if (index !== -1) {
                    selectedGiftItems.splice(index, 1);
                }

                updateGiftBasketView(selectedGiftItems, selectedGiftItemsList, totalPriceElement);
            });
        });
    }

    //Tilføjer items og viser antal af valgte items
    function groupGiftItemsById(selectedGiftItems) {
        const groupedGiftItems = [];

        selectedGiftItems.forEach(function(item) {
            const existingItem = groupedGiftItems.find(function(groupedItem) {
                return groupedItem.id === item.id;
            });

            if (existingItem) {
                existingItem.quantity = existingItem.quantity + 1;
            } else {
                groupedGiftItems.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1
                });
            }
        });

        return groupedGiftItems;
    }

    //Regner totalprisen ud
    function calculateTotalPrice(selectedGiftItems) {
        let total = 0;

        selectedGiftItems.forEach(function(item) {
            total = total + item.price;
        });

        return total;
    }
}