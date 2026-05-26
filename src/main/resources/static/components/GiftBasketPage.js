import { GiftBasketAPI } from '../api/GiftBasketAPI.js';

export async function renderGiftBasketPage(container) {
    container.innerHTML = `
        <div class="container gift-basket-page">
            <div class="gift-basket-page-header">
                <h1>Gavekurve</h1>
                <p class="gift-basket-page-subtitle">Vælg en gavekurv til enhver anledning</p>
            </div>
            <div id="gift-basket-list" class="gift-basket-grid">
                <p style="color:#888;">Henter gavekurve...</p>
            </div>
        </div>
    `;

    try {
        const baskets = await GiftBasketAPI.getAllGiftBaskets();
        const listEl = document.getElementById('gift-basket-list');

        if (!baskets.length) {
            listEl.innerHTML = '<p style="color:#888;">Ingen gavekurve fundet.</p>';
            return;
        }

        listEl.innerHTML = baskets.map(b => `
            <div class="gift-basket-card" data-id="${b.id}">
                <div class="gift-basket-image">
                    ${b.imageUrl
            ? `<img src="${b.imageUrl}" alt="${b.name}">`
            : `<div class="gift-basket-image-placeholder"></div>`
        }
                </div>
                <div class="gift-basket-info">
                    <h3>${b.name}</h3>
                    <p class="gift-basket-description">${b.description ?? ''}</p>
                    <div class="gift-basket-footer">
                        <span class="gift-basket-price">${b.price} kr.</span>
                        <button class="btn-primary gift-basket-details-btn" data-id="${b.id}">
                            Se detaljer
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.gift-basket-details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const basket = baskets.find(b => b.id === id);
                import('./GiftBasketDetailsPage.js').then(({ renderGiftBasketDetailsPage }) => {
                    renderGiftBasketDetailsPage(container, basket);
                });
            });
        });

    } catch (error) {
        console.error("Fejl ved hentning af gavekurve:", error);
        document.getElementById('gift-basket-list').innerHTML =
            '<p style="color:#888;">Kunne ikke hente gavekurve.</p>';
    }
}