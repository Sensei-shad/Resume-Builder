import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { templates } from '../templates';
import { Layout, Briefcase, Book, Code, Award, Lightbulb, GraduationCap, MinusSquare, Box, Layers, Zap, Clock, Target } from 'lucide-react';

const templateIcons = {
  minimal: MinusSquare,
  professional: Briefcase,
  modern: Layout,
  creative: Lightbulb,
  executive: Award,
  technical: Code,
  startup: Zap,
  academic: GraduationCap,
  minimalist: Box,
  compact: Layers,
  innovative: Lightbulb,
  chronological: Clock,
  'skill-based': Target
} as const;

export function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();

  return (
    <div className="p-6 dark:bg-gray-800">
      <h2 className="text-lg font-medium dark:text-gray-100 mb-4">Choose a Template</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => {
          const Icon = templateIcons[template.id as keyof typeof templateIcons] || Layout;
          
          return (
            <div
              key={template.id}
              className={`relative rounded-lg border-2 cursor-pointer overflow-hidden ${
                selectedTemplate?.id === template.id
                  ? 'border-indigo-600 dark:border-indigo-400'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Icon className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{template.name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}