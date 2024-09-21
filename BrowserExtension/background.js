// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'APPLY_COUPONS') {
        const { cart, store } = message;
        applyCouponsForStore(cart, store)
            .then(response => sendResponse({ success: true, updatedCart: response }))
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true;
    }
});

const applyCouponsForStore = async (cart, store) => {
    const response = await fetch(`https://api.coupon-provider.com/coupons?store=${store}`, {
        method: 'POST',
        body: JSON.stringify({ cart }),
    });
    const coupons = await response.json();

    const bestCoupon = coupons.find(coupon => coupon.discount > 0);
    
    if (bestCoupon) {
        cart.total -= bestCoupon.discount;
    }

    return cart;
};
