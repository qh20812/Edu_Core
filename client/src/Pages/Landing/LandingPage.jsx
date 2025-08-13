import React from "react";
import LandingHeader from "../../Components/Common/LandingHeader";
import LandingFooter from "../../Components/Common/LandingFooter";
import HeroSection from "../../Components/Landing/HeroSection";
import FeatureSection from "../../Components/Landing/FeatureSection";
import AboutSection from "../../Components/Landing/AboutSection";
import StatsSection from "../../Components/Landing/StatsSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      
      <main className="pt-16"> {/* Add padding-top to account for fixed header */}
        <HeroSection />
        <FeatureSection />
        <AboutSection />
        <StatsSection />
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
