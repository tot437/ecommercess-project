
import './homepages.css';
import Header from '../commponents/header';
import Products from '../../products';


export default function HomePage() {
  return (
    <>
      

      <title>Ecommerce Project</title>
      <Header />

        <div className="home-page">
          <div className="products-grid">
             {Products.map((product)=>{
              return(
                <>
                    <div key={product.id} className="product-container">
              <div className="product-image-container">
                <img className="product-image" src={product.image} alt={product.name} />
              </div>
              <div className="product-name limit-text-to-2-lines">{product.name}</div>
              <div className="product-rating-container">
                <img className="product-rating-stars" src="./public/images/ratings/rating-45.png" alt="4.5 star rating" />
                  <div className="product-rating-count link-primary">87</div>
              </div>
              <div className="product-price">$ ${ (product.priceCents / 100).toFixed(2) }</div>
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
                </>
              );
             })}
           

            
          </div>
        </div>
      </>
      );
}