// context/ShopContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('graphura_cart');
    const savedWishlist = localStorage.getItem('graphura_wishlist');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('graphura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('graphura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && 
        item.size === product.size && 
        item.color === product.color
      );
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && 
          item.size === product.size && 
          item.color === product.color
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      
      return [...prev, product];
    });
    
    showNotification(`${product.name} added to cart`);
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
    setWishlist(prev => {
      const isWishlisted = prev.find(item => item.id === product.id);
      
      if (isWishlisted) {
        showNotification(`${product.name} removed from wishlist`);
        return prev.filter(item => item.id !== product.id);
      } else {
        showNotification(`${product.name} added to wishlist`);
        return [...prev, { ...product, addedAt: new Date().toISOString() }];
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