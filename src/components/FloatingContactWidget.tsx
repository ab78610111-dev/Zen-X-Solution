import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Headphones, X, ArrowUpRight } from 'lucide-react';
import {
  COMPANY_CONFIG,
  buildWhatsAppUrl,
  buildGmailUrl,
} from '../data/companyData';
import { WhatsAppIcon, GmailIcon } from './ServiceIcon';

interface FloatingContactWidgetProps {
  isOpen: boolean;
  contextLabel?: string;
  selectedServiceNames: string[];
  onToggleOpen: () => void;
  onClose: () => void;
  onOpenSupportChat: (initialPrompt?: string) => void;
}

export const FloatingContactWidget: React.FC<FloatingContactWidgetProps> = ({
  isOpen,
  contextLabel,
  selectedServiceNames,
  onToggleOpen,
  onClose,
  onOpenSupportChat,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const buildMessage = () => {
    const parts: string[] = [
      `Hello ${COMPANY_CONFIG.name}, I would like to discuss a project.`,
    ];
    if (contextLabel) {
      parts.push(`Inquiry Topic: ${contextLabel}`);
    }
    if (selectedServiceNames.length > 0) {
      parts.push(`Selected Services: ${selectedServiceNames.join(', ')}`);
    }
    return parts.join('\n');
  };

  const message = buildMessage();
  const whatsappUrl = buildWhatsAppUrl(message);
  const gmailUrl = buildGmailUrl(
    contextLabel
      ? `${contextLabel} — ${COMPANY_CONFIG.name}`
      : `Project Inquiry — ${COMPANY_CONFIG.name}`,
    message
  );

  return (
    <div
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col items-end"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Animated Contact Panel / Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[calc(100vw-2.5rem)] max-w-xs sm:max-w-sm border border-[#ece1df] bg-[#000612] p-5"
            role="dialog"
            aria-label="Contact ZenX Solutions via WhatsApp, Gmail, or Customer Support Chat"
          >
            <div className="flex items-start justify-between gap-3 pb-3.5 mb-4 border-b border-[#ece1df]/20">
              <div>
                <span className="text-[11px] font-mono-tabular text-[#ece1df]/70 block">
                  {COMPANY_CONFIG.name} · Direct Contact
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#ece1df] mt-0.5">
                  Connect With Our Team
                </h3>
                {contextLabel && (
                  <p className="text-xs font-mono-tabular text-[#ece1df]/80 mt-1 truncate max-w-[230px]">
                    Re: {contextLabel}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 border border-[#ece1df]/30 hover:border-[#ece1df] flex items-center justify-center text-[#ece1df] shrink-0"
                aria-label="Close contact popover"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Step 1: WhatsApp Icon & Action Appears */}
              <motion.a
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04, duration: 0.18 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3.5 bg-[#ece1df] text-[#000612] flex items-center justify-between gap-3 font-display font-bold transition-transform duration-150 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-3">
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  <span className="text-left">
                    <span className="block text-sm font-bold leading-tight">WhatsApp</span>
                    <span className="block text-[11px] font-mono-tabular opacity-80">
                      Open WhatsApp Chat
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </motion.a>

              {/* Step 2: Gmail / Email Icon & Action Appears */}
              <motion.a
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08, duration: 0.18 }}
                href={gmailUrl}
                className="w-full p-3.5 border border-[#ece1df] bg-[#000612] text-[#ece1df] flex items-center justify-between gap-3 font-display font-bold transition-transform duration-150 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <GmailIcon className="w-5 h-5 shrink-0" />
                  <span className="text-left min-w-0">
                    <span className="block text-sm font-bold leading-tight">Gmail / Email</span>
                    <span className="block text-[11px] font-mono-tabular opacity-80 truncate">
                      {COMPANY_CONFIG.email}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </motion.a>

              {/* Step 3: Live Customer Support Assistant (Gemini + Google Search Grounding) */}
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.18 }}
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSupportChat(
                    contextLabel
                      ? `Can you tell me more about ${contextLabel} and how we can get started?`
                      : undefined
                  );
                }}
                className="w-full p-3.5 border border-[#ece1df]/50 hover:border-[#ece1df] bg-[#000612] text-[#ece1df] flex items-center justify-between gap-3 font-display font-bold transition-transform duration-150 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-3">
                  <Headphones className="w-5 h-5 shrink-0" />
                  <span className="text-left">
                    <span className="block text-sm font-bold leading-tight">
                      Customer Support Chat
                    </span>
                    <span className="block text-[11px] font-mono-tabular opacity-80">
                      Instant AI Support · Google Search Grounded
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons Row */}
      <div className="flex items-center gap-2.5">
        <motion.button
          type="button"
          onClick={() => onOpenSupportChat()}
          aria-label="Open Customer Support AI Chat"
          whileTap={{ scale: 0.96 }}
          className="h-12 sm:h-13 px-4 sm:px-5 border border-[#ece1df] bg-[#000612] text-[#ece1df] flex items-center gap-2 font-display font-bold text-xs sm:text-sm whitespace-nowrap transition-transform duration-150 hover:-translate-y-0.5"
        >
          <Headphones className="w-4 h-4" />
          <span>Support Chat</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={onToggleOpen}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close contact options' : 'Open WhatsApp and Gmail contact options'}
          whileTap={{ scale: 0.96 }}
          className={`h-12 sm:h-13 px-4 sm:px-5 border flex items-center gap-2.5 font-display font-bold text-xs sm:text-sm whitespace-nowrap transition-transform duration-150 hover:-translate-y-0.5 ${
            isOpen
              ? 'bg-[#000612] text-[#ece1df] border-[#ece1df]'
              : 'bg-[#ece1df] text-[#000612] border-[#ece1df]'
          }`}
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4" />
              <span>Close</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-4 h-4" />
              <span>Contact Us</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};
