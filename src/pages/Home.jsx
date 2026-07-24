import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AISection from "../components/AISection";
import HealthTopics from "../components/HealthTopics";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import BackgroundBlobs from "../components/BackgroundBlobs";

import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function Home() {
  return (
    <div className="pt-20">
      <Navbar />

      <SignedOut>
        <BackgroundBlobs />
        <Hero />
        <Features />
        <AISection />
        <HealthTopics />
        <Testimonials />
        <FAQ />
        <Footer />
      </SignedOut>

      <SignedIn>
        <Navigate to="/dashboard" replace />
      </SignedIn>
    </div>
  );
}
