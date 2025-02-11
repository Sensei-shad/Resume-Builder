// Update preview styles for dark mode
import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { Download } from 'lucide-react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { ATSScore } from './ATSScore';

export function Preview() {
  const { resumeData, selectedTemplate } = useResumeStore();

  if (!selectedTemplate) {
    return (
      <div className="p-6 text-center dark:text-gray-400">
        <p>Please select a template first</p>
      </div>
    );
  }

  const Template = selectedTemplate.component;

  return (
    <div className="p-6 dark:bg-gray-800">
      <div className="flex justify-end mb-4">
        <PDFDownloadLink
          document={<Template data={resumeData} />}
          fileName={`${resumeData.personalInfo.fullName.replace(/\s+/g, '-')}-resume.pdf`}
        >
          {({ loading }) => (
            <button
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              <Download className="h-4 w-4 mr-2" />
              {loading ? 'Generating PDF...' : 'Download PDF'}
            </button>
          )}
        </PDFDownloadLink>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-700 shadow-lg h-[842px]">
          <PDFViewer width="100%" height="100%" className="border-0">
            <Template data={resumeData} />
          </PDFViewer>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg">
          <ATSScore />
        </div>
      </div>
    </div>
  );
}