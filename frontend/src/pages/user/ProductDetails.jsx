// ProductDetails.jsx
import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Heart,ShoppingCart,Share2,ChevronLeft,ChevronRight,ArrowLeft,Check,Truck,RefreshCw,Shield,Package,X,ZoomIn } from "lucide-react";
import Navbar from "../../components/Home/Navbar";
import Footer from "../../components/Home/Footer";
import SectionAccordion from "../../components/SectionAccordion";
import ProductSkeleton from "../../components/ProductSkeleton";
import { useShop } from "../../context/ShopContext";
import API from "../../api/axios";

function ProductDetails(){

const {id}=useParams();
const navigate=useNavigate();
const {addToCart,toggleWishlist,wishlist,cart}=useShop();

const [product,setProduct]=useState(null);
const [related,setRelated]=useState([]);
const [selectedColor,setSelectedColor]=useState(null);
const [selectedImage,setSelectedImage]=useState(0);
const [selectedSize,setSelectedSize]=useState("");
const [quantity,setQuantity]=useState(1);
const [loading,setLoading]=useState(true);
const [isZoomed,setIsZoomed]=useState(false);
const [zoomPosition,setZoomPosition]=useState({x:0,y:0});

useEffect(()=>{
 load();
},[id]);

const load=async()=>{
 setLoading(true);
 const res=await API.get(`/products/${id}`);
 const prod=res.data;
 setProduct(prod);
 setSelectedColor(prod.colors?.[0]);
 const rel = await API.get("/products");

const relProducts = Array.isArray(rel.data)
 ? rel.data
 : rel.data.products;

setRelated(relProducts.filter(p=>p._id!==prod._id).slice(0,4));

 setLoading(false);
};

if(loading) return <ProductSkeleton/>;

const images=selectedColor?.images||[];

const isInWishlist=wishlist.some(i=>i.id===product._id);
const isInCart=cart.some(i=>i.id===product._id && i.color===selectedColor?.name);

const handleZoom=e=>{
 const r=e.currentTarget.getBoundingClientRect();
 setZoomPosition({
  x:((e.clientX-r.left)/r.width)*100,
  y:((e.clientY-r.top)/r.height)*100
 });
 setIsZoomed(true);
};

const handleAddToCart=()=>{
 if(!selectedSize) return alert("Select size");

 addToCart({
  id:product._id,
  name:product.name,
  price:product.discountPrice||product.price,
  image:images[0],
  size:selectedSize,
  color:selectedColor.name,
  quantity
 });
};

return(
<>
<Navbar/>

<div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-12">

{/* IMAGE */}
<div>
<div className="relative overflow-hidden rounded-xl">
<img
src={images[selectedImage]}
className={`w-full h-full object-cover ${isZoomed?"scale-150":"hover:scale-105"}`}
style={{transformOrigin:`${zoomPosition.x}% ${zoomPosition.y}%`}}
onMouseMove={handleZoom}
/>

{images.length>1&&(
<>
<button onClick={()=>setSelectedImage((selectedImage-1+images.length)%images.length)} className="absolute left-3 top-1/2 bg-white p-2 rounded-full"><ChevronLeft/></button>
<button onClick={()=>setSelectedImage((selectedImage+1)%images.length)} className="absolute right-3 top-1/2 bg-white p-2 rounded-full"><ChevronRight/></button>
</>
)}
</div>

<div className="grid grid-cols-4 gap-2 mt-4">
{images.map((img,i)=>(
<img key={i} src={img} onClick={()=>setSelectedImage(i)} className={`cursor-pointer border ${i===selectedImage?"border-black":"border-gray-200"}`}/>
))}
</div>
</div>

{/* INFO */}
<div className="space-y-4">

<button onClick={()=>navigate("/collections")} className="flex items-center gap-2 text-sm"><ArrowLeft/>Back</button>

<h1 className="text-3xl font-bold">{product.name}</h1>

<p className="text-xl font-semibold">₹{product.discountPrice||product.price}</p>

<p className="text-gray-600">{product.description}</p>

{/* COLORS */}
<div>
<h3>Color</h3>
<div className="flex gap-3 mt-2">
{product.colors.map(c=>(
<button
key={c._id}
onClick={()=>{setSelectedColor(c);setSelectedImage(0)}}
className={`w-10 h-10 rounded-full border ${selectedColor?._id===c._id?"ring-2 ring-black":""}`}
style={{background:c.hex}}
/>
))}
</div>
</div>

{/* SIZES */}
<div>
<h3>Size</h3>
<div className="flex gap-3 mt-2">
{product.sizes.map(s=>(
<button key={s} onClick={()=>setSelectedSize(s)} className={`border px-4 py-2 ${selectedSize===s?"bg-black text-white":""}`}>{s}</button>
))}
</div>
</div>

{/* QTY */}
<div className="flex items-center gap-4">
<button onClick={()=>setQuantity(q=>Math.max(1,q-1))}>-</button>
<span>{quantity}</span>
<button onClick={()=>setQuantity(q=>q+1)}>+</button>
</div>

<button onClick={handleAddToCart} className="bg-black text-white w-full py-3">Add To Cart</button>

<button onClick={()=>toggleWishlist(product)} className="border w-full py-3">
{isInWishlist?"In Wishlist":"Add Wishlist"}
</button>

</div>
</div>

<Footer/>
</>
);
}

export default ProductDetails;
