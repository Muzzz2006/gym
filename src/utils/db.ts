import {
  Trainer,
  Program,
  MembershipPlan,
  ClassSession,
  Lead,
  Booking,
  Member,
  Testimonial,
  FAQ,
  BlogPost,
  Enquiry,
  Payment
} from "../types/gym";

// Helper keys for LocalStorage
const KEYS = {
  TRAINERS: "gym_db_trainers",
  PROGRAMS: "gym_db_programs",
  PLANS: "gym_db_plans",
  CLASSES: "gym_db_classes",
  LEADS: "gym_db_leads",
  BOOKINGS: "gym_db_bookings",
  MEMBERS: "gym_db_members",
  TESTIMONIALS: "gym_db_testimonials",
  FAQS: "gym_db_faqs",
  BLOGS: "gym_db_blogs",
  ENQUIRIES: "gym_db_enquiries",
};

// Seed Data
const DEFAULT_TRAINERS: Trainer[] = [
  {
    id: "t1",
    name: "Marcus Vance",
    role: "Elite Master Coach",
    photo: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop",
    experience: "12 Years",
    certifications: ["NASM-PES", "CrossFit Level 3", "Precision Nutrition L1"],
    specialization: "Olympic Weightlifting & Athletic Conditioning",
    socials: { instagram: "@marcusvance_fit", twitter: "@marcus_vance", linkedin: "marcus-vance-performance" },
    availability: ["07:00 AM", "09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"]
  },
  {
    id: "t2",
    name: "Elena Rostova",
    role: "Director of Yoga & Movement",
    photo: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop",
    experience: "8 Years",
    certifications: ["RYT-500 Advanced Yoga", "FMS Level 2 Specialist", "Pilates Method Alliance"],
    specialization: "Vinyasa Flow, Mobility & Core Rehabilitation",
    socials: { instagram: "@elenarostova_flow", linkedin: "elena-rostova-movement" },
    availability: ["08:00 AM", "10:00 AM", "12:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"]
  },
  {
    id: "t3",
    name: "Darnell Carter",
    role: "Head Strength Coach",
    photo: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    experience: "10 Years",
    certifications: ["CSCS *D", "USAW Sports Performance", "ISSA Master Trainer"],
    specialization: "Hypertrophy, Powerlifting & Post-Injury Rehab",
    socials: { instagram: "@darnell_iron", twitter: "@darnellcarter_cscs" },
    availability: ["06:00 AM", "08:00 AM", "10:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"]
  },
  {
    id: "t4",
    name: "Serena Thorne",
    role: "HIIT & Nutrition Specialist",
    photo: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600&auto=format&fit=crop",
    experience: "7 Years",
    certifications: ["ACE Personal Trainer", "Precision Nutrition L2", "Les Mills certified"],
    specialization: "High Intensity Cardio, Weight Loss & Prep Coaching",
    socials: { instagram: "@serenathorne_health" },
    availability: ["09:00 AM", "11:00 AM", "01:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"]
  }
];

const DEFAULT_PROGRAMS: Program[] = [
  {
    id: "p1",
    name: "Apex Conditioning",
    description: "High-intensity metabolic conditioning combining Olympic lifts, sprints, and dynamic gymnastics. Designed to push your physical limits.",
    duration: "60 Mins",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    category: "HIIT & CrossFit"
  },
  {
    id: "p2",
    name: "Primal Strength",
    description: "Focus on fundamental heavy compound movements—squat, bench, deadlift, overhead press. Ideal for building solid muscle mass and raw power.",
    duration: "75 Mins",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
    category: "Strength Training"
  },
  {
    id: "p3",
    name: "Metcon Catalyst",
    description: "Fast-paced interval workouts combining rowing, assault biking, and bodyweight exercises. Engineered to spike your metabolism and burn fat.",
    duration: "45 Mins",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
    category: "Cardio & Weight Loss"
  },
  {
    id: "p4",
    name: "Zen Flow Mobility",
    description: "A hybrid of athletic vinyasa yoga, core stabilization, and structural stretching to improve range of motion, ease joint pain, and reduce stress.",
    duration: "60 Mins",
    difficulty: "All Levels",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    category: "Yoga & Pilates"
  },
  {
    id: "p5",
    name: "CrossFit Syndicate",
    description: "Workouts of the Day (WOD) combining gymnastics, Olympic weightlifting, and metabolic conditioning in a competitive, supportive group environment.",
    duration: "60 Mins",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    category: "CrossFit"
  },
  {
    id: "p6",
    name: "Pilates Sculpt",
    description: "Low-impact, high-intensity mat movements targeting stabilizer muscles, glutes, and deep core strength. Emphasizes alignment and control.",
    duration: "50 Mins",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    category: "Yoga & Pilates"
  }
];

