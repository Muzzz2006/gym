import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { gymDB } from "../utils/db";

export default function Testimonials() {
  const testimonials = gymDB.getTestimonials();
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((prevIdx) => (prevIdx === 0 ? testimonials.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setActiveIndex((prevIdx) => (prevIdx === testimonials.length - 1 ? 0 : prevIdx + 1));
  };

  const active = testimonials[activeIndex] || testimonials[0];

  return (
    <section id="testimonials" className="py-24 bg-gym-dark relative overflow-hidden">
      {/* Decorative quotes background graphic */}
      <div className="absolute top-10 left-10 text-white/5 pointer-events-none select-none">
        <Quote className="w-64 h-64 rotate-18" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-4 mb-16">
          <span className="text-xs font-mono text-gym-gold uppercase tracking-widest font-bold">CLIENT LOGS</span>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase">
            TRUSTED BY CHAMPIONS
          </h2>
        </div>

        {active && (
          <div className="space-y-8 animate-fade-in">
            {/* Rating Stars */}
            <div className="flex items-center justify-center space-x-1 text-gym-gold">
              {Array.from({ length: active.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gym-gold" />
              ))}
            </div>

            {/* Comment Body */}
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-display font-light text-white italic max-w-4xl mx-auto leading-relaxed">
              "{active.comment}"
            </blockquote>

            {/* Profile detail */}
            <div className="flex flex-col items-center justify-center space-y-3 pt-6">
              <img
                src={active.avatar}
                alt={active.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gym-gold shadow-lg"
              />
              <div>
                <p className="text-sm font-bold text-white tracking-wide uppercase">{active.name}</p>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">{active.role}</p>
              </div>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center justify-center space-x-4 pt-4">
              <button
                onClick={prev}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-gym-gold transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Dot Indicators */}
              <div className="flex space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeIndex === idx ? "w-6 bg-gym-gold" : "bg-gray-600 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-gym-gold transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
