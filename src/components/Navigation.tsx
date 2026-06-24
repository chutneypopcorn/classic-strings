import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, Shield, LogOut, User } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const scrollToBook = () => {
    const el = document.getElementById("book");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Gallery", path: "/gallery" },
    { label: "Services", path: "/#services" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#343a3f]/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-xl lg:text-2xl text-white font-semibold tracking-tight">
              Classic Strings
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white/80 hover:text-[#e3fe3b] text-xs uppercase tracking-widest font-medium transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 text-[#e3fe3b] hover:text-[#e3fe3b]/80 text-xs uppercase tracking-widest font-medium transition-colors duration-300"
              >
                <Shield className="w-3.5 h-3.5" />
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth / Book Section */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-white/70 text-xs flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="text-white/60 hover:text-white text-xs uppercase tracking-widest transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={scrollToBook}
                className="text-xs uppercase tracking-widest font-medium text-[#343a3f] bg-[#e3fe3b] hover:bg-[#e3fe3b]/90 px-5 py-2 rounded-full transition-colors"
              >
                Book Now
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#343a3f] flex flex-col items-center justify-center gap-8 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-[#e3fe3b] font-serif text-3xl hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-2 text-[#e3fe3b] font-serif text-3xl hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Shield className="w-6 h-6" />
              Dashboard
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="flex items-center gap-2 text-white/60 font-serif text-2xl hover:text-white transition-colors mt-4"
            >
              <LogOut className="w-5 h-5" />
              Logout ({user?.name})
            </button>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                scrollToBook();
              }}
              className="text-[#343a3f] bg-[#e3fe3b] px-8 py-3 rounded-full font-serif text-xl mt-4"
            >
              Book Now
            </button>
          )}
        </div>
      )}
    </>
  );
}
