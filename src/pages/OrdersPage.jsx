import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import Header from '../components/header'
import './Orders.css';
import formatMony from '../utills/money';


export default function OrdersPage({ cartItems }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('/api/orders?expand=products')
      .then((response) => {
        

        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Header cartItems={cartItems} />
      <title>Ecommerce Project</title>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {Array.isArray(orders) && orders.map((order) => {
            return (
              <>
                <div key={order.id} className="order-container">

                  <div className="order-header">
                    <div className="order-header-left-section">
                      <div className="order-date">
                        <div className="order-header-label">Order Placed:</div>
                        <div>{dayjs(order.orderTimeMs).format(' MMMM D')}</div>
                      </div>
                      <div className="order-total">
                        <div className="order-header-label">Total:</div>
                        <div>{formatMony(order)}</div>
                      </div>
                    </div>

                    <div className="order-header-right-section">
                      <div className="order-header-label">Order ID:</div>
                      <div>{order.id}</div>
                    </div>
                  </div>

                  <div className="order-details-grid">
                    {order.products.map((orderProduct) => {
                      return (
                        <Fragment key={orderProduct.id}>
                          <div className="product-image-container">
                            <img src={orderProduct.product.image} alt="Black and Gray Athletic Cotton Socks - 6 Pairs" />
                          </div>

                          <div className="product-details">
                            <div className="product-name">
                              {orderProduct.product.name}
                            </div>
                            <div className="product-delivery-date">
                              Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                            </div>
                            <div className="product-quantity">
                              Quantity: {orderProduct.quantity}
                            </div>
                            <button className="buy-again-button button-primary">
                              <img className="buy-again-icon" src="images/icons/buy-again.png" alt="Buy Again" />
                              <span className="buy-again-message">Add to cartItems</span>
                            </button>
                          </div>

                          <div className="product-actions">
                            <a href="tracking.html">
                              <button className="track-package-button button-secondary">
                                Track package
                                <Link className="tracking-link header-link" to="/tracking">
                                  <span className="tracking-text">Tracking</span>
                                </Link>
                              </button>
                            </a>
                          </div>

                          <div className="product-image-container">
                            <img src={orderProduct.product.image} alt="Adults Plain Cotton T-Shirt - 2 Pack" />
                          </div>

                          <div className="product-details">
                            <div className="product-name">
                              {orderProduct.product.name}
                            </div>
                            <div className="product-delivery-date">
                              Arriving on:  {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                            </div>
                            <div className="product-quantity">
                              Quantity: {orderProduct.quantity}
                            </div>
                            <button className="buy-again-button button-primary">
                              <img className="buy-again-icon" src="images/icons/buy-again.png" alt="Buy Again" />
                              <span className="buy-again-message">Add to cartItems</span>
                            </button>
                          </div>

                          <div className="product-actions">
                            <a href="tracking.html">
                              <button className="track-package-button button-secondary">
                                Track package
                                <Link className="tracking-link header-link" to="/tracking">
                                  <span className="tracking-text">Tracking</span>
                                </Link>
                              </button>
                            </a>
                          </div>
                        </Fragment>
                      );
                    })}

                  </div>
                </div>
              </>
            );
          })}
        </div >
      </div>
    </>
  );
}