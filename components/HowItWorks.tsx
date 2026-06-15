"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import PillBadge from "@/components/ui/PillBadge";

interface Step {
  number: string;
  title: string;
  description: string;
  colSpan: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Create your Miss Somali account to begin your journey and access the application portal.",
    colSpan: "col-span-12 md:col-span-7",
  },
  {
    number: "02",
    title: "Submit Your Application",
    description: "Complete the online application and share your background, ambitions, and story with us.",
    colSpan: "col-span-12 md:col-span-5",
  },
  {
    number: "03",
    title: "Application Review",
    description: "Our selection team carefully reviews every submission from across the Somali community worldwide.",
    colSpan: "col-span-12 md:col-span-4",
  },
  {
    number: "04",
    title: "Selection & Confirmation",
    description: "Selected candidates will receive an official invitation to confirm participation in Miss Somali 2026.",
    colSpan: "col-span-12 md:col-span-4",
  },
  {
    number: "05",
    title: "Training & Preparation",
    description: "Contestants receive preparation sessions focused on confidence, presentation, leadership, and cultural representation.",
    colSpan: "col-span-12 md:col-span-4",
  },
  {
    number: "06",
    title: "Grand Finale",
    description: "Take the stage in Nairobi, Kenya and compete for the Miss Somali 2026 crown before a live audience.",
    colSpan: "col-span-12 md:col-span-12",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1], // Custom sleek easing curve
    },
  },
};

function BentoCard({ step }: { step: Step }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(11, 45, 107, 0.08), transparent 80%)`;

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      className={`${step.colSpan} group relative rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl hover:border-[#E8C97A]/50`}
    >
      {/* Interactive Spotlight Glow */}
      <motion.div
        className="absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-0 pointer-events-none"
        style={{ background }}
      />
      
      <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between overflow-hidden min-h-[280px]">
        
        {/* Massive Background Number Bleeding Off Edge */}
        <div className="absolute -right-4 -bottom-6 text-[120px] md:text-[160px] font-bold text-slate-50 opacity-60 z-0 pointer-events-none leading-none tracking-tighter select-none transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2 group-hover:text-slate-100/50">
          {step.number}
        </div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Step Icon Indicator */}
          <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-center mb-auto shadow-sm group-hover:bg-[#0B2D6B] group-hover:border-[#0B2D6B] transition-colors duration-300">
            <span className="text-slate-400 font-semibold group-hover:text-white transition-colors duration-300">
              {step.number}
            </span>
          </div>
          
          <div className="mt-12">
            <h3 className="text-[#071E4A] font-semibold text-2xl tracking-tight mb-3 group-hover:text-[#0B2D6B] transition-colors duration-300">
              {step.title}
            </h3>
            
            <p className="text-slate-500 font-light text-[15px] leading-relaxed max-w-md">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-[#FAFAFA] py-24 md:py-32 border-t border-[#E8E8E8] overflow-hidden">
      <div className="grid-container relative z-10">
        
        {/* HEADER AREA */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <PillBadge className="mb-6 bg-white border-slate-200 text-[#0B2D6B] shadow-sm">
            Process Overview
          </PillBadge>
          
          <h2 className="text-[36px] sm:text-[46px] md:text-[56px] font-semibold text-[#071E4A] tracking-tighter leading-[1.1] max-w-4xl mb-6">
            The Journey to the Crown
          </h2>
          
          <p className="text-slate-500 text-base sm:text-lg font-light max-w-2xl leading-relaxed">
            Apply, Prepare, Succeed: Embark on an extraordinary journey of cultural pride, leadership, and personal growth. Follow our structured path to represent your heritage on the international stage.
          </p>
        </div>

        {/* BENTO GRID */}
        <motion.div 
          className="grid grid-cols-12 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step) => (
            <BentoCard key={step.number} step={step} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
