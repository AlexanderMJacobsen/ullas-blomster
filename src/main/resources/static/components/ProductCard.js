export const ProductCard = (p) => `
<div class="product-card">
    <div class="image-placeholder" style="overflow: hidden; aspect-ratio: 1/1;">
        <img src="${p.imageUrl}" crossorigin="anonymous" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;">
    </div>
    <h4 style="margin-top: 10px;">${p.name}</h4>
    <p>${p.price} DKK</p>
    ${p.productType === 'GIFT_BASKET'
    ? '<button class="add-to-cart-btn">Tilføj til indkøbskurv</button>'
    : ''}
</div>`;