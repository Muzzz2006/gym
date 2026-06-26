import { useState } from "react";
import { MoveRight, Play, Eye, Flame, Check, Sparkles } from "lucide-react";

export default function TransformationGallery() {
  const [sliderVal, setSliderVal] = useState<number>(50);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const galleryItems = [
    {
      name: "Arthur Pendragon",
      time: "12 Weeks",
      achievement: "-14kg Fat / +3.5kg Muscle",
      before: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop&blur=10",
      after: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
      program: "Metcon Catalyst"
    },
    {
      name: "Guinevere Vance",
      time: "24 Weeks",
      achievement: "Rehabilitated Core / +20% Mobility",
      before: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400&auto=format&fit=crop&blur=10",
      after: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400&auto=format&fit=crop",
      program: "Pilates Sculpt & Flow"
    },
    {
      name: "Lancelot DuLac",
      time: "16 Weeks",
      achievement: "+45kg Squat / Built Primal Physique",
      before: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop&blur=10",
      after: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop",
      program: "Primal Strength Protocol"
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-gym-dark-card border-t border-b border-white/5 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gym-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-gym-gold uppercase tracking-widest font-bold">TRANSFORMATION ARCHIVE</span>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase">
            PROOF IN PERFORMANCE
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Real physical transformations from active members who successfully executed their customized training and nutrition blueprints.
          </p>
        </div>

        {/* Interactive Before/After Split Slider widget */}
        <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden glass-panel border border-white/10 relative p-4 mb-16">
          <span className="text-[10px] font-mono text-gym-gold tracking-widest uppercase block mb-3 font-semibold text-left">Interactive Biometric Slide</span>
          
          <div className="relative h-[450px] w-full rounded-xl overflow-hidden bg-slate-900 select-none border border-white/5">
            {/* Before (Background) */}
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop&blur=8"
              alt="Baseline Shape"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.5]"
            />
            <div className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-black/80 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono text-white">
              WEEK 0 (BASELINE)
            </div>

            {/* After (Foreground, split width determined by sliderVal) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden z-10 transition-all"
              style={{ width: `${sliderVal}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
                alt="Transformed Shape"
                className="absolute inset-y-0 left-0 w-[736px] md:w-[736px] max-w-none h-full object-cover"
                style={{ width: "736px" }}
              />
              <div className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-gym-gold text-gym-dark font-bold rounded text-[10px] font-mono whitespace-nowrap">
                WEEK 12 (TRANSFORMED)
              </div>
            </div>

            {/* Slider Line controller */}
            <div
              className="absolute inset-y-0 z-20 w-1 bg-gym-gold cursor-ew-resize flex items-center justify-center"
              style={{ left: `${sliderVal}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-gym-gold text-gym-dark flex items-center justify-center shadow-lg font-black border-2 border-gym-dark text-xs select-none">
                ↔
              </div>
            </div>

            {/* Hidden Input field stretching over image */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>
          <p className="text-[10px] text-gray-500 font-mono mt-3 text-center">
            Drag the gold dial horizontally to inspect fiber definition changes and structural alignment.
          </p>
        </div>

        {/* Static Before-After Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-panel border border-white/5 text-left space-y-4 hover:border-gym-gold/20 transition-all group"
            >
              <div className="relative h-48 rounded-xl overflow-hidden bg-slate-900 border border-white/5">
                <img
                  src={item.after}
                  alt={item.name}
                  className="w-full h-full object-cover filter brightness-[0.8]"
                />
                <button
                  onClick={() => setLightboxImg(item.after)}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white space-x-1.5 text-xs font-semibold"
                >
                  <Eye className="w-4 h-4 text-gym-gold" />
                  <span>Inspect Lightbox</span>
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-gym-gold uppercase tracking-widest font-semibold">{item.time} program</span>
                <h4 className="text-base font-display font-bold text-white tracking-wide">{item.name}</h4>
                <p className="text-xs text-gray-400 font-light flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-gym-gold flex-shrink-0" />
                  <span>{item.achievement}</span>
                </p>
                <p className="text-[10px] text-gray-500 font-mono">{item.program}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Overlay */}
      {lightboxImg && (
        <div id="lightbox-overlay" className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
          >
            ✕
          </button>
          <img
            src={lightboxImg}
            alt="Full Lightbox View"
            className="max-w-full max-h-[85vh] rounded-xl object-contain border border-white/10"
          />
        </div>
      )}
    </section>
  );
}
