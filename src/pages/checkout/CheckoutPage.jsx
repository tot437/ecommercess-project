import { useState } from 'react';
import '../checkout/checkout-header.css';
import '../checkout/checkout.css';
import '../../pages/header.css';
import formatMony from '../../utills/money';
import Header from '../../components/Header';
import products from '../../../products';
import { useNavigate } from 'react-router-dom';

const DELIVERY_OPTIONS = [
  { id: '1', date: 'Tuesday, April 22', priceCents: 0 },
  { id: '2', date: 'Wednesday, April 15', priceCents: 499 },
  { id: '3', date: 'Monday, April 13', priceCents: 999 }
];

function getProductById(productId) {
  return products.find((product) => product.id === productId) ?? null;
}

export default function CheckoutPage({ cartItems = [], setCart }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const navigate = useNavigate();

  // الحسابات يجب أن تكون في جسم المكون مباشرة
  const subtotalCents = cartItems.reduce((sum, item) => {
    const product = item.product ?? getProductById(item.productId);
    return sum + ((product?.priceCents ?? 0) * item.quantity);
  }, 0);

  const shippingCents = cartItems.reduce((sum, item) => {
    const optionId = selectedOptions[item.productId] ?? '1';
    const option = DELIVERY_OPTIONS.find(o => o.id === optionId);
    return sum + (option?.priceCents ?? 0);
  }, 0);

  const totalBeforeTaxCents = subtotalCents + shippingCents;
  const taxCents = Math.round(totalBeforeTaxCents * 0.1);
  const totalCents = totalBeforeTaxCents + taxCents;

  const handleOptionChange = (productId, optionId) => {
    setSelectedOptions(prev => ({ ...prev, [productId]: optionId }));
  };

  const placeOrder = () => {
    const newOrder = {
      id: Date.now().toString(),
      orderTimeMs: Date.now(),
      totalCents: totalCents,
      products: cartItems.map(item => ({
        ...item,
        product: getProductById(item.productId),
        estimatedDeliveryTimeMs: Date.now() + 86400000 
      }))
    };

    const existingOrders = JSON.parse(localStorage.getItem('myOrders') || '[]');
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem('myOrders', JSON.stringify(updatedOrders));

    setCart([]);
    navigate('/orders');
  };

  return (
    <>
      <Header cartItems={cartItems} />
      <div className="checkout-page">
        <div className="checkout-grid">
          <div className="order-summary">
            {cartItems.map((cartItem) => {
              const product = cartItem.product ?? getProductById(cartItem.productId);
              return (
                <div key={cartItem.productId} className="cartItems-item-container">
                  <div className="cartItems-item-details-grid">
                    <img className="product-image" src={product?.image} alt={product?.name} />
                    <div className="cartItems-item-details">
                      <div className="product-name">{product?.name}</div>
                      <div className="product-price">{formatMony(product)}</div>
                      <div>Quantity: {cartItem.quantity}</div>
                    </div>
                    <div className="delivery-options">
                      <div className="delivery-options-title">Choose a delivery option:</div>
                      {DELIVERY_OPTIONS.map((option) => (
                        <div key={option.id} className="delivery-option" onClick={() => handleOptionChange(cartItem.productId, option.id)}>
                          <input
                            type="radio"
                            name={`delivery-${cartItem.productId}`}
                            checked={(selectedOptions[cartItem.productId] ?? '1') === option.id}
                            readOnly
                          />
                          <div>
                            <div className="delivery-option-date">{option.date}</div>
                            <div className="delivery-option-price">
                              {option.priceCents === 0 ? 'FREE Shipping' : `$${(option.priceCents / 100).toFixed(2)} - Shipping`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>
            <div className="payment-summary-row">
              <div>Items ({cartItems.length}):</div>
              <div className="payment-summary-money">${(subtotalCents / 100).toFixed(2)}</div>
            </div>
            <div className="payment-summary-row">
              <div>Shipping & handling:</div>
              <div className="payment-summary-money">${(shippingCents / 100).toFixed(2)}</div>
            </div>
            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">${(totalBeforeTaxCents / 100).toFixed(2)}</div>
            </div>
            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">${(taxCents / 100).toFixed(2)}</div>
            </div>
            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">${(totalCents / 100).toFixed(2)}</div>
            </div>
            <button className="place-order-button button-primary" onClick={placeOrder}>Place your order</button>
          </div>
        </div>
      </div>
    </>
  );
}