const DEFAULT_PLANS: MembershipPlan[] = [
  {
    id: "plan1",
    name: "Elite Access",
    price: 89,
    billing: "monthly",
    popular: false,
    features: [
      "Access to all Premium Gym zones",
      "Full locker room, steam & recovery access",
      "2 Towels provided per visit",
      "Complimentary secure parking",
      "Access to 3 group classes per month",
      "Wi-Fi & luxury workspace lounge access"
    ]
  },
  {
    id: "plan2",
    name: "Power Annual",
    price: 69,
    billing: "annual",
    popular: true,
    features: [
      "Everything in Elite Access plan",
      "Unlimited group classes & workshops",
      "1x Custom Personal Training Consultation",
      "1x Body Composition scan (InBody) per month",
      "10% Discount on apparel & shake bar",
      "Free 2-week membership freeze per year"
    ],
    discount: "Save 22% with annual billing"
  },
  {
    id: "plan3",
    name: "VIP Syndicate",
    price: 199,
    billing: "monthly",
    popular: false,
    features: [
      "Unlimited gym & multi-location access",
      "4x 1-on-1 Private Sessions with Master Coach / month",
      "Custom weekly meal planning & nutrition coaching",
      "Unlimited InBody scanning & performance logs",
      "Unlimited guest passes (1 guest per visit)",
      "Daily laundry service for training apparel",
      "Complimentary pre-workout shake at the Juice Bar"
    ]
  },
  {
    id: "plan4",
    name: "Sovereign Executive",
    price: 1499,
    billing: "annual",
    popular: false,
    features: [
      "Complete VIP Syndicate benefits",
      "Unlimited 1-on-1 private training sessions",
      "Priority class & booking reservations",
      "Private keyless premium locker storage",
      "Dedicated performance physiotherapist audits",
      "AURA Gym customized luxury apparel kit",
      "Private executive recovery suite priority access"
    ],
    discount: "Ultimate Luxury Protocol"
  }
];

