// Vi tilføjer 'export' foran, så editoren holder op med at gøre den grå!
export const OccasionAPI = {

    async getAllOccasions() {
        const response = await fetch('/api/occasions');
        if (!response.ok) throw new Error("Kunne ikke hente anledninger");
        return response.json();
    },

// KORREKT (med backticks - dem der vender skråt):
    async getProductsByOccasion(occasion) {
        const response = await fetch(`/api/products?occasion=${occasion}`);
        if (!response.ok) throw new Error("Kunne ikke hente produkter for denne anledning");
        return response.json();
    }
};