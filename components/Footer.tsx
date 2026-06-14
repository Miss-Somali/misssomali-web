"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { name: "Facebook", icon: "fa-brands fa-facebook-f", url: "https://facebook.com/misssomali" },
    { name: "Instagram", icon: "fa-brands fa-instagram", url: "https://instagram.com/misssomali" },
    { name: "TikTok", icon: "fa-brands fa-tiktok", url: "https://tiktok.com/@misssomali" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contestants", href: "/#contestants" },
    { name: "Events", href: "/#events" },
    { name: "Contact Us", href: "/contact" },
  ];

  const processLinks = [
    { name: "Cultural Heritage", href: "/about" },
    { name: "Leadership & Impact", href: "/about" },
    { name: "Grand Coronation", href: "/about" },
    { name: "Apply Now", href: "/portal" },
  ];

  const contactInfo = [
    { text: "info@misssomali.com", href: "mailto:info@misssomali.com", icon: Mail },
    { text: "+252 (61) 555-0199", href: "tel:+252615550199", icon: Phone },
    { text: "Mogadishu, Somalia", href: "#", icon: MapPin },
  ];

  return (
    <footer className="bg-[#081E1C] text-[#b0c0be] font-sans border-t border-[#142e2a]">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-y-12 md:gap-y-0 lg:gap-x-12">
          
          {/* Column 1: Brand & Logo */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col pr-0 lg:pr-8">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo.png"
                alt="Miss Somali Logo"
                width={140}
                height={42}
                className="w-auto h-9 object-contain"
              />
            </Link>
            <p className="text-[15px] font-normal leading-[1.6] text-[#b0c0be]/85 mb-6 max-w-sm">
              Miss Somali is a competition for Somali women from around the world to celebrate their culture, beauty, and strength.
            </p>
            {/* Social Icons matching the screenshot */}
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-[6px] bg-[#122A27] border border-[#1a3834] flex items-center justify-center text-[14px] text-white/80 hover:bg-[#183a36] hover:text-white hover:border-[#224f4a] transition-all duration-300"
                  title={social.name}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white mb-6">
              QUICK LINKS
            </h4>
            <ul className="flex flex-col gap-3 text-[14px] font-medium">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: THE PROCESS */}
          <div className="col-span-6 md:col-span-3 lg:col-span-3">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white mb-6">
              THE PROCESS
            </h4>
            <ul className="flex flex-col gap-3 text-[14px] font-medium">
              {processLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: GET IN TOUCH */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white mb-6">
              GET IN TOUCH
            </h4>
            <div className="flex flex-col gap-3 w-full">
              {contactInfo.map((info, idx) => {
                return (
                  <a
                    key={idx}
                    href={info.href}
                    className="group flex items-center justify-between bg-[#122A27] border border-[#1a3834] px-4 py-3.5 rounded-[4px] text-[14px] text-white/95 font-medium hover:bg-[#163330] hover:border-[#1d4642] transition-all duration-300"
                  >
                    <span className="truncate pr-2">{info.text}</span>
                    <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom copyright row for completeness and professional finish */}
        <div className="border-t border-[#142e2a] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-[#b0c0be]/50">
          <span>&copy; {new Date().getFullYear()} Miss Somali Pageant Organization. All Rights Reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
