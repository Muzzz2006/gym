import { useState } from "react";
import { Filter, Calendar, Users, MapPin, Clock } from "lucide-react";
import { gymDB } from "../utils/db";

interface ClassScheduleProps {
  onOpenBooking: () => void;
}

export default function ClassSchedule({ onOpenBooking }: ClassScheduleProps) {
  const classes = gymDB.getClasses();
  const trainers = gymDB.getTrainers();

  const days: Array<"Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"> = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const [selectedDay, setSelectedDay] = useState<typeof days[number]>("Monday");
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>("All");

  const filteredClasses = classes.filter((cls) => {
    const matchesDay = cls.day === selectedDay;
    const matchesTrainer = selectedTrainerId === "All" || cls.trainerId === selectedTrainerId;
    return matchesDay && matchesTrainer;
  });

  return (
    <section id="schedule" className="py-24 bg-gym-dark-card border-t border-b border-white/5 relative">
      <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vh] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left space-y-3">
            <span className="text-xs font-mono text-gym-gold uppercase tracking-widest font-bold font-semibold">CLUB SCHEDULER</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase">
              INTERACTIVE WEEKLY TIMETABLE
            </h2>
            <p className="text-gray-400 text-sm max-w-xl">
              Filter schedules by day and coaching director. Book and reserve a spot directly using your trial or membership.
            </p>
          </div>

          {/* Trainer Filter dropdown */}
          <div className="flex items-center space-x-3 self-start md:self-end">
            <Filter className="w-4 h-4 text-gym-gold" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Filter Coach</span>
            <select
              value={selectedTrainerId}
              onChange={(e) => setSelectedTrainerId(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gym-dark border border-white/10 text-xs text-white focus:outline-none focus:border-gym-gold [&>option]:bg-gym-dark"
            >
              <option value="All">All Coaches</option>
              {trainers.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Days of the Week tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 border-b border-white/5 scrollbar-none gap-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-shrink-0 px-5 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedDay === day
                  ? "bg-gym-gold text-gym-dark font-bold shadow-md"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* List of Classes */}
        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => {
              const coach = trainers.find((t) => t.id === cls.trainerId);
              const isFull = cls.currentCap >= cls.maxCap;

              return (
                <div
                  key={cls.id}
                  className="p-6 rounded-2xl glass-panel text-left flex flex-col justify-between border border-white/5 hover:border-gym-gold/25 transition-all duration-300 relative group"
                >
                  <div className="space-y-4">
                    {/* Time / Status Banner */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-xs text-gym-gold font-mono">
                        <Clock className="w-4 h-4" />
                        <span>{cls.time}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase tracking-wider ${
                        isFull
                          ? "bg-red-950/40 border border-red-500/20 text-red-400"
                          : "bg-emerald-950/40 border border-emerald-500/20 text-emerald-400"
                      }`}>
                        {isFull ? "● Sold Out" : `● ${cls.maxCap - cls.currentCap} Spots Left`}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-display font-bold text-white uppercase group-hover:text-gym-gold transition-colors">{cls.className}</h3>
                      <p className="text-[11px] text-gray-400 font-mono flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                        <span>{cls.room} ({cls.duration})</span>
                      </p>
                    </div>

                    {/* Coach Profile snippet */}
                    {coach && (
                      <div className="flex items-center space-x-3 pt-3 border-t border-white/5">
                        <img
                          src={coach.photo}
                          alt={coach.name}
                          className="w-10 h-10 rounded-lg object-cover border border-white/10"
                        />
                        <div>
                          <p className="text-xs font-semibold text-white">{coach.name}</p>
                          <p className="text-[10px] text-gray-400 font-mono uppercase">{coach.role}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Booking trigger button */}
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <button
                      onClick={onOpenBooking}
                      disabled={isFull}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                        isFull
                          ? "bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed"
                          : "bg-white/5 hover:bg-gym-gold hover:text-gym-dark text-white border border-white/10 hover:border-gym-gold cursor-pointer"
                      }`}
                    >
                      {isFull ? "Waiting List Closed" : "Reserve Session"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-16 text-center rounded-2xl glass-panel space-y-4 max-w-xl mx-auto">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto animate-pulse" />
            <h4 className="text-lg font-display font-semibold text-white">No Scheduled Classes</h4>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              There are no group programs scheduled for {selectedDay} under the selected filters. Change filters or contact our reception.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
