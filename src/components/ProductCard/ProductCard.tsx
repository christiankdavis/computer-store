import type { Product } from "../../types/product";

import "./ProductCard.css";

export interface ProductCardProps {
  product: Product;
}

const UNAVAILABLE_STATUS = "Unavailable";

export const ProductCard = ({ product }: ProductCardProps) => {
  const isSoldOut = product.status === UNAVAILABLE_STATUS;
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
        ) : (
          <button className="product-card__add-button" type="button">
            +
          </button>
        )}
      </div>
    </div>
  );
};