const DEFAULT_CLASSES: ClassSession[] = [
  { id: "c1", className: "Apex Conditioning", trainerId: "t1", day: "Monday", time: "08:00 AM - 09:00 AM", room: "Studio Alpha", duration: "60 Mins", maxCap: 20, currentCap: 15 },
  { id: "c2", className: "Primal Strength", trainerId: "t3", day: "Monday", time: "10:00 AM - 11:15 AM", room: "Iron Arena", duration: "75 Mins", maxCap: 15, currentCap: 12 },
  { id: "c3", className: "Zen Flow Mobility", trainerId: "t2", day: "Monday", time: "05:00 PM - 06:00 PM", room: "Serenity Room", duration: "60 Mins", maxCap: 25, currentCap: 18 },
  { id: "c4", className: "Metcon Catalyst", trainerId: "t4", day: "Tuesday", time: "09:00 AM - 09:45 AM", room: "Studio Alpha", duration: "45 Mins", maxCap: 20, currentCap: 10 },
  { id: "c5", className: "CrossFit Syndicate", trainerId: "t1", day: "Tuesday", time: "06:00 PM - 07:00 PM", room: "Iron Arena", duration: "60 Mins", maxCap: 18, currentCap: 18 }, // Full class
  { id: "c6", className: "Pilates Sculpt", trainerId: "t2", day: "Wednesday", time: "08:00 AM - 08:50 AM", room: "Serenity Room", duration: "50 Mins", maxCap: 15, currentCap: 9 },
  { id: "c7", className: "Primal Strength", trainerId: "t3", day: "Wednesday", time: "04:00 PM - 05:15 PM", room: "Iron Arena", duration: "75 Mins", maxCap: 15, currentCap: 14 },
  { id: "c8", className: "Apex Conditioning", trainerId: "t1", day: "Thursday", time: "09:00 AM - 10:00 AM", room: "Studio Alpha", duration: "60 Mins", maxCap: 20, currentCap: 11 },
  { id: "c9", className: "Metcon Catalyst", trainerId: "t4", day: "Thursday", time: "05:00 PM - 05:45 PM", room: "Studio Alpha", duration: "45 Mins", maxCap: 20, currentCap: 16 },
  { id: "c10", className: "Zen Flow Mobility", trainerId: "t2", day: "Friday", time: "09:00 AM - 10:00 AM", room: "Serenity Room", duration: "60 Mins", maxCap: 25, currentCap: 21 },
  { id: "c11", className: "CrossFit Syndicate", trainerId: "t1", day: "Friday", time: "04:00 PM - 05:00 PM", room: "Iron Arena", duration: "60 Mins", maxCap: 18, currentCap: 15 },
  { id: "c12", className: "Apex Conditioning", trainerId: "t4", day: "Saturday", time: "09:00 AM - 10:00 AM", room: "Studio Alpha", duration: "60 Mins", maxCap: 25, currentCap: 24 },
  { id: "c13", className: "Zen Flow Mobility", trainerId: "t2", day: "Sunday", time: "10:00 AM - 11:00 AM", room: "Serenity Room", duration: "60 Mins", maxCap: 30, currentCap: 14 }
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "ts1",
    name: "Christian Bale",
    role: "Physique Enthusiast / Actor",
    rating: 5,
    comment: "The coaching caliber here is unmatched. Marcus reconstructed my strength routines completely. I am in the best operational shape of my career.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "ts2",
    name: "Vanessa Hughes",
    role: "Tech Executive & Marathon Runner",
    rating: 5,
    comment: "This gym is structured like a private tech headquarters. Seamless keyless entries, incredibly clean recovery suites, and trainers who respect your timing.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "ts3",
    name: "Derek Sterling",
    role: "Powerlifter / Entrepreneur",
    rating: 5,
    comment: "Iron Arena's equipment is the best in the country. Calibrated competition plates, premium Eleiko bars, and a culture of genuine physical excellence.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  }
];

const DEFAULT_FAQS: FAQ[] = [
  {
    id: "faq1",
    question: "Do you offer physical corporate rate structures?",
    answer: "Yes. We offer specialized premium pricing for companies registerting 5 or more members. Contact our membership relations office to get customized corporate terms.",
    category: "Memberships"
  },
  {
    id: "faq2",
    question: "Can I freeze my subscription if I travel?",
    answer: "Absolutely. Annual members can freeze their membership twice a year for up to 30 days total via the Admin Dashboard. Elite Monthly plans can freeze for up to 14 days for a small nominal fee.",
    category: "Memberships"
  },
  {
    id: "faq3",
    question: "Is there a dedicated recovery area, and what does it include?",
    answer: "Yes, our Sovereign Recovery Suite contains a custom wood-fired Finnish dry sauna, a deep industrial cold plunge running at 4°C, and professional compression therapy boots (Therabody). Access is complimentary for VIP and Annual members.",
    category: "Facilities"
  },
  {
    id: "faq4",
    question: "How do I secure personal coaching sessions?",
    answer: "You can book an introductory 1-on-1 consultation directly on this website. Our team will audit your physical baseline, body composition, and goals, then pair you with the best specialized trainer.",
    category: "Coaching"
  }
];

