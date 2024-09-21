// src/services/couponService.js

export const applyCoupon = async (couponCode) => {
    // Simulate an API call to validate a coupon
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (couponCode === 'SAVE10') {
                resolve({ success: true, discount: 10 });
            } else {
                reject({ success: false, message: 'Invalid coupon code' });
            }
        }, 1000);
    });
};
