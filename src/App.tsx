import { useEffect, useState } from "react";
import type { Cart } from "./types/cart";
import type { Product } from "./types/product";

import "./App.css";

const PRODUCTS_URL =
  "https://s3.us-east-1.amazonaws.com/assets.spotandtango/products.json";
const ALL_FILTER = "All";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedFilter, setSelectedFilter] = useState(ALL_FILTER);
  const [cart, setCart] = useState<Cart>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts =
    selectedFilter === ALL_FILTER
      ? products
      : products.filter((product) => product.group === selectedFilter);
  const cartItemCount = cart.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.quantity;
  }, 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const resp = await fetch(PRODUCTS_URL);

        if (!resp.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await resp.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div>Header</div>
      <div>
        Products
        {isLoading && <>Loading...</>}
        {!isLoading && error && <>Error: {error}</>}
        {!isLoading && !error && (
          <>
            {filteredProducts.map((product) => (
              <div key={product.id}>{product.name}</div>
            ))}
          </>
        )}
      </div>

      <div>Cart</div>
      <div>Cart Button</div>
    </>
  );
}

export default App;
