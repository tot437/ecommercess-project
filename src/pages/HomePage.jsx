import { Link } from 'react-router';
import './homepages.css';
import './header.css';


export default function HomePage() {
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

        <div className="home-page">
          <div className="products-grid">

            <div className="product-container">
              <div className="product-image-container">
                <img className="product-image" src="./public/images/products/athletic-cotton-socks-6-pairs.jpg" alt="Black and Gray Athletic Cotton Socks - 6 Pairs" />
              </div>
              <div className="product-name limit-text-to-2-lines">Black and Gray Athletic Cotton Socks - 6 Pairs</div>
              <div className="product-rating-container">
                <img className="product-rating-stars" src="./public/images/ratings/rating-45.png" alt="4.5 star rating" />
                  <div className="product-rating-count link-primary">87</div>
              </div>
              <div className="product-price">$10.90</div>
              <div className="product-quantity-container">
                <select>
                  <option value="1">1</option><option value="2">2</option><option value="3">3</option>
                  <option value="4">4</option><option value="5">5</option><option value="6">6</option>
                  <option value="7">7</option><option value="8">8</option><option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div className="product-spacer"></div>
              <div className="added-to-cart">
                <img src="./public/images/icons/checkmark.png" alt="Checkmark" />
                  Added
              </div>
              <button className="add-to-cart-button button-primary">Add to Cart</button>
            </div>

            <div className="product-container">
              <div className="product-image-container">
                <img className="product-image" src="./public/images/products/intermediate-composite-basketball.jpg" alt="Intermediate Size Basketball" />
              </div>
              <div className="product-name limit-text-to-2-lines">Intermediate Size Basketball</div>
              <div className="product-rating-container">
                <img className="product-rating-stars" src="./public/images/ratings/rating-40.png" alt="4.0 star rating" />
                  <div className="product-rating-count link-primary">127</div>
              </div>
              <div className="product-price">$20.95</div>
              <div className="product-quantity-container">
                <select>
                  <option value="1">1</option><option value="2">2</option><option value="3">3</option>
                  <option value="4">4</option><option value="5">5</option><option value="6">6</option>
                  <option value="7">7</option><option value="8">8</option><option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div className="product-spacer"></div>
              <div className="added-to-cart">
                <img src="./public/images/icons/checkmark.png" alt="Checkmark" />
                  Added
              </div>
              <button className="add-to-cart-button button-primary">Add to Cart</button>
            </div>

            <div className="product-container">
              <div className="product-image-container">
                <img className="product-image" src="./public/images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg" alt="Adults Plain Cotton T-Shirt - 2 Pack" />
              </div>
              <div className="product-name limit-text-to-2-lines">Adults Plain Cotton T-Shirt - 2 Pack</div>
              <div className="product-rating-container">
                <img className="product-rating-stars" src="./public/images/ratings/rating-45.png" alt="4.5 star rating" />
                  <div className="product-rating-count link-primary">56</div>
              </div>
              <div className="product-price">$7.99</div>
              <div className="product-quantity-container">
                <select>
                  <option value="1">1</option><option value="2">2</option><option value="3">3</option>
                  <option value="4">4</option><option value="5">5</option><option value="6">6</option>
                  <option value="7">7</option><option value="8">8</option><option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div className="product-spacer"></div>
              <div className="added-to-cart">
                <img src="./public/images/icons/checkmark.png" alt="Checkmark" />
                  Added
              </div>
              <button className="add-to-cart-button button-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      </>
      );
}