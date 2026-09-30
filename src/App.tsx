/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  CONFIRMED_SERVICES,
  ServiceCategory,
  ServiceItem,
} from './data/companyData';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { FloatingContactWidget } from './components/FloatingContactWidget';
import { CustomerSupportChat } from './components/CustomerSupportChat';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'ALL'>('ALL');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [contactWidgetOpen, setContactWidgetOpen] = useState<boolean>(false);
  const [contactContextLabel, setContactContextLabel] = useState<string | undefined>(undefined);
  const [supportChatOpen, setSupportChatOpen] = useState<boolean>(false);
  const [supportInitialPrompt, setSupportInitialPrompt] = useState<string | undefined>(undefined);

  // Track active section on scroll for navigation highlighting
  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'why-us', 'process', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          const id = sectionIds[i] === 'why-us' ? 'services' : sectionIds[i];
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectCategoryAndScroll = (category: ServiceCategory | 'ALL') => {
    setSelectedCategory(category);
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleServiceSelection = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleClearSelectedServices = () => {
    setSelectedServiceIds([]);
  };

  const handleInquireService = (service: ServiceItem) => {
    if (!selectedServiceIds.includes(service.id)) {
      setSelectedServiceIds((prev) => [...prev, service.id]);
    }
    setContactContextLabel(`${service.index}. ${service.name} (${service.category})`);
    setContactWidgetOpen(true);
  };

  const handleAskSupportAssistant = (service: ServiceItem) => {
    if (!selectedServiceIds.includes(service.id)) {
      setSelectedServiceIds((prev) => [...prev, service.id]);
    }
    setSupportInitialPrompt(
      `Tell me more about your ${service.name} service (${service.category}) and how we can get started.`
    );
    setContactWidgetOpen(false);
    setSupportChatOpen(true);
  };

  const handleOpenSupportChat = (initialPrompt?: string) => {
    if (initialPrompt) {
      setSupportInitialPrompt(initialPrompt);
    }
    setContactWidgetOpen(false);
    setSupportChatOpen(true);
  };

  const handleOpenContactModal = (contextLabel?: string) => {
    setContactContextLabel(contextLabel);
    setContactWidgetOpen(true);
  };

  const selectedServiceNames = CONFIRMED_SERVICES.filter((s) =>
    selectedServiceIds.includes(s.id)
  ).map((s) => s.name);

  return (
    <div className="min-h-screen bg-[#000612] text-[#ece1df] relative selection:bg-[#ece1df] selection:text-[#000612]">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:px-4 focus:py-2 focus:bg-[#ece1df] focus:text-[#000612] font-display font-bold text-sm"
      >
        Skip to main content
      </a>

      {/* Custom Desktop Interactive Cursor */}
      <CustomCursor />

      {/* Sticky Header / Navigation */}
      <Header
        activeSection={activeSection}
        onOpenContactModal={handleOpenContactModal}
      />

      {/* Single-Page Main Content Flow */}
      <main id="main-content">
        <Hero
          onSelectCategoryAndScroll={handleSelectCategoryAndScroll}
          onOpenContactModal={handleOpenContactModal}
        />

        <AboutSection
          onSelectCategoryAndScroll={(category) => handleSelectCategoryAndScroll(category)}
        />

        <ServicesSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedServiceIds={selectedServiceIds}
          onToggleServiceSelection={handleToggleServiceSelection}
          onInquireService={handleInquireService}
          onAskSupportAssistant={handleAskSupportAssistant}
        />

        <WhyChooseUsSection onOpenContactModal={handleOpenContactModal} />

        <ProcessSection onOpenContactModal={handleOpenContactModal} />

        <ContactSection
          selectedServiceIds={selectedServiceIds}
          onToggleServiceSelection={handleToggleServiceSelection}
          onClearSelectedServices={handleClearSelectedServices}
          onOpenContactModal={handleOpenContactModal}
        />
      </main>

      {/* Minimal Responsive Footer */}
      <Footer onSelectCategoryAndScroll={handleSelectCategoryAndScroll} />

      {/* Floating Contact Button, Support Chat Trigger & Animated WhatsApp/Gmail Popover */}
      <FloatingContactWidget
        isOpen={contactWidgetOpen}
        contextLabel={contactContextLabel}
        selectedServiceNames={selectedServiceNames}
        onToggleOpen={() => setContactWidgetOpen((prev) => !prev)}
        onClose={() => setContactWidgetOpen(false)}
        onOpenSupportChat={handleOpenSupportChat}
      />

      {/* Multi-Turn Gemini Customer Support Chat with Google Search Grounding */}
      <CustomerSupportChat
        isOpen={supportChatOpen}
        initialPrompt={supportInitialPrompt}
        selectedServiceNames={selectedServiceNames}
        onClose={() => setSupportChatOpen(false)}
      />
    </div>
  );
}
