import { useMemo, useState } from "react";
import { FilterBar } from "../FilterBar/FilterBar";
import { ProductList } from "../ProductList/ProductList";
import type { Product } from "../../types/product";

import "./ProductSection.css";

export interface ProductSectionProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const ALL_FILTER = "All";

export const ProductSection = ({
  products,
  isLoading,
  error,
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
        <FilterBar />
      </div>

      <div className="product-section__list">
        {isLoading && <div>Loading...</div>}

        {!isLoading && error && <div>Error: {error}</div>}

        {!isLoading && !error && <ProductList products={filteredProducts} />}
      </div>
    </div>
  );
};
