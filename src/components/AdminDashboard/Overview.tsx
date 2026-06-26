import { useState } from "react";
import { Users, UserCheck, PhoneCall, CalendarDays, DollarSign, Bell, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";
import { gymDB } from "../../utils/db";

export default function Overview() {
  const members = gymDB.getMembers();
  const leads = gymDB.getLeads();
  const bookings = gymDB.getBookings();
  const enquiries = gymDB.getEnquiries();

  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === "Active").length;
  const newLeads = leads.filter(l => l.status === "New").length;
  const pendingBookings = bookings.filter(b => b.status === "Pending").length;

  // Calculate Revenue
  const totalRevenue = members.reduce((sum, m) => {
    const paymentSum = m.payments.reduce((acc, p) => acc + p.amount, 0);
    return sum + paymentSum;
  }, 0);

  // Expiring members alert (e.g. expiring in next 60 days)
  const expiringAlerts = members.filter(m => {
    const expDate = new Date(m.expiryDate);
    const today = new Date("2026-06-26");
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 60 && m.status === "Active";
  });

  return (
    <div className="space-y-8 text-left animate-fade-in">
      
      {/* High-Level Stat blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="p-5 rounded-2xl glass-panel space-y-2 border border-white/5">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-mono uppercase tracking-widest">Total Registered</span>
            <Users className="w-4 h-4 text-gym-gold" />
          </div>
          <p className="text-3xl font-display font-black text-white">{totalMembers}</p>
          <p className="text-[10px] text-emerald-400 font-mono">100% physical database capacity</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2 border border-white/5">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-mono uppercase tracking-widest">Active Passes</span>
            <UserCheck className="w-4 h-4 text-gym-gold" />
          </div>
          <p className="text-3xl font-display font-black text-white">{activeMembers}</p>
          <p className="text-[10px] text-gray-400">
            {totalMembers > 0 ? `${Math.round((activeMembers / totalMembers) * 100)}% active subscription rate` : "0% active"}
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2 border border-white/5">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-mono uppercase tracking-widest">Unread CRM Leads</span>
            <PhoneCall className="w-4 h-4 text-gym-gold" />
          </div>
          <p className="text-3xl font-display font-black text-white">{newLeads}</p>
          <p className="text-[10px] text-gym-gold font-mono">Requires instant correspondence</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2 border border-white/5">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-mono uppercase tracking-widest">Pending Sessions</span>
            <CalendarDays className="w-4 h-4 text-gym-gold" />
          </div>
          <p className="text-3xl font-display font-black text-white">{pendingBookings}</p>
          <p className="text-[10px] text-gray-400">Trial, consultation & tour requests</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2 border border-white/5">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-mono uppercase tracking-widest">Total Gained Revenue</span>
            <DollarSign className="w-4 h-4 text-gym-gold" />
          </div>
          <p className="text-3xl font-display font-black text-white">${totalRevenue}</p>
          <p className="text-[10px] text-emerald-400 font-mono">Fully settled via Stripe/Razorpay</p>
        </div>

      </div>

      {/* Grid: Charts & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Analytics Vector Chart (Lighthouse optimal) */}
        <div className="lg:col-span-2 p-6 rounded-2xl glass-panel border border-white/5 space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gym-gold uppercase tracking-widest font-bold">PERFORMANCE INSIGHTS</span>
              <h3 className="text-base font-display font-bold text-white uppercase tracking-wide">Membership Revenue & Growth Metrics</h3>
            </div>
            <div className="flex items-center space-x-1 text-xs font-mono text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <span>+18.5% YoY</span>
            </div>
          </div>

          {/* SVG Column Chart representation */}
          <div className="h-64 relative flex items-end justify-between pt-6 border-b border-white/10 px-4">
            
            {/* Grid helper lines */}
            <div className="absolute inset-x-0 bottom-1/4 border-b border-white/5 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-2/4 border-b border-white/5 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-3/4 border-b border-white/5 pointer-events-none" />

            {/* Months bars */}
            {[
              { m: "Jan", v: 40, amt: "$12,400" },
              { m: "Feb", v: 55, amt: "$15,200" },
              { m: "Mar", v: 48, amt: "$14,100" },
              { m: "Apr", v: 65, amt: "$18,500" },
              { m: "May", v: 85, amt: "$24,200" },
              { m: "Jun", v: 95, amt: `$${totalRevenue}` }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group relative z-10">
                {/* Tooltip */}
                <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all px-2 py-1 bg-gym-gold text-gym-dark font-mono text-[9px] font-bold rounded shadow-lg whitespace-nowrap z-30">
                  {item.amt}
                </div>
                
                {/* Bar */}
                <div
                  className="w-8 sm:w-12 bg-gradient-to-t from-gym-gold/40 to-gym-gold rounded-t-lg transition-all group-hover:bg-gym-gold/80"
                  style={{ height: `${item.v * 1.8}px` }}
                />

                {/* label */}
                <span className="text-[10px] font-mono text-gray-500 mt-2">{item.m}</span>
              </div>
            ))}

          </div>

          <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
            <span>Operational Scale: H1 2026 logs</span>
            <span>Real-time local state synced</span>
          </div>
        </div>

        {/* Sidebar: Alerts & Notifications */}
        <div className="p-6 rounded-2xl bg-gym-dark-card border border-white/5 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Bell className="w-4 h-4 text-gym-gold animate-bounce" />
                <span>Action center</span>
              </h3>
              <span className="px-2 py-0.5 bg-gym-gold/15 text-gym-gold font-mono text-[9px] rounded font-semibold uppercase">
                {expiringAlerts.length} Alerts
              </span>
            </div>

            {/* Expiring Lists */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {expiringAlerts.length > 0 ? (
                expiringAlerts.map((member) => (
                  <div key={member.id} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5 text-xs text-left">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">{member.name}</span>
                      <span className="text-[9px] font-mono text-red-400 uppercase font-bold">Expires in under 60 days</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                      <span>{member.memberId}</span>
                      <span>Expires: {member.expiryDate}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <p className="text-xs text-white">All subscriptions safe</p>
                  <p className="text-[10px] text-gray-400">No members expiring in the next 60 days.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats list */}
          <div className="pt-4 border-t border-white/5 space-y-3 text-xs">
            <div className="flex justify-between items-center text-gray-400">
              <span>Unread Enquiries Inbox</span>
              <span className="font-bold font-mono text-white">{enquiries.filter(e => e.status === "Unread").length}</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>Lead Conversion Rate</span>
              <span className="font-bold font-mono text-gym-gold">
                {leads.length > 0 ? `${Math.round((leads.filter(l => l.status === "Converted").length / leads.length) * 100)}%` : "0%"}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
