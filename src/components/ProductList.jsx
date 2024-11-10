import React, { useEffect, useState } from 'react';
import axios from 'axios';
require('dotenv').config();
const apiUrl = process.env.REACT_APP_API_URL;
const ProductList = () => {
    const [products, setProducts] = useState([]);

    // Fetch products from the backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div key={product._id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2">Category: {product.category}</p>
                        <p className="text-gray-800 mb-4">{product.description}</p>
                        <p className="text-lg font-bold text-indigo-600">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
