import { useState } from "react";
import { Search, Calendar, User, Clock, Check, X, ShieldAlert, CheckSquare, Trash2, CalendarRange } from "lucide-react";
import { gymDB } from "../../utils/db";
import { Booking, BookingStatus } from "../../types/gym";

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>(gymDB.getBookings());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const syncData = () => {
    setBookings(gymDB.getBookings());
  };

  const handleApprove = (id: string) => {
    gymDB.updateBooking(id, { status: "Accepted" });
    syncData();
  };

  const handleCancel = (id: string) => {
    gymDB.updateBooking(id, { status: "Cancelled" });
    syncData();
  };

  const handleComplete = (id: string) => {
    gymDB.updateBooking(id, { status: "Completed" });
    
    // Automatically trigger CRM Lead state change or log a friendly alert
    const targetBooking = bookings.find(b => b.id === id);
    if (targetBooking) {
      alert(`Booking Completed!\nConverted Client ${targetBooking.name} to a secure CRM evaluation log.`);
    }
    syncData();
  };

  const handleReschedule = (id: string) => {
    const target = bookings.find(b => b.id === id);
    if (!target) return;

    const newTime = prompt(`Reschedule appointment for ${target.name}.\nCurrent schedule: ${target.date} at ${target.time}\n\nEnter new Schedule (e.g. "2026-06-29 10:00 AM"):`, `${target.date} ${target.time}`);
    if (newTime) {
      const parts = newTime.split(" ");
      const newDateStr = parts[0] || target.date;
      const newTimeStr = parts.slice(1).join(" ") || target.time;

      gymDB.updateBooking(id, {
        date: newDateStr,
        time: newTimeStr,
        status: "Accepted",
        notes: `${target.notes} | Rescheduled on ${new Date().toLocaleDateString()}`
      });
      syncData();
    }
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm("Remove this booking record permanently?")) {
      gymDB.deleteBooking(id);
      syncData();
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.notes.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search);
    
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[9px] font-mono text-gym-gold uppercase tracking-widest font-bold">SCHEDULER ENGINE</span>
          <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Appointment Reserves Board</h3>
        </div>
        
        <span className="px-3 py-1 bg-gym-gold/15 text-gym-gold text-xs font-mono rounded font-semibold uppercase">
          {bookings.filter(b => b.status === "Pending").length} Pending Requests
        </span>
      </div>

      {/* Toolbar Search & Status Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-3">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone or notes..."
            className="w-full pl-10 pr-4 py-2.5 bg-gym-dark-card border border-white/5 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gym-gold"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 bg-gym-dark-card border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gym-gold [&>option]:bg-gym-dark"
        >
          <option value="All">All Reservations</option>
          <option value="Pending">Pending Only</option>
          <option value="Accepted">Accepted Only</option>
          <option value="Completed">Completed Only</option>
          <option value="Cancelled">Cancelled Only</option>
        </select>
      </div>

      {/* List layout of bookings */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl glass-panel border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-gym-gold/20 transition-all text-left"
            >
              {/* Info Column */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                  <h4 className="text-base font-display font-bold text-white uppercase tracking-wide">{b.name}</h4>
                  <span className="px-2 py-0.5 bg-gym-gold/10 text-gym-gold border border-gym-gold/20 text-[9px] font-mono uppercase rounded-md font-semibold">
                    {b.type}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                    b.status === "Pending"
                      ? "bg-yellow-950/40 border border-yellow-500/20 text-yellow-400"
                      : b.status === "Accepted"
                      ? "bg-purple-950/40 border border-purple-500/20 text-purple-400"
                      : b.status === "Completed"
                      ? "bg-emerald-950/40 border border-emerald-500/20 text-emerald-400"
                      : "bg-red-950/40 border border-red-500/20 text-red-400"
                  }`}>
                    {b.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-[11px] font-mono text-gray-400">
                  <div className="flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    <span>{b.email} • {b.phone}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gym-gold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{b.date} at {b.time}</span>
                  </div>
                </div>

                {b.notes && (
                  <p className="text-[11px] text-gray-500 leading-relaxed max-w-xl">
                    <span className="font-semibold text-white uppercase font-mono text-[9px] mr-1">Log notes:</span>
                    {b.notes}
                  </p>
                )}
              </div>

              {/* Action Column */}
              <div className="flex flex-wrap gap-2 md:self-center">
                {b.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(b.id)}
                      className="px-3 py-1.5 bg-gym-gold hover:bg-gym-gold/90 text-gym-dark text-[11px] font-bold rounded-lg flex items-center space-x-1 cursor-pointer uppercase tracking-wider"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-red-950/40 hover:text-red-400 border border-white/10 text-white text-[11px] font-semibold rounded-lg flex items-center space-x-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </>
                )}

                {b.status === "Accepted" && (
                  <>
                    <button
                      onClick={() => handleComplete(b.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-lg flex items-center space-x-1 cursor-pointer uppercase tracking-wider"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Complete</span>
                    </button>
                    <button
                      onClick={() => handleReschedule(b.id)}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 hover:text-white text-[11px] font-semibold rounded-lg flex items-center space-x-1 cursor-pointer"
                    >
                      <CalendarRange className="w-3.5 h-3.5" />
                      <span>Reschedule</span>
                    </button>
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 hover:text-white text-[11px] font-semibold rounded-lg flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Cancel</span>
                    </button>
                  </>
                )}

                {(b.status === "Completed" || b.status === "Cancelled") && (
                  <button
                    onClick={() => handleDeleteBooking(b.id)}
                    className="p-1.5 rounded bg-white/5 border border-white/5 text-red-400 hover:text-white transition-all"
                    title="Remove record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          ))
        ) : (
          <div className="p-16 text-center rounded-2xl glass-panel space-y-3">
            <ShieldAlert className="w-10 h-10 text-gray-600 mx-auto animate-pulse" />
            <h4 className="text-base font-display font-semibold text-white">No Appointments Scheduled</h4>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              There are no reservation logs matching selected parameters. Reset filters or prompt online reservations.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
