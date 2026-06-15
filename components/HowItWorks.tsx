"use client";

import { motion } from "framer-motion";
import PillBadge from "@/components/ui/PillBadge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  hasApplyLink?: boolean;
}

const steps: Step[] = [
  {
    number: "1",
    title: "Create Your Account",
    description: "Create your Miss Somali account to begin your journey and access the application portal.",
    hasApplyLink: true,
  },
  {
    number: "2",
    title: "Submit Your Application",
    description: "Complete the online application and share your background, ambitions, and story with us.",
  },
  {
    number: "3",
    title: "Application Review",
    description: "Our selection team carefully reviews every submission from across the Somali community worldwide.",
  },
  {
    number: "4",
    title: "Selection & Confirmation",
    description: "Selected candidates will receive an official invitation to confirm participation in Miss Somali 2026.",
  },
  {
    number: "5",
    title: "Training & Preparation",
    description: "Contestants receive preparation sessions focused on confidence, presentation, leadership, and cultural representation.",
  },
  {
    number: "6",
    title: "Grand Finale",
    description: "Take the stage in Nairobi, Kenya and compete for the Miss Somali 2026 crown before a live audience.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-[#FAFAFA] py-24 md:py-32 border-t border-[#E8E8E8] overflow-hidden">
      <div className="grid-container relative z-10">
        
        {/* HEADER AREA */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <PillBadge className="mb-6 bg-white border-slate-200 text-black shadow-sm">
            How it works
          </PillBadge>
          
          <h2 className="text-[32px] sm:text-[42px] font-semibold text-black tracking-tighter leading-[1.15] mb-6">
            How The Selection Process Works
          </h2>
          
          <p className="text-slate-500 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            Apply, Prepare, Succeed: Embark on an extraordinary journey of cultural pride, leadership, and personal growth. Follow our structured path to represent your heritage on the international stage.
          </p>
        </div>

        {/* HORIZONTAL TIMELINE */}
        <div className="grid-12">
          <div className="col-span-12">
            
            {/* Desktop: 3-column Grid, Mobile: 1-column stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-y-16 gap-x-8 lg:gap-x-12">
              {steps.map((step, stepIdx) => (
                <motion.div 
                  key={step.title} 
                  className="relative flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: stepIdx * 0.1 }}
                >
                  {/* Timeline Node and Connecting Line */}
                  <div className="relative flex items-center mb-6 z-10">
                    <div className="relative flex h-12 w-12 flex-none items-center justify-center bg-white border border-[#0B2D6B]/30 rounded-full shadow-sm z-10 transition-colors duration-300">
                      <span className="text-black text-base font-semibold">{step.number}</span>
                    </div>
                    
                    {/* Connecting Line (Hides on the last item of each row based on screen size) */}
                    <div className={`
                      absolute left-12 right-[-2rem] lg:right-[-3rem] top-1/2 h-[2px] -translate-y-1/2 bg-slate-200 z-0
                      ${stepIdx === steps.length - 1 ? 'hidden' : 'block'}
                      ${(stepIdx + 1) % 3 === 0 ? 'lg:hidden' : ''}
                      ${(stepIdx + 1) % 2 === 0 ? 'md:hidden lg:block' : ''}
                    `} />
                  </div>
                  
                  {/* Step Content */}
                  <div className="pr-4">
                    <span className="text-[12px] font-semibold tracking-[0.15em] text-[#0B2D6B] uppercase mb-2 block">
                      Step {step.number}
                    </span>
                    <h3 className="text-[20px] sm:text-[22px] font-semibold leading-tight text-black tracking-tight mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[15px] sm:text-[16px] leading-[1.65] text-slate-500 font-light max-w-sm">
                      {step.description}
                    </p>
                    
                    {/* Call to Action Link */}
                    {step.hasApplyLink && (
                      <Link 
                        href="/portal" 
                        className="inline-flex items-center gap-2 mt-5 text-[#0B2D6B] font-medium text-sm hover:underline group"
                      >
                        Apply Now 
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
