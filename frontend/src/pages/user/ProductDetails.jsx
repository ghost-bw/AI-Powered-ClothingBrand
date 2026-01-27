
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import SectionAccordion from "../../components/SectionAccordion";
import ProductCard from "../../components/ProductCard";
import ProductSkeleton from "../../components/ProductSkeleton";
import productsData from "../../data/products.json";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { X, ZoomIn } from 'lucide-react';
// Import from lucide-react instead of react-icons/fi
import {
  Heart,
  ShoppingCart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Search,
  User,
  ShoppingBag
} from 'lucide-react';
import Navbar from "../../components/Home/Navbar";
import Footer from "../../components/Home/Footer";

function ProductDetails() {
  const [isZoomed, setIsZoomed] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, cart } = useShop();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const [productData, relatedData] = await Promise.all([
        getProduct(Number(id)),
        getRelatedProducts(Number(id))
      ]);

      if (!productData) {
        navigate('/404');
        return;
      }

      setProduct(productData);
      setRelatedProducts(relatedData);
      setSelectedColor(productData.colors[0]);
      setSelectedImage(0);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const products = productsData;
    return products[id] || null;
  };

  const getRelatedProducts = async (productId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const products = productsData;
    const allProducts = Object.values(products);
    const filteredProducts = allProducts.filter(p => p.id !== Number(productId));
    const randomProducts = filteredProducts
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .map(product => ({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.images[0],
        category: product.category,
        rating: product.rating
      }));
    return randomProducts;
  };

  const isInWishlist = product && wishlist.some(item => item.id === product.id);
  const isInCart = product && cart.some(item =>
    item.id === product.id &&
    item.size === selectedSize &&
    item.color === selectedColor?.name
  );

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor.name,
      colorValue: selectedColor.value,
      quantity: quantity,
      sku: product.variants.find(v => v.size === selectedSize)?.sku || product.sku,
      stock: product.stock
    };

    addToCart(cartItem);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    if (!product) return;

    const wishlistItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
      category: product.category
    };

    toggleWishlist(wishlistItem);
  };

  const handleShare = async () => {
    const shareData = {
      title: product.title,
      text: `Check out ${product.title} on Graphura`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleImageNavigation = (direction) => {
    if (!product) return;

    const newIndex = direction === 'next'
      ? (selectedImage + 1) % product.images.length
      : (selectedImage - 1 + product.images.length) % product.images.length;

    setSelectedImage(newIndex);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (product && color.image) {
      const colorIndex = product.colors.findIndex(c => c.id === color.id);
      if (colorIndex >= 0) {
        setSelectedImage(colorIndex);
      }
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return <ProductSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }
  const ProductNavbar = () => (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-16 px-4">
          {/* Logo */}
          <div className="flex items-center justify-start">
            <img className="w-auto h-15" src={graphura} alt="Graphura Logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-black font-medium transition"
            >
              Support
            </a>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* <button className="text-gray-600 hover:text-black">
              <Search size={20} />
            </button> */}
            <button className="text-gray-600 hover:text-black relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>
            <button className="text-gray-600 hover:text-black">
              <User size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-50 rounded-md"
            >
              Support
            </a>

            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-50 rounded-md"
            >
              My Account
            </a>
          </div>
        </div>
      )}
    </nav>
  );

  return (
    <>
      {/* <ProductNavbar/> */}
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="l-1xl relative rounded-2xl overflow-hidden">
              <div className="relative w-full">
      {/* This creates a square container that fills width */}
      <div className="relative pt-[100%] md:pt-[125%] overflow-hidden bg-gray-50">
        <img
          src={product.images[selectedImage]}
          alt={`${product.title} - View ${selectedImage + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading(false)}
          loading="lazy"
        />
      </div>
    </div>

            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => handleImageNavigation('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronLeft className="text-xl" />
                </button>
                <button
                  onClick={() => handleImageNavigation('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronRight className="text-xl" />
                </button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.discount > 0 && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.discount}% OFF
                </span>
              )}
              {product.stock < 10 && (
                <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Only {product.stock} left
                </span>
              )}
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-blue-600 scale-105' : 'border-transparent hover:border-gray-300'}`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-24 object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-500">
            <button onClick={() => navigate('/')} className="hover:text-black">Home</button>
            <span className="mx-2">/</span>
            <button onClick={() => navigate('/collections')} className="hover:text-black">Collections</button>
            <span className="mx-2">/</span>
            <span className="text-black font-medium">{product.title}</span>
          </nav>

          {/* Product Header */}
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center">
                <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="ml-3 text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>
          </div>

          {/* Rating & Share */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-gray-600">
                {product.rating} • {product.reviews} reviews
              </span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <Share2 size={20} />
              <span className="text-sm">Share</span>
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 1 && (
            <div>
              <h3 className="font-medium mb-3">
                Color: <span className="font-normal">{selectedColor?.name}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleColorSelect(color)}
                    className={`relative w-12 h-12 rounded-full border-2 transition-transform ${selectedColor?.id === color.id ? 'border-black scale-110' : 'border-gray-300 hover:scale-105'}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  >
                    {selectedColor?.id === color.id && (
                      <div className="absolute inset-0 border-2 border-white rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Select Size</h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.size}
                    onClick={() => setSelectedSize(variant.size)}
                    disabled={!variant.inStock}
                    className={`relative py-3 rounded-lg text-center border transition-all ${selectedSize === variant.size ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-400'} ${!variant.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label={`Size ${variant.size} ${variant.inStock ? 'available' : 'out of stock'}`}
                  >
                    <span className={`font-medium ${!variant.inStock ? 'text-gray-400' : ''}`}>
                      {variant.size}
                    </span>
                    {!variant.inStock && (
                      <span className="block text-xs text-gray-400 mt-1">Out of stock</span>
                    )}
                    {selectedSize === variant.size && variant.inStock && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Stock */}
          <div className="space-y-3">
            <h3 className="font-medium">Quantity</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="px-4 py-2 text-gray-600 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="px-4 py-2 text-gray-600 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {product.stock} items in stock
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleBuyNow}
              disabled={!selectedSize || product.stock === 0}
              className="w-full bg-green-400 text-white py-4 rounded-xl font-medium hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || product.stock === 0 || isInCart}
                className={`py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${isInCart ? 'bg-green-100 text-green-700 border border-green-200' : !selectedSize || product.stock === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-400 text-white hover:bg-green-800'}`}
              >
                <ShoppingCart className="text-xl" />
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`py-4 rounded-xl font-medium border transition-all duration-300 flex items-center justify-center gap-2 ${isInWishlist ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
              >
                <Heart className={`text-xl ${isInWishlist ? 'fill-red-500' : ''}`} />
                {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>

          {/* Product Details Accordion */}
          <div className="mt-8 space-y-2">
            <SectionAccordion
              title="Product Details"
              defaultOpen={true}
            >
              <ul className="space-y-2 text-gray-600">
                {product.details.fabric && <li><strong>Fabric:</strong> {product.details.fabric}</li>}
                {product.details.material && <li><strong>Material:</strong> {product.details.material}</li>}
                {product.details.care && <li><strong>Care:</strong> {product.details.care}</li>}
                {product.details.weight && <li><strong>Weight:</strong> {product.details.weight}</li>}
                {product.details.dimensions && <li><strong>Dimensions:</strong> {product.details.dimensions}</li>}
                {product.details.origin && <li><strong>Origin:</strong> {product.details.origin}</li>}
              </ul>
            </SectionAccordion>

            <SectionAccordion title="Shipping & Returns">
              <ul className="space-y-2 text-gray-600">
                {product.details.delivery && <li>{product.details.delivery}</li>}
                {product.details.return && <li>{product.details.return}</li>}
                <li>Express shipping available at ₹200</li>
                <li>Free pickup from our stores</li>
              </ul>
            </SectionAccordion>

            <SectionAccordion title={`Reviews (${product.reviews})`}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold">{product.rating}</span>
                    <div className="flex text-yellow-400 mt-1">
                      {"★".repeat(Math.floor(product.rating))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{product.reviews} reviews</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/product/${id}/reviews`)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Read all reviews →
                </button>
              </div>
            </SectionAccordion>
          </div>
        </div>
      </div>

      {/* Related Products - Responsive Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Complete the Look</h2>
          <button
            onClick={() => navigate('/collections')}
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            View All
            <span className="text-lg">→</span>
          </button>
        </div>

        {/* Swiper Carousel for Related Products */}
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="related-products-swiper"
        >
          {relatedProducts.map((relatedProduct) => (
            <SwiperSlide key={relatedProduct.id}>
              <div className="p-2">
                <ProductCard
                  product={relatedProduct}
                  onWishlistToggle={() => toggleWishlist(relatedProduct)}
                  isWishlisted={wishlist.some(item => item.id === relatedProduct.id)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Size Guide</h3>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="text-2xl text-gray-500 hover:text-black"
                >
                  ×
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Size</th>
                      <th className="text-left py-3 px-4">Bust (cm)</th>
                      <th className="text-left py-3 px-4">Waist (cm)</th>
                      <th className="text-left py-3 px-4">Hip (cm)</th>
                      <th className="text-left py-3 px-4">Length (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">XS</td>
                      <td className="py-3 px-4">81-86</td>
                      <td className="py-3 px-4">64-69</td>
                      <td className="py-3 px-4">89-94</td>
                      <td className="py-3 px-4">145</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">S</td>
                      <td className="py-3 px-4">86-91</td>
                      <td className="py-3 px-4">69-74</td>
                      <td className="py-3 px-4">94-99</td>
                      <td className="py-3 px-4">145</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">M</td>
                      <td className="py-3 px-4">91-96</td>
                      <td className="py-3 px-4">74-79</td>
                      <td className="py-3 px-4">99-104</td>
                      <td className="py-3 px-4">145</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">L</td>
                      <td className="py-3 px-4">96-101</td>
                      <td className="py-3 px-4">79-84</td>
                      <td className="py-3 px-4">104-109</td>
                      <td className="py-3 px-4">145</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">XL</td>
                      <td className="py-3 px-4">101-106</td>
                      <td className="py-3 px-4">84-89</td>
                      <td className="py-3 px-4">109-114</td>
                      <td className="py-3 px-4">145</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> This size guide is for reference only.
                  For the best fit, we recommend measuring yourself and comparing with our size chart.
                  If you're between sizes, we suggest sizing up.
                </p>
              </div>
            </div>
          </div>
        </div>

      )}
      <Footer />
    </>
  );
}
export default ProductDetails;
