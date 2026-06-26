import { Award, Flame, Zap, Layers, Users, HeartPulse, Sparkles, Clock, Compass, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  const cards = [
    {
      icon: Award,
      title: "Certified Elite Trainers",
      description: "Our roster is comprised strictly of Olympians, CSCS specialists, and Precision Nutrition researchers who build personalized biomechanical templates."
    },
    {
      icon: Flame,
      title: "State-of-the-Art Gear",
      description: "Equipped with customized Eleiko barbells, Keiser pneumatic resistance machines, Woodway motorless curve treadmills, and dynamic rig platforms."
    },
    {
      icon: Zap,
      title: "Bespoke Coaching",
      description: "No standardized training regimes. We continuously audit your structural mobility, metabolic rates, and neuromuscular fatigue levels."
    },
    {
      icon: Layers,
      title: "Elite Group Classes",
      description: "Small-group, science-driven, and highly engaging formats. From metabolic conditioning to athletic reformer Pilates."
    },
    {
      icon: Users,
      title: "Women-only Sessions",
      description: "Specialized, highly secure, and comfortable private zones and time slots led strictly by our top female strength and mobility coaches."
    },
    {
      icon: HeartPulse,
      title: "Scientific Nutrition",
      description: "Get bio-impedance composition tracking (InBody), DNA-backed nutrient timelines, and customized meal-prep delivery integrations."
    },
    {
      icon: Sparkles,
      title: "Steam & Recovery Suites",
      description: "Complete your training session in our Finnish dry saunas, cold plunge suites (4°C), and dedicated pneumatic compression spaces."
    },
    {
      icon: Compass,
      title: "Secure On-Site Parking",
      description: "Valet parking and private card-controlled secure parking bays with fast EV charging stations exclusively for AURA members."
    },
    {
      icon: Clock,
      title: "24/7 Club Access",
      description: "Train on your schedule. Keyless biometric entry gives VIP members complete premium access 365 days a year."
    },
    {
      icon: ShieldCheck,
      title: "Sanitized Environment",
      description: "Continuous hospital-grade air-filtration (HEPA H14), localized premium wipe stations, and daily professional steam sanitation."
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-gym-dark-card border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-gym-gold uppercase tracking-widest font-bold">THE AURA EXPERIENCE</span>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase">
            ENGINEERED TO OUTPERFORM
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Every operational aspect of our club has been tailored for peak physical excellence and luxurious administrative support.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel transition-all duration-300 hover:scale-[1.02] gold-border border gold-glow-hover flex flex-col justify-between text-left group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-gym-gold/10 border border-gym-gold/20 flex items-center justify-center text-gym-gold group-hover:bg-gym-gold group-hover:text-gym-dark transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold font-display text-white tracking-wide uppercase group-hover:text-gym-gold transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
