import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/companyData';

interface ProcessSectionProps {
  onOpenContactModal: (contextLabel?: string) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenContactModal }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = PROCESS_STEPS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? PROCESS_STEPS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === PROCESS_STEPS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="process"
      className="py-20 sm:py-28 border-b border-[#ece1df]/15"
      aria-labelledby="process-heading"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#ece1df]/20"
        >
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#ece1df]/75">
              <span>04</span>
              <span aria-hidden="true">·</span>
              <span>Service Process</span>
              <span aria-hidden="true">·</span>
              <span>01 — 06 Workflow</span>
            </div>

            <h2
              id="process-heading"
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#ece1df] leading-[1.1] tracking-tight"
            >
              A Structured Workflow From Discovery to Ongoing Support.
            </h2>
          </div>

          {/* Step Navigation Controls */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            <span className="text-xs font-mono-tabular text-[#ece1df]/75 mr-2">
              Stage {activeStep.number} of 06
            </span>
            <button
              type="button"
              onClick={handlePrev}
              className="w-11 h-11 border border-[#ece1df]/35 hover:border-[#ece1df] flex items-center justify-center text-[#ece1df] bg-[#000612] transition-transform duration-150 active:scale-95"
              aria-label="Previous process step"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-11 h-11 border border-[#ece1df]/35 hover:border-[#ece1df] flex items-center justify-center text-[#ece1df] bg-[#000612] transition-transform duration-150 active:scale-95"
              aria-label="Next process step"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Interactive Active Stage Spotlight */}
        <div className="pt-10 pb-12">
          <div className="border border-[#ece1df]/30 bg-[#000612] p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-xs sm:text-sm font-mono-tabular text-[#ece1df]/75">
                    Active Stage · {activeStep.number} — {activeStep.title}
                  </div>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#ece1df]">
                    {activeStep.number} — {activeStep.title}: {activeStep.summary}
                  </h3>
                  <p className="text-sm sm:text-base text-[#ece1df]/85 leading-relaxed max-w-2xl">
                    {activeStep.detail}
                  </p>
                </div>

                <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#ece1df]/20 pt-6 lg:pt-0 lg:pl-8 space-y-4">
                  <div className="text-xs font-mono-tabular text-[#ece1df]/70">
                    Stage Focus & Key Outputs
                  </div>
                  <ul className="space-y-2.5">
                    {activeStep.outputs.map((output, i) => (
                      <li
                        key={output}
                        className="flex items-center gap-3 text-sm font-mono-tabular text-[#ece1df]"
                      >
                        <span className="text-xs text-[#ece1df]/60">0{i + 1}</span>
                        <span>{output}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenContactModal(`Process Stage ${activeStep.number} — ${activeStep.title}`)
                      }
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold text-[#ece1df] underline underline-offset-4 whitespace-nowrap"
                    >
                      <span>Start with {activeStep.title}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* All 6 Steps Visual Workflow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <motion.button
                key={step.id}
                type="button"
                data-cursor="card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.38,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setActiveIndex(idx)}
                className={`text-left p-5 border transition-transform duration-150 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#ece1df] text-[#000612] border-[#ece1df] -translate-y-1'
                    : 'bg-[#000612] text-[#ece1df] border-[#ece1df]/25 hover:border-[#ece1df]'
                }`}
                aria-pressed={isSelected}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`font-mono-tabular text-xs font-semibold ${
                        isSelected ? 'text-[#000612]' : 'text-[#ece1df]/75'
                      }`}
                    >
                      {step.number} — {step.title}
                    </span>
                  </div>
                  <h4
                    className={`font-display font-bold text-lg mb-2 ${
                      isSelected ? 'text-[#000612]' : 'text-[#ece1df]'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p
                    className={`text-xs leading-relaxed ${
                      isSelected ? 'text-[#000612]/90 font-medium' : 'text-[#ece1df]/75'
                    }`}
                  >
                    {step.summary}
                  </p>
                </div>

                <div
                  className={`mt-5 pt-3 border-t text-[11px] font-mono-tabular flex items-center justify-between ${
                    isSelected
                      ? 'border-[#000612]/20 text-[#000612]'
                      : 'border-[#ece1df]/15 text-[#ece1df]/65'
                  }`}
                >
                  <span>Step {step.number}</span>
                  <span>{isSelected ? 'Selected' : 'Inspect →'}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
