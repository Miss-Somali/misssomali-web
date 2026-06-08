"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FeaturedEvent() {
  return (
    <section
      id="grand-finale"
      className="relative w-full min-h-screen lg:h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[#0B2D6B] via-[#0D3A8A] to-[#071E4A] pt-28 pb-0 lg:py-0"
    >
      {/* Background Spotlights & Grid */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#071E4A_95%)] z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-35 z-15 pointer-events-none" />
      </div>

      {/* Centered content block aligned to the 12-column grid */}
      <div className="relative w-full z-20 flex flex-col flex-1">
        <div className="grid-container flex-1 flex flex-col justify-between">
          <div className="grid-12 items-center gap-y-12 lg:gap-y-0 flex-1 pt-12 pb-0 lg:py-0">

            {/* Left Column: Content & Stats */}
            <div className="col-span-12 lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Luxury Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6 flex items-center gap-2"
              >
                <span className="text-[#E8C97A] tracking-[0.08em] uppercase text-[11px] font-bold">
                  Featured Event • Live
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8C97A] animate-pulse" />
              </motion.div>

              {/* Main Headline */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[38px] lg:text-[58px] font-extrabold text-white tracking-[-0.02em] leading-[1.15] text-center lg:text-left"
              >
                Miss Somali 2026 Grand Finale.
              </motion.h2>

              {/* Luxury Divider */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="w-16 h-[2px] bg-[#E8C97A] my-6 rounded-full origin-left" 
              />

              {/* Slogan */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-[15px] font-light text-[#F5F0E8]/70 leading-[1.7] max-w-[420px] text-center lg:text-left mb-6"
              >
                The pinnacle of a global journey. A live showcase of confidence, culture, and leadership in Nairobi, Kenya.
              </motion.p>

              {/* Event Details (Mini) */}
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4 }}
                 className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mb-8"
              >
                 <div className="flex flex-col items-center lg:items-start text-[#F5F0E8]">
                   <span className="text-[10px] uppercase tracking-widest text-[#E8C97A] font-bold mb-1">Location</span>
                   <span className="text-[14px] font-semibold">Nairobi, Kenya</span>
                 </div>
                 <div className="flex flex-col items-center lg:items-start text-[#F5F0E8]">
                   <span className="text-[10px] uppercase tracking-widest text-[#E8C97A] font-bold mb-1">Date</span>
                   <span className="text-[14px] font-semibold">August 25, 2026</span>
                 </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full"
              >
                <Link
                  href="#events"
                  className="w-full sm:w-auto bg-[#E8C97A] hover:bg-[#F0D898] text-[#071E4A] px-8 py-4 rounded-full font-bold text-[14px] leading-none tracking-[0.02em] transition-colors duration-200 inline-block text-center border border-[#E8C97A]/25"
                >
                  Get Tickets & Packages
                </Link>
                <a
                  href="#journey"
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full border border-white/10 transition-colors duration-200"
                >
                  <span className="text-[14px] font-bold tracking-[0.02em] leading-none">Learn More</span>
                  <svg className="w-4 h-4 text-[#E8C97A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>

            </div>

            {/* Right Column: Portrait Image & Backdrops */}
            <div className="col-span-12 lg:col-span-7 flex justify-center items-end relative lg:h-[86vh] xl:h-[95vh] z-10 lg:self-end pb-0 mb-0">

              {/* Glowing Gold Halo Spotlight */}
              <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] bg-gradient-to-r from-[#E8C97A]/25 to-transparent blur-3xl rounded-full z-0 pointer-events-none hidden md:block" />

              {/* Model Image wrapper */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-full h-[55vh] sm:h-[60vh] lg:h-full max-w-[380px] sm:max-w-[460px] lg:max-w-none mx-auto z-10 pb-0 mb-0"
              >
                <Image
                  src="/images/image1.png"
                  alt="Miss Somali 2026 Grand Finale"
                  fill
                  priority
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-contain object-bottom z-10 drop-shadow-2xl"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
