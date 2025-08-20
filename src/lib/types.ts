export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  modelType?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'marketing';
  link?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
  service: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}
