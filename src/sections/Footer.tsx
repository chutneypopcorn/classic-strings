import { Link } from "react-router";
import { Instagram, Facebook, Mail, Phone, MapPin, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#343a3f] pt-20 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl text-white mb-4">
              Classic Strings
            </h3>
            <p className="text-white/40 text-sm font-sans leading-relaxed mb-6">
              Award-winning live string music for weddings, proposals, and
              special events. Creating unforgettable moments through the power
              of music.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@classicstrings.com.au"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#c9a57a] text-xs uppercase tracking-[0.2em] font-sans font-medium mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {["Wedding Ceremonies", "Proposals", "Corporate Events", "Private Parties", "Recording Sessions"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#services"
                      className="text-white/40 text-sm font-sans hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#c9a57a] text-xs uppercase tracking-[0.2em] font-sans font-medium mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {["About Us", "Our Musicians", "Gallery", "Testimonials", "Pricing"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={item === "Gallery" ? "/gallery" : "/"}
                      className="text-white/40 text-sm font-sans hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#c9a57a] text-xs uppercase tracking-[0.2em] font-sans font-medium mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/40 text-sm font-sans">
                <Mail className="w-4 h-4 text-[#c9a57a]" />
                info@classicstrings.com.au
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm font-sans">
                <Phone className="w-4 h-4 text-[#c9a57a]" />
                +61 405 246 539
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm font-sans">
                <MapPin className="w-4 h-4 text-[#c9a57a]" />
                Greater Sydney
              </li>
            </ul>

            {/* Admin Login */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                to="/login"
                className="flex items-center gap-2 text-white/30 text-xs uppercase tracking-widest font-sans hover:text-[#e3fe3b] transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                Admin Access
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-sans">
            &copy; {new Date().getFullYear()} Classic Strings. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 text-xs font-sans hover:text-white/50 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/30 text-xs font-sans hover:text-white/50 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
