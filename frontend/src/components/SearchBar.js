// src/components/SearchBar.js
import React, { useState } from 'react';
import { searchProducts } from '../services/searchService';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const foundProducts = await searchProducts(query);
        setResults(foundProducts);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
