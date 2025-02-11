import { useState, useCallback } from 'react';
import {
  MAX_CHARS,
  REGEX_PATTERNS,
  validateInput,
  formatPhoneNumber,
  validateDate,
  organizeSkills,
  formatExperienceDescriptions
} from '../utils/formatters';
import type { ResumeData } from '../types/resume';

interface ValidationError {
  field: string;
  message: string;
}

export function useFormValidation() {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateForm = useCallback((data: ResumeData): boolean => {
    const newErrors: ValidationError[] = [];

    // Validate Personal Info
    if (!REGEX_PATTERNS.FULL_NAME.test(data.personalInfo.fullName)) {
      newErrors.push({
        field: 'fullName',
        message: 'Please enter a valid full name (letters, spaces, and hyphens only)'
      });
    }

    if (!REGEX_PATTERNS.EMAIL.test(data.personalInfo.email)) {
      newErrors.push({
        field: 'email',
        message: 'Please enter a valid email address'
      });
    }

    if (!REGEX_PATTERNS.PHONE.test(data.personalInfo.phone)) {
      newErrors.push({
        field: 'phone',
        message: 'Please enter a valid phone number'
      });
    }

    // Validate Experience
    data.experience.forEach((exp, index) => {
      if (!validateDate(exp.startDate)) {
        newErrors.push({
          field: `experience[${index}].startDate`,
          message: 'Please enter a valid date (MM/YYYY)'
        });
      }

      if (!validateDate(exp.endDate) && exp.endDate.toLowerCase() !== 'present') {
        newErrors.push({
          field: `experience[${index}].endDate`,
          message: 'Please enter a valid date (MM/YYYY) or "Present"'
        });
      }

      if (exp.description.length === 0) {
        newErrors.push({
          field: `experience[${index}].description`,
          message: 'Please add at least one bullet point'
        });
      }
    });

    // Validate Education
    data.education.forEach((edu, index) => {
      if (!validateDate(edu.startDate)) {
        newErrors.push({
          field: `education[${index}].startDate`,
          message: 'Please enter a valid date (MM/YYYY)'
        });
      }

      if (!validateDate(edu.endDate) && 
          edu.endDate.toLowerCase() !== 'present' && 
          !edu.endDate.toLowerCase().includes('expected')) {
        newErrors.push({
          field: `education[${index}].endDate`,
          message: 'Please enter a valid date (MM/YYYY), "Present", or "Expected MM/YYYY"'
        });
      }

      if (edu.gpa && (isNaN(Number(edu.gpa)) || Number(edu.gpa) > 4.0)) {
        newErrors.push({
          field: `education[${index}].gpa`,
          message: 'Please enter a valid GPA (0.0-4.0)'
        });
      }
    });

    // Validate Skills
    if (data.skills.length === 0) {
      newErrors.push({
        field: 'skills',
        message: 'Please add at least one skill'
      });
    }

    data.skills.forEach((skillGroup, index) => {
      if (skillGroup.items.length === 0) {
        newErrors.push({
          field: `skills[${index}].items`,
          message: 'Please add at least one skill item'
        });
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  }, []);

  const formatData = useCallback((data: ResumeData): ResumeData => {
    return {
      personalInfo: {
        fullName: validateInput(data.personalInfo.fullName, MAX_CHARS.FULL_NAME),
        email: validateInput(data.personalInfo.email, MAX_CHARS.EMAIL),
        phone: formatPhoneNumber(data.personalInfo.phone),
        location: validateInput(data.personalInfo.location, MAX_CHARS.LOCATION),
        linkedin: data.personalInfo.linkedin,
        portfolio: data.personalInfo.portfolio,
      },
      summary: validateInput(data.summary, MAX_CHARS.SUMMARY),
      experience: data.experience.map(exp => ({
        ...exp,
        company: validateInput(exp.company, MAX_CHARS.COMPANY),
        position: validateInput(exp.position, MAX_CHARS.POSITION),
        description: formatExperienceDescriptions(exp.description),
      })),
      education: data.education.map(edu => ({
        ...edu,
        school: validateInput(edu.school, MAX_CHARS.SCHOOL),
        degree: validateInput(edu.degree, MAX_CHARS.DEGREE),
        fieldOfStudy: validateInput(edu.fieldOfStudy, MAX_CHARS.FIELD_OF_STUDY),
      })),
      skills: organizeSkills(data.skills),
      projects: data.projects.map(project => ({
        ...project,
        name: validateInput(project.name, MAX_CHARS.PROJECT_NAME),
        description: validateInput(project.description, MAX_CHARS.PROJECT_DESCRIPTION),
        technologies: project.technologies.map(tech => 
          validateInput(tech, MAX_CHARS.PROJECT_TECHNOLOGY)
        ),
      })),
    };
  }, []);

  return {
    errors,
    validateForm,
    formatData,
  };
}