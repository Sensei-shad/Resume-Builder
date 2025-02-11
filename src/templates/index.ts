import { Template } from '../types/resume';
import { MinimalTemplate } from './minimal';
import { ProfessionalTemplate } from './professional';
import { ModernTemplate } from './modern';
import { CreativeTemplate } from './creative';
import { ExecutiveTemplate } from './executive';
import { TechnicalTemplate } from './technical';

export const templates: Template[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=500',
    description: 'Clean and straightforward design focusing on content clarity',
    component: MinimalTemplate,
  },
  {
    id: 'professional',
    name: 'Professional',
    thumbnail: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=500',
    description: 'Traditional format ideal for corporate positions',
    component: ProfessionalTemplate,
  },
  {
    id: 'modern',
    name: 'Modern',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=500',
    description: 'Contemporary design with a bold header and modern typography',
    component: ModernTemplate,
  },
  {
    id: 'creative',
    name: 'Creative',
    thumbnail: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=500',
    description: 'Unique layout for creative professionals',
    component: CreativeTemplate,
  },
  {
    id: 'executive',
    name: 'Executive',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=500',
    description: 'Sophisticated design for senior positions',
    component: ExecutiveTemplate,
  },
  {
    id: 'technical',
    name: 'Technical',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=500',
    description: 'Focused on technical skills and projects',
    component: TechnicalTemplate,
  }
];