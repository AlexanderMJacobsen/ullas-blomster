//Nedenstående er til API struktur

const OccasionFilter = {
    init() {
        const cards = [...document.querySelectorAll('.occasion-card')]
            .map(el => new OccasionCard(el));

        cards.forEach(card => {
            card.onClick(async selected => {
                cards.forEach(c => c.setActive(false));
                selected.setActive(true);

                const products = await OccasionApi.getProductsByOccasion(selected.occasion);
                OccasionFilter.renderProducts(products);
            });
        });
    },

    renderProducts(products) {
        const container = document.getElementById('product-cards-container');
        container.innerHTML = '';
        products.forEach(product => {
            const el = document.createElement('div');
            el.classList.add('product-card');
            el.textContent = product.name;
            container.appendChild(el);
        });
    }
};