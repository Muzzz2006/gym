import { Check, ShieldCheck, Zap } from "lucide-react";
import { gymDB } from "../utils/db";

interface MembershipPlansProps {
  onOpenMembership: (planId?: string) => void;
}

export default function MembershipPlans({ onOpenMembership }: MembershipPlansProps) {
  const plans = gymDB.getPlans();

  return (
    <section id="plans" className="py-24 bg-gym-dark relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono text-gym-gold uppercase tracking-widest font-bold">MEMBERSHIP PROTOCOLS</span>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase leading-tight">
            SELECT YOUR ACCESS LEVEL
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Choose the membership tier that matches your frequency, physical goals, and desire for premium recovery solutions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 flex flex-col justify-between text-left transition-all duration-300 hover:scale-[1.02] border ${
                plan.popular
                  ? "bg-gradient-to-b from-gym-dark-card to-gym-dark border-gym-gold shadow-2xl gold-glow"
                  : "bg-gym-dark-card border-white/5 hover:border-white/10"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-6 -translate-y-1/2 inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-gym-gold text-gym-dark font-mono text-[9px] font-bold tracking-widest uppercase">
                  <Zap className="w-3 h-3 fill-gym-dark" />
                  <span>MOST RECONSTRUCTIVE</span>
                </div>
              )}

              <div className="space-y-6">
                {/* Info Header */}
                <div className="space-y-2">
                  <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">{plan.name}</h3>
                  {plan.discount && (
                    <span className="inline-block text-[10px] text-gym-gold font-mono uppercase bg-gym-gold/10 px-2.5 py-0.5 rounded border border-gym-gold/20">
                      {plan.discount}
                    </span>
                  )}
                  <div className="flex items-baseline space-x-1.5 pt-2">
                    <span className="text-4xl font-display font-black text-white">${plan.price}</span>
                    <span className="text-xs font-mono text-gray-500 uppercase">
                      /{plan.billing === "monthly" ? "mo" : plan.billing === "quarterly" ? "quarter" : plan.billing === "half-yearly" ? "half-year" : "yr"}
                    </span>
                  </div>
                </div>

                {/* Benefits Checklist */}
                <ul className="space-y-3.5 pt-4 border-t border-white/5">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2.5 text-xs text-gray-300 leading-normal">
                      <Check className="w-4 h-4 text-gym-gold flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="pt-8 mt-6 border-t border-white/5">
                <button
                  onClick={() => onOpenMembership(plan.id)}
                  className={`w-full py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    plan.popular
                      ? "bg-gym-gold hover:bg-gym-gold/90 text-gym-dark shadow-lg shadow-gym-gold/15"
                      : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                  }`}
                >
                  Acquire Access
                </button>
                <div className="flex items-center justify-center space-x-1 text-[10px] text-gray-500 font-mono mt-3.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Cancel online, anytime</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
