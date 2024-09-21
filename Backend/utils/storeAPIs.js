// storeAPIs.js

const processStorePayment = async (storeName, totalAmount) => {
    // Simulate sending payment to the respective store's API
    console.log(`Processing payment of $${totalAmount} to ${storeName}...`);

    // Simulate success response from the store's API
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                status: 'success',
                message: `Payment to ${storeName} processed successfully.`,
            });
        }, 1000); // Simulate 1-second delay for the API response
    });
};

module.exports = { processStorePayment };
