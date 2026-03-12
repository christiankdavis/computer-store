import { useEffect, useState } from "react";
import type { CartItem } from "./types/cart";
import type { Product } from "./types/product";

import "./App.css";

const PRODUCTS_URL =
  "https://s3.us-east-1.amazonaws.com/assets.spotandtango/products.json";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
            {products.map((product) => (
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