const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: "b1",
    title: "The Hierarchy of Hypertrophy: Science of Muscle Growth",
    excerpt: "Understand the biological stimulus behind mechanical tension, metabolic stress, and muscle damage to optimize your strength routines.",
    content: `Building high-quality muscle is not about lifting randomly. It requires an exact adherence to the laws of physical progression. 

In this scientific breakdown, we explore the three pillars of muscle growth:
1. **Mechanical Tension**: The primary driver. Placing muscles under heavy resistive loads through full ranges of motion.
2. **Muscle Damage**: Micro-tears in muscle fibers that trigger positive satellite cell synthesis and structural rebuilding.
3. **Metabolic Stress**: The cumulative fatigue and 'pump' that stimulates growth hormone release and local cell swelling.

Learn how to structure your training blocks to hit each stimulus, maintain proper recovery intervals, and feed your gains with premium nutritional protocols.`,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    category: "Strength",
    tags: ["Muscle Growth", "Science", "Training"],
    date: "June 24, 2026",
    readTime: "6 min read",
    author: {
      name: "Marcus Vance",
      role: "Elite Master Coach",
      avatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=100&auto=format&fit=crop"
    }
  },
  {
    id: "b2",
    title: "Optimizing the Anabolic Window: Science-Backed Nutrition",
    excerpt: "Demystifying nutrient timing. Learn how to sequence protein, fast-acting carbohydrates, and essential electrolytes post-workout.",
    content: `Is the 30-minute post-workout 'anabolic window' real or a myth? In sports science, precision beats superstition.

The research shows that while muscle protein synthesis is highly active for up to 24 hours post-workout, immediate carbohydrate and amino acid ingestion is critical to quickly suppress cortisol (muscle breakdown hormone) and kickstart muscular glycogen replenishment.

**Post-Workout Protocol:**
* **Protein**: 0.4g per kg of bodyweight of high-quality whey or plant isolate.
* **Carbohydrates**: 0.8g per kg of fast-acting glucose or cyclic dextrin.
* **Electrolytes**: 500mg Sodium, 200mg Potassium, 100mg Magnesium for cellular hydration.

Read the full guide to build a luxury meal schedule that aligns with your active gym days.`,
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop",
    category: "Nutrition",
    tags: ["Diet", "Recovery", "Supplements"],
    date: "June 20, 2026",
    readTime: "5 min read",
    author: {
      name: "Serena Thorne",
      role: "Nutrition Specialist",
      avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=100&auto=format&fit=crop"
    }
  }
];

const DEFAULT_LEADS: Lead[] = [
  { id: "ld1", name: "Alexander Wright", email: "alex.wright@techcorp.com", phone: "+1 555-0198", status: "New", source: "Contact Form", notes: "Interested in Executive Annual plan and private locker availability.", createdAt: "2026-06-25T14:32:00Z" },
  { id: "ld2", name: "Sophia Martinez", email: "sophia.m@creative.studio", phone: "+1 555-0144", status: "Contacted", source: "Trial Booking", notes: "Left voicemail. Expressed interest in Pilates and weekend yoga sessions.", createdAt: "2026-06-24T09:15:00Z" },
  { id: "ld3", name: "David Chen", email: "davidchen_invest@gmail.com", phone: "+1 555-0123", status: "Follow-up", source: "Newsletter", notes: "Met on tour. Needs follow-up call on June 28 regarding corporate pricing structure.", createdAt: "2026-06-22T17:45:00Z" },
  { id: "ld4", name: "Emma Watson", email: "emma.watson@gmail.com", phone: "+1 555-0167", status: "Converted", source: "Trial Booking", notes: "Registered for the Power Annual plan on June 25.", createdAt: "2026-06-20T11:00:00Z" }
];

