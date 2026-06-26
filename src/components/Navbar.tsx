import React, { useState } from "react";
import { Menu, X, Shield, Lock, ChevronRight } from "lucide-react";

interface NavbarProps {
  currentTab: "public" | "admin";
  setCurrentTab: (tab: "public" | "admin") => void;
  onOpenBooking: () => void;
  onOpenMembership: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, onOpenBooking, onOpenMembership }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123" || passcode === "admin" || passcode === "") {
      setCurrentTab("admin");
      setShowAdminLogin(false);
      setPasscode("");
      setLoginError("");
    } else {
      setLoginError("Invalid administrator passcode. (Tip: Leave empty or use 'admin123')");
    }
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Coaches", href: "#trainers" },
    { label: "Schedules", href: "#schedule" },
    { label: "Plans", href: "#plans" },
    { label: "BMI", href: "#bmi" },
    { label: "Enquiries", href: "#contact" },
    { label: "Research Blog", href: "#blog" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gym-dark/85 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentTab("public")}>
            <span className="text-2xl font-display font-black tracking-widest text-white">
              AURA<span className="text-gym-gold font-light">GYM</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          {currentTab === "public" ? (
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs tracking-wider uppercase font-medium text-gray-300 hover:text-gym-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-gym-gold uppercase tracking-wider">
              <Shield className="w-4 h-4 animate-pulse text-gym-gold" />
              <span>Secure Executive Dashboard Active</span>
            </div>
          )}

          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-4">
            {currentTab === "public" ? (
              <>
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="p-2 text-gray-400 hover:text-white transition-colors flex items-center space-x-1.5 text-xs font-semibold"
                  title="Admin Dashboard Portal"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Panel</span>
                </button>
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-lg border border-white/10 transition-all"
                >
                  Book Trial
                </button>
                <button
                  onClick={onOpenMembership}
                  className="px-4 py-2 bg-gym-gold hover:bg-gym-gold/90 text-gym-dark text-xs font-bold rounded-lg tracking-wide transition-all shadow-md shadow-gym-gold/5"
                >
                  Join Club
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCurrentTab("public")}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-lg border border-white/10 transition-all"
                >
                  Back to Website
                </button>
                <button
                  onClick={() => setCurrentTab("public")}
                  className="px-4 py-2 bg-red-950/40 hover:bg-red-900/40 border border-red-500/20 text-red-300 text-xs font-bold rounded-lg transition-all"
                >
                  Log Out
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center space-x-2">
            {currentTab === "public" && (
              <button
                onClick={() => setShowAdminLogin(true)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <Shield className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-gym-dark px-4 pt-4 pb-6 space-y-4">
          {currentTab === "public" ? (
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm tracking-wider uppercase font-medium text-gray-300 hover:text-gym-gold transition-colors py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking();
                  }}
                  className="py-2.5 bg-white/5 text-white text-xs font-semibold rounded-lg border border-white/10"
                >
                  Book Trial
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenMembership();
                  }}
                  className="py-2.5 bg-gym-gold text-gym-dark text-xs font-bold rounded-lg"
                >
                  Join Club
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 text-center">
              <p className="text-xs font-mono text-gym-gold tracking-widest uppercase">SECURE ADMIN PANEL ACTIVE</p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setCurrentTab("public");
                }}
                className="w-full py-2 bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-lg"
              >
                Return to Public Website
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setCurrentTab("public");
                }}
                className="w-full py-2 bg-red-950/50 border border-red-500/20 text-red-400 text-xs font-semibold rounded-lg"
              >
                Log Out Admin
              </button>
            </div>
          )}
        </div>
      )}

      {/* Admin Login Modal Overlay */}
      {showAdminLogin && (
        <div id="admin-login-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-2xl glass-panel-heavy p-6 border border-white/10 shadow-2xl animate-fade-in relative">
            <button 
              onClick={() => setShowAdminLogin(false)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-gym-gold/10 border border-gym-gold/20 flex items-center justify-center text-gym-gold mx-auto">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-display font-bold text-white tracking-wide">Manager Portal Gate</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed max-w-[240px] mx-auto">
                Authorized administrator session requires secure passcode.
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              {loginError && (
                <p className="p-2 bg-red-950/40 border border-red-500/25 rounded-lg text-[10px] text-red-400 font-semibold leading-relaxed">
                  {loginError}
                </p>
              )}

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Administrative Passcode</label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (Leave empty to bypass)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-center text-sm tracking-widest focus:outline-none focus:border-gym-gold focus:ring-1 focus:ring-gym-gold/30 transition-all"
                  autoFocus
                />
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] text-gray-500 leading-relaxed font-mono">
                💡 <span className="text-gym-gold">Tip:</span> Press the button directly to bypass credentials, or input <span className="text-white font-bold">admin123</span>.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gym-gold hover:bg-gym-gold/90 text-gym-dark text-xs font-bold rounded-xl tracking-wider uppercase transition-all shadow-md shadow-gym-gold/10 hover:shadow-gym-gold/25 flex items-center justify-center space-x-1"
              >
                <span>Access Terminal</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
