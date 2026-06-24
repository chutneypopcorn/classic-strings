import { useRef, useEffect, useState } from "react";
import { Quote } from "lucide-react";

export default function VelocityStretch() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isMobile || !quoteRef.current) return;

    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let rafId: number;

    const handleScroll = () => {
      const now = Date.now();
      const dt = Math.max(now - lastTime, 1);
      const dy = window.scrollY - lastScrollY;
      const velocity = Math.abs((dy / dt) * 16);

      const maxVel = 200;
      const intensity = Math.min(velocity / maxVel, 1);
      const scaleY = 1 + intensity * 0.15;
      const blur = intensity * 3;

      if (quoteRef.current) {
        quoteRef.current.style.transform = `scaleY(${scaleY})`;
        quoteRef.current.style.filter = `blur(${blur}px)`;
      }

      lastScrollY = window.scrollY;
      lastTime = now;
    };

    const reset = () => {
      if (quoteRef.current) {
        quoteRef.current.style.transform = "scaleY(1)";
        quoteRef.current.style.filter = "blur(0px)";
      }
    };

    const section = sectionRef.current;
    if (section) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", handleScroll, { passive: true });
            rafId = requestAnimationFrame(function loop() {
              handleScroll();
              rafId = requestAnimationFrame(loop);
            });
          } else {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(rafId);
            reset();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(section);

      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", handleScroll);
        cancelAnimationFrame(rafId);
      };
    }
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#343a3f] py-24 lg:py-40 overflow-hidden"
    >
      <div
        ref={quoteRef}
        className="max-w-4xl mx-auto px-6 lg:px-12 text-center will-change-transform origin-center"
        style={{ transition: "transform 0.1s linear, filter 0.1s linear" }}
      >
        <Quote
          className={`w-10 h-10 text-[#c9a57a]/40 mx-auto mb-8 transition-all duration-1000 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        />
        <blockquote
          className={`font-serif text-2xl lg:text-[42px] text-[#d6c0b3] font-light leading-relaxed mb-8 transition-all duration-1000 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          &ldquo;From the first note as I walked down the aisle, I knew we had made
          the perfect choice. Classic Strings made our day truly magical.&rdquo;
        </blockquote>
        <div
          className={`transition-all duration-1000 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-sans text-white text-sm font-medium tracking-wide">
            Sarah &amp; Michael
          </p>
          <p className="font-sans text-white/40 text-xs mt-1 tracking-wider uppercase">
            Centennial Park, Sydney — March 2025
          </p>
        </div>
      </div>
    </section>
  );
}
