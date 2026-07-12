import './tracking.css';
export default function TrackingPage() {
  return (
    <>
    <title>Ecommerce Project</title>
       <div className="header">
        <div className="left-section">
            <a href="/" className="header-link">
                <img className="logo" src="images/logo-white.png" />
                <img className="mobile-logo" src="images/mobile-logo-white.png" />
            </a>
        </div>

        <div className="middle-section">
            <input className="search-bar" type="text" placeholder="Search" />

            <button className="search-button">
					<img className="search-icon" src="images/icons/search-icon.png" />
				</button>
        </div>

        <div className="right-section">
            <a className="orders-link header-link" href="/orders">

                <span className="orders-text">Orders</span>
            </a>

            <a className="cartItems-link header-link" href="checkout.html">
                <img className="cartItems-icon" src="images/icons/cartItems-icon.png" />
                <div className="cartItems-quantity">3</div>
                <div className="cartItems-text">cartItems</div>
            </a>
        </div>
    </div>

    <div className="tracking-page">
        <div className="order-tracking">
            <a className="back-to-orders-link link-primary" href="/orders">
					View all orders
				</a>

            <div className="delivery-date">
                Arriving on Monday, June 13
            </div>

            <div className="product-info">
                Black and Gray Athletic Cotton Socks - 6 Pairs
            </div>

            <div className="product-info">
                Quantity: 1
            </div>

            <img className="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg" />

            <div className="progress-labels-container">
                <div className="progress-label">
                    Preparing
                </div>
                <div className="progress-label current-status">
                    Shipped
                </div>
                <div className="progress-label">
                    Delivered
                </div>
            </div>

            <div className="progress-bar-container">
                <div className="progress-bar"></div>
            </div>
        </div>
    </div>
    </>
  );
}