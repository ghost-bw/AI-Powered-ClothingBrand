import React from "react";
import { Heart } from 'lucide-react';

const TrendingCard = (props) => {
  return (
    <div className=" cursor-pointer">
      
      {/* Image */}
      <div className="w-3xs relative overflow-hidden rounded-2xl bg-gray-100 aspect-3/4 group">
        <img
          src={props.img}
          alt={props.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        
      </div>

      {/* Content */}
      <div className=" flex justify-between">
        <div className="mt-3">
            <p className="text-xs uppercase tracking-widest text-gray-400">
            {props.category}
            </p>

            <h3 className="text-sm font-medium text-gray-900 mt-1">
            {props.name}
            </h3>

            <p className="text-sm font-semibold text-indigo-700 mt-1">
            ₹{props.price}
            </p>
        </div>
        {/* Wishlist Icon */}
        <Heart className="p-1 m-2 text-gray-500"/>
      </div>
    </div>
  );
};

export default TrendingCard;