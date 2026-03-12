import { QuantitySelector } from "../QuantitySelector/QuantitySelector";
import type { CartItem as CartItemType } from "../../types/cart";

import "./CartItem.css";

export interface CartItemProps {
  cartItem: CartItemType;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const CartItem = ({
  cartItem,
  onIncrement,
  onDecrement,
}: CartItemProps) => {
  const { product, quantity } = cartItem;
  const lineTotal = product.price * quantity;

  return (
    <div className="cart-item">
      <div className="cart-item__details">
        <div className="cart-item__name">{product.name}</div>
        <div className="cart-item__pricing">
          <span className="cart-item__unit-price">
            ${product.price.toFixed(2)}
          </span>
          <span className="cart-item__pricing-separator">×</span>
          <span className="cart-item__quantity-text">{quantity}</span>
          <span className="cart-item__pricing-separator">=</span>
          <span className="cart-item__line-total">${lineTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-item__actions">
        <QuantitySelector
          quantity={quantity}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      </div>
    </div>
  );
};
