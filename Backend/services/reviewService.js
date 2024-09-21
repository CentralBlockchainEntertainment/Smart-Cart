// reviewService.js
const axios = require('axios');
const reviewSources = ['Amazon', 'Trustpilot', 'Etsy'];

const reviewService = {
    getReviews: async (productId) => {
        const reviews = await fetchReviewsFromSources(productId);
        const summary = summarizeReviews(reviews);
        return { reviews, summary };
    }
};

const fetchReviewsFromSources = async (productId) => {
    const promises = reviewSources.map(source => axios.get(`https://api.${source}.com/reviews?product=${productId}`));
    const responses = await Promise.all(promises);
    return responses.flatMap(res => res.data.reviews);
};

const summarizeReviews = (reviews) => {
    const positive = reviews.filter(r => r.rating >= 4).length;
    const negative = reviews.filter(r => r.rating <= 2).length;
    return `Mostly positive (${positive} positive, ${negative} negative reviews).`;
};

module.exports = reviewService;
