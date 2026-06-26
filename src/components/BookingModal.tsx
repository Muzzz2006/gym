import React, { useState } from "react";
import { X, Calendar, Clock, User, MessageSquare, CheckCircle } from "lucide-react";
import { gymDB } from "../utils/db";
import { BookingType } from "../types/gym";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: BookingType;
  initialTrainerId?: string;
}

export default function BookingModal({ isOpen, onClose, initialType = "Trial", initialTrainerId = "" }: BookingModalProps) {
  const trainers = gymDB.getTrainers();
  const [type, setType] = useState<BookingType>(initialType);
  const [trainerId, setTrainerId] = useState(initialTrainerId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date || !time) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      gymDB.addBooking({
        name,
        email,
        phone,
        type,
        trainerId: trainerId || undefined,
        date,
        time,
        notes
      });
      setIsSuccess(true);
      setError("");
    } catch (err) {
      setError("An error occurred while creating your booking.");
    }
  };

  return (
    <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div id="booking-modal-content" className="relative w-full max-w-lg overflow-hidden rounded-2xl glass-panel-heavy border border-white/10 shadow-2xl animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-xl font-display font-semibold text-white tracking-tight">
            {isSuccess ? "Booking Confirmed" : "Secure Your Session"}
          </h3>
          <button 
            onClick={onClose} 
            className="p-1 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gym-gold/10 border border-gym-gold/30 flex items-center justify-center text-gym-gold animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-display font-bold text-white">You're All Set!</h4>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">
              We have generated your request. Our client relations director will reach out within the next 2 hours via email or phone to finalize details.
            </p>
            <div className="w-full pt-4 text-left glass-panel p-4 rounded-xl space-y-2 text-xs font-mono text-gray-300">
              <p><span className="text-gym-gold">Type:</span> {type}</p>
              {trainerId && (
                <p><span className="text-gym-gold">Coach:</span> {trainers.find(t => t.id === trainerId)?.name}</p>
              )}
              <p><span className="text-gym-gold">Schedule:</span> {date} at {time}</p>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-gym-gold hover:bg-gym-gold/90 text-gym-dark font-semibold rounded-xl tracking-wide transition-all shadow-lg shadow-gym-gold/10"
            >
              Back to Website
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {error && (
              <div className="p-3 bg-red-950/40 border border-red-500/20 rounded-xl text-xs text-red-400 font-medium">
                {error}
              </div>
            )}

            {/* Type Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Select Booking Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(["Trial", "Trainer", "Consultation", "Visit"] as BookingType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setType(t);
                      if (t !== "Trainer") setTrainerId("");
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all text-center ${
                      type === t 
                        ? "bg-gym-gold border-gym-gold text-gym-dark shadow-md" 
                        : "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {t === "Trial" ? "🔑 Free Pass" : t === "Trainer" ? "🏋️ Private Coach" : t === "Consultation" ? "📈 Diagnostic" : "👀 Club Tour"}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Your Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Marcus Aurelius"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gym-gold text-sm transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 0123"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gym-gold text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marcus@epic.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gym-gold text-sm transition-colors"
              />
            </div>

            {/* Conditional Trainer Selector */}
            {type === "Trainer" && (
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Select Private Coach *</label>
                <select
                  value={trainerId}
                  onChange={(e) => setTrainerId(e.target.value)}
                  required={type === "Trainer"}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gym-gold text-sm transition-colors [&>option]:bg-gym-dark"
                >
                  <option value="">-- Choose Coach --</option>
                  {trainers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.role})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* DateTime selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gym-gold text-sm transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Preferred Time *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                  <select
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gym-gold text-sm transition-colors [&>option]:bg-gym-dark"
                  >
                    <option value="">-- Select Time --</option>
                    <option value="06:00 AM">06:00 AM (Early Rise)</option>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="06:00 PM">06:00 PM (Peak Hour)</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Special Requests or Fitness Objectives</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your fitness history, physical limitations, or direct goals..."
                  rows={2}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gym-gold text-sm transition-colors resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-3 bg-gym-gold hover:bg-gym-gold/90 text-gym-dark font-semibold rounded-xl tracking-wide transition-all shadow-lg shadow-gym-gold/10 hover:shadow-gym-gold/20 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Confirm Reservation</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
