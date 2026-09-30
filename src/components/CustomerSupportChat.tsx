import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Headphones,
  Send,
  X,
  Globe,
  RotateCcw,
  ArrowUpRight,
  Zap,
  Terminal,
} from 'lucide-react';
import {
  COMPANY_CONFIG,
  buildWhatsAppUrl,
  buildGmailUrl,
} from '../data/companyData';
import { WhatsAppIcon, GmailIcon } from './ServiceIcon';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  sources?: Array<{ title: string; uri: string }>;
  modelUsed?: string;
  searchGrounded?: boolean;
}

type SupportMode = 'balanced' | 'fast' | 'technical';

interface CustomerSupportChatProps {
  isOpen: boolean;
  initialPrompt?: string;
  selectedServiceNames: string[];
  onClose: () => void;
}

const STARTER_PROMPTS = [
  'How do your Customer Support & Technical Support services work?',
  'What are the latest SEO & Core Web Vitals best practices?',
  'Which services do I need to launch and manage a Shopify store?',
  'Compare modern payment gateway options for global e-commerce',
];

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-0',
  role: 'model',
  text: 'Welcome to ZenX Solutions Customer & Technical Support. I can help you scope any of our 20 confirmed digital services, troubleshoot technical requirements, or look up live web insights using Google Search Grounding. How can we assist you today?',
  timestamp: 'Support Desk',
  searchGrounded: true,
};

