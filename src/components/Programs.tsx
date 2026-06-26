import { useState } from "react";
import { ArrowRight, Flame, Clock } from "lucide-react";
import { gymDB } from "../utils/db";

interface ProgramsProps {
  onOpenBooking: (type?: string) => void;
}

export default function Programs({ onOpenBooking }: ProgramsProps) {
  const programs = gymDB.getPrograms();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Strength Training", "HIIT & CrossFit", "Cardio & Weight Loss", "Yoga & Pilates"];

  const filteredPrograms = activeCategory === "All"
    ? programs
    : programs.filter(p => p.category.includes(activeCategory) || p.name.includes(activeCategory));

  return (
    <section id="programs" className="py-24 bg-gym-dark relative">
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left space-y-3">
            <span className="text-xs font-mono text-gym-gold uppercase tracking-widest font-bold">ATHLETIC PROGRAMS</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase leading-tight">
              SCIENTIFIC TRAINING BLOCKS
            </h2>
            <p className="text-gray-400 text-sm max-w-xl">
              Our training protocols are divided into clean operational pillars. Filter and select the block that matches your immediate targets.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-2 px-4 rounded-full text-xs font-mono tracking-wider transition-all border ${
                  activeCategory === cat
                    ? "bg-gym-gold border-gym-gold text-gym-dark font-semibold shadow-md"
                    : "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="group relative overflow-hidden rounded-2xl bg-gym-dark-card border border-white/5 flex flex-col justify-between transition-all duration-300 hover:border-gym-gold/20 hover:scale-[1.01]"
            >
              
              {/* Image Header with Badge Overlay */}
              <div className="relative h-56 overflow-hidden bg-slate-900 border-b border-white/5">
                <img
                  src={prog.image}
                  alt={prog.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[0.75] saturate-[0.85]"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-gym-dark/80 backdrop-blur-md border border-white/10 text-[9px] font-semibold text-gym-gold uppercase tracking-widest font-mono">
                  <Flame className="w-3 h-3 text-gym-gold animate-pulse" />
                  <span>{prog.difficulty}</span>
                </div>

                <div className="absolute bottom-4 right-4 inline-flex items-center space-x-1 px-2 py-1 rounded-md bg-gym-dark/80 backdrop-blur-md text-[9px] text-gray-300 font-mono">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <span>{prog.duration}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 text-left flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-semibold text-gym-gold tracking-widest uppercase">{prog.category}</span>
                  <h3 className="text-xl font-display font-bold text-white uppercase group-hover:text-gym-gold transition-colors">
                    {prog.name}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-3">
                    {prog.description}
                  </p>
                </div>

                <button
                  onClick={() => onOpenBooking("Trial")}
                  className="w-full mt-4 py-3 bg-white/5 group-hover:bg-gym-gold hover:bg-gym-gold/90 text-white group-hover:text-gym-dark text-xs font-bold rounded-xl transition-all tracking-wider uppercase flex items-center justify-center space-x-2 border border-white/10 group-hover:border-gym-gold cursor-pointer"
                >
                  <span>Book Free Pass</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
