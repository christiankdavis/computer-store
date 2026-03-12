import { ProductCard } from "../ProductCard/ProductCard";
import type { Product } from "../../types/product";

import "./ProductList.css";

export interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
