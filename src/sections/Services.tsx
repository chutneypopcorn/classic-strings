import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { Heart, Building2, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  {
    title: "Wedding Ceremonies",
    description:
      "From processional to recessional, we craft the perfect musical journey for your vows. Our repertoire spans classical masterpieces to modern love songs, all performed with the warmth and intimacy only live strings can provide.",
    image: "/images/card-wedding.jpg",
    icon: Heart,
  },
  {
    title: "Proposals",
    description:
      "Create an unforgettable moment with a surprise string performance. We coordinate discreetly to ensure your proposal is perfectly timed, setting the scene for a magical 'yes'.",
    image: "/images/card-proposal.jpg",
    icon: Sparkles,
  },
  {
    title: "Corporate Events",
    description:
      "Elevate your corporate gala, product launch, or private dinner with sophisticated live music. Our ensemble adapts to any venue and ambiance, from intimate boardrooms to grand ballrooms.",
    image: "/images/card-corporate.jpg",
    icon: Building2,
  },
];

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.4;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#343a3f] overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-12 lg:mb-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[#c9a57a] text-xs uppercase tracking-[0.3em] font-sans mb-4">
              What We Offer
            </p>
            <h2
              className={`font-serif text-4xl lg:text-[64px] text-white font-light leading-tight transition-all duration-1000 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Signature
              <br />
              <span className="italic text-[#d6c0b3]">Experiences</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-12 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className={`flex-shrink-0 w-[340px] lg:w-[420px] snap-start group transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-[#2a2f33] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a2f33] via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#e3fe3b]/90 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#343a3f]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <h3 className="font-serif text-2xl lg:text-[32px] text-white font-light mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm font-sans leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link
                    to="/#book"
                    className="inline-flex items-center gap-2 text-[#e3fe3b] text-xs uppercase tracking-widest font-medium hover:gap-3 transition-all"
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
