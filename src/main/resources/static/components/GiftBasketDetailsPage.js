import { addToCart } from './CartPage.js';

export function renderGiftBasketDetailsPage(container, basket) {
    container.innerHTML = `
        <div class="container gift-basket-details-page">
            <button class="btn-secondary gift-basket-back-btn">← Tilbage til gavekurve</button>

            <div class="gift-basket-details-layout">
                <div class="gift-basket-details-image">
                    ${basket.imageUrl
        ? `<img src="${basket.imageUrl}" alt="${basket.name}">`
        : `<div class="gift-basket-image-placeholder" style="aspect-ratio:1/1;"></div>`
    }
                </div>

                <div class="gift-basket-details-info">
                    <h1>${basket.name}</h1>
                    ${basket.occasion
        ? `<p class="gift-basket-details-occasion">${basket.occasion}</p>`
        : ''
    }
                    <p class="gift-basket-details-description">${basket.description ?? ''}</p>
                    <p class="gift-basket-details-price">${basket.price} kr.</p>

                    <div class="gift-basket-details-actions">
                        <button class="btn-primary gift-basket-add-btn" id="add-basket-to-cart">
                            Læg i kurv
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.gift-basket-back-btn').addEventListener('click', () => {
        import('./GiftBasketPage.js').then(({ renderGiftBasketPage }) => {
            renderGiftBasketPage(container);
        });
    });

    document.getElementById('add-basket-to-cart').addEventListener('click', () => {
        addToCart({
            id: `basket-${basket.id}`,
            name: basket.name,
            price: basket.price,
            quantity: 1
        });
        alert(`"${basket.name}" er lagt i kurven!`);
    });
}