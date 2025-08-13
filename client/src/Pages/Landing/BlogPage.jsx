import React from "react";
import LandingHeader from "../../Components/Common/LandingHeader";
import LandingFooter from "../../Components/Common/LandingFooter";
import PageHero from "../../Components/Landing/PageHero";
import BlogGrid from "../../Components/Landing/BlogGrid";
import Newsletter from "../../Components/Landing/Newsletter";
import { FaBook } from "react-icons/fa";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      
      <main className="pt-16">
        {/* Hero Section */}
        <PageHero
          badge="Blog học tập"
          badgeIcon={FaBook}
          title="Góc chia sẻ học tập"
          subtitle="Chào mừng bạn đến với blog học tập! Cùng khám phá những mẹo, công cụ và chiến lược giúp bạn học hiệu quả hơn."
          bgClass="bg-gradient-to-br from-slate-50 to-blue-50"
        />

        {/* Blog Posts Section */}
        <BlogGrid />

        {/* Newsletter Section */}
        <Newsletter />
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default BlogPage;
