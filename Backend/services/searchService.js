// searchService.js
const axios = require('axios');
const ecoFriendlyStores = ['EcoStore1', 'EcoStore2'];
const favoriteStores = ['FavoriteStore1', 'FavoriteStore2'];

const searchService = {
    searchProducts: async (query, userPreferences) => {
        let results = [];

        // Fetch results from favorite stores first
        if (userPreferences.prioritizeFavorites) {
            results = await fetchFromStores(favoriteStores, query);
        } else {
            results = await fetchFromAllStores(query);
        }

        // Filter for eco-friendly stores if needed
        if (userPreferences.ecoFriendlyOnly) {
            results = results.filter(product => ecoFriendlyStores.includes(product.store));
        }

        return comparePrices(results);
    }
};

const fetchFromStores = async (stores, query) => {
    const promises = stores.map(store => axios.get(`https://api.${store}.com/products?q=${query}`));
    const responses = await Promise.all(promises);
    return responses.map(res => res.data);
};

const fetchFromAllStores = async (query) => {
    const allStores = [...ecoFriendlyStores, 'Amazon', 'Etsy'];
    return fetchFromStores(allStores, query);
};

const comparePrices = (products) => {
    return products.sort((a, b) => a.price - b.price);
};

module.exports = searchService;
