import { Target, Heart, Eye, Award } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gym-dark">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gym-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text details */}
          <div className="space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs font-mono text-gym-gold uppercase tracking-widest font-bold block">OUR MANIFESTO</span>
              <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase leading-tight">
                WE DO NOT BELIEVE IN COMPROMISE
              </h2>
            </div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Founded in 2018, AURA was born from a simple observation: conventional gyms are crowded, poorly maintained, and lack structural athletic integrity. We set out to design a premium, scientific sanctuary—a space combining high-grade equipment, olympic coaching standards, and medical-grade recovery tools.
            </p>

            {/* Mission & Vision Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-2xl glass-panel space-y-3">
                <div className="w-8 h-8 rounded-lg bg-gym-gold/10 border border-gym-gold/20 flex items-center justify-center text-gym-gold">
                  <Target className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold font-display text-white uppercase tracking-wider">Our Mission</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  To provide a high-caliber ecosystem that empowers high-performing individuals to achieve peak biological, mental, and physical states.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-panel space-y-3">
                <div className="w-8 h-8 rounded-lg bg-gym-gold/10 border border-gym-gold/20 flex items-center justify-center text-gym-gold">
                  <Eye className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold font-display text-white uppercase tracking-wider">Our Vision</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  To establish a global standard in high-performance clubs where exercise science, luxury hospitality, and premium culture converge.
                </p>
              </div>
            </div>

            {/* Achievements row */}
            <div className="flex items-center space-x-6 pt-2 border-t border-white/5">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-gym-gold" />
                <span className="text-xs text-gray-400 font-mono">Awarded 'Best Premium Facility 2025'</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-gym-gold" />
                <span className="text-xs text-gray-400 font-mono">99.8% Client Satisfaction Score</span>
              </div>
            </div>
          </div>

          {/* Right Media Grid / Bento Collage */}
          <div className="relative grid grid-cols-12 gap-4">
            
            {/* Primary Cinematic image */}
            <div className="col-span-8 overflow-hidden rounded-2xl aspect-[4/5] bg-slate-900 border border-white/10 group">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop"
                alt="Olympic Weightlifting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating accent collage */}
            <div className="col-span-4 flex flex-col justify-between h-full gap-4">
              <div className="overflow-hidden rounded-2xl aspect-square bg-slate-900 border border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop"
                  alt="Yoga flow alignment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="overflow-hidden rounded-2xl aspect-square bg-slate-900 border border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400&auto=format&fit=crop"
                  alt="Pilates posture"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Counter Badge */}
              <div className="p-4 rounded-2xl glass-panel text-center border border-gym-gold/20 shadow-lg flex flex-col justify-center items-center">
                <span className="text-2xl sm:text-3xl font-display font-black text-gym-gold">98%</span>
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mt-1">Retention Rate</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
