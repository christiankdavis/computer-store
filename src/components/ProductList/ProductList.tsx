import { ProductCard } from "../ProductCard/ProductCard";
import type { Product } from "../../types/product";

import "./ProductList.css";

export interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  getProductQuantity: (productId: string) => number;
}

export const ProductList = ({
  products,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  getProductQuantity,
}: ProductListProps) => {
  if (products.length === 0) {
    return <div className="product-list__empty">No products found.</div>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          getProductQuantity={getProductQuantity}
        />
      ))}
    </div>
  );
};
