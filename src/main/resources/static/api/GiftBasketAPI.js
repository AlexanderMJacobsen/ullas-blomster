export const GiftBasketAPI = {

    async getAllGiftBaskets() {
        const response = await fetch('/api/giftbaskets');
        if (!response.ok) throw new Error("Kunne ikke hente gavekurve");
        return response.json();
    },

    async getGiftBasketsByOccasion(occasion) {
        const response = await fetch(`/api/giftbaskets?occasion=${occasion}`);
        if (!response.ok) throw new Error("Kunne ikke hente gavekurve for denne anledning");
        return response.json();
    }
};