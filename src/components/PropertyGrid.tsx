import React from "react";
import { PropertyCard } from "./PropertyCard";
import { Property } from "../types";
import { motion } from "motion/react";

interface PropertyGridProps {
  filters: {
    location: string;
    type: string;
    priceRange: string;
    status: "All" | "Sale" | "Rent";
  };
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({ filters }) => {
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortBy, setSortBy] = React.useState<"newest" | "price-asc" | "price-desc">("newest");

  React.useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch properties", err);
        setIsLoading(false);
      });
  }, []);

  const filteredProperties = React.useMemo(() => {
    let result = properties.filter((p) => {
      const matchesLocation = p.location.toLowerCase().includes(filters.location.toLowerCase()) || 
                             p.title.toLowerCase().includes(filters.location.toLowerCase());
      const matchesType = filters.type === "All Types" || p.type === filters.type;
      const matchesStatus = filters.status === "All" || p.status === filters.status;
      
      let matchesPrice = true;
      if (filters.priceRange === "₦50M - ₦200M") matchesPrice = p.price >= 50000000 && p.price <= 200000000;
      else if (filters.priceRange === "₦200M - ₦500M") matchesPrice = p.price > 200000000 && p.price <= 500000000;
      else if (filters.priceRange === "₦500M+") matchesPrice = p.price > 500000000;

      return matchesLocation && matchesType && matchesPrice && matchesStatus;
    });

    // Sort
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    // Default newest (by id for now as we don't have date)
    else result.sort((a, b) => b.id.localeCompare(a.id));

    return result;
  }, [properties, filters, sortBy]);

  return (
    <section id="listings" className="py-24 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-4 block">
              Curated Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
              {filteredProperties.length > 0 ? "Our Exclusive" : "No Properties"} <br />
              <span className="italic font-serif font-light">
                {filteredProperties.length > 0 ? "Listings" : "Found"}
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-6 py-3 bg-white border border-black/5 rounded-full text-sm font-bold outline-none cursor-pointer hover:bg-black hover:text-white transition-all appearance-none"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-black/10">
            <p className="text-black/40 font-medium">Try adjusting your search criteria to find more properties.</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <button 
            onClick={() => {
              const hero = document.getElementById("hero");
              if (hero) hero.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-12 py-4 bg-black text-white rounded-2xl font-bold text-sm hover:bg-black/80 transition-all shadow-xl shadow-black/10"
          >
            Explore All {properties.length}+ Properties
          </button>
        </div>
      </div>
    </section>
  );
};
