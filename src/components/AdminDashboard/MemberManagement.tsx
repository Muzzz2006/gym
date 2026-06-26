import React, { useState } from "react";
import { Search, UserPlus, FileDown, Edit2, Trash2, ShieldAlert, Check, X, RefreshCw, Snowflake } from "lucide-react";
import { gymDB } from "../../utils/db";
import { Member, MemberStatus } from "../../types/gym";

export default function MemberManagement() {
  const [members, setMembers] = useState<Member[]>(gymDB.getMembers());
  const plans = gymDB.getPlans();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Form modals state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // Add Member state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [planId, setPlanId] = useState(plans[0]?.id || "");
  const [status, setStatus] = useState<MemberStatus>("Active");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState("https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop");

  const syncData = () => {
    setMembers(gymDB.getMembers());
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    const joinDateStr = new Date().toISOString().split("T")[0];
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1); // default 1 year
    const expiryDateStr = expiry.toISOString().split("T")[0];

    const targetPlan = plans.find(p => p.id === planId) || plans[0];
    const mockPayment = {
      id: `pay_${Date.now()}`,
      amount: targetPlan.price,
      date: joinDateStr,
      method: "Cash" as const,
      planName: targetPlan.name,
      invoiceId: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    gymDB.addMember({
      name,
      email,
      phone,
      photo,
      planId,
      status,
      joinDate: joinDateStr,
      expiryDate: expiryDateStr,
      notes,
      payments: [mockPayment]
    });

    // Reset Form
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setShowAddForm(false);
    syncData();
  };

  const handleEditMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    gymDB.updateMember(editingMember.id, {
      name: editingMember.name,
      email: editingMember.email,
      phone: editingMember.phone,
      planId: editingMember.planId,
      status: editingMember.status,
      notes: editingMember.notes
    });

    setEditingMember(null);
    syncData();
  };

  const handleDeleteMember = (id: string) => {
    if (confirm("Are you absolutely sure you want to revoke and delete this member pass? This action is irreversible.")) {
      gymDB.deleteMember(id);
      syncData();
    }
  };

  const toggleFreeze = (member: Member) => {
    const newStatus: MemberStatus = member.status === "Frozen" ? "Active" : "Frozen";
    gymDB.updateMember(member.id, { status: newStatus });
    syncData();
  };

  const handleRenew = (member: Member) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const exp = new Date();
    exp.setFullYear(exp.getFullYear() + 1);
    const newExpiryStr = exp.toISOString().split("T")[0];

    const targetPlan = plans.find(p => p.id === member.planId) || plans[0];
    const renewPayment = {
      id: `pay_${Date.now()}`,
      amount: targetPlan.price,
      date: todayStr,
      method: "Cash" as const,
      planName: targetPlan.name,
      invoiceId: `INV-RENEW-${Math.floor(1000 + Math.random() * 9000)}`
    };

    gymDB.updateMember(member.id, {
      status: "Active",
      joinDate: todayStr,
      expiryDate: newExpiryStr,
      payments: [...member.payments, renewPayment]
    });

    syncData();
    alert(`Pass Renewed Successfully!\nGenerated Renewal Invoice: ${renewPayment.invoiceId}`);
  };

  // CSV Exporter client-side execution
  const exportCSV = () => {
    const headers = ["MemberID", "Name", "Email", "Phone", "Plan", "Status", "JoinDate", "ExpiryDate"];
    const rows = filteredMembers.map(m => [
      m.memberId,
      m.name,
      m.email,
      m.phone,
      plans.find(p => p.id === m.planId)?.name || "Default Plan",
      m.status,
      m.joinDate,
      m.expiryDate
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "AURA_MEMBERS_DIRECTORY.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.memberId.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search);
    
    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left animate-fade-in">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[9px] font-mono text-gym-gold uppercase tracking-widest font-bold">DIRECTORY ARCHIVE</span>
          <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Member Subscriptions Desk</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-gym-gold hover:bg-gym-gold/90 text-gym-dark text-xs font-bold rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-md shadow-gym-gold/5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Member</span>
          </button>
        </div>
      </div>

      {/* Filters & Search toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-3">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, name, email or phone number..."
            className="w-full pl-10 pr-4 py-2.5 bg-gym-dark-card border border-white/5 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gym-gold"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 bg-gym-dark-card border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gym-gold [&>option]:bg-gym-dark"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active Only</option>
          <option value="Frozen">Frozen Only</option>
          <option value="Expired">Expired Only</option>
        </select>
      </div>

      {/* Directory Table */}
      <div className="overflow-x-auto rounded-2xl glass-panel border border-white/5">
        <table className="w-full text-xs text-left text-gray-300">
          <thead className="text-[9px] font-mono uppercase tracking-widest bg-white/5 border-b border-white/5 text-gray-400">
            <tr>
              <th className="px-6 py-4">Profile</th>
              <th className="px-6 py-4">ID / Plan</th>
              <th className="px-6 py-4">Contact Coordinates</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Dates</th>
              <th className="px-6 py-4 text-right">Actions Panel</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => {
                const planName = plans.find(p => p.id === member.planId)?.name || "Unknown Plan";
                return (
                  <tr key={member.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-10 h-10 rounded-lg object-cover border border-white/10"
                      />
                      <span className="font-semibold text-white tracking-wide">{member.name}</span>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <span className="font-mono text-gray-500 font-bold block">{member.memberId}</span>
                      <span className="text-[10px] text-gym-gold font-mono uppercase">{planName}</span>
                    </td>
                    <td className="px-6 py-4 space-y-0.5 font-mono">
                      <p>{member.email}</p>
                      <p className="text-gray-500">{member.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase ${
                        member.status === "Active"
                          ? "bg-emerald-950/40 border border-emerald-500/20 text-emerald-400"
                          : member.status === "Frozen"
                          ? "bg-blue-950/40 border border-blue-500/20 text-blue-400"
                          : "bg-red-950/40 border border-red-500/20 text-red-400"
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-mono space-y-0.5 text-gray-400">
                      <p>Join: {member.joinDate}</p>
                      <p>Expiry: {member.expiryDate}</p>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => toggleFreeze(member)}
                        className={`p-1.5 rounded bg-white/5 border border-white/10 transition-all ${
                          member.status === "Frozen"
                            ? "text-blue-400 hover:text-white"
                            : "text-gray-400 hover:text-blue-400"
                        }`}
                        title={member.status === "Frozen" ? "Unfreeze member pass" : "Freeze member pass"}
                      >
                        <Snowflake className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleRenew(member)}
                        className="p-1.5 rounded bg-white/5 border border-white/10 text-emerald-400 hover:text-white transition-all"
                        title="Renew member subscription"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingMember(member)}
                        className="p-1.5 rounded bg-white/5 border border-white/10 text-gym-gold hover:text-white transition-all"
                        title="Edit details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="p-1.5 rounded bg-white/5 border border-white/10 text-red-400 hover:text-white transition-all"
                        title="Delete member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  <ShieldAlert className="w-8 h-8 text-gray-600 mx-auto animate-pulse mb-2" />
                  <p className="text-sm">No Members Found</p>
                  <p className="text-[10px]">Alter your search terms or register a new member.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Member Modal overlay */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <form onSubmit={handleAddMember} className="w-full max-w-md rounded-2xl glass-panel-heavy border border-white/10 p-6 space-y-4 animate-fade-in text-left">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">Register New Member</h4>
              <button type="button" onClick={() => setShowAddForm(false)} className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Member Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Arthur Pendragon"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arthur@cam-invest.com"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 4890"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Membership Plan</label>
                  <select
                    value={planId}
                    onChange={(e) => setPlanId(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold [&>option]:bg-gym-dark"
                  >
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Pass Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as MemberStatus)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold [&>option]:bg-gym-dark"
                  >
                    <option value="Active">Active</option>
                    <option value="Frozen">Frozen</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Biographical / Health notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter medical limits or goal notes."
                  rows={2}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gym-gold text-gym-dark font-bold text-xs rounded-xl uppercase tracking-wider transition-all"
            >
              Commit Registration
            </button>
          </form>
        </div>
      )}

      {/* Edit Member Modal overlay */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <form onSubmit={handleEditMember} className="w-full max-w-md rounded-2xl glass-panel-heavy border border-white/10 p-6 space-y-4 animate-fade-in text-left">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">Modify Member Pass</h4>
              <button type="button" onClick={() => setEditingMember(null)} className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={editingMember.email}
                  onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={editingMember.phone}
                  onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Plan Allocation</label>
                  <select
                    value={editingMember.planId}
                    onChange={(e) => setEditingMember({ ...editingMember, planId: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold [&>option]:bg-gym-dark"
                  >
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Sub Status</label>
                  <select
                    value={editingMember.status}
                    onChange={(e) => setEditingMember({ ...editingMember, status: e.target.value as MemberStatus })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold [&>option]:bg-gym-dark"
                  >
                    <option value="Active">Active</option>
                    <option value="Frozen">Frozen</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Log notes</label>
                <textarea
                  value={editingMember.notes}
                  onChange={(e) => setEditingMember({ ...editingMember, notes: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gym-gold text-gym-dark font-bold text-xs rounded-xl uppercase tracking-wider transition-all"
            >
              Update Pass details
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
