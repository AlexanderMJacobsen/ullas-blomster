export const GiftBasketCard = (basket) => `
    <div class="gift-basket-card">
        <div class="gift-basket-image">
            ${basket.imageUrl
    ? `<img src="${basket.imageUrl}" alt="${basket.name}">`
    : `<div class="gift-basket-image-placeholder"></div>`
}
        </div>
        <div class="gift-basket-info">
            <h3>${basket.name}</h3>
            <p class="gift-basket-description">${basket.description ?? ''}</p>
            <div class="gift-basket-footer">
                <span class="gift-basket-price">${basket.price} kr.</span>
                <button class="btn-primary gift-basket-btn" data-id="${basket.id}">
                    Læg i kurv
                </button>
            </div>
        </div>
    </div>
`;