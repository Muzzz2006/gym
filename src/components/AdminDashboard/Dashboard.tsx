import { useState } from "react";
import { LayoutDashboard, Users, PhoneCall, CalendarDays, Settings, LogOut, Sparkles, ShieldCheck } from "lucide-react";
import Overview from "./Overview";
import MemberManagement from "./MemberManagement";
import LeadManagement from "./LeadManagement";
import BookingManagement from "./BookingManagement";
import CmsManager from "./CmsManager";

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "members" | "leads" | "bookings" | "cms">("overview");

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "members", label: "Members", icon: Users },
    { id: "leads", label: "CRM Leads", icon: PhoneCall },
    { id: "bookings", label: "Bookings", icon: CalendarDays },
    { id: "cms", label: "CMS Hub", icon: Settings }
  ] as const;

  return (
    <div className="min-h-screen bg-gym-dark relative text-white flex flex-col lg:flex-row pt-16">
      
      {/* Background radial spotlights */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gym-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="w-full lg:w-64 bg-gym-dark-card border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between p-6 relative z-10 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]">
        <div className="space-y-8 text-left">
          {/* Brand identifier */}
          <div className="space-y-1.5 pb-4 border-b border-white/5">
            <span className="text-sm font-display font-black tracking-widest text-white flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-gym-gold animate-pulse" />
              <span>STAFF TERMINAL</span>
            </span>
            <p className="text-[9px] font-mono text-gray-500 uppercase">Enforcing secure premium admin protocols</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1.5 scrollbar-none">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap flex items-center space-x-2.5 w-full text-left cursor-pointer ${
                    isActive
                      ? "bg-gym-gold text-gym-dark font-bold shadow-md shadow-gym-gold/10"
                      : "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Log Out Control */}
        <div className="pt-6 border-t border-white/5 mt-6 lg:mt-0">
          <button
            onClick={onLogout}
            className="w-full px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider text-red-400 hover:text-white hover:bg-red-950/35 border border-transparent hover:border-red-500/25 transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace viewport */}
      <main className="flex-1 p-6 md:p-8 lg:p-12 relative z-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {activeTab === "overview" && <Overview />}
        {activeTab === "members" && <MemberManagement />}
        {activeTab === "leads" && <LeadManagement />}
        {activeTab === "bookings" && <BookingManagement />}
        {activeTab === "cms" && <CmsManager />}
      </main>

    </div>
  );
}
