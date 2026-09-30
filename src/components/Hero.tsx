import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  COMPANY_CONFIG,
  CONFIRMED_SERVICES,
  SERVICE_CATEGORIES,
  ServiceCategory,
} from '../data/companyData';
import { BrandLogo } from './BrandLogo';
import { ServiceIcon } from './ServiceIcon';

interface HeroProps {
  onSelectCategoryAndScroll: (category: ServiceCategory | 'ALL') => void;
  onOpenContactModal: (contextLabel?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectCategoryAndScroll,
  onOpenContactModal,
}) => {
  const [activePillar, setActivePillar] = useState<ServiceCategory>('Web & Development');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const pillarServices = CONFIRMED_SERVICES.filter((s) => s.category === activePillar);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: normX * 14, y: normY * 14 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const headlineWords = [
    'Engineering',
    'Digital',
    'Products,',
    'Growth',
    '&',
    'Support',
    'Under',
    'One',
    'Roof.',
  ];

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 flex items-center border-b border-[#ece1df]/15 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Subtle Architectural Hairline Grid strictly in #ece1df */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ece1df 1px, transparent 1px), linear-gradient(to bottom, #ece1df 1px, transparent 1px)',
          backgroundSize: '4.5rem 4.5rem',
          transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px, 0)`,
          transition: 'transform 200ms ease-out',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Core Proposition, Headline & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            {/* Quiet Unboxed Metadata Kicker (Zero-Pill Discipline) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-mono-tabular text-[#ece1df]/80"
            >
              <span>{COMPANY_CONFIG.name}</span>
              <span aria-hidden="true">·</span>
              <span>5 Core Service Pillars</span>
              <span aria-hidden="true">·</span>
              <span>20 Confirmed Digital Capabilities</span>
            </motion.div>

            {/* Primary H1 with Staggered Word Reveal */}
            <h1
              id="hero-heading"
              className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl xl:text-[4.15rem] leading-[1.06] tracking-tight text-[#ece1df] max-w-3xl"
            >
              {headlineWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.06 + index * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-[0.26em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Concise Professional Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-[#ece1df]/85 leading-relaxed max-w-2xl font-normal"
            >
              ZenX Solutions partners with businesses to design, build, market, and support modern
              digital experiences. From custom web and mobile applications to Shopify commerce,
              search visibility, creative production, and dedicated support operations.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                type="button"
                onClick={() => onOpenContactModal('Hero — Start a Project')}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#ece1df] text-[#000612] font-display font-bold text-sm sm:text-base whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={() => onSelectCategoryAndScroll('ALL')}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 border border-[#ece1df] text-[#ece1df] bg-[#000612] font-display font-bold text-sm sm:text-base whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <span>Explore 20 Services</span>
                <ArrowDownRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
            </motion.div>

            {/* Interactive Service Domain Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.62 }}
              className="pt-6 border-t border-[#ece1df]/15"
            >
              <p className="text-xs font-mono-tabular text-[#ece1df]/65 mb-3">
                Interactive Capability Preview — Select a domain to inspect or jump to section:
              </p>
              <div
                className="flex flex-wrap items-center gap-2"
                role="tablist"
                aria-label="Service Capability Domains"
              >
                {SERVICE_CATEGORIES.map((category) => {
                  const isSelected = activePillar === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActivePillar(category)}
                      className={`px-3.5 py-2 text-xs sm:text-sm font-medium transition-transform duration-150 whitespace-nowrap shrink-0 border ${
                        isSelected
                          ? 'bg-[#ece1df] text-[#000612] border-[#ece1df] font-semibold'
                          : 'bg-[#000612] text-[#ece1df]/85 border-[#ece1df]/25 hover:border-[#ece1df]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Brand & Service Architecture Stage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div
              className="border border-[#ece1df]/25 bg-[#000612] p-6 sm:p-8 relative"
              style={{
                transform: `translate3d(${mouseOffset.x * -0.35}px, ${mouseOffset.y * -0.35}px, 0)`,
                transition: 'transform 200ms ease-out',
              }}
            >
              {/* Corner Architectural Ticks */}
              <span
                className="pointer-events-none absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#ece1df]"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#ece1df]"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#ece1df]"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#ece1df]"
                aria-hidden="true"
              />

              {/* Prominent Client Brand Identity Header */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#ece1df]/15">
                <BrandLogo size="lg" showWordmarkText={false} />
                <div className="text-right">
                  <div className="font-display font-bold text-base sm:text-lg text-[#ece1df]">
                    {COMPANY_CONFIG.name}
                  </div>
                  <div className="text-xs font-mono-tabular text-[#ece1df]/70 mt-0.5">
                    Full-Lifecycle Digital Partner
                  </div>
                </div>
              </div>

              {/* Active Pillar Header */}
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-xs font-mono-tabular text-[#ece1df]/65 block">
                    Active Domain Preview
                  </span>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-[#ece1df] mt-0.5">
                    {activePillar}
                  </h2>
                </div>
                <span className="text-xs font-mono-tabular text-[#ece1df]/80">
                  {pillarServices.length}{' '}
                  {pillarServices.length === 1 ? 'Service' : 'Services'}
                </span>
              </div>

              {/* Interactive Service Rows for Selected Pillar */}
              <div className="divide-y divide-[#ece1df]/15 border-t border-b border-[#ece1df]/15">
                {pillarServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => onSelectCategoryAndScroll(service.category)}
                    className="w-full py-3 px-2 flex items-center justify-between gap-3 text-left group transition-transform duration-150 hover:translate-x-1"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-mono-tabular text-[#ece1df]/60 shrink-0">
                        {service.index}
                      </span>
                      <ServiceIcon
                        icon={service.icon}
                        className="w-4 h-4 text-[#ece1df] shrink-0"
                      />
                      <span className="text-sm font-medium text-[#ece1df] truncate">
                        {service.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#ece1df]/60 group-hover:text-[#ece1df] shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                ))}
              </div>

              {/* Action Footer inside Visual Stage */}
              <div className="pt-5 flex items-center justify-between gap-4">
                <span className="text-xs text-[#ece1df]/70">
                  Need a custom combination of services?
                </span>
                <button
                  type="button"
                  onClick={() => onSelectCategoryAndScroll(activePillar)}
                  className="text-xs font-mono-tabular font-medium text-[#ece1df] underline underline-offset-4 whitespace-nowrap shrink-0"
                >
                  View {activePillar} →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
