import { useState } from "react";
import { Search, Phone, Mail, FileEdit, Trash2, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";
import { gymDB } from "../../utils/db";
import { Lead, LeadStatus } from "../../types/gym";

export default function LeadManagement() {
  const [leads, setLeads] = useState<Lead[]>(gymDB.getLeads());
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<string>("All");

  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [leadNote, setLeadNote] = useState("");

  const syncData = () => {
    setLeads(gymDB.getLeads());
  };

  const handleUpdateStatus = (id: string, nextStatus: LeadStatus) => {
    gymDB.updateLead(id, { status: nextStatus });
    syncData();
  };

  const handleSaveNote = (id: string) => {
    if (!leadNote) return;
    const item = leads.find(l => l.id === id);
    if (item) {
      const mergedNotes = `${item.notes} | Note (${new Date().toLocaleDateString()}): ${leadNote}`;
      gymDB.updateLead(id, { notes: mergedNotes });
      setEditingLeadId(null);
      setLeadNote("");
      syncData();
    }
  };

  const handleDeleteLead = (id: string) => {
    if (confirm("Delete this marketing lead permanently?")) {
      gymDB.deleteLead(id);
      syncData();
    }
  };

  const statuses: LeadStatus[] = ["New", "Contacted", "Follow-up", "Converted", "Closed"];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.notes.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search);
    
    const matchesStatus = activeStatus === "All" || lead.status === activeStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[9px] font-mono text-gym-gold uppercase tracking-widest font-bold">CRM LEAD GENERATOR</span>
          <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Marketing Enquiries & Leads</h3>
        </div>
        
        <span className="px-3 py-1 bg-gym-gold/15 text-gym-gold text-xs font-mono rounded font-semibold uppercase">
          {leads.length} Total Registered Leads
        </span>
      </div>

      {/* Toolbar Search & Status tabs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, email, phone or logs..."
            className="w-full pl-10 pr-4 py-2.5 bg-gym-dark-card border border-white/5 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gym-gold"
          />
        </div>

        {/* Status quick tabs */}
        <div className="md:col-span-2 flex overflow-x-auto gap-1.5 pb-2 scrollbar-none">
          <button
            onClick={() => setActiveStatus("All")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
              activeStatus === "All" ? "bg-gym-gold text-gym-dark font-bold" : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            All ({leads.length})
          </button>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setActiveStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                activeStatus === st ? "bg-gym-gold text-gym-dark font-bold" : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {st} ({leads.filter(l => l.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Lead Cards List */}
      <div className="space-y-4">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="p-5 rounded-2xl glass-panel border border-white/5 flex flex-col md:flex-row justify-between gap-6 hover:border-gym-gold/20 transition-all"
            >
              
              {/* Left detail: Profile info & contacts */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="text-base font-display font-bold text-white tracking-wide">{lead.name}</h4>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                    lead.status === "New"
                      ? "bg-gym-gold/15 text-gym-gold"
                      : lead.status === "Contacted"
                      ? "bg-purple-950/40 border border-purple-500/20 text-purple-300"
                      : lead.status === "Follow-up"
                      ? "bg-yellow-950/40 border border-yellow-500/20 text-yellow-400"
                      : lead.status === "Converted"
                      ? "bg-emerald-950/40 border border-emerald-500/20 text-emerald-400"
                      : "bg-gray-900 border border-white/10 text-gray-500"
                  }`}>
                    {lead.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-[11px] font-mono text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    <span>{lead.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-gray-500" />
                    <span>{lead.phone}</span>
                  </div>
                  <div className="text-[10px] text-gray-500">
                    Sourced: <span className="text-white">{lead.source}</span> on {new Date(lead.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] text-gray-400 leading-relaxed font-light text-left">
                  <span className="font-bold text-gym-gold uppercase text-[9px] tracking-wider block font-mono mb-1">CRM INTERACTION LOG</span>
                  {lead.notes}
                </div>

                {/* Edit Note Field */}
                {editingLeadId === lead.id ? (
                  <div className="flex gap-2 pt-2 animate-fade-in max-w-md">
                    <input
                      type="text"
                      value={leadNote}
                      onChange={(e) => setLeadNote(e.target.value)}
                      placeholder="Add custom follow-up note..."
                      className="flex-1 px-3 py-1.5 bg-gym-dark border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-gym-gold"
                    />
                    <button
                      onClick={() => handleSaveNote(lead.id)}
                      className="px-3 py-1.5 bg-gym-gold text-gym-dark text-xs font-bold rounded-xl uppercase tracking-wider"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingLeadId(null);
                        setLeadNote("");
                      }}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingLeadId(lead.id);
                      setLeadNote("");
                    }}
                    className="inline-flex items-center space-x-1 text-[10px] font-mono text-gym-gold hover:underline focus:outline-none uppercase mt-1"
                  >
                    <FileEdit className="w-3 h-3" />
                    <span>Add CRM Log Entry</span>
                  </button>
                )}
              </div>

              {/* Right: Stage toggles & Trash */}
              <div className="md:w-44 flex flex-col justify-between items-end gap-4 border-l border-white/5 pl-4 md:pl-6">
                
                <div className="w-full space-y-1">
                  <label className="block text-[9px] font-mono font-semibold text-gray-500 uppercase tracking-widest text-right">Change CRM Stage</label>
                  <select
                    value={lead.status}
                    onChange={(e) => handleUpdateStatus(lead.id, e.target.value as LeadStatus)}
                    className="w-full px-2.5 py-1.5 bg-gym-dark border border-white/10 rounded-lg text-[11px] text-white focus:outline-none focus:border-gym-gold font-mono [&>option]:bg-gym-dark"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => handleDeleteLead(lead.id)}
                  className="p-1.5 rounded bg-white/5 border border-white/5 text-red-400 hover:bg-red-950/40 hover:text-white transition-all self-end"
                  title="Remove lead completely"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

              </div>

            </div>
          ))
        ) : (
          <div className="p-16 text-center rounded-2xl glass-panel space-y-3">
            <ShieldAlert className="w-10 h-10 text-gray-600 mx-auto animate-pulse" />
            <h4 className="text-base font-display font-semibold text-white">No CRM Leads Found</h4>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              There are no sales logs matching active filters. Reset filters or publish a marketing landing campaign.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
