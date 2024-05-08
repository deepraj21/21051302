import React from 'react';

const ProductDetailsPage = (products) => {
    
    return (
        <div>
            <ul>
                {products.map(product => (
                    <li key={product.productId}>
                        <h3>{product.name}</h3>
                        <p>Company: {product.company}</p>
                        <p>Category: {product.category}</p>
                        <p>Price: ${product.price}</p>
                        <p>Rating: {product.rating}</p>
                        <p>Discount: {product.discount}%</p>
                        <p>Availability: {product.availability}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductDetailsPage;