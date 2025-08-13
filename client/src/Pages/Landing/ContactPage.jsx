import React from "react";
import LandingHeader from "../../Components/Common/LandingHeader";
import LandingFooter from "../../Components/Common/LandingFooter";
import PageHero from "../../Components/Landing/PageHero";
import ContactInfo from "../../Components/Landing/ContactInfo";
import ContactForm from "../../Components/Landing/ContactForm";
import { FaEnvelope } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

      <main className="pt-16">
        {/* Hero Section */}
        <PageHero
          badge="Liên hệ với chúng tôi"
          badgeIcon={FaEnvelope}
          title="Liên hệ với chúng tôi"
          subtitle="Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại thông tin để được tư vấn tốt nhất."
        />

        {/* Contact Info & Form */}
        <section className="py-20">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <ContactInfo />
            <ContactForm />
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gray-50">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Vị trí văn phòng
              </h2>
              <p className="text-gray-600">
                Ghé thăm văn phòng của chúng tôi để được tư vấn trực tiếp
              </p>
            </div>

            <div className="flex items-center justify-center bg-gray-300 border border-gray-200 rounded-2xl h-96 overflow-hidden">
              <iframe
                title="EduCore Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.44143514015494!2d106.65599635213046!3d10.764379055873114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752959abdde3dd%3A0xa1ae728c26f860be!2sVTC%20Academy%20Plus!5e1!3m2!1sen!2s!4v1755085920727!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default ContactPage;
