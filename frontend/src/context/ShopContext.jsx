import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  /* =======================
     STATE
  ======================== */
  const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState(null);

  /* =======================
     LOAD FROM LOCAL STORAGE
  ======================== */
  useEffect(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("graphura_cart")
      );
     

      if (Array.isArray(savedCart)) setCart(savedCart);
      
    } catch (err) {
      console.error("LocalStorage load failed", err);
    }
  }, []);

  /* =======================
     SAVE TO LOCAL STORAGE
  ======================== */
  useEffect(() => {
    localStorage.setItem(
      "graphura_cart",
      JSON.stringify(cart)
    );
  }, [cart]);



  /* =======================
     CART FUNCTIONS
  ======================== */
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item._id === product._id &&
          item.size === product.size &&
          item.color === product.color
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id &&
          item.size === product.size &&
          item.color === product.color
            ? {
                ...item,
                quantity: item.quantity + product.quantity,
              }
            : item
        );
      }

      return [...prev, product];
    });

    showNotification(`${product.name} added to cart`);
  };

  const removeFromCart = (productId, size, color) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item._id === productId &&
            item.size === size &&
            item.color === color
          )
      )
    );
    showNotification("Item removed from cart");
  };

  const updateQuantity = (productId, size, color, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity: Math.max(1, qty) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    showNotification("Cart cleared");
  };

  /* =======================
     WISHLIST FUNCTIONS
  ======================== */



 
  /* =======================
     HELPERS
  ======================== */
  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const showNotification = (
    message,
    type = "success"
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  /* =======================
     PROVIDER
  ======================== */
  return (
    <ShopContext.Provider
      value={{
        cart,
       
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      
        cartTotal,
        cartCount,
      }}
    >
      {children}

      {notification && (
        <div
          className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all
          ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {notification.message}
        </div>
      )}
    </ShopContext.Provider>
  );
}


export const useShop = () => useContext(ShopContext);
