// src/components/CheckoutPage.js
import React from 'react'; // For React
import { useState } from 'react'; // If you're using useState
import { processPayment } from '../services/paymentService';
import { applyCoupon } from '../services/couponService';

const CheckoutPage = () => {
    const [amount, setAmount] = useState(0);
    const [coupon, setCoupon] = useState('');
    const [message, setMessage] = useState('');

    const handlePayment = async () => {
        try {
            const response = await processPayment({ amount });
            setMessage(response.message);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleCoupon = async () => {
        try {
            const response = await applyCoupon(coupon);
            setMessage(`Coupon applied! Discount: ${response.discount}`);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handlePayment}>Process Payment</button>
            <br />
            <input
                type="text"
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
            />
            <button onClick={handleCoupon}>Apply Coupon</button>
            <p>{message}</p>
        </div>
    );
};

export default CheckoutPage;
