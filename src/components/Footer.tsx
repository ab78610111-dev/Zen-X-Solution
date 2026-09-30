import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import {
  COMPANY_CONFIG,
  NAV_LINKS,
  SERVICE_CATEGORIES,
  ServiceCategory,
  buildWhatsAppUrl,
  buildGmailUrl,
} from '../data/companyData';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon, GmailIcon } from './ServiceIcon';

interface FooterProps {
  onSelectCategoryAndScroll: (category: ServiceCategory | 'ALL') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategoryAndScroll }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      className="bg-[#000612] text-[#ece1df] pt-16 sm:pt-20 pb-24 sm:pb-16"
      aria-label="Site Footer"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-[#ece1df]/15">
          {/* Column 1: Brand Identity & Description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-5"
          >
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="inline-block focus:outline-none"
              aria-label={`${COMPANY_CONFIG.name} — Back to top`}
            >
              <BrandLogo size="lg" showWordmarkText={true} />
            </a>

            <p className="text-sm sm:text-base text-[#ece1df]/80 leading-relaxed max-w-md">
              Professional digital services company delivering web development, e-commerce, digital
              marketing, creative production, and technical support solutions.
            </p>
          </motion.div>

          {/* Column 2: Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-4"
          >
            <h2 className="font-display font-bold text-sm tracking-tight text-[#ece1df]">
              Navigation
            </h2>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-[#ece1df]/75 hover:text-[#ece1df] transition-opacity duration-150 inline-flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services Categories */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 space-y-4"
          >
            <h2 className="font-display font-bold text-sm tracking-tight text-[#ece1df]">
              Confirmed Service Pillars
            </h2>
            <ul className="space-y-2.5">
              {SERVICE_CATEGORIES.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => onSelectCategoryAndScroll(category)}
                    className="text-sm text-[#ece1df]/75 hover:text-[#ece1df] transition-opacity duration-150 text-left"
                  >
                    {category}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryAndScroll('ALL')}
                  className="text-xs font-mono-tabular text-[#ece1df] underline underline-offset-4 pt-1"
                >
                  View All 20 Services →
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Direct Contact Channels */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-4"
          >
            <h2 className="font-display font-bold text-sm tracking-tight text-[#ece1df]">
              Direct Contact
            </h2>
            <div className="space-y-3">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-[#ece1df]/85 hover:text-[#ece1df] group"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={buildGmailUrl()}
                className="flex items-center gap-2.5 text-sm text-[#ece1df]/85 hover:text-[#ece1df] group"
              >
                <GmailIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">Email / Gmail</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-tabular text-[#ece1df]/70">
          <p>
            © {new Date().getFullYear()} {COMPANY_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span>Web &amp; Mobile</span>
            <span aria-hidden="true">·</span>
            <span>E-Commerce</span>
            <span aria-hidden="true">·</span>
            <span>Digital Marketing</span>
            <span aria-hidden="true">·</span>
            <span>Creative</span>
            <span aria-hidden="true">·</span>
            <span>Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
