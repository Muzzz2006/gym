import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import Programs from "./components/Programs";
import Trainers from "./components/Trainers";
import MembershipPlans from "./components/MembershipPlans";
import ClassSchedule from "./components/ClassSchedule";
import BMICalculator from "./components/BMICalculator";
import TransformationGallery from "./components/TransformationGallery";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import MembershipModal from "./components/MembershipModal";
import Dashboard from "./components/AdminDashboard/Dashboard";

export default function App() {
  const [currentTab, setCurrentTab] = useState<"public" | "admin">("public");

  // Booking Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<string>("Trial");
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | undefined>(undefined);

  // Membership Modal States
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(undefined);

  const openBooking = (type: string = "Trial", trainerId?: string) => {
    setBookingType(type);
    setSelectedTrainerId(trainerId);
    setIsBookingOpen(true);
  };

  const openMembership = (planId?: string) => {
    setSelectedPlanId(planId);
    setIsMembershipOpen(true);
  };

  return (
    <div className="bg-gym-dark min-h-screen text-white relative">
      
      {/* Shared Modals */}
      {isBookingOpen && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialType={bookingType}
          initialTrainerId={selectedTrainerId}
        />
      )}

      {isMembershipOpen && (
        <MembershipModal
          isOpen={isMembershipOpen}
          onClose={() => setIsMembershipOpen(false)}
          selectedPlanId={selectedPlanId}
        />
      )}

      {/* Conditional Layout Views */}
      {currentTab === "public" ? (
        <>
          {/* Header Navigation */}
          <Navbar 
            currentTab={currentTab} 
            setCurrentTab={setCurrentTab} 
            onOpenBooking={() => openBooking("Trial")}
            onOpenMembership={() => openMembership()}
          />

          {/* Core Visual Grid & Sections */}
          <main className="relative">
            <Hero onOpenBooking={() => openBooking("Trial")} onOpenMembership={() => openMembership()} />
            <About />
            <WhyChooseUs />
            <Programs onOpenBooking={openBooking} />
            <Trainers onOpenBooking={openBooking} />
            <MembershipPlans onOpenMembership={openMembership} />
            <ClassSchedule onOpenBooking={() => openBooking("Trial")} />
            <BMICalculator />
            <TransformationGallery />
            <Testimonials />
            <FAQ />
            <Blog />
            <Contact />
          </main>

          {/* Footer Navigation */}
          <Footer currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </>
      ) : (
        <>
          {/* Staff Terminal Header Dashboard Navbar */}
          <Navbar 
            currentTab={currentTab} 
            setCurrentTab={setCurrentTab} 
            onOpenBooking={() => {}}
            onOpenMembership={() => {}}
          />

          {/* Secure Administrative Workspace Dashboard */}
          <Dashboard onLogout={() => setCurrentTab("public")} />
        </>
      )}

    </div>
  );
}
