import formatMony from "../../utills/money";
export default function prodoucsGrids({Products , addItemToCart}) {
  return (<>
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
            <div className="product-price">{formatMony(product)}</div>
            <div className="product-quantity-container">
              <select id={`qty-${product.id}`} defaultValue="1">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className="product-spacer"></div>
            <div className="added-to-cartItems">
              <img src="./images/icons/checkmark.png" alt="Checkmark" />
              Added
            </div>
            <button
              onClick={() => {
                const select = document.getElementById(`qty-${product.id}`);
                const quantity = Number(select?.value || 1);
                addItemToCart(product, quantity);
              }}
              className="add-to-cartItems-button button-primary"
            >
              Add to cart
            </button>
          </div>
        );
      })}
    </div>
  </>);
}