const DEFAULT_BOOKINGS: Booking[] = [
  { id: "bk1", name: "Alexander Wright", email: "alex.wright@techcorp.com", phone: "+1 555-0198", type: "Consultation", date: "2026-06-27", time: "11:00 AM", status: "Pending", notes: "Would like to discuss metabolic analysis.", createdAt: "2026-06-25T14:35:00Z" },
  { id: "bk2", name: "James Anderson", email: "j.anderson@yahoo.com", phone: "+1 555-0175", type: "Trial", date: "2026-06-26", time: "09:00 AM", status: "Accepted", notes: "First gym visit. Wants to test the strength area.", createdAt: "2026-06-24T15:20:00Z" },
  { id: "bk3", name: "Sarah Connor", email: "s.connor@resistance.net", phone: "+1 555-0900", type: "Trainer", trainerId: "t3", date: "2026-06-26", time: "03:00 PM", status: "Completed", notes: "Heavy compound lift training session.", createdAt: "2026-06-23T10:10:00Z" },
  { id: "bk4", name: "Linda Blair", email: "lblair@gmail.com", phone: "+1 555-0111", type: "Visit", date: "2026-06-28", time: "02:00 PM", status: "Rescheduled", notes: "Rescheduled from Friday. Wants a quick facility tour.", createdAt: "2026-06-25T16:40:00Z" }
];

const DEFAULT_MEMBERS: Member[] = [
  {
    id: "m1",
    memberId: "AURA-2026-M419",
    name: "Emma Watson",
    email: "emma.watson@gmail.com",
    phone: "+1 555-0167",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    planId: "plan2", // Power Annual
    status: "Active",
    joinDate: "2026-06-20",
    expiryDate: "2027-06-20",
    notes: "Goal: High performance athletic shape and power gains.",
    payments: [
      { id: "pay1", amount: 828, date: "2026-06-20", method: "Stripe", planName: "Power Annual", invoiceId: "INV-2026-4890" }
    ]
  },
  {
    id: "m2",
    memberId: "AURA-2026-M820",
    name: "Garry Kasparov",
    email: "garry.k@grandmaster.net",
    phone: "+1 555-0220",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    planId: "plan3", // VIP Syndicate
    status: "Active",
    joinDate: "2026-05-10",
    expiryDate: "2026-07-10",
    notes: "Requires private locker. Prefers training before 09:00 AM.",
    payments: [
      { id: "pay2", amount: 199, date: "2026-05-10", method: "Stripe", planName: "VIP Syndicate", invoiceId: "INV-2026-1029" },
      { id: "pay3", amount: 199, date: "2026-06-10", method: "Stripe", planName: "VIP Syndicate", invoiceId: "INV-2026-1455" }
    ]
  },
  {
    id: "m3",
    memberId: "AURA-2026-M102",
    name: "Brad Pitt",
    email: "brad.pitt@hollywood.com",
    phone: "+1 555-0100",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    planId: "plan1", // Elite Access
    status: "Frozen",
    joinDate: "2026-01-15",
    expiryDate: "2026-09-15",
    notes: "Frozen until July 15, 2026 due to international film shoot.",
    payments: [
      { id: "pay4", amount: 89, date: "2026-01-15", method: "Razorpay", planName: "Elite Access", invoiceId: "INV-2026-0091" },
      { id: "pay5", amount: 89, date: "2026-02-15", method: "Razorpay", planName: "Elite Access", invoiceId: "INV-2026-0211" }
    ]
  }
];

const DEFAULT_ENQUIRIES: Enquiry[] = [
  { id: "en1", name: "Robert Downey", email: "robert@starkindustries.com", phone: "+1 555-3000", message: "Hi, do you have specialized equipment for intense cardio training, and is there private heli-parking near the facility?", status: "Unread", createdAt: "2026-06-25T19:00:00Z" },
  { id: "en2", name: "Jessica Alba", email: "jessica@honest.com", phone: "+1 555-0122", message: "Hello! I am looking to register a corporate plan for my company. Please send over your premium group catalogs.", status: "Replied", createdAt: "2026-06-23T11:20:00Z", replyText: "Sent premium catalogs and brochure to Jessica on June 24. Awaiting feedback." }
];

