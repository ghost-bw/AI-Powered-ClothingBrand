
import { Heart } from "lucide-react";  // Changed from react-icons/fi
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onWishlistToggle, isWishlisted }) {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onWishlistToggle(product);
  };

  return (
    <div 
      className="group cursor-pointer"
      onClick={handleProductClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleProductClick()}
    >
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full aspect-3/4 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        <button 
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${isWishlisted ? 'bg-red-100 text-red-500' : 'bg-white/80 hover:bg-white'}`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`text-lg ${isWishlisted ? 'fill-red-500' : ''}`} />
        </button>
        
        {product.rating && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
            ⭐ {product.rating}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        {product.category && (
          <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
        )}
        <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
          {product.name}
        </h4>
        <p className="text-gray-900 font-medium">₹{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}