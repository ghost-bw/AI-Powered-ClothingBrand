import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";
import Footer from "../../components/Home/Footer";
import ProductSkeleton from "../../components/ProductSkeleton";
import { Heart, ShoppingCart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import SectionAccordion from "../../components/SectionAccordion";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setSelectedColor(data.colors?.[0] || null);
        setSelectedImage(0);

        const relatedRes = await api.get("/products");
        setRelatedProducts(
          relatedRes.data.filter(p => p._id !== data._id).slice(0, 4)
        );
      } catch (err) {
        console.error(err);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  if (loading) return <ProductSkeleton />;
  if (!product) return <p className="text-center py-20">Product not found</p>;

  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="lg:sticky lg:top-24 self-start">
          <div className="l-1xl relative rounded-2xl overflow-hidden">
            <div className="relative pt-[100%] overflow-hidden bg-gray-50">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {product.images.map((img, index) => (
                  <button key={index} onClick={() => setSelectedImage(index)}>
                    <img src={img} alt="" className="w-full h-24 object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xs uppercase tracking-wider text-gray-500">{product.category?.name}</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">{product.title}</h1>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="ml-3 text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
            <span className="text-sm text-gray-500">SKU: {product.sku}</span>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <SectionAccordion title="Product Details" defaultOpen>
            <ul className="space-y-2 text-gray-600">
              {product.details.fabric && <li><strong>Fabric:</strong> {product.details.fabric}</li>}
              {product.details.material && <li><strong>Material:</strong> {product.details.material}</li>}
              {product.details.care && <li><strong>Care:</strong> {product.details.care}</li>}
              {product.details.weight && <li><strong>Weight:</strong> {product.details.weight}</li>}
              {product.details.dimensions && <li><strong>Dimensions:</strong> {product.details.dimensions}</li>}
              {product.details.origin && <li><strong>Origin:</strong> {product.details.origin}</li>}
            </ul>
          </SectionAccordion>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
