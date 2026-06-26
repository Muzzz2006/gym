import React, { useState } from "react";
import { Mail, Phone, Clock, MapPin, Send, MessageSquare, Check, Sparkles } from "lucide-react";
import { gymDB } from "../utils/db";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Newsletter state
  const [newsEmail, setNewsEmail] = useState("");
  const [newsSuccess, setNewsSuccess] = useState(false);

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    try {
      gymDB.addEnquiry({
        name,
        email,
        phone,
        message
      });
      setIsSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setNewsSuccess(true);
    setNewsEmail("");
  };

  return (
    <section id="contact" className="py-24 bg-gym-dark relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gym-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Coordinates & Contact Info */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono text-gym-gold uppercase tracking-widest font-bold block">CLUB COORDINATES</span>
              <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase leading-tight">
                ESTABLISH CONTACT
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Reach out to reserve private slots, corporate packages, or specialized physiological baseline diagnostics.
              </p>
            </div>

            {/* Contact Channels */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-xl glass-panel border border-white/5">
                <MapPin className="w-5 h-5 text-gym-gold flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Facility Address</h4>
                  <p className="text-xs text-gray-400">773 Bellevue Boulevard, Suite 100, Seattle, WA</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-xl glass-panel border border-white/5">
                <Phone className="w-5 h-5 text-gym-gold flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Hotline & WhatsApp</h4>
                  <p className="text-xs text-gray-400">+1 (555) 012-AURA (General Response)</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-xl glass-panel border border-white/5">
                <Mail className="w-5 h-5 text-gym-gold flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Digital Correspondence</h4>
                  <p className="text-xs text-gray-400">membership@auragym-elite.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-xl glass-panel border border-white/5">
                <Clock className="w-5 h-5 text-gym-gold flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Club Operating Hours</h4>
                  <p className="text-xs text-gray-400">Mon - Fri: 05:00 AM - Midnight | Sat - Sun: 06:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>

            {/* Dynamic Map Vector representation (Anti-Telemetry visual design) */}
            <div className="relative rounded-2xl overflow-hidden h-44 bg-slate-950 border border-white/5 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-[radial-gradient(#1a2233_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              <div className="relative text-center space-y-2 z-10">
                <MapPin className="w-8 h-8 text-gym-gold mx-auto animate-bounce" />
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Latitude: 47.6062° N | Longitude: 122.3321° W</span>
                <span className="text-xs font-semibold text-white">Seattle Executive Hub Satellite Pass</span>
              </div>
            </div>
          </div>

          {/* Form & Newsletter Wrapper */}
          <div className="space-y-8">
            
            {/* Contact Form */}
            <div className="rounded-2xl glass-panel p-6 border border-white/5 space-y-4">
              <h3 className="text-lg font-display font-bold text-white uppercase tracking-wide">Inquire Online</h3>
              
              {isSuccess ? (
                <div className="p-6 text-center space-y-4 animate-fade-in bg-gym-gold/5 rounded-xl border border-gym-gold/10">
                  <div className="w-10 h-10 rounded-full bg-gym-gold/10 flex items-center justify-center text-gym-gold mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-display font-bold text-white">Enquiry Received</h4>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                    We have successfully logged your enquiry under active CRM leads. A relations executive will follow up directly within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs font-mono font-bold text-gym-gold hover:underline uppercase tracking-wider"
                  >
                    Submit another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquiry} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Bruce Wayne"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-gym-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 3000"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-gym-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="bruce@stark.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-gym-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Message / Inquiry *</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we assist you with membership options, training zones, or private recovery details?"
                        rows={4}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-gym-gold transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gym-gold hover:bg-gym-gold/90 text-gym-dark font-bold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md shadow-gym-gold/10 hover:shadow-gym-gold/25 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Send Correspondence</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Newsletter form */}
            <div className="rounded-2xl bg-gym-dark-card border border-white/5 p-6 space-y-4">
              <div className="flex items-center space-x-2 text-gym-gold">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">AURA INTELLIGENCE WIRE</h4>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Receive biological training reviews, metabolic guidelines, and VIP club announcements directly in your correspondence feed.
              </p>

              {newsSuccess ? (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 text-[10px] text-emerald-400 rounded-lg flex items-center space-x-2 animate-fade-in font-semibold">
                  <Check className="w-4 h-4" />
                  <span>Subscribed! Check your inbox for the AURA Volume 01.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-gym-gold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gym-gold hover:bg-gym-gold/90 text-gym-dark text-xs font-bold rounded-lg transition-all"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
