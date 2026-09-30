import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { VALUE_PROPOSITIONS, COMPANY_CONFIG } from '../data/companyData';

interface WhyChooseUsSectionProps {
  onOpenContactModal: (contextLabel?: string) => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  onOpenContactModal,
}) => {
  const [activeId, setActiveId] = useState<string>(VALUE_PROPOSITIONS[0].id);

  return (
    <section
      id="why-us"
      className="py-20 sm:py-28 border-b border-[#ece1df]/15"
      aria-labelledby="why-us-heading"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#ece1df]/20"
        >
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#ece1df]/75">
              <span>03</span>
              <span aria-hidden="true">·</span>
              <span>Why Choose {COMPANY_CONFIG.name}</span>
            </div>

            <h2
              id="why-us-heading"
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#ece1df] leading-[1.1] tracking-tight"
            >
              Built on Clarity, Technical Reliability & Full-Lifecycle Accountability.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#ece1df]/80 max-w-md leading-relaxed">
            Every engagement is structured around practical execution, modern standards, and
            dependable support across all five service domains.
          </p>
        </motion.div>

        {/* Interactive 6-Block Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {VALUE_PROPOSITIONS.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <motion.div
                key={item.id}
                data-cursor="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActiveId(item.id)}
                onClick={() => setActiveId(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveId(item.id);
                  }
                }}
                className={`border p-6 sm:p-8 flex flex-col justify-between transition-transform duration-200 text-left ${
                  isActive
                    ? 'border-[#ece1df] -translate-y-1 bg-[#000612]'
                    : 'border-[#ece1df]/20 bg-[#000612] hover:border-[#ece1df]/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="font-mono-tabular text-sm font-medium text-[#ece1df]">
                      {item.index}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 border border-[#ece1df] transition-transform duration-150 ${
                        isActive ? 'bg-[#ece1df] scale-110' : 'bg-[#000612]'
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#ece1df] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#ece1df]/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#ece1df]/15 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono-tabular text-[#ece1df]/75">
                    {item.highlights.map((h, i) => (
                      <React.Fragment key={h}>
                        {i > 0 && <span aria-hidden="true">·</span>}
                        <span>{h}</span>
                      </React.Fragment>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenContactModal(`Value Proposition — ${item.title}`);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-mono-tabular text-[#ece1df] underline underline-offset-4 mt-2 whitespace-nowrap shrink-0"
                  >
                    <span>Discuss</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
