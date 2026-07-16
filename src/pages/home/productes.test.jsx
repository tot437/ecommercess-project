import { it, describe } from "vitest";
// eslint-disable-next-line no-unused-vars
import productes from './Product ';
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('product commponent', () => {
  it('desplay product details correctly', () => {
    // eslint-disable-next-line no-unused-vars
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      }
    }
    // eslint-disable-next-line react/no-unknown-property, no-undef
    render(<productes Product={product} />)

  });
  it('add the product to the cart', () => {
    // eslint-disable-next-line no-unused-vars
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      }
    }
    // eslint-disable-next-line react/no-unknown-property, no-undef
    render(<productes Product={product} />)
    const user = userEvent.setup();
    const addToCartBotton = screen.getByTestId('add-to-cart-botton');
    user.click(addToCartBotton);
  });
});

