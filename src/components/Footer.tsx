import { Shield } from "lucide-react";

interface FooterProps {
  currentTab: "public" | "admin";
  setCurrentTab: (tab: "public" | "admin") => void;
}

export default function Footer({ currentTab, setCurrentTab }: FooterProps) {
  return (
    <footer className="bg-gym-dark pt-20 pb-10 border-t border-white/5 relative z-10 text-left text-xs text-gray-500 font-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Logo/Identity description */}
          <div className="space-y-4">
            <span className="text-xl font-display font-black tracking-widest text-white block">
              AURA<span className="text-gym-gold font-light">GYM</span>
            </span>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              A premium, design-forward athletic club combining metabolic diagnostics, olympic-level coaches, and clean recovery suites.
            </p>
            <div className="flex space-x-3 pt-2">
              <span className="text-white hover:text-gym-gold transition-colors font-mono cursor-pointer uppercase text-[10px]">Instagram</span>
              <span className="text-white hover:text-gym-gold transition-colors font-mono cursor-pointer uppercase text-[10px]">Twitter</span>
              <span className="text-white hover:text-gym-gold transition-colors font-mono cursor-pointer uppercase text-[10px]">YouTube</span>
            </div>
          </div>

          {/* Quick links directory */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Pillars</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-gym-gold transition-colors block">Our Story</a></li>
              <li><a href="#programs" className="hover:text-gym-gold transition-colors block">Training Programs</a></li>
              <li><a href="#trainers" className="hover:text-gym-gold transition-colors block">Elite Coaches</a></li>
              <li><a href="#schedule" className="hover:text-gym-gold transition-colors block">Interactive Calendars</a></li>
            </ul>
          </div>

          {/* Access levels */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Memberships</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#plans" className="hover:text-gym-gold transition-colors block">Elite Access</a></li>
              <li><a href="#plans" className="hover:text-gym-gold transition-colors block">Power Annual</a></li>
              <li><a href="#plans" className="hover:text-gym-gold transition-colors block">VIP Syndicate</a></li>
              <li><a href="#bmi" className="hover:text-gym-gold transition-colors block">BMI Composition Tool</a></li>
            </ul>
          </div>

          {/* Security details / terms */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Regulatory Desk</h4>
            <p className="text-gray-400 leading-relaxed max-w-xs mb-3">
              We mandate physical screening baseline checks for all high-intensity athletic programs. Full access rules apply.
            </p>
            <button
              onClick={() => setCurrentTab(currentTab === "public" ? "admin" : "public")}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] font-bold uppercase transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-gym-gold" />
              <span>{currentTab === "public" ? "Staff Terminal Portal" : "Visitor Website"}</span>
            </button>
          </div>

        </div>

        {/* Policies & Copyrights */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-600 font-mono">
          <p>© {new Date().getFullYear()} AURA GYM LTD. ALL SECURE PROTOCOLS ENFORCED.</p>
          
          <div className="flex space-x-6">
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => alert("Privacy Policy:\n\nYour biometric diagnostics, email logs, and subscription credentials are fully locked under 256-bit encryption. We never rent or distribute data to third-party marketing companies.")}>PRIVACY POLICY</span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => alert("Terms of Service:\n\nMembers must adhere strictly to club conduct. Towels are provided on-site. Biometric entries are non-transferrable. Cancellations can be submitted online 7 days before billing dates.")}>TERMS OF SERVICE</span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => alert("Refund Policy:\n\nTrial reservations carry no commitments. Monthly packages can be canceled anytime without penalties. Annual plans are subject to proportional adjustments based on utilized periods.")}>REFUND POLICY</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
