import { useRef, useEffect, useState } from "react";
import { Calendar, Users, MapPin, Mail, Phone, User, MessageSquare, ExternalLink } from "lucide-react";

const eventTypes = [
  { value: "wedding", label: "Wedding" },
  { value: "proposal", label: "Proposal" },
  { value: "corporate", label: "Corporate Event" },
  { value: "other", label: "Other" },
];

export default function BookingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    eventType: "wedding" as "wedding" | "proposal" | "corporate" | "other",
    eventDate: "",
    venue: "",
    guestCount: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const buildEmailBody = () => {
    const lines = [
      `Name: ${formData.clientName}`,
      `Email: ${formData.email}`,
      formData.phone && `Phone: ${formData.phone}`,
      `Event Type: ${formData.eventType}`,
      formData.eventDate && `Event Date: ${formData.eventDate}`,
      formData.venue && `Venue: ${formData.venue}`,
      formData.guestCount && `Guest Count: ${formData.guestCount}`,
      formData.message && `\nMessage:\n${formData.message}`,
    ].filter(Boolean);
    return encodeURIComponent(lines.join("\n"));
  };

  const mailtoHref = () => {
    const subject = encodeURIComponent(`Quote Request - ${formData.eventType} from ${formData.clientName}`);
    const body = buildEmailBody();
    return `mailto:info@classicstrings.com.au?subject=${subject}&body=${body}`;
  };

  const canSubmit = formData.clientName.trim().length > 0 && formData.email.trim().length > 0;

  return (
    <section
      id="book"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#343a3f] overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#e3fe3b]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <div
            className={`transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-[#c9a57a] text-xs uppercase tracking-[0.3em] font-sans mb-4">
              Start Your Journey
            </p>
            <h2 className="font-serif text-4xl lg:text-[64px] text-white font-light leading-tight mb-6">
              Request a
              <br />
              <span className="italic text-[#d6c0b3]">Quote</span>
            </h2>
            <p className="text-white/50 text-base font-sans leading-relaxed mb-10 max-w-md">
              Tell us about your event and we will craft a personalized musical
              experience that perfectly captures your vision. We typically respond
              within 24 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-white/60">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-sans">info@classicstrings.com.au</span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-sans">+61 405 246 539</span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm font-sans">Greater Sydney</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-[#2a2f33] rounded-2xl p-6 lg:p-10 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    value={formData.clientName}
                    onChange={(e) =>
                      setFormData({ ...formData, clientName: e.target.value })
                    }
                    className="w-full bg-[#343a3f] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c9a57a]/50 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-[#343a3f] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c9a57a]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-[#343a3f] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c9a57a]/50 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="date"
                    placeholder="Event Date"
                    value={formData.eventDate}
                    onChange={(e) =>
                      setFormData({ ...formData, eventDate: e.target.value })
                    }
                    className="w-full bg-[#343a3f] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c9a57a]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Venue / Location"
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                    className="w-full bg-[#343a3f] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c9a57a]/50 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="number"
                    placeholder="Guest Count"
                    value={formData.guestCount}
                    onChange={(e) =>
                      setFormData({ ...formData, guestCount: e.target.value })
                    }
                    className="w-full bg-[#343a3f] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c9a57a]/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest font-sans mb-2 block">
                  Event Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          eventType: type.value as typeof formData.eventType,
                        })
                      }
                      className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                        formData.eventType === type.value
                          ? "bg-[#e3fe3b] text-[#343a3f]"
                          : "bg-[#343a3f] text-white/50 border border-white/10 hover:border-white/30"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                <textarea
                  placeholder="Tell us about your vision..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-[#343a3f] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c9a57a]/50 transition-colors resize-none"
                />
              </div>

              <a
                href={canSubmit ? mailtoHref() : undefined}
                onClick={(e) => {
                  if (!canSubmit) e.preventDefault();
                }}
                className={`w-full flex items-center justify-center gap-2 bg-[#e3fe3b] text-[#343a3f] py-4 rounded-xl text-sm uppercase tracking-widest font-semibold hover:bg-[#e3fe3b]/90 transition-all ${
                  !canSubmit ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                Request Quote
                <ExternalLink className="w-4 h-4" />
              </a>

              {!canSubmit && (
                <p className="text-white/30 text-xs font-sans text-center">
                  Please fill in your name and email to send a quote request.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
