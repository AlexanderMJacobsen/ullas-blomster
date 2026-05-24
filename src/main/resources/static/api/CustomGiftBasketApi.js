const CustomGiftBasketAPI = {

    baseUrl: '/api/custom-gift-baskets',

    async createCustomGiftBasket(giftBasket) {
        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(giftBasket)
            });

            if (!response.ok) {
                throw new Error('Kunne ikke gemme gavekurven');
            }

            return await response.json();

        } catch (error) {
            console.error('Fejl i createCustomGiftBasket:', error);
            return null;
        }
    }
};

export default CustomGiftBasketAPI;