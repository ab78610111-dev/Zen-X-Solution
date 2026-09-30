import React from 'react';
import {
  Code2,
  Layout,
  Smartphone,
  PenTool,
  Wrench,
  CreditCard,
  ShoppingBag,
  Store,
  Megaphone,
  Search,
  MapPin,
  Share2,
  Sliders,
  FileText,
  Palette,
  Film,
  Feather,
  Headphones,
  Terminal,
  PhoneCall,
} from 'lucide-react';
import { ServiceIconKey } from '../data/companyData';

interface ServiceIconProps {
  icon: ServiceIconKey;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ icon, className = 'w-5 h-5' }) => {
  const strokeWidth = 1.6;
  switch (icon) {
    case 'code':
      return <Code2 className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'layout':
      return <Layout className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'smartphone':
      return <Smartphone className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'pen-tool':
      return <PenTool className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'wrench':
      return <Wrench className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'credit-card':
      return <CreditCard className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'shopping-bag':
      return <ShoppingBag className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'store':
      return <Store className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'megaphone':
      return <Megaphone className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'search':
      return <Search className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'map-pin':
      return <MapPin className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'share-2':
      return <Share2 className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'sliders':
      return <Sliders className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'file-text':
      return <FileText className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'palette':
      return <Palette className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'film':
      return <Film className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'feather':
      return <Feather className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'headphones':
      return <Headphones className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'terminal':
      return <Terminal className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    case 'phone-call':
      return <PhoneCall className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    default:
      return <Code2 className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
  }
};

/**
 * Monochrome line-style WhatsApp icon strictly using currentColor (#ece1df or #000612)
 */
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

/**
 * Monochrome line-style Gmail / Email envelope icon strictly using currentColor (#ece1df or #000612)
 */
export const GmailIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
