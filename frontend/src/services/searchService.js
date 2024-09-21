// src/components/SearchBar.js

import React, { useState } from 'react';
import { searchProducts } from './searchService';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (query) {
            const foundProducts = await searchProducts(query);
            setResults(foundProducts);
        } else {
            setResults([]);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;