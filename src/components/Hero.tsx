import React from "react";
import { motion } from "motion/react";
import { Search, MapPin } from "lucide-react";

interface HeroProps {
  onSearch: (filters: { location: string; type: string; priceRange: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [location, setLocation] = React.useState("");
  const [type, setType] = React.useState("All Types");
  const [priceRange, setPriceRange] = React.useState("Any Price");
  const [availableTypes, setAvailableTypes] = React.useState<string[]>(["Villa", "Penthouse", "House", "Apartment"]);

  React.useEffect(() => {
    fetch("/api/properties")
      .then(res => res.json())
      .then(data => {
        const types = Array.from(new Set(data.map((p: any) => p.type))) as string[];
        if (types.length > 0) {
          setAvailableTypes(Array.from(new Set([...availableTypes, ...types])));
        }
      })
      .catch(err => console.error("Failed to fetch types", err));
  }, []);

  const handleSearchClick = () => {
    onSearch({ location, type, priceRange });
  };

  return (
    <section id="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Home"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-white uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            Exquisite Living Redefined
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[0.9]">
            Find Your <br />
            <span className="italic font-serif font-light">Perfect Sanctuary</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Curated collection of the world's most prestigious properties, 
            designed for those who demand nothing but the extraordinary.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl p-2 rounded-2xl border border-white/20 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                <MapPin className="text-white/60 w-5 h-5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where would you like to live?"
                  className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full text-sm"
                />
              </div>
              <div className="hidden md:flex items-center gap-8 px-6 border-x border-white/10">
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Type</p>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="bg-transparent text-white text-sm font-medium outline-none cursor-pointer"
                  >
                    <option className="text-black" value="All Types">All Types</option>
                    {availableTypes.map(t => (
                      <option key={t} className="text-black" value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Price</p>
                  <select 
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="bg-transparent text-white text-sm font-medium outline-none cursor-pointer"
                  >
                    <option className="text-black">Any Price</option>
                    <option className="text-black">₦50M - ₦200M</option>
                    <option className="text-black">₦200M - ₦500M</option>
                    <option className="text-black">₦500M+</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={handleSearchClick}
                className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-xl font-bold text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
};
