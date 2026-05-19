const OccasionAPI = {
    async getAllOccasions() {
        const response = await fetch('/services/occasions');
        return response.json();

    },

    async getProductsByOccasiion(occasion) {
        const response = await fetch('/services/products?occasion=${occasion}');
        return response.json();

    }
}
document.addEventListener('DOMContentLoaded', () => {
    // Fetch products from your ProductController
    fetch('/services/products')
        .then(response => response.json())
        .then(products => {
            const grid = document.getElementById('product-list');
            if(products.length > 0) {
                grid.innerHTML = ''; // Clear placeholders
                products.forEach(prod => {
                    grid.innerHTML += `
                        <div class="product-card" style="padding:15px; background:#f9f9f9; text-align:center;">
                            <div style="background:#ddd; height:150px; margin-bottom:10px;"></div>
                            <h4>${prod.name}</h4>
                            <p>${prod.price} DKK</p>
                        </div>
                    `;
                });
            }
        });
});