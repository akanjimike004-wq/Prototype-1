import React from "react";
import { Home, Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin, Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-white border-t border-black/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <Home className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-black">
                Brainiac Tech
              </span>
            </Link>
            <p className="text-sm text-black/60 leading-relaxed max-w-xs">
              Redefining luxury real estate with a commitment to excellence, 
              innovation, and personalized service in Abuja and beyond.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full border border-black/5 hover:bg-black hover:text-white transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => handleSectionClick("listings")}
                  className="text-sm text-black/60 hover:text-black transition-colors"
                >
                  Properties
                </button>
              </li>
              <li>
                <Link to="/about" className="text-sm text-black/60 hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-black/60 hover:text-black transition-colors">
                  Our Agents
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-black/60 hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-black/60 hover:text-black transition-colors flex items-center gap-2">
                  <Settings className="w-3 h-3" />
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Services</h4>
            <ul className="space-y-4">
              {["Buying", "Selling", "Property Management", "Concierge", "Investment"].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => {
                      if (item === "Selling") handleSectionClick("sell");
                      else if (item === "Concierge") handleSectionClick("concierge");
                      else handleSectionClick("listings");
                    }}
                    className="text-sm text-black/60 hover:text-black transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-black/40 mt-1" />
                <span className="text-sm text-black/60">Plot 456, Maitama District, Abuja, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-black/40" />
                <span className="text-sm text-black/60">+234 (0) 800 LUXE ESTATE</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-black/40" />
                <span className="text-sm text-black/60">concierge@luxeestate.ng</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-black/40">
            © 2026 Brainiac Tech Premium Real Estate. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-xs text-black/40 hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-black/40 hover:text-black transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-black/40 hover:text-black transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
