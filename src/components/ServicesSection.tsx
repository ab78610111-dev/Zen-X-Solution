import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import {
  CONFIRMED_SERVICES,
  SERVICE_CATEGORIES,
  ServiceCategory,
  ServiceItem,
} from '../data/companyData';
import { ServiceIcon } from './ServiceIcon';

interface ServicesSectionProps {
  selectedCategory: ServiceCategory | 'ALL';
  onSelectCategory: (category: ServiceCategory | 'ALL') => void;
  selectedServiceIds: string[];
  onToggleServiceSelection: (serviceId: string) => void;
  onInquireService: (service: ServiceItem) => void;
  onAskSupportAssistant: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedServiceIds,
  onToggleServiceSelection,
  onInquireService,
  onAskSupportAssistant,
}) => {
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);

  const categoriesToDisplay =
    selectedCategory === 'ALL' ? SERVICE_CATEGORIES : [selectedCategory];

  return (
    <section
      id="services"
      className="py-20 sm:py-28 border-b border-[#ece1df]/15"
      aria-labelledby="services-heading"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header & Interactive Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#ece1df]/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 max-w-2xl"
          >
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#ece1df]/75">
              <span>02</span>
              <span aria-hidden="true">·</span>
              <span>Confirmed Capabilities</span>
              <span aria-hidden="true">·</span>
              <span>20 Specialized Services</span>
            </div>

            <h2
              id="services-heading"
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#ece1df] leading-[1.1] tracking-tight"
            >
              Comprehensive Digital Services Built for Execution.
            </h2>

            <p className="text-base sm:text-lg text-[#ece1df]/80 leading-relaxed">
              Explore our 20 confirmed services across five core disciplines. Select any service to
              include it in your project inquiry or initiate a direct conversation.
            </p>
          </motion.div>

          {/* Interactive Category Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Filter services by category"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'ALL'}
              onClick={() => onSelectCategory('ALL')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-mono-tabular transition-transform duration-150 whitespace-nowrap shrink-0 border ${
                selectedCategory === 'ALL'
                  ? 'bg-[#ece1df] text-[#000612] border-[#ece1df] font-semibold'
                  : 'bg-[#000612] text-[#ece1df] border-[#ece1df]/30 hover:border-[#ece1df]'
              }`}
            >
              All Services (20)
            </button>

            {SERVICE_CATEGORIES.map((category) => {
              const count = CONFIRMED_SERVICES.filter((s) => s.category === category).length;
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectCategory(category)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-mono-tabular transition-transform duration-150 whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? 'bg-[#ece1df] text-[#000612] border-[#ece1df] font-semibold'
                      : 'bg-[#000612] text-[#ece1df] border-[#ece1df]/30 hover:border-[#ece1df]'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Category Groups & Responsive Service Cards Grid */}
        <div className="space-y-16 pt-12">
          {categoriesToDisplay.map((category) => {
            const categoryServices = CONFIRMED_SERVICES.filter((s) => s.category === category);
            return (
              <div key={category} className="space-y-6">
                {/* Category Subheader */}
                <div className="flex items-baseline justify-between border-b border-[#ece1df]/15 pb-3">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#ece1df]">
                    {category}
                  </h3>
                  <span className="text-xs sm:text-sm font-mono-tabular text-[#ece1df]/70">
                    {categoryServices.length}{' '}
                    {categoryServices.length === 1 ? 'Confirmed Service' : 'Confirmed Services'}
                  </span>
                </div>

                {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col laptop/desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service, idx) => {
                    const isHovered = hoveredServiceId === service.id;
                    const isSelectedForInquiry = selectedServiceIds.includes(service.id);

                    return (
                      <motion.article
                        key={service.id}
                        data-cursor="card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.05,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        onMouseEnter={() => setHoveredServiceId(service.id)}
                        onMouseLeave={() => setHoveredServiceId(null)}
                        className={`relative border bg-[#000612] p-6 sm:p-8 flex flex-col justify-between transition-transform duration-200 ${
                          isHovered ? '-translate-y-1 border-[#ece1df]' : 'border-[#ece1df]/25'
                        }`}
                      >
                        {/* Architectural Corner Accent on Hover or Selection */}
                        <span
                          className={`pointer-events-none absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ece1df] transition-opacity duration-150 ${
                            isHovered || isSelectedForInquiry ? 'opacity-100' : 'opacity-0'
                          }`}
                          aria-hidden="true"
                        />
                        <span
                          className={`pointer-events-none absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ece1df] transition-opacity duration-150 ${
                            isHovered || isSelectedForInquiry ? 'opacity-100' : 'opacity-0'
                          }`}
                          aria-hidden="true"
                        />

                        <div>
                          {/* Top Row: Number Index & Line-Style Service Icon */}
                          <div className="flex items-center justify-between gap-4 mb-6">
                            <span className="text-xs font-mono-tabular text-[#ece1df]/70">
                              {service.index} · {service.category}
                            </span>

                            <div
                              className={`w-11 h-11 border flex items-center justify-center transition-transform duration-200 ${
                                isHovered
                                  ? 'scale-110 border-[#ece1df] bg-[#ece1df] text-[#000612]'
                                  : 'border-[#ece1df]/30 bg-[#000612] text-[#ece1df]'
                              }`}
                            >
                              <ServiceIcon icon={service.icon} className="w-5 h-5" />
                            </div>
                          </div>

                          {/* Confirmed Service Name */}
                          <h4 className="font-display font-bold text-xl sm:text-2xl text-[#ece1df] tracking-tight mb-3">
                            {service.name}
                          </h4>

                          {/* Service Description */}
                          <p
                            className={`text-sm sm:text-base leading-relaxed transition-opacity duration-200 ${
                              isHovered ? 'text-[#ece1df] opacity-100' : 'text-[#ece1df]/80'
                            }`}
                          >
                            {service.description}
                          </p>

                          {/* Key Deliverables List */}
                          <ul className="mt-5 pt-4 border-t border-[#ece1df]/15 space-y-1.5">
                            {service.deliverables.map((item) => (
                              <li
                                key={item}
                                className="text-xs font-mono-tabular text-[#ece1df]/75 flex items-center gap-2"
                              >
                                <span aria-hidden="true">—</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Interactive Card Actions */}
                        <div className="mt-7 pt-4 border-t border-[#ece1df]/20 flex flex-wrap items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => onToggleServiceSelection(service.id)}
                            className={`inline-flex items-center gap-1.5 text-xs font-mono-tabular py-1.5 px-3 border transition-transform duration-150 whitespace-nowrap shrink-0 ${
                              isSelectedForInquiry
                                ? 'bg-[#ece1df] text-[#000612] border-[#ece1df] font-semibold'
                                : 'bg-[#000612] text-[#ece1df] border-[#ece1df]/30 hover:border-[#ece1df]'
                            }`}
                            aria-pressed={isSelectedForInquiry}
                          >
                            {isSelectedForInquiry && <Check className="w-3.5 h-3.5" />}
                            <span>
                              {isSelectedForInquiry ? 'Added to Scope' : '+ Add to Scope'}
                            </span>
                          </button>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => onAskSupportAssistant(service)}
                              className="text-xs font-mono-tabular text-[#ece1df]/80 hover:text-[#ece1df] underline underline-offset-4 whitespace-nowrap shrink-0"
                            >
                              Support Chat
                            </button>

                            <button
                              type="button"
                              onClick={() => onInquireService(service)}
                              className="inline-flex items-center gap-1 text-xs sm:text-sm font-display font-bold text-[#ece1df] group/btn whitespace-nowrap shrink-0"
                            >
                              <span>Inquire</span>
                              <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
