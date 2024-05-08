// pages/AllProductsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDetailsPage from './ProductDetailsPage';

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000');
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>All Products</h1>
            <ProductDetailsPage products={products}/>
        </div>
    );
};

export default AllProductsPage;
