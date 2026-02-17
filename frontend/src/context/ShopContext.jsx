// context/ShopContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState(null);
  const normalizeProduct = (p) => ({
  id: p._id || p.id,
  name: p.name || p.title || "Item",
  price: p.discountPrice || p.price || 0,
  image: p.colors?.[0]?.images?.[0] || p.image || "",
  size: p.size,
  color: p.color,
  quantity: p.quantity || 1
});

  // Load from localStorage on mount
  useEffect(() => {
  try {
    const savedCart = JSON.parse(localStorage.getItem("graphura_cart"));
    const savedWishlist = JSON.parse(localStorage.getItem("graphura_wishlist"));

    if (Array.isArray(savedCart)) setCart(savedCart);
    if (Array.isArray(savedWishlist)) setWishlist(savedWishlist);
  } catch (err) {
    console.error("LocalStorage load failed", err);
  }
}, []);


  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('graphura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('graphura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

const addToCart = (product) => {
  const item = normalizeProduct(product);

  setCart(prev => {
    const existingItem = prev.find(p =>
      p.id === item.id &&
      p.size === item.size &&
      p.color === item.color
    );

    if (existingItem) {
      return prev.map(p =>
        p.id === item.id &&
        p.size === item.size &&
        p.color === item.color
          ? { ...p, quantity: p.quantity + item.quantity }
          : p
      );
    }

    return [...prev, item];
  });

  showNotification(`${item.name} added to cart`);
};


  const removeFromCart = (productId, size, color) => {
    setCart(prev => prev.filter(item => 
      !(item.id === productId && item.size === size && item.color === color)
    ));
    showNotification('Item removed from cart');
  };

  const updateQuantity = (productId, size, color, newQuantity) => {
    setCart(prev => prev.map(item =>
      item.id === productId && item.size === size && item.color === color
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    ));
  };

  const toggleWishlist = (product) => {
  const item = normalizeProduct(product);

  setWishlist(prev => {
    const exists = prev.find(p => p.id === item.id);

    if (exists) {
      showNotification(`${item.name} removed from wishlist`);
      return prev.filter(p => p.id !== item.id);
    } else {
      showNotification(`${item.name} added to wishlist`);
      return [...prev, { ...item, addedAt: new Date().toISOString() }];
    }
  });
};


  const clearCart = () => {
    setCart([]);
    showNotification('Cart cleared');
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const cartTotal = cart.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider value={{
      cart,
      wishlist,
      notification,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      clearCart,
      cartTotal,
      cartCount,
      showNotification
    }}>
      {children}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 transform translate-x-0 ${notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
          {notification.message}
        </div>
      )}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);