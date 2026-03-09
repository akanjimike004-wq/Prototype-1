import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bed, Bath, Maximize, MapPin, Heart, ArrowLeft, Share2, CheckCircle2, Mail, Phone } from "lucide-react";
import { Property } from "../types";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = React.useState<Property | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedImage, setSelectedImage] = React.useState<string>("");

  React.useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data: Property[]) => {
        const found = data.find((p) => p.id === id);
        setProperty(found || null);
        if (found) setSelectedImage(found.image);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch property", err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Property Not Found</h2>
        <p className="text-black/60 mb-8">The property you are looking for does not exist or has been removed.</p>
        <button 
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-black text-white rounded-2xl font-bold hover:bg-black/80 transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold hover:opacity-60 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Listings
          </button>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white rounded-full border border-black/5 hover:shadow-lg transition-all">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 bg-white rounded-full border border-black/5 hover:shadow-lg transition-all">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Image Gallery */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl bg-black/5"
              >
                <img 
                  src={selectedImage} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Thumbnails */}
              {property.images && property.images.length > 0 && (
                <div className="grid grid-cols-5 gap-4">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={cn(
                        "aspect-square rounded-2xl overflow-hidden border-2 transition-all",
                        selectedImage === img ? "border-black scale-95" : "border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Price */}
            <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                      {property.type}
                    </span>
                    <span className={cn(
                      "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full",
                      property.status === "Sale" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"
                    )}>
                      For {property.status}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-black/40">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{property.location}</span>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-1">Price</p>
                  <p className="text-4xl font-bold text-black">₦{property.price.toLocaleString()}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 py-8 border-y border-black/5">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center">
                    <Bed className="w-6 h-6 text-black" />
                  </div>
                  <span className="text-sm font-bold">{property.beds} Bedrooms</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center">
                    <Bath className="w-6 h-6 text-black" />
                  </div>
                  <span className="text-sm font-bold">{property.baths} Bathrooms</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center">
                    <Maximize className="w-6 h-6 text-black" />
                  </div>
                  <span className="text-sm font-bold">{property.sqft.toLocaleString()} sqft</span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-10">
                <h3 className="text-xl font-bold mb-4">About this property</h3>
                <p className="text-black/60 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm">
              <h3 className="text-xl font-bold mb-8">Key Features & Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-[#F9F9F9] rounded-2xl border border-black/5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="font-bold text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Agent Card */}
            <div className="bg-black text-white p-8 rounded-[3rem] shadow-2xl sticky top-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" 
                    alt="Agent" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Alexander Pierce</h4>
                  <p className="text-white/40 text-sm">Senior Luxury Advisor</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <button 
                  onClick={() => navigate("/contact")}
                  className="w-full py-4 bg-white text-black rounded-2xl font-bold hover:bg-white/90 transition-all"
                >
                  Contact Agent
                </button>
                <button 
                  onClick={() => navigate("/contact")}
                  className="w-full py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all"
                >
                  Schedule a Tour
                </button>
              </div>

              <div className="pt-8 border-t border-white/10 space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">Quick Contact</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white/60" />
                  </div>
                  <span className="text-sm font-medium">alex@luxeestate.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white/60" />
                  </div>
                  <span className="text-sm font-medium">+234 800 LUXE 000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
