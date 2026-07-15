import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useState, useEffect, Fragment } from 'react';
import Header from '../../components/Header'; // تأكد من المسار الصحيح للمكون
import './Orders.css';


export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // جلب الطلبات المحفوظة من المتصفح مباشرة
    const savedOrders = JSON.parse(localStorage.getItem('myOrders') || '[]');
    setOrders(savedOrders);
  }, []);

  return (
    <>
      <Header />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="order-container">
                {/* رأس الطلب */}
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>${(order.totalCents / 100).toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                {/* تفاصيل المنتجات داخل الطلب */}
                <div className="order-details-grid">
                  {order.products.map((orderProduct) => (
                    <Fragment key={orderProduct.id || orderProduct.productId}>
                      <div className="product-image-container">
                        <img src={orderProduct.product?.image} alt={orderProduct.product?.name} />
                      </div>
                      
                      <div className="product-details">
                        <div className="product-name">{orderProduct.product?.name}</div>
                        <div className="product-delivery-date">
                          Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                        </div>
                        <div className="product-quantity">Quantity: {orderProduct.quantity}</div>
                        
                        {/* زر "Buy Again" */}
                        <button className="buy-again-button button-primary">
                          <span className="buy-again-message">Add to Cart</span>
                        </button>
                      </div>

                      {/* زر التتبع الذي كنت تبحث عنه */}
                      <div className="product-actions">
                        <Link to={`/tracking/${orderProduct.productId}`}>
                          <button className="track-package-button button-secondary">
                            Track package
                          </button>
                        </Link>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>لا توجد طلبات سابقة. قم بإتمام عملية شراء أولاً!</p>
          )}
        </div>
      </div>
    </>
  );
}