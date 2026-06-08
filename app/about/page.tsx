"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";

const texts = {
  aboutLabel: "Our Mission",
  aboutTitle: "Empowering Somali Beauty, Culture, and Intellect",
  aboutDesc1: "Miss Somali is more than a beauty pageant; it is a global leadership platform for young Somali women. We aim to celebrate the richness of Somali cultural heritage while encouraging delegates to lead and engage with pressing global issues.",
  aboutDesc2: "Our delegates represent the union of grace, cultural values, and academic excellence, carrying the torch of leadership on global stages like Miss World and Miss Universe.",
  
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

const values = [
  { title: "Cultural Integrity", desc: "Respecting and elevating the unique heritage, traditions, and values of the Somali people." },
  { title: "Empowering Leadership", desc: "Equipping delegates with critical skills, voice, and opportunities to lead community action." },
  { title: "Global Representation", desc: "Connecting local talent and narratives to international platforms, showing excellence to the world." }
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 min-h-[80vh] flex flex-col justify-center bg-[#0B2D6B]">
        
        {/* About Section (Mission & Values) */}
        <section id="about" className="py-20 md:py-32">
          <div className="grid-container">
            <div className="grid-12 items-center gap-y-16 lg:gap-x-12">
              {/* Left Side: About Narrative (6 cols) */}
              <div className="col-span-12 lg:col-span-6">
                <span className="text-[12px] font-semibold tracking-[0.02em] leading-[1.7] text-[#E8C97A] block mb-2 uppercase">
                  {texts.aboutLabel}
                </span>
                <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-black text-[#FFFFFF] tracking-[-0.02em] leading-[1.1] mb-8">
                  {texts.aboutTitle}
                </h1>
                <p className="text-[#F5F0E8]/80 text-[16px] md:text-[18px] font-light leading-[1.8] mb-6">
                  {texts.aboutDesc1}
                </p>
                <p className="text-[#F5F0E8]/80 text-[16px] md:text-[18px] font-light leading-[1.8]">
                  {texts.aboutDesc2}
                </p>
              </div>

              {/* Right Side: Values list (6 cols) */}
              <div className="col-span-12 lg:col-span-6 flex flex-col gap-8 lg:pl-10">
                {values.map((v, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#E8C97A] flex items-center justify-center text-[14px] font-bold text-[#E8C97A]">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#FFFFFF] mb-3">{v.title}</h4>
                      <p className="text-[#F5F0E8]/75 text-[16px] font-light leading-[1.7]">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer id="contact" className="bg-[#071E4A] py-20 border-t border-[#E8C97A]/10 text-[#F5F0E8]">
        <div className="grid-container">
          <div className="grid-12 gap-y-12">
            {/* Column 1 (4 cols) */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col justify-between">
              <div>
                <div className="bg-[#0B2D6B] px-4 py-3.5 inline-block mb-6 shadow-sm">
                  <Image
                    src="/logo.png"
                    alt="Miss Somali Logo"
                    width={130}
                    height={40}
                    className="w-auto h-8 object-contain"
                  />
                </div>
                <p className="text-[#F5F0E8]/75 text-[15px] font-light leading-[1.7] max-w-sm">
                  {texts.footerDesc}
                </p>
              </div>
              <div className="flex space-x-4 mt-6">
                {["twitter", "facebook", "instagram", "youtube"].map((social) => (
                  <a key={social} href="#" className="w-8 h-8 rounded-none border border-[#E8C97A]/15 flex items-center justify-center hover:border-[#E8C97A] hover:text-[#E8C97A] transition-all duration-300 text-[12px] font-semibold text-[#F5F0E8]">
                    {social[0].toUpperCase()}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 (3 cols) */}
            <div className="col-span-6 md:col-span-3 lg:col-span-3">
              <h4 className="text-[12px] font-semibold text-[#E8C97A] mb-6">
                {texts.footerQuickLinks}
              </h4>
              <ul className="flex flex-col gap-3 text-[13px] font-normal text-[#F5F0E8]/85">
                {[
                  { name: "Home", href: "/" },
                  { name: "About", href: "/about" }
                ].map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-[#F0D898] transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 (3 cols) */}
            <div className="col-span-6 md:col-span-3 lg:col-span-3">
              <h4 className="text-[12px] font-semibold text-[#E8C97A] mb-6">
                {texts.footerContact}
              </h4>
              <ul className="flex flex-col gap-3 text-[13px] font-normal text-[#F5F0E8]/75">
                <li>{texts.footerContactEmail}</li>
                <li>{texts.footerContactPhone}</li>
                <li>{texts.footerContactOffice}</li>
              </ul>
            </div>

            {/* Column 4 (2 cols) */}
            <div className="col-span-12 md:col-span-12 lg:col-span-2">
              <h4 className="text-[12px] font-semibold text-[#E8C97A] mb-6">
                {texts.footerNewsletter}
              </h4>
              <p className="text-[15px] text-[#F5F0E8]/75 mb-4 leading-[1.7] font-light">
                {texts.footerNewsletterDesc}
              </p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder={texts.footerNewsletterPlaceholder}
                  className="bg-white border border-[#E8C97A]/15 px-3 py-2 text-[15px] font-normal focus:outline-none focus:border-[#E8C97A] w-full text-[#071E4A] rounded-none placeholder-[#071E4A]/50"
                />
                <button type="submit" className="bg-[#E8C97A] hover:bg-[#F0D898] text-[#071E4A] font-bold px-4 text-[14px] tracking-[0.02em] leading-none transition-colors duration-200 cursor-pointer">
                  {texts.footerNewsletterCTA}
                </button>
              </form>
            </div>

            {/* Copyright row */}
            <div className="col-span-12 border-t border-[#E8C97A]/10 pt-8 mt-4 text-center text-[13px] font-normal text-[#F5F0E8]/60 flex flex-col md:flex-row justify-between items-center gap-4">
              <span>{texts.footerCopyright}</span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-[#E8C97A]">{texts.footerPrivacy}</a>
                <a href="#" className="hover:text-[#E8C97A]">{texts.footerTerms}</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
