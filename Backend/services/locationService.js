// locationService.js
const axios = require('axios');

const locationService = {
    findNearbyStores: async (productQuery, userLocation) => {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location: `${userLocation.lat},${userLocation.lng}`,
                keyword: productQuery,
                radius: 5000,
                key: process.env.GOOGLE_MAPS_API_KEY
            }
        });
        return response.data.results;
    }
};

module.exports = locationService;
