export type ServiceCategory =
  | 'Web & Development'
  | 'E-Commerce'
  | 'Digital Marketing'
  | 'Creative'
  | 'Support';

export type ServiceIconKey =
  | 'code'
  | 'layout'
  | 'smartphone'
  | 'pen-tool'
  | 'wrench'
  | 'credit-card'
  | 'shopping-bag'
  | 'store'
  | 'megaphone'
  | 'search'
  | 'map-pin'
  | 'share-2'
  | 'sliders'
  | 'file-text'
  | 'palette'
  | 'film'
  | 'feather'
  | 'headphones'
  | 'terminal'
  | 'phone-call';

export interface ServiceItem {
  id: string;
  index: string;
  name: string;
  category: ServiceCategory;
  icon: ServiceIconKey;
  description: string;
  deliverables: string[];
}

export interface ValueProposition {
  id: string;
  index: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  summary: string;
  detail: string;
  outputs: string[];
}

/**
 * Central company contact & brand configuration.
 * Easily replaceable placeholder / confirmed contact destinations.
 */
export const COMPANY_CONFIG = {
  name: 'ZenX Solutions',
  tagline: 'End-to-End Digital Engineering, Growth & Support',
  // Client email from workspace metadata (easily replaceable)
  email: 'ab78610111@gmail.com',
  // Replaceable WhatsApp number in international format (digits only for wa.me link)
  whatsappNumber: '',
  whatsappDisplayPlaceholder: 'WhatsApp Direct Channel',
  defaultInquiryMessage:
    'Hello ZenX Solutions, I would like to discuss a digital project with your team.',
};

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
] as const;

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'Web & Development',
  'E-Commerce',
  'Digital Marketing',
  'Creative',
  'Support',
];

/**
 * Strictly the 20 client-confirmed services across 5 categories.
 * Do not add unconfirmed services.
 */
