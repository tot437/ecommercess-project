
import { Link } from 'react-router-dom';
import './header.css';

export default function Header({ cartItems }) {
  let totalQuantity = 0;
  
  // حماية: التأكد من أن cartItems مصفوفة قبل الحساب
  if (Array.isArray(cartItems)) {
    cartItems.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    });
  }

  return (
    <>
      <title>Ecommerce Project</title>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link" aria-label="Home">
            <img className="logo" src="/images/logo-white.png" alt="Home" />
            <img className="mobile-logo" src="/images/mobile-logo-white.png" alt="Home" />
          </Link>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />
          <button type="button" className="search-button">
            <img className="search-icon" src="/images/icons/search-icon.png" alt="Search" />
          </button>
          <Link className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </Link>
          <Link className="cartItems-link header-link" to="/checkout">
            <img className="cartItems-icon" src="/images/icons/cartItems-icon.png" alt="cartItems" />
            <div className="cartItems-quantity">{totalQuantity}</div>
            <div className="cartItems-text">cartItems</div>
          </Link>
        </div>
      </div>
    </>
  );
}