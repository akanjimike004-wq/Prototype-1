import React from "react";
import { Bed, Bath, Maximize, MapPin, Heart } from "lucide-react";
import { Property } from "../types";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
  index: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-black/5 hover:shadow-2xl transition-all duration-500"
    >
      <Link to={`/property/${property.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 z-10">
            <button 
              onClick={(e) => {
                e.preventDefault();
                // Handle favorite
              }}
              className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <span className="px-3 py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
              {property.type}
            </span>
            <span className={cn(
              "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full",
              property.status === "Sale" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"
            )}>
              For {property.status}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-black group-hover:text-black/70 transition-colors">
              {property.title}
            </h3>
            <p className="text-xl font-bold text-black">
              ₦{(property.price / 1000000).toFixed(1)}M
            </p>
          </div>
          
          <div className="flex items-center gap-1 text-black/40 text-sm mb-6">
            <MapPin className="w-4 h-4" />
            <span>{property.location}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4 border-t border-black/5">
            <div className="flex flex-col items-center gap-1">
              <Bed className="w-4 h-4 text-black/40" />
              <span className="text-xs font-bold">{property.beds} Beds</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Bath className="w-4 h-4 text-black/40" />
              <span className="text-xs font-bold">{property.baths} Baths</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Maximize className="w-4 h-4 text-black/40" />
              <span className="text-xs font-bold">{property.sqft} sqft</span>
            </div>
          </div>

          <div className="w-full mt-4 py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-black/80 transition-colors text-center">
            View Details
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
