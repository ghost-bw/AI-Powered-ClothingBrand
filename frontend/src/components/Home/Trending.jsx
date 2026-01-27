import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import productsData from "../../data/products.json";

const Trending = () => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Get random 8 products from products.json
        const products = Object.values(productsData);
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 8).map(product => ({
            id: product.id,
            img: product.images[0],
            category: product.category,
            name: product.title,
            price: product.price.toLocaleString(),
            discount: product.discount,
            rating: product.rating
        }));
        setTrendingProducts(selected);
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const formatPrice = (price) => {
        return `₹${price}`;
    };

    return (
        <div className='py-12 px-4 sm:px-6 md:px-8 lg:px-12 bg-gray-50'>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h6 className="text-sm tracking-widest text-gray-500 uppercase">Trending Now</h6>
                    <h1 className='text-2xl md:text-3xl font-serif font-semibold mt-1'>Featured Products</h1>
                </div>
                <button 
                    onClick={() => navigate('/collections')}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 group"
                >
                    View All
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Swiper Slider */}
            <div className="relative">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={1}
                    navigation={{
                        nextEl: '.trending-next',
                        prevEl: '.trending-prev',
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    className="px-2"
                >
                    {trendingProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div 
                                onClick={() => handleProductClick(product.id)}
                                className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                {/* Product Image */}
                                <div className="relative overflow-hidden aspect-square bg-gray-100">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {product.discount > 0 && (
                                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                            {product.discount}% OFF
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                    
                                    {/* Rating Badge */}
                                    {product.rating && (
                                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                            ⭐ {product.rating}
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                        {product.category}
                                    </p>
                                    <h3 className="font-medium text-gray-900 line-clamp-1 mb-2 group-hover:text-indigo-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-bold text-gray-900">
                                            {formatPrice(product.price)}
                                        </p>
                                        <button className="text-xs text-gray-500 hover:text-indigo-600 font-medium">
                                            Quick View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <div className="trending-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-10 hidden md:flex items-center justify-center cursor-pointer">
                    <ChevronLeft size={24} />
                </div>
                <div className="trending-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-10 hidden md:flex items-center justify-center cursor-pointer">
                    <ChevronRight size={24} />
                </div>
            </div>
        </div>
    )
}

export default Trending


