"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Globe, MapPin, Send } from "lucide-react";

const texts = {
  footerDesc: "An international organization celebrating the union of Somali beauty, heritage, and values on a global stage.",
  footerQuickLinks: "Quick Links",
  footerContact: "Contact Us",
  footerContactEmail: "Email: info@misssomali.org",
  footerContactPhone: "Phone: +252 (61) 555-0199",
  footerContactOffice: "Office: Lido Beach, Mogadishu, Somalia",
  footerNewsletter: "Newsletter",
  footerNewsletterDesc: "Subscribe for news, event ticketing updates, and exclusive releases.",
  footerNewsletterPlaceholder: "Email Address",
  footerNewsletterCTA: "Go",
  footerCopyright: "© 2026 Miss Somali Pageant Organization. All Rights Reserved.",
  footerPrivacy: "Privacy Policy",
  footerTerms: "Terms of Service"
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-1 min-h-screen bg-gradient-to-b from-[#0B2D6B] via-[#0D3A8A] to-[#071E4A] pt-32 pb-24 relative overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#071E4A_95%)]" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#E8C97A]/5 blur-[120px] rounded-full" />
        </div>

        <div className="grid-container relative z-10">
          <div className="grid-12 items-start gap-y-16 lg:gap-x-20">
            
            {/* ========================================================================= */}
            {/* LEFT COLUMN: CONTACT INFORMATION                                          */}
            {/* ========================================================================= */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="col-span-12 lg:col-span-5 flex flex-col items-start text-left"
            >
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#E8C97A] mb-6">
                Connect With Us
              </span>
              
              <h1 className="text-[48px] lg:text-[64px] font-black text-white tracking-[-0.02em] leading-[1.05] mb-8">
                Get In Touch.
              </h1>
              
              <div className="w-16 h-[2px] bg-[#E8C97A] mb-8 rounded-full" />

              <p className="text-[#F5F0E8]/70 text-[16px] lg:text-[18px] font-light leading-[1.8] mb-12 max-w-md">
                For general inquiries, partnership opportunities, media requests, or event-related questions, please contact the Miss Somali Organization. We aim to respond to all inquiries in a timely and professional manner.
              </p>

              {/* Contact Details List */}
              <div className="flex flex-col gap-8 w-full">
                <div className="flex items-start gap-5 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E8C97A] transition-colors duration-300 group-hover:border-[#E8C97A]/50 group-hover:bg-[#E8C97A]/10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest font-bold text-white/50 mb-1">Email Us</span>
                    <a href="mailto:info@misssomali.com" className="text-[16px] font-medium text-white hover:text-[#E8C97A] transition-colors duration-200">
                      info@misssomali.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E8C97A] transition-colors duration-300 group-hover:border-[#E8C97A]/50 group-hover:bg-[#E8C97A]/10">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest font-bold text-white/50 mb-1">Website</span>
                    <a href="https://www.misssomali.com" target="_blank" rel="noreferrer" className="text-[16px] font-medium text-white hover:text-[#E8C97A] transition-colors duration-200">
                      www.misssomali.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E8C97A] transition-colors duration-300 group-hover:border-[#E8C97A]/50 group-hover:bg-[#E8C97A]/10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest font-bold text-white/50 mb-1">Location</span>
                    <span className="text-[16px] font-medium text-white">
                      Events hosted internationally
                    </span>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* ========================================================================= */}
            {/* RIGHT COLUMN: PREMIUM LUXURY FORM                                         */}
            {/* ========================================================================= */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="col-span-12 lg:col-span-7 w-full max-w-2xl mx-auto lg:mx-0 bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-12 shadow-2xl relative"
            >
              {/* Form Decorative Accents */}
              <div className="absolute top-0 left-0 w-16 h-[1px] bg-[#E8C97A]" />
              <div className="absolute top-0 left-0 w-[1px] h-16 bg-[#E8C97A]" />

              <h2 className="text-[24px] font-bold text-white mb-10 tracking-tight">
                Send a Message
              </h2>

              <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                
                {/* Input: Name */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white text-[16px] font-light focus:outline-none focus:border-[#E8C97A] peer placeholder-transparent transition-colors duration-300"
                    placeholder="Name"
                  />
                  <label 
                    htmlFor="name"
                    className="absolute left-0 top-3 text-white/50 text-[16px] font-light transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-[#E8C97A] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[11px] peer-valid:text-[#E8C97A] peer-valid:font-bold peer-valid:uppercase peer-valid:tracking-widest cursor-text"
                  >
                    Name
                  </label>
                </div>

                {/* Input: Email */}
                <div className="relative group">
                  <input 
                    type="email" 
                    id="email"
                    required
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white text-[16px] font-light focus:outline-none focus:border-[#E8C97A] peer placeholder-transparent transition-colors duration-300"
                    placeholder="Email Address"
                  />
                  <label 
                    htmlFor="email"
                    className="absolute left-0 top-3 text-white/50 text-[16px] font-light transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-[#E8C97A] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[11px] peer-valid:text-[#E8C97A] peer-valid:font-bold peer-valid:uppercase peer-valid:tracking-widest cursor-text"
                  >
                    Email Address
                  </label>
                </div>

                {/* Input: Subject */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="subject"
                    required
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white text-[16px] font-light focus:outline-none focus:border-[#E8C97A] peer placeholder-transparent transition-colors duration-300"
                    placeholder="Subject"
                  />
                  <label 
                    htmlFor="subject"
                    className="absolute left-0 top-3 text-white/50 text-[16px] font-light transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-[#E8C97A] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[11px] peer-valid:text-[#E8C97A] peer-valid:font-bold peer-valid:uppercase peer-valid:tracking-widest cursor-text"
                  >
                    Subject
                  </label>
                </div>

                {/* Input: Message */}
                <div className="relative group mt-2">
                  <textarea 
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white text-[16px] font-light focus:outline-none focus:border-[#E8C97A] peer placeholder-transparent transition-colors duration-300 resize-none"
                    placeholder="Your Message"
                  />
                  <label 
                    htmlFor="message"
                    className="absolute left-0 top-3 text-white/50 text-[16px] font-light transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-[#E8C97A] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[11px] peer-valid:text-[#E8C97A] peer-valid:font-bold peer-valid:uppercase peer-valid:tracking-widest cursor-text"
                  >
                    Your Message
                  </label>
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                  <button 
                    type="submit"
                    className="group w-full sm:w-auto bg-[#E8C97A] hover:bg-[#F0D898] text-[#071E4A] px-10 py-4 rounded-full font-bold text-[14px] leading-none tracking-[0.02em] transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_20px_rgba(232,201,122,0.4)]"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </button>
                </div>

              </form>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
