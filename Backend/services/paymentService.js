// paymentService.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const storeAPIs = require('../utils/storeAPIs');

const paymentService = {
    processPayment: async (cart) => {
        // Charge user once via Stripe
        const totalAmount = cart.items.reduce((sum, item) => sum + item.price, 0);
        const charge = await stripe.paymentIntents.create({
            amount: totalAmount * 100,  // Stripe uses cents
            currency: 'usd',
            payment_method: cart.paymentMethodId,
            confirm: true,
        });

        // Distribute payments to respective stores
        await distributePaymentsToStores(cart.items);

        return charge;
    }
};

const distributePaymentsToStores = async (items) => {
    const stores = groupByStore(items);
    const paymentPromises = stores.map(async (store) => {
        const storeItems = store.items;
        const storeTotal = storeItems.reduce((sum, item) => sum + item.price, 0);
        
        // Simulate payments to each store using mock store APIs
        return await storeAPIs.processStorePayment(store.storeName, storeTotal);
    });

    return Promise.all(paymentPromises);
};

const groupByStore = (items) => {
    const stores = {};
    items.forEach(item => {
        if (!stores[item.store]) {
            stores[item.store] = { storeName: item.store, items: [] };
        }
        stores[item.store].items.push(item);
    });
    return Object.values(stores);
};

module.exports = paymentService;