export const CustomerSupportChat: React.FC<CustomerSupportChatProps> = ({
  isOpen,
  initialPrompt,
  selectedServiceNames,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<SupportMode>('balanced');
  const [useSearchGrounding, setUseSearchGrounding] = useState<boolean>(true);

  const threadEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const consumedInitialPromptRef = useRef<string | undefined>(undefined);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
    }
  }, [isOpen]);

  // Pre-fill initial prompt if triggered from a specific service card
  useEffect(() => {
    if (
      isOpen &&
      initialPrompt &&
      consumedInitialPromptRef.current !== initialPrompt
    ) {
      consumedInitialPromptRef.current = initialPrompt;
      setInput(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

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

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const nextHistory = [...messages, userMessage];
    setMessages(nextHistory);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const apiMessages = nextHistory
        .filter((m) => m.id !== 'welcome-0')
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const response = await fetch('/api/support/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          mode,
          useSearchGrounding: mode === 'fast' ? false : useSearchGrounding,
          selectedServices: selectedServiceNames,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || 'Unable to reach ZenX Customer Support assistant right now.'
        );
      }

      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: Array.isArray(data.sources) ? data.sources : [],
        modelUsed: data.modelUsed,
        searchGrounded: Boolean(data.searchGrounded),
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Connection error while contacting Customer Support.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const handleResetChat = () => {
    setMessages([INITIAL_WELCOME_MESSAGE]);
    setError(null);
  };

  const buildTranscriptSummary = () => {
    const recentTurns = messages
      .slice(-4)
      .map((m) => `${m.role === 'user' ? 'Client' : 'ZenX Support'}: ${m.text}`)
      .join('\n\n');
    return `Hello ${COMPANY_CONFIG.name}, I would like to follow up on my Customer Support chat:\n\n${recentTurns}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[90] flex justify-end bg-[#000612]/80 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="ZenX Solutions Live Customer Support Assistant"
        >
          {/* Backdrop click to close */}
          <div className="flex-1" onClick={onClose} aria-hidden="true" />

          {/* Slide-over Support Console strictly in #000612 and #ece1df */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl bg-[#000612] text-[#ece1df] border-l border-[#ece1df]/30 h-full flex flex-col justify-between relative z-10"
          >
            {/* Top Console Header */}
            <div className="p-5 sm:p-6 border-b border-[#ece1df]/20 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-[#ece1df] flex items-center justify-center bg-[#ece1df] text-[#000612] shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#ece1df]/75">
                      <span>{COMPANY_CONFIG.name}</span>
                      <span aria-hidden="true">·</span>
                      <span>Customer &amp; Technical Support</span>
                    </div>
                    <h2 className="font-display font-bold text-lg sm:text-xl text-[#ece1df]">
                      Interactive Support Desk
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetChat}
                    className="w-9 h-9 border border-[#ece1df]/30 hover:border-[#ece1df] flex items-center justify-center text-[#ece1df]"
                    title="Reset conversation"
                    aria-label="Reset conversation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-9 h-9 border border-[#ece1df]/30 hover:border-[#ece1df] flex items-center justify-center text-[#ece1df]"
                    aria-label="Close support chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Support Role Mode & Google Search Grounding Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div
                  className="flex flex-wrap items-center gap-1.5"
                  role="tablist"
                  aria-label="Support Assistant Mode"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'balanced'}
                    onClick={() => {
                      setMode('balanced');
                      setUseSearchGrounding(true);
                    }}
                    className={`px-2.5 py-1.5 text-xs font-mono-tabular border flex items-center gap-1.5 whitespace-nowrap ${
                      mode === 'balanced'
                        ? 'bg-[#ece1df] text-[#000612] border-[#ece1df] font-semibold'
                        : 'bg-[#000612] text-[#ece1df]/80 border-[#ece1df]/25 hover:border-[#ece1df]'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>General + Search</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'fast'}
                    onClick={() => {
                      setMode('fast');
                      setUseSearchGrounding(false);
                    }}
                    className={`px-2.5 py-1.5 text-xs font-mono-tabular border flex items-center gap-1.5 whitespace-nowrap ${
                      mode === 'fast'
                        ? 'bg-[#ece1df] text-[#000612] border-[#ece1df] font-semibold'
                        : 'bg-[#000612] text-[#ece1df]/80 border-[#ece1df]/25 hover:border-[#ece1df]'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Fast Reply</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'technical'}
                    onClick={() => {
                      setMode('technical');
                      setUseSearchGrounding(true);
                    }}
                    className={`px-2.5 py-1.5 text-xs font-mono-tabular border flex items-center gap-1.5 whitespace-nowrap ${
                      mode === 'technical'
                        ? 'bg-[#ece1df] text-[#000612] border-[#ece1df] font-semibold'
                        : 'bg-[#000612] text-[#ece1df]/80 border-[#ece1df]/25 hover:border-[#ece1df]'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Deep Technical</span>
                  </button>
                </div>

                {mode !== 'fast' && (
                  <button
                    type="button"
                    onClick={() => setUseSearchGrounding((prev) => !prev)}
                    aria-pressed={useSearchGrounding}
                    className={`px-2.5 py-1.5 text-[11px] font-mono-tabular border flex items-center gap-1.5 whitespace-nowrap ${
                      useSearchGrounding
                        ? 'border-[#ece1df] text-[#ece1df]'
                        : 'border-[#ece1df]/25 text-[#ece1df]/60'
                    }`}
                  >
                    <Globe className="w-3 h-3" />
                    <span>Google Search: {useSearchGrounding ? 'ON' : 'OFF'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Multi-Turn Message Thread */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-2 text-[11px] font-mono-tabular text-[#ece1df]/65 mb-1.5">
                      <span>{isUser ? 'You' : 'ZenX Support Specialist'}</span>
                      <span aria-hidden="true">·</span>
                      <span>{msg.timestamp}</span>
                      {!isUser && msg.searchGrounded && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            <span>Search Grounded</span>
                          </span>
                        </>
                      )}
                    </div>

                    <div
                      className={`max-w-[90%] p-4 border text-sm sm:text-base leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-[#ece1df] text-[#000612] border-[#ece1df] font-medium'
                          : 'bg-[#000612] text-[#ece1df] border-[#ece1df]/30'
                      }`}
                    >
                      {msg.text}

                      {/* Display Verified Google Search Grounding Sources */}
                      {!isUser && msg.sources && msg.sources.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-[#ece1df]/20 space-y-2">
                          <div className="text-[11px] font-mono-tabular text-[#ece1df]/75 flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5" />
                            <span>Google Search Grounding Sources ({msg.sources.length}):</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {msg.sources.map((source, idx) => (
                              <a
                                key={`${source.uri}-${idx}`}
                                href={source.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-mono-tabular px-2.5 py-1 border border-[#ece1df]/35 hover:border-[#ece1df] text-[#ece1df] max-w-full"
                              >
                                <span className="truncate max-w-[210px]">{source.title}</span>
                                <ArrowUpRight className="w-3 h-3 shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Starter Prompts if only welcome message is present */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-2 space-y-2.5">
                  <p className="text-xs font-mono-tabular text-[#ece1df]/70">
                    Suggested Customer Support Topics:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void sendMessage(prompt)}
                        className="text-left p-3 border border-[#ece1df]/25 hover:border-[#ece1df] text-xs sm:text-sm text-[#ece1df] flex items-center justify-between gap-3 transition-transform duration-150 hover:translate-x-1"
                      >
                        <span>{prompt}</span>
                        <ArrowUpRight className="w-4 h-4 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex items-center gap-3 text-xs font-mono-tabular text-[#ece1df]/80 p-3 border border-[#ece1df]/20">
                  <span className="w-2 h-2 bg-[#ece1df] animate-ping" />
                  <span>
                    {useSearchGrounding && mode !== 'fast'
                      ? 'Searching Google & formulating support response...'
                      : 'Formulating support response...'}
                  </span>
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="p-3.5 border border-[#ece1df] text-xs font-mono-tabular text-[#ece1df]"
                >
                  ! {error}
                </div>
              )}

              <div ref={threadEndRef} />
            </div>

            {/* Bottom Input & Direct Human Escalation Bar */}
            <div className="p-4 sm:p-5 border-t border-[#ece1df]/20 bg-[#000612] space-y-3">
              <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about services, technical support, or live web topics..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-[#000612] border border-[#ece1df]/40 focus:border-[#ece1df] text-sm text-[#ece1df] placeholder:text-[#ece1df]/45 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-5 py-3 bg-[#ece1df] text-[#000612] font-display font-bold text-sm inline-flex items-center gap-2 disabled:opacity-40 whitespace-nowrap shrink-0"
                >
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Human Support Escalation Strip (WhatsApp & Gmail) */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs font-mono-tabular text-[#ece1df]/75">
                <span>Need a human support specialist?</span>
                <div className="flex items-center gap-3">
                  <a
                    href={buildWhatsAppUrl(buildTranscriptSummary())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#ece1df] underline underline-offset-4"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp Escalation</span>
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href={buildGmailUrl('Customer Support Escalation — ZenX Solutions', buildTranscriptSummary())}
                    className="inline-flex items-center gap-1.5 text-[#ece1df] underline underline-offset-4"
                  >
                    <GmailIcon className="w-3.5 h-3.5" />
                    <span>Gmail Escalation</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
