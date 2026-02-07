import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  onWishlistToggle,
  isWishlisted = false,
}) {
  const navigate = useNavigate();

  const sellingPrice = product.discountPrice || product.price;
  const originalPrice = product.price;

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  return (
    <div
      onClick={() => navigate(`/product/${product._id || product.id}`)}
      className="cursor-pointer group"
    >
      {/* IMAGE */}

      <div className="relative overflow-hidden rounded-xl shadow bg-white">

        <img
          src={product.image || product.colors?.[0]?.images?.[0]}
          alt={product.name}
          className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* DISCOUNT BADGE */}

        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
            {Math.round(
              ((originalPrice - sellingPrice) / originalPrice) * 100
            )}
            % OFF
          </span>
        )}

        {/* Wishlist */}

        {onWishlistToggle && (
          <button
            onClick={e => {
              e.stopPropagation();
              onWishlistToggle(product);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur ${
              isWishlisted
                ? "bg-red-100 text-red-500"
                : "bg-white/80 hover:bg-white"
            }`}
          >
            <Heart
              size={16}
              className={isWishlisted ? "fill-red-500" : ""}
            />
          </button>
        )}
      </div>

      {/* INFO */}

      <div className="pt-3 space-y-1">

        {product.category && (
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category?.name || product.category}
          </p>
        )}

        <h4 className="font-medium text-gray-800 line-clamp-1">
          {product.name || product.title}
        </h4>

        {/* PRICE */}

        <div className="flex items-center gap-2">

          <span className="font-semibold text-gray-900">
            ₹{sellingPrice.toLocaleString()}
          </span>

          {hasDiscount && (
            <>
              <span className="text-sm text-gray-500 line-through">
                ₹{originalPrice.toLocaleString()}
              </span>

              {/* <span className="text-xs text-red-600 font-medium">
                Save ₹{(originalPrice - sellingPrice).toLocaleString()}
              </span> */}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
