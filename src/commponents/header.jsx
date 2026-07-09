import { Link } from 'react-router';
import './header.css'
export default function Header(){
  return (
    <>
       <title>Ecommerce Project</title>
      <div className="header">
            <div className="left-section">
          <Link to="/" className="header-link" aria-label="Home">
            <img className="logo" src="./public/images/logo-white.png" alt="Home" />
            <img className="mobile-logo" src="./public/images/mobile-logo-white.png" alt="Home" />
          </Link>
        </div>

            <div className="middle-section">
              <input className="search-bar" type="text" placeholder="Search" />

                <button type="button" className="search-button">
                  <img className="search-icon" src="./public/images/icons/search-icon.png" alt="Search" />
                </button>
                <Link className="orders-link header-link" to="/orders">

                  <span className="orders-text">Orders</span>
                </Link>

                <Link className="cart-link header-link" to="/checkout">
                  <img className="cart-icon" src="./public/images/icons/cart-icon.png" alt="Cart" />
                    <div className="cart-quantity">3</div>
                    <div className="cart-text">Cart</div>
                </Link>
            </div>
        </div>
    </>
  );
}