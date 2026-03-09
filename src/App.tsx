import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PropertyGrid } from "./components/PropertyGrid";
import { PropertyMatchmaker } from "./components/PropertyMatchmaker";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./components/AdminPanel";
import { PropertyDetails } from "./components/PropertyDetails";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { motion } from "motion/react";

const HomePage = () => {
  const [filters, setFilters] = React.useState({
    location: "",
    type: "All Types",
    priceRange: "Any Price",
    status: "All" as "All" | "Sale" | "Rent"
  });

  const handleSearch = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    const listingsSection = document.getElementById("listings");
    if (listingsSection) {
      listingsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle global events for Buy/Rent links
  React.useEffect(() => {
    const handleNavFilter = (e: any) => {
      if (e.detail?.status) {
        handleSearch({ status: e.detail.status });
      }
    };
    window.addEventListener("nav-filter", handleNavFilter);
    return () => window.removeEventListener("nav-filter", handleNavFilter);
  }, []);

  return (
    <main>
      <Hero onSearch={handleSearch} />
      
      {/* Trust Section */}
      <section className="py-12 border-y border-black/5 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-8 opacity-40 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Forbes_logo.svg/2560px-Forbes_logo.svg.png" alt="Forbes" className="h-6 object-contain" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/The_New_York_Times_Logo.svg/1200px-The_New_York_Times_Logo.svg.png" alt="NYT" className="h-6 object-contain" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Vogue_logo.svg/2560px-Vogue_logo.svg.png" alt="Vogue" className="h-6 object-contain" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Architectural_Digest_logo.svg/2560px-Architectural_Digest_logo.svg.png" alt="AD" className="h-6 object-contain" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Wall_Street_Journal_logo.svg/2560px-Wall_Street_Journal_logo.svg.png" alt="WSJ" className="h-6 object-contain" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      <PropertyGrid filters={filters} />
      
      {/* Features Section */}
      <section id="concierge" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80" 
                  alt="Luxury Interior" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-black rounded-[2rem] p-8 text-white hidden md:flex flex-col justify-end shadow-2xl">
                <p className="text-4xl font-bold mb-2">25+</p>
                <p className="text-sm text-white/60 font-medium leading-tight">Years of expertise in luxury markets</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-6 block">
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-black mb-8 tracking-tight leading-[0.9]">
                Unparalleled <br />
                <span className="italic font-serif font-light">Service & Expertise</span>
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Exclusive Access", desc: "Gain access to off-market properties and private listings not available elsewhere." },
                  { title: "Global Network", desc: "Our connections span the globe, ensuring you find the perfect property anywhere." },
                  { title: "Personalized Concierge", desc: "From legal advice to interior design, we handle every detail of your transition." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-2xl font-serif italic text-black/20">0{i + 1}</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                      <p className="text-black/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="sell">
        <PropertyMatchmaker />
      </section>
    </main>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