export const CONFIRMED_SERVICES: ServiceItem[] = [
  // Web & Development (1 - 6)
  {
    id: 'web-development',
    index: '01',
    name: 'Web Development',
    category: 'Web & Development',
    icon: 'code',
    description:
      'Custom, scalable web applications and business platforms engineered for speed, security, and long-term maintainability.',
    deliverables: ['Full-Stack Web Applications', 'Custom APIs & Integrations', 'Performance Optimization'],
  },
  {
    id: 'website-design',
    index: '02',
    name: 'Website Design',
    category: 'Web & Development',
    icon: 'layout',
    description:
      'Responsive, brand-aligned website architecture crafted to communicate authority and convert visitors across every screen size.',
    deliverables: ['Responsive Page Systems', 'Brand-Aligned Layouts', 'Interactive Web Experiences'],
  },
  {
    id: 'mobile-app-development',
    index: '03',
    name: 'Mobile App Development',
    category: 'Web & Development',
    icon: 'smartphone',
    description:
      'Native and cross-platform mobile applications built for smooth performance, intuitive navigation, and reliable device integration.',
    deliverables: ['iOS & Android Applications', 'Cross-Platform Builds', 'App Store Deployment'],
  },
  {
    id: 'ui-ux-design',
    index: '04',
    name: 'UI/UX Design',
    category: 'Web & Development',
    icon: 'pen-tool',
    description:
      'Human-centered interface systems, user journeys, and interactive prototypes designed for clarity, accessibility, and engagement.',
    deliverables: ['User Journey Mapping', 'Wireframes & Prototypes', 'Component Design Systems'],
  },
  {
    id: 'website-maintenance',
    index: '05',
    name: 'Website Maintenance',
    category: 'Web & Development',
    icon: 'wrench',
    description:
      'Ongoing technical upkeep, security patching, uptime monitoring, and content updates to keep your web properties running smoothly.',
    deliverables: ['Routine Security Updates', 'Performance Audits', 'Content & Feature Updates'],
  },
  {
    id: 'payment-gateway-integration',
    index: '06',
    name: 'Payment Gateway Integration',
    category: 'Web & Development',
    icon: 'credit-card',
    description:
      'Secure, compliant checkout and payment processing integrations supporting global and regional transaction workflows.',
    deliverables: ['Multi-Currency Checkout', 'Subscription Billing Flows', 'Webhook & Ledger Sync'],
  },

  // E-Commerce (7 - 8)
  {
    id: 'shopify-development',
    index: '07',
    name: 'Shopify Development',
    category: 'E-Commerce',
    icon: 'shopping-bag',
    description:
      'Custom Shopify storefronts, theme engineering, and app integrations tailored for high-conversion online retail.',
    deliverables: ['Custom Liquid & Storefront Themes', 'Store Setup & Migration', 'Checkout & App Integration'],
  },
  {
    id: 'ecommerce-management',
    index: '08',
    name: 'E-Commerce Management',
    category: 'E-Commerce',
    icon: 'store',
    description:
      'End-to-end operational management for online stores including catalog organization, inventory updates, and merchandising workflows.',
    deliverables: ['Catalog & SKU Operations', 'Order Workflow Optimization', 'Storefront Merchandising'],
  },

  // Digital Marketing (9 - 14)
  {
    id: 'digital-marketing',
    index: '09',
    name: 'Digital Marketing',
    category: 'Digital Marketing',
    icon: 'megaphone',
    description:
      'Strategic multi-channel digital campaigns focused on measurable customer acquisition, brand visibility, and qualified traffic.',
    deliverables: ['Campaign Strategy & Execution', 'Funnel Optimization', 'Audience Targeting'],
  },
  {
    id: 'seo-services',
    index: '10',
    name: 'SEO Services',
    category: 'Digital Marketing',
    icon: 'search',
    description:
      'Technical search engine optimization, on-page architecture, and search intent alignment to grow sustainable organic visibility.',
    deliverables: ['Technical SEO Audits', 'On-Page Keyword Architecture', 'Search Performance Tracking'],
  },
  {
    id: 'local-seo',
    index: '11',
    name: 'Local SEO',
    category: 'Digital Marketing',
    icon: 'map-pin',
    description:
      'Location-focused search optimization to connect your business with nearby customers searching for your services.',
    deliverables: ['Local Business Profile Optimization', 'Regional Citation Consistency', 'Location Landing Pages'],
  },
  {
    id: 'social-media-marketing',
    index: '12',
    name: 'Social Media Marketing',
    category: 'Digital Marketing',
    icon: 'share-2',
    description:
      'Targeted social media campaigns designed to expand audience reach, drive engagement, and generate qualified inquiries.',
    deliverables: ['Paid & Organic Social Campaigns', 'Audience Segmentation', 'Creative Ad Variants'],
  },
  {
    id: 'social-media-management',
    index: '13',
    name: 'Social Media Management',
    category: 'Digital Marketing',
    icon: 'sliders',
    description:
      'Consistent day-to-day profile stewardship, publishing schedules, and community interaction across your social channels.',
    deliverables: ['Editorial Calendar Publishing', 'Community Response Management', 'Channel Consistency'],
  },
  {
    id: 'content-marketing',
    index: '14',
    name: 'Content Marketing',
    category: 'Digital Marketing',
    icon: 'file-text',
    description:
      'Structured content programs that educate prospects, communicate domain expertise, and support organic acquisition.',
    deliverables: ['Editorial Strategy', 'Articles & Resource Guides', 'Conversion Copywriting'],
  },

  // Creative (15 - 17)
  {
    id: 'graphic-design',
    index: '15',
    name: 'Graphic Design',
    category: 'Creative',
    icon: 'palette',
    description:
      'Cohesive visual assets, brand collateral, and digital graphics designed with precision and unmistakable brand clarity.',
    deliverables: ['Brand Identity Collateral', 'Marketing & Social Visuals', 'Presentation & Print Assets'],
  },
  {
    id: 'video-editing',
    index: '16',
    name: 'Video Editing',
    category: 'Creative',
    icon: 'film',
    description:
      'Crisp post-production, pacing, motion typography, and format optimization for promotional, product, and social video assets.',
    deliverables: ['Commercial & Promo Cuts', 'Short-Form Social Edits', 'Audio & Visual Pacing'],
  },
  {
    id: 'content-creation',
    index: '17',
    name: 'Content Creation',
    category: 'Creative',
    icon: 'feather',
    description:
      'Original digital media, copy, and visual storytelling tailored to engage your audience across web and social touchpoints.',
    deliverables: ['Brand Storytelling Assets', 'Multi-Format Digital Media', 'Platform-Native Creative'],
  },

  // Support (18 - 20)
  {
    id: 'customer-support',
    index: '18',
    name: 'Customer Support',
    category: 'Support',
    icon: 'headphones',
    description:
      'Responsive, courteous customer assistance across digital channels to resolve inquiries and strengthen client satisfaction.',
    deliverables: ['Multi-Channel Inquiry Handling', 'Ticket Resolution Workflows', 'Customer Care Documentation'],
  },
  {
    id: 'technical-support',
    index: '19',
    name: 'Technical Support',
    category: 'Support',
    icon: 'terminal',
    description:
      'Structured troubleshooting, issue diagnostics, and system assistance for software platforms, websites, and digital tools.',
    deliverables: ['Issue Diagnostics & Escalation', 'Platform Troubleshooting', 'System Health Assistance'],
  },
  {
    id: 'call-center-services',
    index: '20',
    name: 'Call Center Services',
    category: 'Support',
    icon: 'phone-call',
    description:
      'Professional inbound and outbound voice communication operations managed with clear scripts and quality standards.',
    deliverables: ['Inbound Customer Assistance', 'Outbound Follow-Up Operations', 'Structured Call Workflows'],
  },
];

