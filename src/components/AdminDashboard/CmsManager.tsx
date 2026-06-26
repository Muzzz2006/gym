import React, { useState } from "react";
import { User, Award, DollarSign, HelpCircle, Star, BookOpen, Mail, ShieldAlert, Check, CheckCircle2, Trash2, Plus, Edit3, X } from "lucide-react";
import { gymDB } from "../../utils/db";
import { Trainer, MembershipPlan, FAQ, Testimonial, BlogPost, Enquiry } from "../../types/gym";

export default function CmsManager() {
  const [activeSubTab, setActiveSubTab] = useState<"trainers" | "pricing" | "faq_testimonials" | "blogs" | "enquiries">("trainers");

  // Dynamic States directly from LocalStorage DB
  const [trainers, setTrainers] = useState<Trainer[]>(gymDB.getTrainers());
  const [plans, setPlans] = useState<MembershipPlan[]>(gymDB.getPlans());
  const [faqs, setFaqs] = useState<FAQ[]>(gymDB.getFAQs());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(gymDB.getTestimonials());
  const [blogs, setBlogs] = useState<BlogPost[]>(gymDB.getBlogs());
  const [enquiries, setEnquiries] = useState<Enquiry[]>(gymDB.getEnquiries());

  // Form toggles & states
  const [showForm, setShowForm] = useState(false);

  // Trainer addition states
  const [trainerName, setTrainerName] = useState("");
  const [trainerRole, setTrainerRole] = useState("");
  const [trainerSpec, setTrainerSpec] = useState("");
  const [trainerCert, setTrainerCert] = useState("");
  const [trainerPhoto, setTrainerPhoto] = useState("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop");

  // FAQ addition states
  const [faqQ, setFaqQ] = useState("");
  const [faqA, setFaqA] = useState("");
  const [faqCat, setFaqCat] = useState("General");

  // Blog addition states
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCat, setBlogCat] = useState("Science");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogTags, setBlogTags] = useState("");
  const [blogImg, setBlogImg] = useState("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop");

  const syncAll = () => {
    setTrainers(gymDB.getTrainers());
    setPlans(gymDB.getPlans());
    setFaqs(gymDB.getFAQs());
    setTestimonials(gymDB.getTestimonials());
    setBlogs(gymDB.getBlogs());
    setEnquiries(gymDB.getEnquiries());
  };

  // Enquiries controls
  const handleMarkEnquiryRead = (id: string) => {
    gymDB.updateEnquiry(id, { status: "Read" });
    syncAll();
  };

  const handleDeleteEnquiry = (id: string) => {
    if (confirm("Delete this correspondence record permanently?")) {
      gymDB.deleteEnquiry(id);
      syncAll();
    }
  };

  // Pricing pricing editors
  const handleUpdatePrice = (id: string) => {
    const p = plans.find(plan => plan.id === id);
    if (!p) return;
    const nextVal = prompt(`Update pricing for ${p.name}.\nCurrent Price: $${p.price}\n\nEnter new price amount (numbers only):`, p.price.toString());
    if (nextVal) {
      const num = parseFloat(nextVal);
      if (!isNaN(num)) {
        gymDB.updatePlan(id, { price: num });
        syncAll();
      }
    }
  };

  // Add Trainer
  const handleAddTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainerName || !trainerRole || !trainerSpec) return;

    gymDB.addTrainer({
      name: trainerName,
      role: trainerRole,
      specialization: trainerSpec,
      photo: trainerPhoto,
      experience: "5 Years",
      availability: ["09:00 AM", "11:00 AM", "01:00 PM", "04:00 PM", "06:00 PM"],
      certifications: trainerCert ? trainerCert.split(",").map(c => c.trim()) : ["Certified Master Coach"],
      socials: { instagram: trainerName.toLowerCase().replace(/\s/g, ""), twitter: trainerName.toLowerCase().replace(/\s/g, "") }
    });

    setTrainerName("");
    setTrainerRole("");
    setTrainerSpec("");
    setTrainerCert("");
    setShowForm(false);
    syncAll();
  };

  // Add FAQ
  const handleAddFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQ || !faqA) return;

    gymDB.addFAQ({
      question: faqQ,
      answer: faqA,
      category: faqCat
    });

    setFaqQ("");
    setFaqA("");
    setShowForm(false);
    syncAll();
  };

  // Add Blog Post
  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogExcerpt || !blogContent) return;

    const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    gymDB.addBlog({
      title: blogTitle,
      category: blogCat,
      excerpt: blogExcerpt,
      content: blogContent,
      readTime: "5 Min Read",
      image: blogImg,
      tags: blogTags ? blogTags.split(",").map(t => t.trim()) : ["Strength", "Diagnostics"],
      author: {
        name: "AURA Coaching Director",
        avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=100&auto=format&fit=crop",
        role: "Head of Human Performance Science"
      }
    });

    setBlogTitle("");
    setBlogExcerpt("");
    setBlogContent("");
    setBlogTags("");
    setShowForm(false);
    syncAll();
  };

  // Remove elements CMS
  const handleDeleteItem = (id: string, type: "trainer" | "faq" | "testimonial" | "blog") => {
    if (confirm(`Remove this ${type} catalog item permanently?`)) {
      if (type === "trainer") gymDB.deleteTrainer(id);
      else if (type === "faq") gymDB.deleteFAQ(id);
      else if (type === "testimonial") gymDB.deleteTestimonial(id);
      else if (type === "blog") gymDB.deleteBlog(id);
      syncAll();
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      
      {/* Sub tabs selectors */}
      <div className="flex border-b border-white/5 pb-2 overflow-x-auto gap-1 scrollbar-none">
        {[
          { id: "trainers", label: "Coaches", icon: User },
          { id: "pricing", label: "Pricing Tiers", icon: DollarSign },
          { id: "faq_testimonials", label: "FAQs & Reviews", icon: HelpCircle },
          { id: "blogs", label: "Blog CMS", icon: BookOpen },
          { id: "enquiries", label: "Contact Inbox", icon: Mail }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubTab(tab.id as any);
                setShowForm(false);
              }}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                activeSubTab === tab.id
                  ? "bg-gym-gold text-gym-dark font-bold"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Primary list based on sub-tab */}

      {/* TAB: TRAINERS */}
      {activeSubTab === "trainers" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold font-display uppercase tracking-wider text-white">Coaching Roster Catalog</h4>
              <p className="text-xs text-gray-500 font-light">Add, review, and delete personnel directories from the live public list.</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-3 py-1.5 bg-gym-gold hover:bg-gym-gold/90 text-gym-dark text-xs font-bold rounded-lg flex items-center space-x-1 cursor-pointer"
            >
              {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{showForm ? "Close Form" : "Hire Trainer"}</span>
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleAddTrainer} className="p-5 rounded-2xl glass-panel border border-white/10 space-y-4 max-w-md animate-fade-in text-xs">
              <span className="font-bold text-gym-gold uppercase font-mono tracking-widest text-[10px]">New Hire Protocol</span>
              <div>
                <label className="block text-gray-400 mb-1">Trainer Name</label>
                <input
                  type="text" required value={trainerName} onChange={(e) => setTrainerName(e.target.value)}
                  placeholder="Coach Carter" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">Role Title</label>
                  <input
                    type="text" required value={trainerRole} onChange={(e) => setTrainerRole(e.target.value)}
                    placeholder="Head of Mobility" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Specialization</label>
                  <input
                    type="text" required value={trainerSpec} onChange={(e) => setTrainerSpec(e.target.value)}
                    placeholder="Neuromuscular Alignment" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Certifications (Comma-separated)</label>
                <input
                  type="text" value={trainerCert} onChange={(e) => setTrainerCert(e.target.value)}
                  placeholder="BSc Biomechanics, CSCS-1" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold"
                />
              </div>
              <button type="submit" className="w-full py-2 bg-gym-gold text-gym-dark font-bold rounded-xl uppercase tracking-wider">Commit Hire</button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainers.map((coach) => (
              <div key={coach.id} className="p-4 rounded-xl glass-panel border border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs">
                  <img src={coach.photo} alt={coach.name} className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wide">{coach.name}</h5>
                    <p className="text-gray-400 font-mono text-[10px]">{coach.role}</p>
                    <p className="text-[10px] text-gym-gold mt-0.5">{coach.specialization}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteItem(coach.id, "trainer")}
                  className="p-1.5 rounded bg-white/5 border border-white/5 text-red-400 hover:text-white transition-all"
                  title="Remove coach"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: PRICING */}
      {activeSubTab === "pricing" && (
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold font-display uppercase tracking-wider text-white">Membership Plan Configurator</h4>
            <p className="text-xs text-gray-500 font-light">Dynamically edit membership price tags reflected on the pricing page.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {plans.map((plan) => (
              <div key={plan.id} className="p-5 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between">
                <div className="space-y-2">
                  <h5 className="font-bold text-white uppercase tracking-wide">{plan.name}</h5>
                  <div className="text-2xl font-black text-white">${plan.price} / {plan.billing}</div>
                </div>
                <button
                  onClick={() => handleUpdatePrice(plan.id)}
                  className="w-full mt-4 py-2 bg-white/5 hover:bg-gym-gold hover:text-gym-dark border border-white/10 rounded-xl font-bold uppercase tracking-wider transition-all"
                >
                  Edit Pricing
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: FAQS & TESTIMONIALS */}
      {activeSubTab === "faq_testimonials" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold font-display uppercase tracking-wider text-white">Accordions & Reviews CMS</h4>
              <p className="text-xs text-gray-500 font-light">Moderate client social proof and help center questions instantly.</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-3 py-1.5 bg-gym-gold hover:bg-gym-gold/90 text-gym-dark text-xs font-bold rounded-lg flex items-center space-x-1 cursor-pointer"
            >
              {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{showForm ? "Close Form" : "Create FAQ"}</span>
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleAddFAQ} className="p-5 rounded-2xl glass-panel border border-white/10 space-y-4 max-w-md animate-fade-in text-xs">
              <span className="font-bold text-gym-gold uppercase font-mono tracking-widest text-[10px]">Add Accordion Item</span>
              <div>
                <label className="block text-gray-400 mb-1">Question Prompt</label>
                <input
                  type="text" required value={faqQ} onChange={(e) => setFaqQ(e.target.value)}
                  placeholder="What is the guest pass rule?" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Answer Body</label>
                <textarea
                  required value={faqA} onChange={(e) => setFaqA(e.target.value)} rows={3}
                  placeholder="Answers here..." className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold resize-none"
                />
              </div>
              <button type="submit" className="w-full py-2 bg-gym-gold text-gym-dark font-bold rounded-xl uppercase tracking-wider">Commit FAQ</button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            {/* FAQs Column */}
            <div className="space-y-3">
              <span className="font-mono text-gray-500 uppercase tracking-widest text-[9px] block">Active FAQS Accordion</span>
              {faqs.map((faq) => (
                <div key={faq.id} className="p-4 rounded-xl glass-panel border border-white/5 space-y-1 relative group">
                  <button
                    onClick={() => handleDeleteItem(faq.id, "faq")}
                    className="absolute top-3 right-3 text-red-400 hover:text-white bg-white/5 p-1 rounded border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <h6 className="font-bold text-white uppercase tracking-wide pr-6">{faq.question}</h6>
                  <p className="text-gray-400 font-light text-[11px] leading-relaxed pt-1">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Testimonials Column */}
            <div className="space-y-3">
              <span className="font-mono text-gray-500 uppercase tracking-widest text-[9px] block">Testimonial Reviews</span>
              {testimonials.map((test) => (
                <div key={test.id} className="p-4 rounded-xl glass-panel border border-white/5 flex justify-between items-start">
                  <div className="space-y-2 text-left">
                    <div className="flex text-gym-gold">
                      {Array.from({ length: test.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-gym-gold" />)}
                    </div>
                    <p className="text-gray-300 italic font-light text-[11px]">"{test.comment}"</p>
                    <p className="text-[10px] font-bold text-white font-mono uppercase">{test.name} • {test.role}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(test.id, "testimonial")}
                    className="p-1 rounded text-red-400 hover:bg-white/5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* TAB: BLOG CMS */}
      {activeSubTab === "blogs" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold font-display uppercase tracking-wider text-white">Research Article Desk</h4>
              <p className="text-xs text-gray-500 font-light">Draft, publish, or trash science logs shown in the public learning hub.</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-3 py-1.5 bg-gym-gold hover:bg-gym-gold/90 text-gym-dark text-xs font-bold rounded-lg flex items-center space-x-1 cursor-pointer"
            >
              {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{showForm ? "Close Form" : "Compose Journal"}</span>
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleAddBlog} className="p-5 rounded-2xl glass-panel border border-white/10 space-y-4 max-w-xl animate-fade-in text-xs">
              <span className="font-bold text-gym-gold uppercase font-mono tracking-widest text-[10px]">Compose Research Document</span>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">Article Title</label>
                  <input
                    type="text" required value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="Skeletal Muscle Hypertrophy Formulas" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Category Field</label>
                  <select
                    value={blogCat} onChange={(e) => setBlogCat(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold [&>option]:bg-gym-dark"
                  >
                    <option value="Strength">Strength</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="Recovery">Recovery</option>
                    <option value="Science">Science</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Excerpt Summary</label>
                <input
                  type="text" required value={blogExcerpt} onChange={(e) => setBlogExcerpt(e.target.value)}
                  placeholder="A short description summarizing findings." className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Full Article Content (Markdown support simulated)</label>
                <textarea
                  required value={blogContent} onChange={(e) => setBlogContent(e.target.value)} rows={5}
                  placeholder="Type complete journal paragraphs..." className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Metadata tags (Comma-separated)</label>
                <input
                  type="text" value={blogTags} onChange={(e) => setBlogTags(e.target.value)}
                  placeholder="Strength, Protein, Hypertrophy" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gym-gold"
                />
              </div>

              <button type="submit" className="w-full py-2 bg-gym-gold text-gym-dark font-bold rounded-xl uppercase tracking-wider">Publish Document</button>
            </form>
          )}

          <div className="space-y-3 text-xs">
            {blogs.map((post) => (
              <div key={post.id} className="p-4 rounded-xl glass-panel border border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={post.image} alt={post.title} className="w-16 h-10 object-cover rounded border border-white/10" />
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wide">{post.title}</h5>
                    <p className="text-gray-400 font-mono text-[10px]">{post.category} • {post.date} • {post.readTime}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteItem(post.id, "blog")}
                  className="p-1.5 rounded bg-white/5 border border-white/5 text-red-400 hover:text-white transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: ENQUIRIES */}
      {activeSubTab === "enquiries" && (
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold font-display uppercase tracking-wider text-white">Client Correspondence Inbox</h4>
            <p className="text-xs text-gray-500 font-light">Read direct feedback, client requests, and question logs Sourced from website contact page forms.</p>
          </div>

          <div className="space-y-4">
            {enquiries.length > 0 ? (
              enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between gap-4 relative group ${
                    enq.status === "Unread"
                      ? "bg-gym-dark border-gym-gold/20 shadow-lg"
                      : "bg-white/5 border-white/5 hover:border-white/10"
                  }`}
                >
                  {/* Info */}
                  <div className="space-y-2 text-xs flex-1 text-left">
                    <div className="flex items-center space-x-2.5">
                      <h5 className="font-bold text-white uppercase tracking-wide">{enq.name}</h5>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                        enq.status === "Unread"
                          ? "bg-gym-gold/15 text-gym-gold"
                          : "bg-gray-800 text-gray-500 border border-white/5"
                      }`}>
                        {enq.status}
                      </span>
                    </div>

                    <div className="text-[10px] font-mono text-gray-400">
                      <span>{enq.email}</span> {enq.phone && <span>• {enq.phone}</span>} • Sourced on {new Date(enq.createdAt).toLocaleDateString()}
                    </div>

                    <p className="text-gray-300 leading-relaxed font-light">{enq.message}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 md:self-center">
                    {enq.status === "Unread" && (
                      <button
                        onClick={() => handleMarkEnquiryRead(enq.id)}
                        className="px-2.5 py-1.5 bg-gym-gold/15 hover:bg-gym-gold text-gym-gold hover:text-gym-dark text-[10px] font-bold rounded-lg uppercase tracking-wider transition-colors flex items-center space-x-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Read</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteEnquiry(enq.id)}
                      className="p-1.5 rounded bg-white/5 border border-white/5 text-red-400 hover:text-white transition-all"
                      title="Delete log"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))
            ) : (
              <div className="p-16 text-center rounded-2xl glass-panel space-y-3">
                <ShieldAlert className="w-10 h-10 text-gray-600 mx-auto animate-pulse" />
                <h4 className="text-base font-display font-semibold text-white">Correspondence Inbox Empty</h4>
                <p className="text-xs text-gray-400">No active client enquiries found in the live log database.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
