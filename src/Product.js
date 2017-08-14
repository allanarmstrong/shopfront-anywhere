import React from 'react';
import './Product.css';

export const Product = ({product, addToCart}) => {
    return (
        <div className="product">
            <img src={product.images.edges[0].node.src} className="product--image" alt={product.title}/>
            <h3 className="product--title">{product.title}</h3>
            <span>${product.variants.edges[0].node.price}</span>
            <div><button onClick={() => addToCart(product.id)}>Add To Cart</button></div>
        </div>
    )
}