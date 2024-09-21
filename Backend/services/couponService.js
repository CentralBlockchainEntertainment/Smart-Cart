// couponService.js
const axios = require('axios');

const couponService = {
    applyCoupons: async (cart) => {
        const coupons = await fetchAvailableCoupons(cart);
        return applyBestCoupon(cart, coupons);
    }
};

const fetchAvailableCoupons = async (cart) => {
    return axios.get('https://api.coupon-provider.com/coupons', { params: { cart } });
};

const applyBestCoupon = (cart, coupons) => {
    const bestCoupon = coupons.find(coupon => coupon.discount > 0);
    cart.total -= bestCoupon.discount;
    return cart;
};

module.exports = couponService;
