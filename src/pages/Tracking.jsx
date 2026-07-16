import "./tracking.css";
import { Link, useParams }   from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import dayjs from 'dayjs';


export default function TrackingPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('myOrders') || '[]');

    let foundProduct = null;
    for (const order of savedOrders) {
      const match = order.products.find(
        (p) => String(p.productId) === String(productId)
      );
      if (match) {
        foundProduct = match;
        break;
      }
    }
    setProduct(foundProduct);
  }, [productId]);

  return (
    <>
      <Header />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          {product ? (
            <>
              <div className="delivery-date">
                Arriving on {dayjs(product.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
              </div>

              <div className="product-info">
                {product.product?.name}
              </div>

              <div className="product-info">
                Quantity: {product.quantity}
              </div>

              <img
                className="product-image"
                src={product.product?.image}
                alt={product.product?.name}
              />

              <div className="progress-labels-container">
                <div className="progress-label">Preparing</div>
                <div className="progress-label current-status">Shipped</div>
                <div className="progress-label">Delivered</div>
              </div>

              <div className="progress-bar-container">
                <div className="progress-bar"></div>
              </div>
            </>
          ) : (
            <p>لم يتم العثور على هذا المنتج ضمن طلباتك.</p>
          )}
        </div>
      </div>
    </>
  );
}
