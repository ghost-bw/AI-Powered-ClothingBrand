// import { useEffect, useState } from "react";

// export default function ProductModal({ isOpen, onClose, product }) {
//   // ===== STATES (ALWAYS ON TOP) =====
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState("");
//   const [category, setCategory] = useState("Men");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   // Hero states (Ethnic Wear)
//   const [isHero, setIsHero] = useState(false);
//   const [heroTag, setHeroTag] = useState("");
//   const [heroImage, setHeroImage] = useState(null);
//   const [heroPreview, setHeroPreview] = useState("");

//   // ===== EDIT MODE DATA FILL =====
//   useEffect(() => {
//     if (product) {
//       setName(product.name || "");
//       setPrice(product.price || "");
//       setStock(product.stock || "");
//       setCategory(product.category || "Men");
//       setPreview(product.image || "");

//       setIsHero(product.isHero || false);
//       setHeroTag(product.heroTag || "");
//       setHeroPreview(product.heroImage || "");
//     }
//   }, [product]);

//   // ✅ RETURN AFTER HOOKS
//   if (!isOpen) return null;

//   const handleSave = () => {
//     const payload = {
//       name,
//       price,
//       stock,
//       category,
//       image,
//       isHero,
//       heroTag,
//       heroImage,
//     };

//     console.log("Saved Product:", payload);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold">
//             {product ? "Edit Product" : "Add Product"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-black"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Form */}
//         <div className="space-y-4">

//           {/* Product Name */}
//           <div>
//             <label className="font-semibold block mb-1">Product Name</label>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full border rounded-xl px-4 py-2"
//             />
//           </div>

//           {/* Price + Stock */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="font-semibold block mb-1">Price</label>
//               <input
//                 type="number"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 className="w-full border rounded-xl px-4 py-2"
//               />
//             </div>

//             <div>
//               <label className="font-semibold block mb-1">Stock</label>
//               <input
//                 type="number"
//                 value={stock}
//                 onChange={(e) => setStock(e.target.value)}
//                 className="w-full border rounded-xl px-4 py-2"
//               />
//             </div>
//           </div>

//           {/* Category */}
//           <div>
//             <label className="font-semibold block mb-1">Category</label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full border rounded-xl px-4 py-2"
//             >
//               <option>Ethnic Wear</option>
//               <option>Western Wear</option>
//               <option>Bottom Wear</option>
//               <option>Otherwear</option>
//               <option>Assessories</option>
//             </select>
//           </div>

//           {/* Product Image */}
//           <div>
//             <label className="font-semibold block mb-1">Product Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 setImage(file);
//                 setPreview(URL.createObjectURL(file));
//               }}
//             />
//             {preview && (
//               <img
//                 src={preview}
//                 className="mt-3 h-32 rounded-xl object-cover border"
//               />
//             )}
//           </div>

//           {/* HERO SECTION */}
//           {category === "Ethnic Wear" && (
//             <div className="border rounded-xl p-4 space-y-4 bg-gray-50">

//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={isHero}
//                   onChange={(e) => setIsHero(e.target.checked)}
//                   className="w-5 h-5 accent-primary"
//                 />
//                 <span className="font-semibold">Set as Hero Product</span>
//               </div>

//               {isHero && (
//                 <>
//                   <div>
//                     <label className="font-semibold block mb-1">
//                       Hero Tag
//                     </label>
//                     <input
//                       value={heroTag}
//                       onChange={(e) => setHeroTag(e.target.value)}
//                       className="w-full border rounded-xl px-4 py-2"
//                     />
//                   </div>

//                   <div>
//                     <label className="font-semibold block mb-1">
//                       Hero Banner Image
//                     </label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         const file = e.target.files[0];
//                         setHeroImage(file);
//                         setHeroPreview(URL.createObjectURL(file));
//                       }}
//                     />
//                     {heroPreview && (
//                       <img
//                         src={heroPreview}
//                         className="mt-3 h-40 rounded-xl object-cover border"
//                       />
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button onClick={onClose} className="px-4 py-2 rounded-xl border">
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-6 py-2 rounded-xl bg-primary text-white font-semibold"
//           >
//             Save Product
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
