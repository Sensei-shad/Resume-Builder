import { create } from 'zustand';
import type { ResumeData, Template } from '../types/resume';

interface ResumeStore {
  resumeData: ResumeData;
  selectedTemplate: Template | null;
  setResumeData: (data: Partial<ResumeData>) => void;
  setSelectedTemplate: (template: Template) => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  education: [],
  experience: [],
  skills: [],
  projects: [],
};

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: initialResumeData,
  selectedTemplate: null,
  setResumeData: (data) =>
    set((state) => ({
      resumeData: { ...state.resumeData, ...data },
    })),
  setSelectedTemplate: (template) =>
    set(() => ({
      selectedTemplate: template,
    })),
}));