import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Trash2, Heart, Plus, Minus } from 'lucide-react';
import productsData from '../../data/products.json';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, addToCart, cartTotal, cartCount, toggleWishlist, wishlist } = useShop();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [freeShippingThreshold] = useState(7000);
  const [shippingCost] = useState(150);
  const [gstRate] = useState(0.12);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const navigate = useNavigate();

  // Fetch recommended items from products.json (excluding items already in cart)
  useEffect(() => {
    const getRecommendedItems = () => {
      const cartProductIds = cart.map(item => item.id);
      
      // Get products that are not in cart, limit to 4
      const recommended = Object.values(productsData)
        .filter(product => !cartProductIds.includes(product.id))
        .slice(0, 4)
        .map(product => ({
          id: product.id,
          category: product.category,
          name: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          discount: product.discount,
          image: product.images[0],
          rating: product.rating,
          description: product.description
        }));
      
      // If we don't have enough recommendations, add some placeholders
      if (recommended.length < 4) {
        const placeholderItems = [
          {
            id: 101,
            category: 'Footwear',
            name: 'Artisanal Leather Loafers',
            price: 3450,
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'
          },
          {
            id: 102,
            category: 'Watches',
            name: 'Minimalist Chronograph',
            price: 7999,
            image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400'
          },
          {
            id: 103,
            category: 'Basics',
            name: 'Supima Cotton Tee',
            price: 1250,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
          },
          {
            id: 104,
            category: 'Shirts',
            name: 'Crushed Linen Shirt',
            price: 2899,
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400'
          }
        ].slice(0, 4 - recommended.length);
        
        setRecommendedItems([...recommended, ...placeholderItems]);
      } else {
        setRecommendedItems(recommended);
      }
    };
    
    getRecommendedItems();
  }, [cart]);

  const subtotal = cartTotal;
  const estimatedShipping = subtotal >= freeShippingThreshold ? 0 : shippingCost;
  const gst = (subtotal + estimatedShipping) * gstRate;
  const totalAmount = subtotal + estimatedShipping + gst - discount;

  // Calculate free shipping progress
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountNeeded = Math.max(freeShippingThreshold - subtotal, 0);

  // Handle quantity change
  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      updateQuantity(item.id, item.size, item.color, newQuantity);
    }
  };

  // Handle promo code
  const handleApplyPromo = () => {
    if (promoCode.trim() === '') return;
    
    const validPromoCodes = {
      'WELCOME15': 0.15,
      'SAVE10': 0.10,
      'FASHION20': 0.20
    };
    
    if (validPromoCodes[promoCode.toUpperCase()]) {
      const discountRate = validPromoCodes[promoCode.toUpperCase()];
      const discountAmount = subtotal * discountRate;
      setDiscount(discountAmount);
      alert(`Promo code applied! You saved ₹${discountAmount.toFixed(2)}`);
    } else {
      alert('Invalid promo code. Please try again.');
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  // Add recommended item to cart
  const addRecommendedItem = (item) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: 'M',
      color: 'Default',
      quantity: 1
    };
    
    addToCart(cartItem);
    alert(`${item.name} added to cart!`);
  };

  // Navigate to product detail page
  const goToProductDetail = (productId, e) => {
    e.stopPropagation();
    navigate(`/product/${productId}`);
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 md:px-8 py-8">
        {/* Free Shipping Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Almost there!
            </span>
            <span className="text-lg font-bold text-gray-900">
              {freeShippingProgress.toFixed(0)}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600">
            {subtotal >= freeShippingThreshold ? (
              <span className="text-green-600 font-medium">🎉 You've unlocked Free Express Shipping!</span>
            ) : (
              `Add ₹${amountNeeded} more to unlock Free Express Shipping.`
            )}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:w-2/3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Shopping Bag ({cartCount} items)
            </h1>

            {cart.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-5xl mb-4">🛒</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link 
                  to="/collections"
                  className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="md:w-1/4">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Product Details */}
                      <div className="md:w-3/4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                              Size: {item.size} | Color: {item.color}
                            </p>
                            <p className="text-xl font-bold text-gray-900">
                              ₹{item.price.toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center space-x-3 mb-4">
                              <button 
                                onClick={() => handleQuantityChange(item, -1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => handleQuantityChange(item, 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <div className="text-lg font-bold">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-100">
                          <button
                            onClick={() => {
                              const wishlistItem = {
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                image: item.image,
                                category: item.category || 'General'
                              };
                              toggleWishlist(wishlistItem);
                            }}
                            className={`px-4 py-2 text-sm font-medium rounded-md border flex items-center gap-2 ${
                              isInWishlist(item.id)
                                ? 'bg-red-50 text-red-600 border-red-200' 
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <Heart size={16} className={isInWishlist(item.id) ? 'fill-red-600' : ''} />
                            {isInWishlist(item.id) ? 'SAVED' : 'SAVE FOR LATER'}
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                            className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 size={16} />
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Continue Shopping */}
            {cart.length > 0 && (
              <div className="mt-8">
                <Link 
                  to="/collections"
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              {/* Order Summary Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Estimated Shipping</span>
                    <span className="font-medium">
                      {subtotal >= freeShippingThreshold ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${estimatedShipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>GST (12%)</span>
                    <span className="font-medium">₹{gst.toFixed(0)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount Applied</span>
                      <span className="font-medium">-₹{discount.toFixed(0)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total Amount</span>
                      <span>₹{totalAmount.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className={`w-full py-4 font-medium rounded-md transition-colors ${
                    cart.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  PROCEED TO CHECKOUT
                </button>
                
                {/* Trust Badges */}
                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div className="text-xs">
                    <div className="text-gray-900 font-semibold mb-1">100% SECURE CHECKOUT</div>
                    <div className="text-gray-500">SSL Protected</div>
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-900 font-semibold mb-1">EASY 15-DAY RETURNS</div>
                    <div className="text-gray-500">No Questions Asked</div>
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-900 font-semibold mb-1">FREE SHIPPING</div>
                    <div className="text-gray-500">Over ₹7,000</div>
                  </div>
                </div>
                
                {/* Help Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-700 mb-3">Need help? Contact Styling Expert</p>
                  <a 
                    href="tel:+911234567890" 
                    className="text-blue-600 font-medium hover:text-blue-800"
                  >
                    +91 7378021327
                  </a>
                </div>
              </div>

              {/* Complete the Look */}
              {cart.length > 0 && recommendedItems.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Complete the Look
                  </h3>
                  
                  <div className="space-y-4">
                    {recommendedItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
                        onClick={(e) => goToProductDetail(item.id, e)}
                      >
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-md mr-3 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-500">{item.category}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                              {item.originalPrice && item.originalPrice > item.price && (
                                <p className="text-xs text-gray-500 line-through">
                                  ₹{item.originalPrice.toLocaleString()}
                                </p>
                              )}
                              {item.discount > 0 && (
                                <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                                  {item.discount}% OFF
                                </span>
                              )}
                            </div>
                            {item.rating && (
                              <div className="flex items-center mt-1">
                                <span className="text-xs text-yellow-500">★</span>
                                <span className="text-xs text-gray-600 ml-1">{item.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addRecommendedItem(item);
                          }}
                          className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* View More Link */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link 
                      to="/collections"
                      className="text-center block text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View More Recommendations →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;