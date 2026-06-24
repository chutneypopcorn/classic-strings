import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowLeft, X } from "lucide-react";

const allImages = [
  { src: "/images/ceremony-1.jpg", title: "Garden Ceremony", category: "ceremony", aspect: "landscape" },
  { src: "/images/ceremony-2.jpg", title: "Ring Exchange", category: "ceremony", aspect: "landscape" },
  { src: "/images/ceremony-3.jpg", title: "First Dance", category: "reception", aspect: "landscape" },
  { src: "/images/card-proposal.jpg", title: "Rooftop Proposal", category: "proposal", aspect: "portrait" },
  { src: "/images/card-wedding.jpg", title: "Garden Reception", category: "reception", aspect: "portrait" },
  { src: "/images/card-corporate.jpg", title: "Corporate Gala", category: "corporate", aspect: "portrait" },
  { src: "/images/gallery-1.jpg", title: "Walking Down the Aisle", category: "ceremony", aspect: "portrait" },
  { src: "/images/gallery-2.jpg", title: "Quartet Performance", category: "ceremony", aspect: "landscape" },
  { src: "/images/gallery-3.jpg", title: "Beach Wedding", category: "ceremony", aspect: "portrait" },
  { src: "/images/gallery-4.jpg", title: "The Violinist", category: "behind-scenes", aspect: "landscape" },
  { src: "/images/gallery-5.jpg", title: "Reception Toast", category: "reception", aspect: "portrait" },
  { src: "/images/gallery-6.jpg", title: "Grand Ballroom", category: "ceremony", aspect: "landscape" },
];

const categories = [
  { value: "all", label: "All" },
  { value: "ceremony", label: "Ceremony" },
  { value: "reception", label: "Reception" },
  { value: "proposal", label: "Proposal" },
  { value: "corporate", label: "Corporate" },
  { value: "behind-scenes", label: "Behind the Scenes" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredImages =
    activeCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === activeCategory);

  // Distribute images into 3 columns
  const columns: typeof allImages[] = [[], [], []];
  filteredImages.forEach((img, i) => {
    columns[i % 3].push(img);
  });

  return (
    <div className="min-h-screen bg-[#f0e6de]">
      {/* Header */}
      <div className="bg-[#343a3f] pt-24 pb-12 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest font-sans hover:text-[#e3fe3b] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="font-serif text-4xl lg:text-[64px] text-white font-light leading-tight">
            Our <span className="italic text-[#d6c0b3]">Gallery</span>
          </h1>
          <p className="text-white/40 text-sm font-sans mt-4 max-w-lg">
            A curated collection of moments we have been honored to be a part of.
            Each image tells a story of love, celebration, and the power of live music.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-16 lg:top-20 z-30 bg-[#f0e6de]/95 backdrop-blur-sm border-b border-[#d6c0b3]/30 py-4 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                activeCategory === cat.value
                  ? "bg-[#343a3f] text-white"
                  : "bg-[#d6c0b3]/20 text-[#343a3f]/60 hover:bg-[#d6c0b3]/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div
        ref={gridRef}
        className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className="flex flex-col gap-4 lg:gap-6"
              style={{
                transform: `translateY(${(colIndex % 2 === 0 ? -1 : 1) * scrollY * 0.02}px)`,
              }}
            >
              {column.map((image, imgIndex) => (
                <div
                  key={image.src}
                  className={`group relative overflow-hidden rounded-xl lg:rounded-2xl cursor-pointer transition-all duration-700 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${imgIndex * 100 + colIndex * 50}ms`,
                  }}
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div
                    className={`overflow-hidden ${
                      image.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#343a3f]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-serif text-white text-lg lg:text-xl">
                      {image.title}
                    </p>
                    <p className="text-white/50 text-xs uppercase tracking-wider font-sans mt-1">
                      {image.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 lg:p-12"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
