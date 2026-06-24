import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import VelocityStretch from "@/sections/VelocityStretch";
import GalleryShowcase from "@/sections/GalleryShowcase";
import BookingCTA from "@/sections/BookingCTA";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <VelocityStretch />
      <GalleryShowcase />
      <BookingCTA />
      <Footer />
    </div>
  );
}
