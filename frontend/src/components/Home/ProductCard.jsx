import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function ProductCard({
  product,
  isWishlisted: isWishlistedProp,
  onWishlistToggle,
}) {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [wishlisted, setWishlisted] = useState(!!isWishlistedProp);
  const [loading, setLoading] = useState(false);

  /* ================= SYNC WITH PROPS ================= */
  useEffect(() => {
    if (typeof isWishlistedProp === "boolean") {
      setWishlisted(isWishlistedProp);
    }
  }, [isWishlistedProp]);

  /* ================= PRICE SAFETY ================= */
  const sellingPrice =
    product?.discountPrice ??
    product?.price ??
    0;

  const originalPrice =
    product?.price ??
    sellingPrice;

  const hasDiscount =
    product?.discountPrice &&
    product.discountPrice < product.price;

  /* ================= NAV ================= */
  const goToDetails = () => {
    navigate(`/product/${product._id}`);
  };

  /* ================= WISHLIST ================= */
  const handleWishlistToggle = async (e) => {
    e.stopPropagation();

    // allow parent to control (Favorites page)
    if (onWishlistToggle) {
      onWishlistToggle(product);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user/login");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      await API.post(
        `/cart/wishlist/${product._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // optimistic UI
      setWishlisted(prev => !prev);

    } catch (err) {
      console.error(
        "Wishlist error:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={goToDetails}
      className="cursor-pointer group"
    >
      {/* IMAGE */}
      <div className="cinzel relative overflow-hidden rounded-xl shadow bg-white">
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

        {/* ❤️ WISHLIST */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur transition
            ${
              wishlisted
                ? "bg-red-100 text-red-500"
                : "bg-white/80 hover:bg-white"
            }`}
        >
          <Heart
            size={16}
            className={wishlisted ? "fill-red-500" : ""}
          />
        </button>
      </div>

      {/* INFO */}
      <div className="pt-3 space-y-2">
        {product.category && (
          <p className="cinzel text-xs text-gray-500 uppercase tracking-wide">
            {product.category?.name || product.category}
          </p>
        )}

        <h4 className="cinzel font-medium text-gray-800 line-clamp-1">
          {product.name}
        </h4>

        {/* PRICE */}
        <div className="flex items-center gap-2">
          <span className="cinzel font-semibold text-gray-900">
            ₹{sellingPrice.toLocaleString()}
          </span>

          {hasDiscount && (
            <span className="cinzel text-sm text-gray-500 line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* VIEW BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToDetails();
          }}
          className="cinzel w-full mt-2 py-2 rounded-full text-sm border border-black hover:bg-black hover:text-white transition"
        >
          View Product
        </button>
      </div>
    </div>
  );
}
