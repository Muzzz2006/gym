import { Instagram, Linkedin, Twitter, Award, CheckCircle } from "lucide-react";
import { gymDB } from "../utils/db";

interface TrainersProps {
  onOpenBooking: (type: string, trainerId?: string) => void;
}

export default function Trainers({ onOpenBooking }: TrainersProps) {
  const trainers = gymDB.getTrainers();

  return (
    <section id="trainers" className="py-24 bg-gym-dark-card border-t border-b border-white/5 relative">
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-gym-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-gym-gold uppercase tracking-widest font-bold">THE COACHING ROSTER</span>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase">
            ELITE PHYSICAL DIRECTORS
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Every master coach is vetted under rigid physical and physiological parameters to guarantee your results.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((coach) => (
            <div
              key={coach.id}
              className="group relative overflow-hidden rounded-2xl bg-gym-dark border border-white/5 flex flex-col justify-between transition-all duration-300 hover:border-gym-gold/20 hover:scale-[1.01]"
            >
              {/* Photo */}
              <div className="relative h-72 overflow-hidden bg-slate-900 border-b border-white/5">
                <img
                  src={coach.photo}
                  alt={coach.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[0.75] saturate-[0.85]"
                />
                
                {/* Social links overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gym-dark/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex space-x-3">
                    {coach.socials.instagram && (
                      <a
                        href={`https://instagram.com/${coach.socials.instagram}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gym-gold hover:text-gym-dark transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {coach.socials.twitter && (
                      <a
                        href={`https://twitter.com/${coach.socials.twitter}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gym-gold hover:text-gym-dark transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {coach.socials.linkedin && (
                      <a
                        href="#"
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gym-gold hover:text-gym-dark transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 text-left flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-mono font-semibold text-gym-gold tracking-widest uppercase">{coach.role}</span>
                    <h3 className="text-lg font-display font-bold text-white tracking-wide mt-0.5">{coach.name}</h3>
                  </div>

                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    <span className="text-gray-300 font-semibold uppercase font-mono block text-[9px] tracking-wider mb-0.5">Specialization</span>
                    {coach.specialization}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    <span className="text-gray-300 font-semibold uppercase font-mono block text-[9px] tracking-wider mb-1">Certifications</span>
                    {coach.certifications.map((cert, i) => (
                      <div key={i} className="flex items-center space-x-1.5 text-[11px] text-gray-400">
                        <Award className="w-3.5 h-3.5 text-gym-gold flex-shrink-0" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking("Trainer", coach.id)}
                  className="w-full py-2.5 bg-white/5 hover:bg-gym-gold hover:text-gym-dark hover:border-gym-gold text-white text-xs font-bold rounded-lg transition-all tracking-wider uppercase border border-white/10 flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Book Private Session</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
