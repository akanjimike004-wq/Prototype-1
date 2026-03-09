import React from "react";
import { Search, Menu, User, Home, Settings, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSectionClick = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Buy", type: "filter", value: "Sale" },
    { name: "Rent", type: "filter", value: "Rent" },
    { name: "Sell", type: "section", value: "sell" },
    { name: "Concierge", type: "section", value: "concierge" },
    { name: "About", type: "link", value: "/about" },
    { name: "Contact", type: "link", value: "/contact" },
  ];

  return (
    <>
      <nav
        id="main-nav"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
          isScrolled || isMobileMenuOpen ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Home className="text-white w-6 h-6" />
            </div>
            <span className={cn(
              "text-xl font-bold tracking-tight",
              isScrolled || isMobileMenuOpen ? "text-black" : "text-white"
            )}>
              LuxeEstate
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.type === "link" ? (
                <Link
                  key={link.name}
                  to={link.value}
                  className={cn(
                    "text-sm font-medium hover:opacity-70 transition-opacity",
                    isScrolled ? "text-black" : "text-white"
                  )}
                >
                  {link.name}
                </Link>
              ) : link.type === "filter" ? (
                <button
                  key={link.name}
                  onClick={() => {
                    if (location.pathname !== "/") navigate("/");
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent("nav-filter", { detail: { status: link.value } }));
                    }, 100);
                  }}
                  className={cn(
                    "text-sm font-medium hover:opacity-70 transition-opacity",
                    isScrolled ? "text-black" : "text-white"
                  )}
                >
                  {link.name}
                </button>
              ) : (
                <button
                  key={link.name}
                  onClick={() => handleSectionClick(link.value)}
                  className={cn(
                    "text-sm font-medium hover:opacity-70 transition-opacity",
                    isScrolled ? "text-black" : "text-white"
                  )}
                >
                  {link.name}
                </button>
              )
            ))}
            <Link
              to="/admin"
              className={cn(
                "text-sm font-medium hover:opacity-70 transition-opacity flex items-center gap-1.5",
                isScrolled ? "text-black" : "text-white"
              )}
            >
              <Settings className="w-4 h-4" />
              Admin
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              id="search-toggle"
              className={cn(
                "p-2 rounded-full hover:bg-black/5 transition-colors",
                isScrolled || isMobileMenuOpen ? "text-black" : "text-white"
              )}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              id="user-menu"
              className={cn(
                "p-2 rounded-full hover:bg-black/5 transition-colors",
                isScrolled || isMobileMenuOpen ? "text-black" : "text-white"
              )}
            >
              <User className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "md:hidden p-2 rounded-full hover:bg-black/5 transition-colors",
                isScrolled || isMobileMenuOpen ? "text-black" : "text-white"
              )}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                link.type === "link" ? (
                  <Link
                    key={link.name}
                    to={link.value}
                    className="text-2xl font-bold tracking-tight text-black hover:opacity-60 transition-opacity"
                  >
                    {link.name}
                  </Link>
                ) : link.type === "filter" ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      if (location.pathname !== "/") navigate("/");
                      setTimeout(() => {
                        window.dispatchEvent(new CustomEvent("nav-filter", { detail: { status: link.value } }));
                      }, 100);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-2xl font-bold tracking-tight text-black text-left hover:opacity-60 transition-opacity"
                  >
                    {link.name}
                  </button>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => handleSectionClick(link.value)}
                    className="text-2xl font-bold tracking-tight text-black text-left hover:opacity-60 transition-opacity"
                  >
                    {link.name}
                  </button>
                )
              ))}
              <div className="h-px bg-black/5 my-4" />
              <Link
                to="/admin"
                className="text-xl font-bold tracking-tight text-black/60 flex items-center gap-3"
              >
                <Settings className="w-5 h-5" />
                Admin Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
