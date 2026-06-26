import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { gymDB } from "../utils/db";

export default function FAQ() {
  const faqs = gymDB.getFAQs();
  const [openId, setOpenId] = useState<string | null>("faq1"); // open first FAQ by default

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-gym-dark-card border-t border-b border-white/5 relative">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-gym-gold uppercase tracking-widest font-bold">FAQS</span>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase">
            ANSWERS & INTEL
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Everything you need to know about our premium memberships, access rules, recovery facilities, and coaching structures.
          </p>
        </div>

        {/* Collapsible Accordion Grid */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-gym-dark border-gym-gold/20 shadow-lg"
                    : "bg-white/5 border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-gym-gold flex-shrink-0" />
                    <span className="text-sm font-display font-bold text-white uppercase tracking-wider">{faq.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gym-gold" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 hover:text-white" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 border-t border-white/5 pt-4 animate-fade-in">
                    <p className="text-xs text-gray-400 leading-relaxed font-light">{faq.answer}</p>
                    <span className="inline-block text-[8px] text-gray-500 font-mono uppercase bg-white/5 px-2 py-0.5 rounded mt-3">
                      Category: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
