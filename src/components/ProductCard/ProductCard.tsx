import { QuantitySelector } from "../QuantitySelector/QuantitySelector";
import type { Product } from "../../types/product";

import "./ProductCard.css";

export interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  getProductQuantity: (productId: string) => number;
}

const UNAVAILABLE_STATUS = "Unavailable";

export const ProductCard = ({
  product,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  getProductQuantity,
}: ProductCardProps) => {
  const isSoldOut = product.status === UNAVAILABLE_STATUS;
  const quantity = getProductQuantity(product.id);

  return (
    <div
      className={`product-card ${isSoldOut ? "product-card--sold-out" : ""}`}
    >
      <div className="product-card__main">
        <div className="product-card__name">{product.name}</div>
        <div className="product-card__group">{product.group}</div>
      </div>

      <div className="product-card__pricing">
        <div className="product-card__price-block">
          <div className="product-card__price-label">MSRP</div>
          <div className="product-card__msrp">${product.msrp.toFixed(2)}</div>
        </div>

        <div className="product-card__price-block">
          <div className="product-card__price-label">Price</div>
          <div className="product-card__price">${product.price.toFixed(2)}</div>
        </div>
      </div>

      <div className="product-card__actions">
        {isSoldOut ? (
          <div className="product-card__sold-out">Sold Out</div>
        ) : quantity > 0 ? (
          <QuantitySelector
            quantity={quantity}
            onIncrement={() => incrementQuantity(product.id)}
            onDecrement={() => decrementQuantity(product.id)}
          />
        ) : (
          <button
            className="product-card__add-button"
            type="button"
            onClick={() => addToCart(product)}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};
