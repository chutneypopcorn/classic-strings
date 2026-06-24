import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#343a3f] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-[120px] lg:text-[180px] text-[#d6c0b3]/20 leading-none font-light">
          404
        </h1>
        <h2 className="font-serif text-3xl lg:text-4xl text-white mb-4 -mt-8">
          Page Not Found
        </h2>
        <p className="text-white/40 text-sm font-sans mb-8 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#e3fe3b] text-[#343a3f] px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold hover:bg-[#e3fe3b]/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
