
// import React, { useState } from "react";
// import TrendingCard from "./TrendingCard";
// import "./Collections.css";
// import productsData from "../../data/products.json";
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useNavigate } from "react-router-dom";

// const Collections = () => {
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [expandedCategory, setExpandedCategory] = useState(null);
//   const navigate = useNavigate();

//   // Get unique categories from products.json
//   const getAllCollections = () => {
//     const categoryMap = {};
    
//     Object.values(productsData).forEach(product => {
//       const category = product.category;
//       if (!categoryMap[category]) {
//         categoryMap[category] = {
//           name: category,
//           products: []
//         };
//       }
//       categoryMap[category].products.push({
//         id: product.id,
//         img: product.images[0],
//         category: product.category,
//         name: product.title,
//         price: product.price.toLocaleString()
//       });
//     });
    
//     return Object.values(categoryMap);
//   };

//   const collections = getAllCollections();

//   const handleProductClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   const handleScroll = (categoryName, direction) => {
//     const container = document.getElementById(`collection-${categoryName}`);
//     if (container) {
//       const scrollAmount = 400;
//       if (direction === 'left') {
//         container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//       } else {
//         container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//       }
//     }
//   };

//   return (
//     <div className="w-full">
//       {collections.map((collection, idx) => {
//         const isExpanded = expandedCategory === collection.name;
//         const visibleProducts = isExpanded ? collection.products : collection.products.slice(0, 6);
//         const hasMore = collection.products.length > 6;

//         return (
//           <div key={idx} className="mb-20 px-4 sm:px-6 md:px-8 lg:px-12">
//             {/* Heading */}
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h6 className="text-sm tracking-widest text-gray-500">COLLECTION</h6>
//                 <h2 className="text-2xl md:text-3xl font-semibold">{collection.name}</h2>
//                 <p className="text-sm text-gray-500 mt-1">{collection.products.length} items available</p>
//               </div>
//               {hasMore && (
//                 <button 
//                   onClick={() => navigate('/collections')}
//                   className="text-sm underline hover:font-semibold transition"
//                 >
//                   View All
//                 </button>
//               )}
//             </div>

//             {/* Products Grid - Responsive */}
//             {isExpanded ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {visibleProducts.map((product, prodIdx) => (
//                   <div key={prodIdx} onClick={() => handleProductClick(product.id)}>
//                     <TrendingCard
//                       img={product.img}
//                       category={product.category}
//                       name={product.name}
//                       price={product.price}
//                     />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="relative">
//                 {/* Slider Container */}
//                 <div 
//                   id={`collection-${collection.name}`}
//                   className="w-full overflow-x-auto scroll-smooth scrollbar-hide"
//                 >
//                   <div className="flex gap-6 pb-4">
//                     {visibleProducts.map((product, prodIdx) => (
//                       <div 
//                         key={prodIdx} 
//                         className="shrink-0-flex cursor-pointer" 
//                         style={{ width: '280px' }}
//                         onClick={() => handleProductClick(product.id)}
//                       >
//                         <TrendingCard
//                           img={product.img}
//                           category={product.category}
//                           name={product.name}
//                           price={product.price}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Slider Navigation Buttons */}
//                 <button
//                   onClick={() => handleScroll(collection.name, 'left')}
//                   className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition z-10 hidden md:flex items-center justify-center"
//                   aria-label="Previous products"
//                 >
//                   <ChevronLeft size={24} />
//                 </button>

//                 <button
//                   onClick={() => handleScroll(collection.name, 'right')}
//                   className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition z-10 hidden md:flex items-center justify-center"
//                   aria-label="Next products"
//                 >
//                   <ChevronRight size={24} />
//                 </button>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Collections;
