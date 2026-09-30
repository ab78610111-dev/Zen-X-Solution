import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import {
  COMPANY_CONFIG,
  CONFIRMED_SERVICES,
  buildWhatsAppUrl,
  buildGmailUrl,
} from '../data/companyData';
import { WhatsAppIcon, GmailIcon } from './ServiceIcon';

interface ContactSectionProps {
  selectedServiceIds: string[];
  onToggleServiceSelection: (serviceId: string) => void;
  onClearSelectedServices: () => void;
  onOpenContactModal: (contextLabel?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedServiceIds,
  onToggleServiceSelection,
  onClearSelectedServices,
  onOpenContactModal,
}) => {
  const [inlinePanelOpen, setInlinePanelOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formPrepared, setFormPrepared] = useState(false);

  const selectedServiceNames = CONFIRMED_SERVICES.filter((s) =>
    selectedServiceIds.includes(s.id)
  ).map((s) => s.name);

  const composeInquiryText = () => {
    const lines: string[] = [
      `Hello ${COMPANY_CONFIG.name},`,
      '',
      'I would like to discuss a digital project with your team.',
    ];
    if (clientName.trim()) {
      lines.push(`Name: ${clientName.trim()}`);
    }
    if (clientEmail.trim()) {
      lines.push(`Email: ${clientEmail.trim()}`);
    }
    if (selectedServiceNames.length > 0) {
      lines.push(`Selected Services (${selectedServiceNames.length}): ${selectedServiceNames.join(', ')}`);
    }
    if (projectNotes.trim()) {
      lines.push('', `Project Overview: ${projectNotes.trim()}`);
    }
    return lines.join('\n');
  };

  const handlePrepareDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setFormError('Please enter your name so we can address your inquiry.');
      return;
    }
    if (clientEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormError(null);
    setFormPrepared(true);
    setInlinePanelOpen(true);
  };

  const composedMessage = composeInquiryText();
  const whatsappHref = buildWhatsAppUrl(composedMessage);
  const gmailHref = buildGmailUrl(
    selectedServiceNames.length > 0
      ? `Project Inquiry (${selectedServiceNames.slice(0, 2).join(', ')}) — ${COMPANY_CONFIG.name}`
      : `Project Inquiry — ${COMPANY_CONFIG.name}`,
    composedMessage
  );

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 border-b border-[#ece1df]/15"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
          {/* Left Column: Primary CTA Messaging & Interactive Contact Panel Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#ece1df]/75">
              <span>05</span>
              <span aria-hidden="true">·</span>
              <span>Start a Conversation</span>
            </div>

            <h2
              id="cta-heading"
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#ece1df] leading-[1.06] tracking-tight"
            >
              Have a Project in Mind?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-[#ece1df]/85 leading-relaxed max-w-xl">
              Let&apos;s discuss how we can help turn your idea into a professional digital
              solution. Choose a direct contact option below or customize your project scope.
            </p>

            {/* Primary CTA Buttons (Get Started, Contact Us, Discuss Your Project) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => setInlinePanelOpen((prev) => !prev)}
                aria-expanded={inlinePanelOpen}
                className="inline-flex items-center gap-2.5 px-6 py-4 bg-[#ece1df] text-[#000612] font-display font-bold text-sm sm:text-base whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5"
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setInlinePanelOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-4 border border-[#ece1df] text-[#ece1df] bg-[#000612] font-display font-bold text-sm sm:text-base whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5"
              >
                <span>Contact Us</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenContactModal('CTA Section — Discuss Your Project')}
                className="inline-flex items-center gap-2.5 px-6 py-4 border border-[#ece1df]/40 hover:border-[#ece1df] text-[#ece1df] bg-[#000612] font-display font-bold text-sm sm:text-base whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5"
              >
                <span>Discuss Your Project</span>
              </button>
            </div>

            {/* Interactive Animated WhatsApp & Gmail Panel (Section 17 flow) */}
            <AnimatePresence>
              {inlinePanelOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-[#ece1df] bg-[#000612] p-6 space-y-5"
                  role="region"
                  aria-label="Direct Contact Options"
                >
                  <div className="flex items-center justify-between border-b border-[#ece1df]/20 pb-3">
                    <div>
                      <span className="text-xs font-mono-tabular text-[#ece1df]/70 block">
                        Direct Contact Channels
                      </span>
                      <h3 className="font-display font-bold text-lg text-[#ece1df]">
                        Select Your Preferred Channel
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInlinePanelOpen(false)}
                      className="w-8 h-8 border border-[#ece1df]/30 flex items-center justify-center text-[#ece1df]"
                      aria-label="Close contact options panel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Option 1: WhatsApp */}
                    <motion.a
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05, duration: 0.2 }}
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-[#ece1df] text-[#000612] font-display font-bold transition-transform duration-150 hover:-translate-y-0.5"
                    >
                      <span className="flex items-center gap-3">
                        <WhatsAppIcon className="w-5 h-5 shrink-0" />
                        <span className="text-left">
                          <span className="block text-sm font-bold">WhatsApp</span>
                          <span className="block text-[11px] font-mono-tabular opacity-80">
                            Instant Messaging
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </motion.a>

                    {/* Option 2: Gmail / Email */}
                    <motion.a
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                      href={gmailHref}
                      className="flex items-center justify-between p-4 border border-[#ece1df] bg-[#000612] text-[#ece1df] font-display font-bold transition-transform duration-150 hover:-translate-y-0.5"
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <GmailIcon className="w-5 h-5 shrink-0" />
                        <span className="text-left min-w-0">
                          <span className="block text-sm font-bold">Gmail / Email</span>
                          <span className="block text-[11px] font-mono-tabular opacity-80 truncate">
                            {COMPANY_CONFIG.email}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Always-Accessible Direct Contact Summary */}
            <div className="pt-4 border-t border-[#ece1df]/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-[#ece1df]/25 hover:border-[#ece1df] flex items-center justify-between gap-3 transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <WhatsAppIcon className="w-5 h-5 text-[#ece1df]" />
                  <div>
                    <div className="text-xs font-mono-tabular text-[#ece1df]/70">WhatsApp</div>
                    <div className="text-sm font-display font-bold text-[#ece1df]">
                      Start WhatsApp Chat
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#ece1df]" />
              </a>

              <a
                href={gmailHref}
                className="p-4 border border-[#ece1df]/25 hover:border-[#ece1df] flex items-center justify-between gap-3 transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <GmailIcon className="w-5 h-5 text-[#ece1df] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-mono-tabular text-[#ece1df]/70">Gmail / Email</div>
                    <div className="text-sm font-display font-bold text-[#ece1df] truncate">
                      {COMPANY_CONFIG.email}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#ece1df] shrink-0" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Project Scope & Inquiry Composer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <form
              onSubmit={handlePrepareDispatch}
              noValidate
              className="border border-[#ece1df]/30 bg-[#000612] p-6 sm:p-8 lg:p-10 space-y-6"
            >
              <div className="flex items-baseline justify-between border-b border-[#ece1df]/15 pb-4">
                <div>
                  <span className="text-xs font-mono-tabular text-[#ece1df]/70 block">
                    Interactive Project Brief
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#ece1df] mt-0.5">
                    Configure Your Service Inquiry
                  </h3>
                </div>
                {selectedServiceIds.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearSelectedServices}
                    className="text-xs font-mono-tabular text-[#ece1df]/75 underline underline-offset-4"
                  >
                    Clear ({selectedServiceIds.length})
                  </button>
                )}
              </div>

              {/* Quick Service Selector (All 20 Confirmed Services) */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono-tabular text-[#ece1df]/80">
                  1. Select Confirmed Services of Interest ({selectedServiceIds.length} selected)
                </label>
                <div className="max-h-44 overflow-y-auto border border-[#ece1df]/20 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CONFIRMED_SERVICES.map((service) => {
                    const isChecked = selectedServiceIds.includes(service.id);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => onToggleServiceSelection(service.id)}
                        className={`text-left px-3 py-2 text-xs font-mono-tabular border flex items-center justify-between gap-2 transition-transform duration-150 ${
                          isChecked
                            ? 'bg-[#ece1df] text-[#000612] border-[#ece1df] font-semibold'
                            : 'bg-[#000612] text-[#ece1df]/85 border-[#ece1df]/20 hover:border-[#ece1df]'
                        }`}
                        aria-pressed={isChecked}
                      >
                        <span className="truncate">
                          {service.index}. {service.name}
                        </span>
                        {isChecked && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Client Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block text-xs font-mono-tabular text-[#ece1df]/80 mb-2"
                  >
                    2. Your Name *
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-[#000612] border border-[#ece1df]/35 focus:border-[#ece1df] text-sm text-[#ece1df] placeholder:text-[#ece1df]/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-xs font-mono-tabular text-[#ece1df]/80 mb-2"
                  >
                    3. Your Email (Optional)
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => {
                      setClientEmail(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 bg-[#000612] border border-[#ece1df]/35 focus:border-[#ece1df] text-sm text-[#ece1df] placeholder:text-[#ece1df]/40 focus:outline-none"
                  />
                </div>
              </div>

              {/* Project Overview */}
              <div>
                <label
                  htmlFor="inquiry-notes"
                  className="block text-xs font-mono-tabular text-[#ece1df]/80 mb-2"
                >
                  4. Project Goals & Requirements
                </label>
                <textarea
                  id="inquiry-notes"
                  rows={3}
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  placeholder="Briefly describe what you are looking to build, launch, or support..."
                  className="w-full px-4 py-3 bg-[#000612] border border-[#ece1df]/35 focus:border-[#ece1df] text-sm text-[#ece1df] placeholder:text-[#ece1df]/40 focus:outline-none resize-y"
                />
              </div>

              {formError && (
                <p
                  role="alert"
                  className="text-xs font-mono-tabular border border-[#ece1df] p-3 text-[#ece1df]"
                >
                  ! {formError}
                </p>
              )}

              {formPrepared && !formError && (
                <p
                  role="status"
                  className="text-xs font-mono-tabular border border-[#ece1df]/50 p-3 text-[#ece1df]"
                >
                  ✓ Inquiry brief prepared. Choose WhatsApp or Gmail below to send immediately.
                </p>
              )}

              {/* Submit / Dispatch Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-5 bg-[#ece1df] text-[#000612] font-display font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <span>Prepare & Open Contact Channels</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
