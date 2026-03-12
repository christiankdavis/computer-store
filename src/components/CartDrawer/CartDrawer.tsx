import type { Cart } from "../../types/cart";

import "./CartDrawer.css";

export interface CartDrawerProps {
  cart: Cart;
  isOpen: boolean;
  cartItemCount: number;
  onClose: () => void;
}

export const CartDrawer = ({
  cart,
  isOpen,
  cartItemCount,
  onClose,
}: CartDrawerProps) => {
  const cartTotal = cart.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.product.price * cartItem.quantity;
  }, 0);
  return (
    <>
      {isOpen && <div className="cart-drawer__overlay" onClick={onClose} />}

      <aside className={`cart-drawer ${isOpen ? "cart-drawer--open" : ""}`}>
        <div className="cart-drawer__header">
          <div className="cart-drawer__title-group">
            <h2 className="cart-drawer__title">Cart</h2>
            <div className="cart-drawer__item-count">
              {cartItemCount} {cartItemCount === 1 ? "item" : "items"}
            </div>
          </div>

          <button
            type="button"
            className="cart-drawer__close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="cart-drawer__content">
          <div className="cart-drawer__placeholder">Your cart is empty</div>
        </div>

        <div className="cart-drawer__footer">
          <div className="cart-drawer__total-row">
            <span className="cart-drawer__total-label">Total</span>
            <span className="cart-drawer__total-value">
              ${cartTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
