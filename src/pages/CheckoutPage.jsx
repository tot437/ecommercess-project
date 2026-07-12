
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import './checkout-header.css';
import './checkout.css';
import './header.css';
import formatMony from '../utills/money';
import Header from '../components/Header';
import '../components/header.css';
import products from '../../products';

function getProductById(productId) {
  return products.find((product) => product.id === productId) ?? null;
}

export default function CheckoutPage({ cartItems: initialCartItems = [], setCart }) {
  const cartItems = Array.isArray(initialCartItems) ? initialCartItems : [];

  // FIXED: Hooks moved to the top level
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response) => {
        // Log the response to see the structure
        // If the API returns an object with a property containing the array (e.g., response.data.options),
        // update it to use that property.
        // For now, let's ensure it's at least an array:
        setDeliveryOptions(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => console.error("Error fetching delivery options:", error));
  }, []);

  const updateQuantity = (productId, change) => {
    if (typeof setCart !== 'function') return;

    setCart((currentCart) =>
      currentCart.flatMap((item) => {
        const itemId = item.productId ?? item.product?.id;

        if (itemId !== productId) {
          return [item];
        }

        const nextQuantity = item.quantity + change;
        return nextQuantity <= 0 ? [] : [{ ...item, quantity: nextQuantity }];
      })
    );
  };

  const removeItem = (productId) => updateQuantity(productId, -999);
  const increaseQuantity = (productId) => updateQuantity(productId, 1);
  const decreaseQuantity = (productId) => updateQuantity(productId, -1);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => {
    const product = item.product ?? getProductById(item.productId ?? item.id);
    return sum + (product?.priceCents ?? 0) * item.quantity;
  }, 0);
  const shipping = totalQuantity > 0 ? 499 : 0;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  return (
    <>
      <title>Ecommerce Project</title>
      <Header cartItems={cartItems} />
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="/images/logo.png" alt="Logo" />
              <img className="mobile-logo" src="/images/mobile-logo.png" alt="Logo" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link" to="/">{totalQuantity} items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src="/images/icons/checkout-lock-icon.png" alt="Secure checkout" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cartItems.length === 0 ? (
              <div className="cartItems-item-container">Your cart is empty.</div>
            ) : (
              cartItems.map((cartItem, index) => {
                const product = cartItem.product ?? getProductById(cartItem.productId ?? cartItem.id);
                const imageSrc = product?.image ? product.image : '/images/products/placeholder.png';

                return (
                  <div key={cartItem.productId ?? `${product?.name ?? 'item'}-${index}`} className="cartItems-item-container">
                    <div className="delivery-date">
                      Delivery date: {/* You may want to find specific delivery logic here */}
                    </div>

                    <div className="cartItems-item-details-grid">
                      <img className="product-image" src={imageSrc} alt={product?.name ?? 'Product'} />

                      <div className="cartItems-item-details">
                        <div className="product-name">{product?.name ?? 'Product'}</div>
                        <div className="product-price">{product ? formatMony(product) : '$0.00'}</div>
                        <div className="product-quantity">
                          <span>
                            Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                          </span>
                          <button type="button" className="update-quantity-link link-primary" onClick={() => decreaseQuantity(cartItem.productId ?? cartItem.product?.id)}> - </button>
                          <button type="button" className="update-quantity-link link-primary" onClick={() => increaseQuantity(cartItem.productId ?? cartItem.product?.id)}> + </button>
                          <button type="button" className="delete-quantity-link link-primary" onClick={() => removeItem(cartItem.productId ?? cartItem.product?.id)}> Delete </button>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">Choose a delivery option:</div>
                        {deliveryOptions.map((option) => {
                          let priceString = 'FREE Shipping';
                          if (option.priceCents > 0) {
                            priceString = `${formatMony(option)} - Shipping`;
                          }
                          return (
                            <div key={option.id} className="delivery-option">
                              <input
                                type="radio"
                                checked={option.id === cartItem.deliveryOptionId}
                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`}
                                onChange={() => { }} // Added to suppress controlled input warning
                              />
                              <div>
                                <div className="delivery-options">
                                  <div className="delivery-options-title">Choose a delivery option:</div>
                                  {/* Add this check: */}
                                  {Array.isArray(deliveryOptions) && deliveryOptions.map((option) => (
                                    <div key={option.id} className="delivery-option">
                                      {/* ... your input and divs ... */}
                                    </div>
                                  ))}
                                </div>
                                <div className="delivery-option-price">{priceString}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>
            <div className="payment-summary-row">
              <div>Items ({totalQuantity}):</div>
              <div className="payment-summary-money">{formatMony({ priceCents: subtotal })}</div>
            </div>
            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">{formatMony({ priceCents: shipping })}</div>
            </div>
            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">{formatMony({ priceCents: subtotal + shipping })}</div>
            </div>
            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{formatMony({ priceCents: tax })}</div>
            </div>
            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">{formatMony({ priceCents: total })}</div>
            </div>
            <button className="place-order-button button-primary">Place your order</button>
          </div>
        </div>
      </div>
    </>
  );
}