import { ArrowDown, Flame, Play, Trophy, Users } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
  onOpenMembership: () => void;
}

export default function Hero({ onOpenBooking, onOpenMembership }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Background Cinematic Asset Wrapper */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-gym-dark via-gym-dark/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-gym-dark via-transparent to-gym-dark z-10" />
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop"
          alt="Cinematic Premium Gym Environment"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.45] saturate-[0.85] transition-transform duration-[10000ms] ease-out animate-pulse"
          style={{ animationDuration: "12s" }}
        />
        {/* Soft Gold Ambient Blur */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vh] bg-gym-gold/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vh] bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-24 flex flex-col items-center justify-center min-h-[85vh]">
        
        {/* Decorative Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-semibold text-gym-gold uppercase tracking-widest mb-8 animate-bounce">
          <Flame className="w-3.5 h-3.5 text-gym-gold animate-pulse" />
          <span>The New Standard in Physical Progression</span>
        </div>

        {/* Animated Headlines */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tight text-white max-w-5xl leading-[0.95] mb-6">
          REDEFINE WHAT IS <br />
          <span className="gold-gradient-text uppercase">PHYSICALLY POSSIBLE</span>
        </h1>

        <p className="text-gray-300 text-sm sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
          A premium athletic workspace engineered for high-performance training, scientific recovery, and bespoke nutritional diagnostics.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-16">
          <button
            onClick={onOpenMembership}
            className="w-full sm:w-auto px-8 py-4 bg-gym-gold hover:bg-gym-gold/95 text-gym-dark font-bold text-sm rounded-xl tracking-wider uppercase transition-all shadow-xl shadow-gym-gold/10 hover:shadow-gym-gold/25 hover:scale-[1.02] cursor-pointer"
          >
            Join the Club
          </button>
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm rounded-xl tracking-wider uppercase transition-all flex items-center justify-center space-x-2 hover:scale-[1.02] cursor-pointer"
          >
            <span>Book Free Trial</span>
          </button>
          <a
            href="#plans"
            className="w-full sm:w-auto text-xs font-semibold text-gray-400 hover:text-white uppercase tracking-widest transition-colors py-2"
          >
            View memberships
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full border-t border-white/5 pt-10 text-left">
          
          <div className="p-4 space-y-1">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gym-gold" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Active Members</span>
            </div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-white">12,400+</p>
            <p className="text-[10px] text-gray-400">Transforming daily</p>
          </div>

          <div className="p-4 space-y-1">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-gym-gold" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Master Coaches</span>
            </div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-white">24+</p>
            <p className="text-[10px] text-gray-400">Olympians & Specialists</p>
          </div>

          <div className="p-4 space-y-1">
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-gym-gold" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Training Zones</span>
            </div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-white">45,000 sq ft</p>
            <p className="text-[10px] text-gray-400">Luxury space design</p>
          </div>

          <div className="p-4 space-y-1">
            <div className="flex items-center space-x-2">
              <Play className="w-4 h-4 text-gym-gold" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Weekly Sessions</span>
            </div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-white">150+ Classes</p>
            <p className="text-[10px] text-gray-400">HIIT, CrossFit & Pilates</p>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer text-gray-500 hover:text-gym-gold transition-colors">
          <span className="text-[9px] font-mono uppercase tracking-widest">Discover AURA</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>

      </div>
    </section>
  );
}
