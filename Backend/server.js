// server.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const searchService = require('./services/searchService');
const authService = require('./services/authService');
const recommendationService = require('./services/recommendationService');
const couponService = require('./services/couponService');
const paymentService = require('./services/paymentService');
const reviewService = require('./services/reviewService');
const locationService = require('./services/locationService');

const app = express();
app.use(express.json());  // To parse JSON bodies

// Define API routes

// Authentication routes
app.post('/login', (req, res) => {
    const user = authService.login(req.body.username, req.body.password);
    res.json(user);
});

app.post('/logout', (req, res) => {
    authService.logout();
    res.json({ message: 'User logged out' });
});

// Search products across stores
app.post('/search', async (req, res) => {
    const results = await searchService.searchProducts(req.body.query, req.body.userPreferences);
    res.json(results);
});

// AI-based recommendations
app.post('/recommend', async (req, res) => {
    const recommendations = await recommendationService.getRecommendations(req.body.userData);
    res.json(recommendations);
});

// Apply coupons
app.post('/apply-coupons', async (req, res) => {
    const updatedCart = await couponService.applyCoupons(req.body.cart);
    res.json(updatedCart);
});

// Payment processing
app.post('/checkout', async (req, res) => {
    const paymentResult = await paymentService.processPayment(req.body.cart);
    res.json(paymentResult);
});

// Get reviews and safety ratings
app.post('/reviews', async (req, res) => {
    const reviewData = await reviewService.getReviews(req.body.productId);
    res.json(reviewData);
});

// Find local stores with products
app.post('/location', async (req, res) => {
    const stores = await locationService.findNearbyStores(req.body.query, req.body.location);
    res.json(stores);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
