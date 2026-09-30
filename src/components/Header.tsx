import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { NAV_LINKS, COMPANY_CONFIG, buildWhatsAppUrl, buildGmailUrl } from '../data/companyData';
import { WhatsAppIcon, GmailIcon } from './ServiceIcon';

interface HeaderProps {
  activeSection: string;
  onOpenContactModal: (contextLabel?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onOpenContactModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding,border-color,background-color] duration-200 ${
          isScrolled
            ? 'bg-[#000612]/95 backdrop-blur-md border-b border-[#ece1df]/20 py-3'
            : 'bg-[#000612] border-b border-[#ece1df]/10 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Logo & Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group focus:outline-none"
            aria-label={`${COMPANY_CONFIG.name} — Back to top`}
          >
            <BrandLogo size="md" showWordmarkText={true} />
          </a>

          {/* Zone 2: Clean Typography Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-9"
            aria-label="Primary Navigation"
          >
            {NAV_LINKS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative py-1.5 text-sm font-medium text-[#ece1df] whitespace-nowrap shrink-0 group"
                >
                  <span className={isActive ? 'opacity-100 font-semibold' : 'opacity-80 group-hover:opacity-100 transition-opacity duration-150'}>
                    {item.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#ece1df] origin-left transition-transform duration-200 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenContactModal('Header — Get Started')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#ece1df] text-[#000612] font-display font-bold text-xs sm:text-sm tracking-tight whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-[#ece1df]/30 text-[#ece1df] bg-[#000612] transition-transform duration-150 active:scale-95"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-[#000612] pt-20 pb-8 px-6 flex flex-col justify-between overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <nav className="flex flex-col border-t border-[#ece1df]/15 mt-2" aria-label="Mobile Navigation">
              {NAV_LINKS.map((item, idx) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.2 }}
                    className="flex items-center justify-between py-4 border-b border-[#ece1df]/15 text-xl font-display font-bold text-[#ece1df]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xs font-mono-tabular opacity-60">0{idx + 1}</span>
                      <span>{item.label}</span>
                    </span>
                    <span className="text-xs font-mono-tabular opacity-70">
                      {isActive ? 'Active' : '→'}
                    </span>
                  </motion.a>
                );
              })}
            </nav>

            <div className="pt-8 space-y-4">
              <p className="text-xs font-mono-tabular opacity-70">Direct Contact Channels</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2.5 py-3.5 px-4 bg-[#ece1df] text-[#000612] font-display font-bold text-sm whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp Direct</span>
                </a>
                <a
                  href={buildGmailUrl()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2.5 py-3.5 px-4 border border-[#ece1df] text-[#ece1df] bg-[#000612] font-display font-bold text-sm whitespace-nowrap"
                >
                  <GmailIcon className="w-4 h-4" />
                  <span>Gmail / Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
