import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const galleryImages = [
  { src: "/images/gallery-1.jpg", title: "Walking Down the Aisle" },
  { src: "/images/gallery-2.jpg", title: "Garden Performance" },
  { src: "/images/ceremony-1.jpg", title: "Garden Ceremony" },
  { src: "/images/ceremony-2.jpg", title: "Ring Exchange" },
  { src: "/images/gallery-5.jpg", title: "Reception Toast" },
  { src: "/images/gallery-6.jpg", title: "Grand Ballroom" },
];

const ringText = "C L A S S I C \u2022 S T R I N G S \u2022 ";
const ringChars = ringText.split("");

export default function GalleryShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (viewportHeight - rect.top) / (sectionHeight + viewportHeight))
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f0e6de] overflow-hidden"
    >
      {/* Ring Text Spinner - Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
          <div
            className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] animate-spin-ring"
            style={{ transformOrigin: "center center" }}
          >
            {ringChars.map((char, i) => {
              const angle = (i / ringChars.length) * 360;
              return (
                <span
                  key={i}
                  className="absolute left-1/2 font-display text-2xl lg:text-3xl text-[#343a3f] font-medium"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-200px) translateX(-50%)`,
                    transformOrigin: "0 200px",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-12 lg:mb-20 relative z-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[#c9a57a] text-xs uppercase tracking-[0.3em] font-sans mb-4">
              Portfolio
            </p>
            <h2
              className={`font-serif text-4xl lg:text-[64px] text-[#343a3f] font-light leading-tight transition-all duration-1000 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Love
              <br />
              <span className="italic text-[#c9a57a]">Stories</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="hidden md:flex items-center gap-2 text-[#343a3f] text-xs uppercase tracking-widest font-medium hover:gap-3 transition-all group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => {
            const baseDelay = index * 100;
            const translateY = isMobile
              ? 0
              : (scrollProgress - 0.5) * (index % 2 === 0 ? -60 : 60);

            return (
              <div
                key={image.src}
                className={`group relative overflow-hidden rounded-xl lg:rounded-2xl transition-all duration-700 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                } ${index === 0 ? "col-span-2 lg:col-span-1" : ""}`}
                style={{
                  transitionDelay: `${baseDelay}ms`,
                  transform: isMobile
                    ? undefined
                    : `translateY(${translateY}px)`,
                }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#343a3f]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-serif text-white text-lg lg:text-xl">
                    {image.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden mt-8 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-[#343a3f] text-xs uppercase tracking-widest font-medium"
          >
            View All Photos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
