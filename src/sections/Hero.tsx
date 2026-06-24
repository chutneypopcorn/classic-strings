import { useRef, useEffect, useCallback } from "react";
import { Play } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const ripplesRef = useRef<Array<{ x: number; y: number; radius: number; strength: number; age: number }>>([]);
  const animationRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };
    ripplesRef.current.push({ x, y, radius: 0, strength: 1, age: 0 });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/images/hero-bg.jpg";
    img.onload = () => {
      imageRef.current = img;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;

      // Draw background image
      if (imageRef.current) {
        const imgRatio = imageRef.current.width / imageRef.current.height;
        const canvasRatio = w / h;
        let sw, sh, sx, sy;
        if (canvasRatio > imgRatio) {
          sw = imageRef.current.width;
          sh = imageRef.current.width / canvasRatio;
          sx = 0;
          sy = (imageRef.current.height - sh) / 2;
        } else {
          sh = imageRef.current.height;
          sw = imageRef.current.height * canvasRatio;
          sy = 0;
          sx = (imageRef.current.width - sw) / 2;
        }
        ctx.drawImage(imageRef.current, sx, sy, sw, sh, 0, 0, w, h);
      } else {
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(0, 0, w, h);
      }

      // Apply dark overlay
      ctx.fillStyle = "rgba(26, 20, 16, 0.5)";
      ctx.fillRect(0, 0, w, h);

      // Draw and update ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.age++;
        r.radius += 3;
        r.strength *= 0.97;

        if (r.strength < 0.01 || r.age > 120) {
          ripples.splice(i, 1);
          continue;
        }

        const maxRadius = 200;
        const fadeStart = maxRadius * 0.5;
        const fadeFactor = r.radius > fadeStart ? 1 - (r.radius - fadeStart) / (maxRadius - fadeStart) : 1;
        const alpha = r.strength * fadeFactor * 0.3;

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(214, 192, 179, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner ripple
        if (r.radius > 20) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(201, 165, 122, ${alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Mouse glow effect
      const m = mouseRef.current;
      if (m.x > 0 && m.y > 0) {
        const gradient = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 150);
        gradient.addColorStop(0, "rgba(214, 192, 179, 0.08)");
        gradient.addColorStop(1, "rgba(214, 192, 179, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const scrollToBook = () => {
    const el = document.getElementById("book");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: "crosshair" }}
      />

      {/* Floating Trophy */}
      <div className="absolute top-24 right-8 lg:right-24 z-10 animate-float hidden md:block">
        <img
          src="/images/trophy.png"
          alt="Award Trophy"
          className="w-24 h-24 lg:w-36 lg:h-36 object-contain drop-shadow-2xl opacity-90"
        />
        <p className="text-center text-[10px] uppercase tracking-widest text-[#c9a57a] mt-2 font-sans">
          Best of 2025
        </p>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <p className="text-[#c9a57a] text-xs uppercase tracking-[0.3em] font-sans font-medium mb-6 animate-fade-in-up">
          Award-Winning Wedding Ensemble
        </p>
        <h1
          className="font-serif text-5xl md:text-7xl lg:text-[94px] text-white font-light text-center leading-[1.1] tracking-tight mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
        >
          Surrender to the
          <br />
          <span className="italic text-[#d6c0b3]">Sound of Love</span>
        </h1>
        <p
          className="text-white/60 text-base lg:text-lg font-sans max-w-xl text-center mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
        >
          Experience the magic of live string music at your wedding, proposal,
          or special event. We transform moments into memories.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
        >
          <button
            onClick={scrollToBook}
            className="bg-[#e3fe3b] text-[#343a3f] px-8 py-3.5 rounded-full text-sm uppercase tracking-widest font-semibold hover:bg-[#e3fe3b]/90 transition-all hover:scale-105"
          >
            Request a Quote
          </button>
          <a
            href="https://www.youtube.com/watch?v=SNysw6EJ2Gk&t=11s"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/30 text-white px-8 py-3.5 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-white/10 transition-all"
          >
            <Play className="w-4 h-4" />
            Watch Our Reel
          </a>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#343a3f] to-transparent z-10" />
    </section>
  );
}
