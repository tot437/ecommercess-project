// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import formatMony from "../../utills/money";
import { useNavigate } from "react-router-dom";

export default function Product({ Products }) {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});


  return (
    <>

      <div className="products-grid">

        {Products.map((product) => {

          const quantity = quantities[product.id] || 1;

          return (
            <div key={product.id} className="product-container">
              <div className="product-image-container">
                <img className="product-image" src={product.image} alt={product.name} />
              </div>
              <div className="product-name limit-text-to-2-lines">{product.name}</div>
              <div className="product-price">{formatMony(product)}</div>

              <div className="product-quantity-container">
                <select value={quantity} onChange={(event) => {

                  const quantitySelected = Number(event.target.value);
                  setQuantities((prev) => ({ ...prev, [product.id]: quantitySelected }));
                }}>

                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <button
                className="add-to-cartItems-button button-primary"
                onClick={() => {
                  const existingCart = JSON.parse(localStorage.getItem('myCart') || '[]');

                  const newCart = [...existingCart, {
                    productId: product.id,
                    quantity: quantity,
                    product: product
                  }];

                  localStorage.setItem('myCart', JSON.stringify(newCart));
                  navigate('/checkout');
                }}
              >
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
