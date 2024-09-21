// src/services/paymentService.js

export const processPayment = async (paymentData) => {
    // Simulate a payment processing API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (paymentData.amount > 0) {
                resolve({ success: true, message: 'Payment processed successfully' });
            } else {
                reject({ success: false, message: 'Payment failed' });
            }
        }, 1000);
    });
};