// Initialize Database in LocalStorage
function initDB() {
  if (typeof window === "undefined") return;
  const loadOrSeed = <T>(key: string, defaultData: T): T => {
    const existing = localStorage.getItem(key);
    if (!existing) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(existing);
  };

  loadOrSeed(KEYS.TRAINERS, DEFAULT_TRAINERS);
  loadOrSeed(KEYS.PROGRAMS, DEFAULT_PROGRAMS);
  loadOrSeed(KEYS.PLANS, DEFAULT_PLANS);
  loadOrSeed(KEYS.CLASSES, DEFAULT_CLASSES);
  loadOrSeed(KEYS.LEADS, DEFAULT_LEADS);
  loadOrSeed(KEYS.BOOKINGS, DEFAULT_BOOKINGS);
  loadOrSeed(KEYS.MEMBERS, DEFAULT_MEMBERS);
  loadOrSeed(KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
  loadOrSeed(KEYS.FAQS, DEFAULT_FAQS);
  loadOrSeed(KEYS.BLOGS, DEFAULT_BLOGS);
  loadOrSeed(KEYS.ENQUIRIES, DEFAULT_ENQUIRIES);
}

// Ensure database is bootstrapped on import
initDB();

// Read operations
export const gymDB = {
  getTrainers: (): Trainer[] => JSON.parse(localStorage.getItem(KEYS.TRAINERS) || "[]"),
  saveTrainers: (data: Trainer[]) => localStorage.setItem(KEYS.TRAINERS, JSON.stringify(data)),
  addTrainer: (item: Omit<Trainer, "id">): Trainer => {
    const list = gymDB.getTrainers();
    const newItem = { ...item, id: `t_${Date.now()}` };
    list.push(newItem);
    gymDB.saveTrainers(list);
    return newItem;
  },
  updateTrainer: (id: string, updated: Partial<Trainer>) => {
    const list = gymDB.getTrainers();
    const idx = list.findIndex(x => x.id === id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...updated };
      gymDB.saveTrainers(list);
    }
  },
  deleteTrainer: (id: string) => {
    const list = gymDB.getTrainers();
    gymDB.saveTrainers(list.filter(x => x.id !== id));
  },

  getPrograms: (): Program[] => JSON.parse(localStorage.getItem(KEYS.PROGRAMS) || "[]"),
  savePrograms: (data: Program[]) => localStorage.setItem(KEYS.PROGRAMS, JSON.stringify(data)),
  addProgram: (item: Omit<Program, "id">): Program => {
    const list = gymDB.getPrograms();
    const newItem = { ...item, id: `p_${Date.now()}` };
    list.push(newItem);
    gymDB.savePrograms(list);
    return newItem;
  },
  updateProgram: (id: string, updated: Partial<Program>) => {
    const list = gymDB.getPrograms();
    const idx = list.findIndex(x => x.id === id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...updated };
      gymDB.savePrograms(list);
    }
  },
  deleteProgram: (id: string) => {
    const list = gymDB.getPrograms();
    gymDB.savePrograms(list.filter(x => x.id !== id));
  },

  getPlans: (): MembershipPlan[] => JSON.parse(localStorage.getItem(KEYS.PLANS) || "[]"),
  savePlans: (data: MembershipPlan[]) => localStorage.setItem(KEYS.PLANS, JSON.stringify(data)),
  addPlan: (item: Omit<MembershipPlan, "id">): MembershipPlan => {
    const list = gymDB.getPlans();
    const newItem = { ...item, id: `plan_${Date.now()}` };
    list.push(newItem);
    gymDB.savePlans(list);
    return newItem;
  },
  updatePlan: (id: string, updated: Partial<MembershipPlan>) => {
    const list = gymDB.getPlans();
    const idx = list.findIndex(x => x.id === id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...updated };
      gymDB.savePlans(list);
    }
  },
  deletePlan: (id: string) => {
    const list = gymDB.getPlans();
    gymDB.savePlans(list.filter(x => x.id !== id));
  },

  getClasses: (): ClassSession[] => JSON.parse(localStorage.getItem(KEYS.CLASSES) || "[]"),
  saveClasses: (data: ClassSession[]) => localStorage.setItem(KEYS.CLASSES, JSON.stringify(data)),
  addClass: (item: Omit<ClassSession, "id">): ClassSession => {
    const list = gymDB.getClasses();
    const newItem = { ...item, id: `c_${Date.now()}` };
    list.push(newItem);
    gymDB.saveClasses(list);
    return newItem;
  },
  updateClass: (id: string, updated: Partial<ClassSession>) => {
    const list = gymDB.getClasses();
    const idx = list.findIndex(x => x.id === id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...updated };
      gymDB.saveClasses(list);
    }
  },
  deleteClass: (id: string) => {
    const list = gymDB.getClasses();
    gymDB.saveClasses(list.filter(x => x.id !== id));
  },

  getLeads: (): Lead[] => JSON.parse(localStorage.getItem(KEYS.LEADS) || "[]"),
  saveLeads: (data: Lead[]) => localStorage.setItem(KEYS.LEADS, JSON.stringify(data)),
  addLead: (item: Omit<Lead, "id" | "createdAt">): Lead => {
    const list = gymDB.getLeads();
    const newItem = { ...item, id: `ld_${Date.now()}`, createdAt: new Date().toISOString() };
    list.unshift(newItem);
    gymDB.saveLeads(list);
    return newItem;
  },
  updateLead: (id: string, updated: Partial<Lead>) => {
    const list = gymDB.getLeads();
    const idx = list.findIndex(x => x.id === id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...updated };
      gymDB.saveLeads(list);
    }
  },
  deleteLead: (id: string) => {
    const list = gymDB.getLeads();
    gymDB.saveLeads(list.filter(x => x.id !== id));
  },

  getBookings: (): Booking[] => JSON.parse(localStorage.getItem(KEYS.BOOKINGS) || "[]"),
  saveBookings: (data: Booking[]) => localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(data)),
  addBooking: (item: Omit<Booking, "id" | "createdAt" | "status">): Booking => {
    const list = gymDB.getBookings();
    const newItem = { ...item, id: `bk_${Date.now()}`, status: "Pending" as const, createdAt: new Date().toISOString() };
    list.unshift(newItem);
    gymDB.saveBookings(list);

    // Automatically trigger lead creation for marketing followups
    gymDB.addLead({
      name: item.name,
      email: item.email,
      phone: item.phone,
      status: "New",
      source: `${item.type} Booking`,
      notes: `Booked a ${item.type} on ${item.date} at ${item.time}. Notes: ${item.notes || "None"}`
    });

    return newItem;
  },
  updateBooking: (id: string, updated: Partial<Booking>) => {
    const list = gymDB.getBookings();
    const idx = list.findIndex(x => x.id === id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...updated };
      gymDB.saveBookings(list);
    }
  },
  deleteBooking: (id: string) => {
    const list = gymDB.getBookings();
    gymDB.saveBookings(list.filter(x => x.id !== id));
  },

  getMembers: (): Member[] => JSON.parse(localStorage.getItem(KEYS.MEMBERS) || "[]"),
  saveMembers: (data: Member[]) => localStorage.setItem(KEYS.MEMBERS, JSON.stringify(data)),
  addMember: (item: Omit<Member, "id" | "memberId">): Member => {
    const list = gymDB.getMembers();
    const rand = Math.floor(100 + Math.random() * 900);
    const memberId = `AURA-2026-M${rand}`;
    const newItem = { ...item, id: `m_${Date.now()}`, memberId };
    list.unshift(newItem);
    gymDB.saveMembers(list);

    // Add to converted leads if matching email
    const leads = gymDB.getLeads();
    const leadIdx = leads.findIndex(l => l.email.toLowerCase() === item.email.toLowerCase());
    if (leadIdx > -1) {
      leads[leadIdx].status = "Converted";
      leads[leadIdx].notes += ` | Converted to plan ${item.planId} on ${item.joinDate}.`;
      gymDB.saveLeads(leads);
    } else {
      // Add lead anyway
      gymDB.addLead({
        name: item.name,
        email: item.email,
        phone: item.phone,
        status: "Converted",
        source: "Membership Registration",
        notes: `Direct membership checkout for plan ${item.planId}`
      });
    }

    return newItem;
  },
  updateMember: (id: string, updated: Partial<Member>) => {
    const list = gymDB.getMembers();
    const idx = list.findIndex(x => x.id === id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...updated };
      gymDB.saveMembers(list);
    }
  },
  deleteMember: (id: string) => {
    const list = gymDB.getMembers();
    gymDB.saveMembers(list.filter(x => x.id !== id));
  },

  getTestimonials: (): Testimonial[] => JSON.parse(localStorage.getItem(KEYS.TESTIMONIALS) || "[]"),
  saveTestimonials: (data: Testimonial[]) => localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(data)),
  addTestimonial: (item: Omit<Testimonial, "id">): Testimonial => {
    const list = gymDB.getTestimonials();
    const newItem = { ...item, id: `ts_${Date.now()}` };
    list.push(newItem);
    gymDB.saveTestimonials(list);
    return newItem;
  },
  deleteTestimonial: (id: string) => {
    const list = gymDB.getTestimonials();
    gymDB.saveTestimonials(list.filter(x => x.id !== id));
  },

  getFAQs: (): FAQ[] => JSON.parse(localStorage.getItem(KEYS.FAQS) || "[]"),
  saveFAQs: (data: FAQ[]) => localStorage.setItem(KEYS.FAQS, JSON.stringify(data)),
  addFAQ: (item: Omit<FAQ, "id">): FAQ => {
    const list = gymDB.getFAQs();
    const newItem = { ...item, id: `faq_${Date.now()}` };
    list.push(newItem);
    gymDB.saveFAQs(list);
    return newItem;
  },
  deleteFAQ: (id: string) => {
    const list = gymDB.getFAQs();
    gymDB.saveFAQs(list.filter(x => x.id !== id));
  },

  getBlogs: (): BlogPost[] => JSON.parse(localStorage.getItem(KEYS.BLOGS) || "[]"),
  saveBlogs: (data: BlogPost[]) => localStorage.setItem(KEYS.BLOGS, JSON.stringify(data)),
  addBlog: (item: Omit<BlogPost, "id" | "date">): BlogPost => {
    const list = gymDB.getBlogs();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = new Date().toLocaleDateString("en-US", options);
    const newItem = { ...item, id: `b_${Date.now()}`, date: dateStr };
    list.unshift(newItem);
    gymDB.saveBlogs(list);
    return newItem;
  },
  updateBlog: (id: string, updated: Partial<BlogPost>) => {
    const list = gymDB.getBlogs();
    const idx = list.findIndex(x => x.id === id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...updated };
      gymDB.saveBlogs(list);
    }
  },
  deleteBlog: (id: string) => {
    const list = gymDB.getBlogs();
    gymDB.saveBlogs(list.filter(x => x.id !== id));
  },

  getEnquiries: (): Enquiry[] => JSON.parse(localStorage.getItem(KEYS.ENQUIRIES) || "[]"),
  saveEnquiries: (data: Enquiry[]) => localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(data)),
  addEnquiry: (item: Omit<Enquiry, "id" | "status" | "createdAt">): Enquiry => {
    const list = gymDB.getEnquiries();
    const newItem = { ...item, id: `en_${Date.now()}`, status: "Unread" as const, createdAt: new Date().toISOString() };
    list.unshift(newItem);
    gymDB.saveEnquiries(list);

    // Automatically trigger lead creation
    gymDB.addLead({
      name: item.name,
      email: item.email,
      phone: item.phone,
      status: "New",
      source: "Contact Form Enquiry",
      notes: `Submitted message: ${item.message}`
    });

    return newItem;
  },
  updateEnquiry: (id: string, updated: Partial<Enquiry>) => {
    const list = gymDB.getEnquiries();
    const idx = list.findIndex(x => x.id === id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...updated };
      gymDB.saveEnquiries(list);
    }
  },
  deleteEnquiry: (id: string) => {
    const list = gymDB.getEnquiries();
    gymDB.saveEnquiries(list.filter(x => x.id !== id));
  }
};
