import { useState } from "react";
import formatMony from "../../utills/money";
import axios from "axios";

export default function product({ Products }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const addToCart = async () => {
    await axios.post('/api/cart-items', {
      productId: product.id,
      // eslint-disable-next-line no-undef
      quantity: quantity
    });
  }

  const selectQuantity = (event) => {
                  const quantitySelacted = Number(event.target.value);
                  // eslint-disable-next-line no-undef
                  setQuantity(quantitySelacted);
                };
  return (
    <>
      <div className="products-grid">
        {Products.map((product) => {
          // eslint-disable-next-line no-unused-vars
          const [quantity, setQuantity] = useState(1);
          return (
            <div key={product.id} className="product-container">
              <div className="product-image-container">
                <img className="product-image" src={product.image} alt={product.name} />
              </div>
              <div className="product-name limit-text-to-2-lines">{product.name}</div>
              <div className="product-rating-container">
                <img className="product-rating-stars" src="./images/ratings/rating-45.png" alt="4.5 star rating" />
                <div className="product-rating-count link-primary">{product.rating.count}</div>
              </div>
              <div className="product-price">{formatMony(product)}</div>
              <div className="product-quantity-container">
                <select value={quantity} onChange={selectQuantity}>
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
              <div className="product-spacer"></div>
              <div className="added-to-cartItems">
                <img src="./images/icons/checkmark.png" alt="Checkmark" />
                Added
              </div>
              <button
                onClick={() => {
                  const select = document.getElementById(`qty-${product.id}`);
                  const quantity = Number(select?.value || 1);
                  // eslint-disable-next-line no-undef
                  addItemToCart(product, quantity);
                }}
                className="add-to-cartItems-button button-primary"
                // eslint-disable-next-line react/jsx-no-duplicate-props
                onClick={addToCart}>
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}