export const VALUE_PROPOSITIONS: ValueProposition[] = [
  {
    id: 'professional-digital-solutions',
    index: '01',
    title: 'Professional Digital Solutions',
    description:
      'We architect every web platform, storefront, and campaign around clear business objectives—avoiding bloated templates in favor of purposeful execution.',
    highlights: ['Structured Architecture', 'Production-Grade Standards', 'Clear Deliverables'],
  },
  {
    id: 'modern-design-development',
    index: '02',
    title: 'Modern Design & Development',
    description:
      'Clean interface systems paired with responsive engineering ensure your digital presence performs smoothly across mobile, tablet, laptop, and large displays.',
    highlights: ['Responsive Engineering', 'Accessible Interfaces', 'Performance-First Code'],
  },
  {
    id: 'customer-focused-approach',
    index: '03',
    title: 'Customer-Focused Approach',
    description:
      'Every engagement starts with listening to your requirements, aligning with your workflow, and maintaining transparent communication from start to finish.',
    highlights: ['Direct Communication', 'Tailored Scope Alignment', 'Dedicated Collaboration'],
  },
  {
    id: 'reliable-technical-support',
    index: '04',
    title: 'Reliable Technical Support',
    description:
      'Digital products require ongoing care. Our support teams provide website maintenance, technical troubleshooting, customer support, and call center coverage.',
    highlights: ['Ongoing Maintenance', 'Issue Resolution', 'Operational Continuity'],
  },
  {
    id: 'digital-growth-focus',
    index: '05',
    title: 'Digital Growth Focus',
    description:
      'Beyond initial development, we align SEO, local search, content marketing, and social media management to help your audience discover and engage with your brand.',
    highlights: ['Search & Local Visibility', 'Content & Social Alignment', 'Conversion Clarity'],
  },
  {
    id: 'end-to-end-capability',
    index: '06',
    title: 'End-to-End Service Capability',
    description:
      'With 20 integrated services spanning development, e-commerce, marketing, creative production, and support, you can coordinate your entire digital roadmap with one team.',
    highlights: ['5 Integrated Pillars', '20 Specialized Services', 'Unified Execution'],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    summary: "Understand the client's requirements and goals.",
    detail:
      'We begin by reviewing your business objectives, target audience, required services, and technical parameters to establish a clear project foundation.',
    outputs: ['Requirement Alignment', 'Service Scope Selection', 'Goal Definition'],
  },
  {
    id: 'plan',
    number: '02',
    title: 'Plan',
    summary: 'Create the project strategy and solution structure.',
    detail:
      'We map out the information architecture, technical stack, milestones, and execution workflow so every phase moves forward predictably.',
    outputs: ['Solution Architecture', 'Execution Roadmap', 'Deliverable Milestones'],
  },
  {
    id: 'design',
    number: '03',
    title: 'Design',
    summary: 'Develop the visual and user experience.',
    detail:
      'Our design team crafts responsive layouts, user flows, and creative assets that reflect your brand identity and prioritize usability.',
    outputs: ['UI/UX Wireframes', 'Responsive Visual Design', 'Interactive Review'],
  },
  {
    id: 'develop',
    number: '04',
    title: 'Develop',
    summary: 'Build and implement the required solution.',
    detail:
      'We engineer the website, mobile application, e-commerce store, or marketing campaign with clean code, payment integrations, and rigorous quality checks.',
    outputs: ['Clean Implementation', 'Gateway & System Integrations', 'Cross-Device Testing'],
  },
  {
    id: 'launch',
    number: '05',
    title: 'Launch',
    summary: 'Deploy the completed solution.',
    detail:
      'After final verification for responsiveness, speed, and SEO readiness, we deploy your solution to production for a smooth go-live.',
    outputs: ['Production Deployment', 'Performance Verification', 'Go-Live Handover'],
  },
  {
    id: 'support',
    number: '06',
    title: 'Support',
    summary: 'Provide maintenance and technical/customer support where required.',
    detail:
      'We remain available post-launch with website maintenance, technical support, customer support, and ongoing digital marketing management.',
    outputs: ['Website Maintenance', 'Technical & Customer Support', 'Continuous Optimization'],
  },
];

export function buildWhatsAppUrl(customMessage?: string): string {
  const message = encodeURIComponent(customMessage || COMPANY_CONFIG.defaultInquiryMessage);
  const cleanPhone = COMPANY_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  if (cleanPhone) {
    return `https://wa.me/${cleanPhone}?text=${message}`;
  }
  return `https://api.whatsapp.com/send?text=${message}`;
}

export function buildGmailUrl(subject?: string, body?: string): string {
  const email = COMPANY_CONFIG.email;
  const encodedSubject = encodeURIComponent(subject || 'Project Inquiry — ZenX Solutions');
  const encodedBody = encodeURIComponent(body || COMPANY_CONFIG.defaultInquiryMessage);
  return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
}
