// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import formatMony from "../../utills/money";
import axios from "axios";

export default function Product({ Products }) {
  // قمت بنقل تعريف useState ليكون آمناً
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="products-grid">
      {Products.map((product) => (
        <div key={product.id} className="product-container">
          <div className="product-image-container">
            <img className="product-image" src={product.image} alt={product.name} />
          </div>
          <div className="product-name limit-text-to-2-lines">{product.name}</div>
          <div className="product-price">{formatMony(product)}</div>
          
          <div className="product-quantity-container">
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
              {[...Array(10).keys()].map(i => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <button
            className="add-to-cartItems-button button-primary"
            onClick={() => {
              axios.post('/api/cart-items', {
                productId: product.id,
                quantity: quantity
              });
              alert("Added to cart!");
            }}
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}