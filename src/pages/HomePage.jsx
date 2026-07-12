import { useEffect, useState } from 'react';
import './homepages.css';
import Header from '../commponents/header';
import products from '../../products'; 
import axios from 'axios';

export default function HomePage() {
  const [Products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setProducts(products);
    axios.get('http://localhost:5173/api/cart-items').then((response) => {
      setCart(response.data);
     
    });
}, []);

  return (
    <>
      <Header cart={cart}/>

      <div className="home-page">
        <div className="products-grid">
          {Products.map((product) => {
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
                <div className="product-price">$ {(product.priceCents / 100).toFixed(2)}</div>
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
                  <img src="./images/icons/checkmark.png" alt="Checkmark" />
                  Added
                </div>
                <button className="add-to-cart-button button-primary">Add to Cart</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}