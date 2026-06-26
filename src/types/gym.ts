export interface Trainer {
  id: string;
  name: string;
  role: string;
  photo: string;
  experience: string;
  certifications: string[];
  specialization: string;
  socials: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  availability: string[]; // e.g. ["08:00", "10:00", "14:00", "16:00"]
}

export interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  image: string;
  category: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  billing: "monthly" | "quarterly" | "half-yearly" | "annual";
  popular: boolean;
  features: string[];
  discount?: string;
}

export interface ClassSession {
  id: string;
  className: string;
  trainerId: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  time: string; // e.g. "09:00 AM - 10:00 AM"
  room: string;
  duration: string;
  maxCap: number;
  currentCap: number;
}

export type LeadStatus = "New" | "Contacted" | "Follow-up" | "Converted" | "Closed";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string; // e.g. "Contact Form", "Newsletter", "Trial Booking"
  notes: string;
  createdAt: string;
}

export type BookingType = "Trial" | "Trainer" | "Consultation" | "Visit";
export type BookingStatus = "Pending" | "Accepted" | "Rejected" | "Rescheduled" | "Cancelled" | "Completed";

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: BookingType;
  trainerId?: string; // Optional if booking a trainer
  date: string;
  time: string;
  status: BookingStatus;
  notes: string;
  createdAt: string;
}

export type MemberStatus = "Active" | "Frozen" | "Expired";

export interface Payment {
  id: string;
  amount: number;
  date: string;
  method: "Stripe" | "Razorpay" | "Cash" | "Card";
  planName: string;
  invoiceId: string;
}

export interface Member {
  id: string;
  memberId: string; // generated ID like MEM-2026-X123
  name: string;
  email: string;
  phone: string;
  photo: string; // Base64 or local image url
  planId: string;
  status: MemberStatus;
  joinDate: string;
  expiryDate: string;
  notes: string;
  payments: Payment[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "Unread" | "Read" | "Replied";
  createdAt: string;
  replyText?: string;
}
