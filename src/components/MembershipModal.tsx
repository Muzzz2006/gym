import React, { useState, useRef } from "react";
import { X, Check, Award, Mail, Phone, Calendar, User, CreditCard, ShieldAlert } from "lucide-react";
import { gymDB } from "../utils/db";

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId?: string;
}

export default function MembershipModal({ isOpen, onClose, selectedPlanId = "" }: MembershipModalProps) {
  const plans = gymDB.getPlans();
  const [planId, setPlanId] = useState(selectedPlanId || plans[0]?.id || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [photoUrl, setPhotoUrl] = useState("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop");
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdMember, setCreatedMember] = useState<any>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const activePlan = plans.find(p => p.id === planId) || plans[0];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPhotoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      const joinDateStr = new Date().toISOString().split("T")[0];
      const expiry = new Date();
      if (activePlan.billing === "annual") {
        expiry.setFullYear(expiry.getFullYear() + 1);
      } else if (activePlan.billing === "half-yearly") {
        expiry.setMonth(expiry.getMonth() + 6);
      } else if (activePlan.billing === "quarterly") {
        expiry.setMonth(expiry.getMonth() + 3);
      } else {
        expiry.setMonth(expiry.getMonth() + 1);
      }
      const expiryDateStr = expiry.toISOString().split("T")[0];

      // Simulate payment history entry
      const pId = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const mockPayment = {
        id: `pay_${Date.now()}`,
        amount: activePlan.price * (activePlan.billing === "annual" ? 12 : activePlan.billing === "quarterly" ? 3 : activePlan.billing === "half-yearly" ? 6 : 1),
        date: joinDateStr,
        method: "Stripe" as const,
        planName: activePlan.name,
        invoiceId: pId
      };

      const newMember = gymDB.addMember({
        name,
        email,
        phone,
        photo: photoUrl,
        planId,
        status: "Active",
        joinDate: joinDateStr,
        expiryDate: expiryDateStr,
        notes: notes || "Immediate direct registration",
        payments: [mockPayment]
      });

      setCreatedMember(newMember);
      setIsSuccess(true);
      setError("");
    } catch (err) {
      setError("An error occurred during member registration.");
    }
  };

  return (
    <div id="membership-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div id="membership-modal-content" className="relative w-full max-w-2xl overflow-hidden rounded-2xl glass-panel-heavy border border-white/10 shadow-2xl animate-fade-in flex flex-col md:flex-row">
        
        {/* Banner/Intro Panel */}
        <div className="md:w-5/12 bg-gradient-to-br from-gym-dark-card to-gym-dark p-6 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-xl font-display font-black tracking-widest text-white">AURA<span className="text-gym-gold font-light">GYM</span></span>
            </div>
            <h4 className="text-xl font-display font-bold text-white mb-2">Join the Elite Club</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Get direct access to state-of-the-art facilities, certified trainers, scientific testing laboratories, and custom nutrition frameworks.
            </p>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-gym-gold flex-shrink-0" />
                <span>All amenities included</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-gym-gold flex-shrink-0" />
                <span>Keyless dynamic entry</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-gym-gold flex-shrink-0" />
                <span>No hidden initiation fees</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 text-[10px] text-gray-500 font-mono">
            SECURED BY STRIPE & RAZORPAY INTEGRATION PRESETS
          </div>
        </div>

        {/* Form or Success Card Panel */}
        <div className="md:w-7/12 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-display font-semibold text-white">
              {isSuccess ? "Membership Generated" : "Enter Personal Details"}
            </h3>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSuccess && createdMember ? (
            <div className="space-y-6">
              {/* Virtual Membership Card */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-zinc-900 to-black p-5 border border-gym-gold/30 shadow-xl gold-glow">
                
                {/* Background accents */}
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-gym-gold/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute left-0 top-0 w-24 h-24 bg-brand-500/5 rounded-full blur-xl pointer-events-none" />

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-mono text-gym-gold tracking-widest font-bold uppercase">AURA VIP CLUB</span>
                    <h5 className="text-sm font-display font-semibold text-white tracking-wide mt-0.5">{activePlan.name}</h5>
                  </div>
                  <Award className="w-8 h-8 text-gym-gold animate-pulse" />
                </div>

                <div className="flex items-center space-x-4">
                  <img
                    src={createdMember.photo}
                    alt={createdMember.name}
                    className="w-16 h-16 rounded-lg object-cover border border-white/10 shadow-md"
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white tracking-wide">{createdMember.name}</p>
                    <p className="text-[10px] font-mono text-gray-400">ID: <span className="text-white">{createdMember.memberId}</span></p>
                    <p className="text-[10px] font-mono text-gray-400">STATUS: <span className="text-emerald-400 uppercase font-bold">{createdMember.status}</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-6 pt-3 border-t border-white/5 text-[9px] font-mono text-gray-400">
                  <div>
                    <p className="text-gray-500">MEMBER SINCE</p>
                    <p className="text-white">{createdMember.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">EXPIRES ON</p>
                    <p className="text-white">{createdMember.expiryDate}</p>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-xs text-gray-400">
                  Your billing setup is completed. An invoice of <span className="text-white font-semibold">${createdMember.payments[0].amount}</span> was securely generated and emailed.
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      alert(`Downloading PDF Invoice: ${createdMember.payments[0].invoiceId}`);
                    }}
                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white rounded-lg transition-all"
                  >
                    📄 Get Invoice PDF
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2 bg-gym-gold hover:bg-gym-gold/90 text-gym-dark text-xs font-semibold rounded-lg transition-all"
                  >
                    Enter Member Gate
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 max-h-[75vh] overflow-y-auto pr-1">
              {error && (
                <div className="p-2 bg-red-950/40 border border-red-500/20 rounded-xl text-xs text-red-400 font-medium">
                  {error}
                </div>
              )}

              {/* Photo Upload Simulator */}
              <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-xl border border-white/5">
                <img
                  src={photoUrl}
                  alt="Profile Preview"
                  className="w-14 h-14 rounded-lg object-cover border border-white/10"
                />
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-300">Upload Member Photo</label>
                  <p className="text-[10px] text-gray-500">JPG or PNG. Needed for digital security pass.</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[10px] font-bold text-gym-gold hover:underline focus:outline-none"
                  >
                    Select Photo File
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Select Plan */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Select Membership Plan *</label>
                <select
                  value={planId}
                  onChange={(e) => setPlanId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gym-gold text-xs transition-colors [&>option]:bg-gym-dark"
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - ${p.price}/{p.billing === "monthly" ? "mo" : p.billing === "quarterly" ? "quarter" : p.billing === "half-yearly" ? "half-year" : "yr"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Personal Details */}
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Marcus Aurelius"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gym-gold text-xs transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marcus@epic.com"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gym-gold text-xs transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 0123"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gym-gold text-xs transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Health Notes or Personal Requests</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter any medical history, previous injuries, or physical notes we should log."
                    rows={2}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gym-gold text-xs transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Secure Checkout Simulation Notice */}
              <div className="p-3 bg-gym-gold/5 rounded-xl border border-gym-gold/10 flex items-start space-x-2 text-[10px] text-gym-gold leading-relaxed">
                <CreditCard className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase tracking-wider block">Sandbox Payment Gateway Active</span>
                  Proceeding will generate a mock invoice of ${activePlan.price} using test cards. Your live credit details are never transmitted.
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gym-gold hover:bg-gym-gold/90 text-gym-dark font-semibold rounded-xl tracking-wide transition-all shadow-lg shadow-gym-gold/10 hover:shadow-gym-gold/20 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Authorize & Register</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
