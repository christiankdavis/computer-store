import { useMemo, useState } from "react";
import { FilterBar } from "../FilterBar/FilterBar";
import { ProductList } from "../ProductList/ProductList";
import type { Product } from "../../types/product";

import "./ProductSection.css";

export interface ProductSectionProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  addToCart: (product: Product) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  getProductQuantity: (productId: string) => number;
}

const ALL_FILTER = "All";

export const ProductSection = ({
  products,
  isLoading,
  error,
  onRetry,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  getProductQuantity,
}: ProductSectionProps) => {
  const [selectedFilter, setSelectedFilter] = useState(ALL_FILTER);

  const filterOptions = useMemo(() => {
    const groups = products.map((product) => product.group);
    const uniqueGroups = Array.from(new Set(groups));

    return [ALL_FILTER, ...uniqueGroups];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return selectedFilter === ALL_FILTER
      ? products
      : products.filter((product) => product.group === selectedFilter);
  }, [products, selectedFilter]);
  return (
    <div className="product-section">
      <div className="product-section__filters">
        <FilterBar
          options={filterOptions}
          selectedFilter={selectedFilter}
          onChange={(option) => {
            setSelectedFilter(option);
          }}
        />
      </div>

      <div className="product-section__list">
        {isLoading && <div>Loading...</div>}

        {!isLoading && error && (
          <div className="product-section__status">
            <div className="product-section__error-message">
              {error}. Please try refreshing or loading again.
            </div>
            <button
              type="button"
              className="product-section__retry-button"
              onClick={onRetry}
            >
              Retry loading products
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <ProductList
            products={filteredProducts}
            addToCart={addToCart}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            getProductQuantity={getProductQuantity}
          />
        )}
      </div>
    </div>
  );
};
