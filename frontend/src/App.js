import React, { useState } from 'react';
import Chatbot from './components/Chatbot';
import CheckoutPage from './components/CheckoutPage';
import SearchBar from './components/SearchBar';

const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    // Function to handle adding items to the cart (for testing)
    const addItemToCart = (item) => {
        setCartItems([...cartItems, item]);
        setTotal(prevTotal => prevTotal + item.price);
    };

    // Example item for testing
    const sampleItem = { name: "Sample Product", price: 20 };

    return (
        <div>
            <h1>Welcome to Dealio</h1>
            
            {/* Search Bar */}
            <SearchBar addItemToCart={addItemToCart} />

            {/* Chatbot */}
            <Chatbot personalityType="casual" />

            {/* Checkout Page */}
            <CheckoutPage cartItems={cartItems} total={total} />

            {/* Button to add a sample item for testing */}
            <button onClick={() => addItemToCart(sampleItem)}>Add Sample Item to Cart</button>
        </div>
    );
};

export default App;
