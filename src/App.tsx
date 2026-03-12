import { useEffect, useState } from "react";
import { CartButton } from "./components/CartButton/CartButton";
import { CartDrawer } from "./components/CartDrawer/CartDrawer";
import { Header } from "./components/Header/Header";
import { ProductSection } from "./components/ProductSection/ProductSection";

import type { Cart } from "./types/cart";
import type { Product } from "./types/product";

import "./App.css";

const PRODUCTS_URL =
  "https://s3.us-east-1.amazonaws.com/assets.spotandtango/products.json";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cart, setCart] = useState<Cart>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = cart.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.quantity;
  }, 0);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingCartItem = currentCart.find(
        (cartItem) => cartItem.product.id === product.id,
      );

      if (existingCartItem) {
        return currentCart.map((cartItem) =>
          cartItem.product.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...currentCart, { product, quantity: 1 }];
    });
  };

  const incrementQuantity = (productId: string) => {
    setCart((currentCart) =>
      currentCart.map((cartItem) =>
        cartItem.product.id === productId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      ),
    );
  };

  const decrementQuantity = (productId: string) => {
    setCart((currentCart) =>
      currentCart
        .map((cartItem) =>
          cartItem.product.id === productId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    );
  };

  const getProductQuantity = (productId: string) => {
    const cartItem = cart.find((item) => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

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
    <div className="app">
      <Header />
      <ProductSection
        products={products}
        isLoading={isLoading}
        error={error}
        addToCart={addToCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        getProductQuantity={getProductQuantity}
      />

      <CartButton
        itemCount={cartItemCount}
        onClick={() => setIsCartOpen(true)}
      />
      <CartDrawer />
    </div>
  );
}

export default App;
