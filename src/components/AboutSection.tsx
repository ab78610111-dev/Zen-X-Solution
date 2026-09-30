import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY_CONFIG, SERVICE_CATEGORIES, CONFIRMED_SERVICES, ServiceCategory } from '../data/companyData';

interface AboutSectionProps {
  onSelectCategoryAndScroll: (category: ServiceCategory) => void;
}

const PILLAR_SUMMARIES: Record<ServiceCategory, string> = {
  'Web & Development':
    'Custom web development, responsive website design, mobile applications, UI/UX systems, maintenance, and payment gateway integrations.',
  'E-Commerce':
    'Dedicated Shopify development and operational e-commerce store management built for seamless online transactions.',
  'Digital Marketing':
    'Search engine optimization, local SEO, social media marketing and management, and structured content marketing programs.',
  'Creative':
    'Brand-aligned graphic design, professional video editing, and original content creation across digital formats.',
  'Support':
    'Responsive customer support, technical troubleshooting, and structured call center services to keep operations running smoothly.',
};

export const AboutSection: React.FC<AboutSectionProps> = ({ onSelectCategoryAndScroll }) => {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 border-b border-[#ece1df]/15"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Section Index & Editorial Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#ece1df]/75">
              <span>01</span>
              <span aria-hidden="true">·</span>
              <span>About {COMPANY_CONFIG.name}</span>
            </div>

            <h2
              id="about-heading"
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#ece1df] leading-[1.12] tracking-tight"
            >
              A Unified Partner for Modern Digital Execution.
            </h2>

            <p className="text-base sm:text-lg text-[#ece1df]/85 leading-relaxed">
              {COMPANY_CONFIG.name} is a digital services company structured to help businesses
              build, manage, and grow their online operations without coordinating disconnected
              vendors.
            </p>

            <p className="text-sm sm:text-base text-[#ece1df]/75 leading-relaxed">
              Our approach combines technical precision in web, mobile, and e-commerce engineering
              with disciplined digital marketing, creative production, and dependable support
              services—ensuring every stage of your digital presence works together cohesively.
            </p>
          </motion.div>

          {/* Right Column: 5 Integrated Pillars Overview */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-[#ece1df]/20"
            >
              {SERVICE_CATEGORIES.map((category, idx) => {
                const count = CONFIRMED_SERVICES.filter((s) => s.category === category).length;
                return (
                  <button
                    key={category}
                    type="button"
                    data-cursor="card"
                    onClick={() => onSelectCategoryAndScroll(category)}
                    className="w-full text-left py-6 sm:py-7 border-b border-[#ece1df]/20 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group transition-transform duration-150 hover:translate-x-1.5"
                  >
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono-tabular text-[#ece1df]/60">
                          0{idx + 1}
                        </span>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-[#ece1df]">
                          {category}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-[#ece1df]/80 leading-relaxed pl-7">
                        {PILLAR_SUMMARIES[category]}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pl-7 sm:pl-0 shrink-0 self-start sm:self-center">
                      <span className="text-xs font-mono-tabular text-[#ece1df]/70">
                        {count} {count === 1 ? 'Service' : 'Services'}
                      </span>
                      <span className="inline-flex items-center justify-center w-9 h-9 border border-[#ece1df]/30 group-hover:border-[#ece1df] text-[#ece1df] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
