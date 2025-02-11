import type { Skill } from '../types/resume';

export const MAX_CHARS = {
  FULL_NAME: 50,
  EMAIL: 50,
  PHONE: 20,
  LOCATION: 100,
  COMPANY: 100,
  POSITION: 100,
  DESCRIPTION_BULLET: 200,
  SUMMARY: 500,
  SCHOOL: 100,
  DEGREE: 100,
  FIELD_OF_STUDY: 100,
  SKILL_CATEGORY: 30,
  SKILL_ITEM: 50,
  PROJECT_NAME: 100,
  PROJECT_DESCRIPTION: 300,
  PROJECT_TECHNOLOGY: 50,
};

export const REGEX_PATTERNS = {
  FULL_NAME: /^[a-zA-Z\s\-'.]{2,}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\d\s\-+()]{10,}$/,
  DATE: /^(0[1-9]|1[0-2])\/\d{4}$/,
};

export function validateInput(value: string, maxLength: number): string {
  return value.slice(0, maxLength).trim();
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
}

export function validateDate(date: string): boolean {
  if (!REGEX_PATTERNS.DATE.test(date)) return false;
  
  const [month, year] = date.split('/').map(Number);
  const currentYear = new Date().getFullYear();
  
  return year >= 1900 && year <= currentYear + 10;
}

// Function to group and organize skills
export function organizeSkills(skills: Skill[]): Skill[] {
  // Predefined skill categories and their keywords
  const skillCategories = {
    'Programming Languages': [
      'javascript', 'python', 'java', 'c++', 'ruby', 'php', 'typescript',
      'golang', 'rust', 'swift', 'kotlin', 'scala'
    ],
    'Frontend Development': [
      'react', 'vue', 'angular', 'html', 'css', 'sass', 'less',
      'webpack', 'babel', 'jquery', 'bootstrap', 'tailwind'
    ],
    'Backend Development': [
      'node', 'express', 'django', 'flask', 'spring', 'laravel',
      'postgresql', 'mysql', 'mongodb', 'redis', 'graphql', 'rest'
    ],
    'DevOps & Tools': [
      'git', 'docker', 'kubernetes', 'jenkins', 'aws', 'azure',
      'linux', 'ci/cd', 'terraform', 'ansible'
    ],
    'Soft Skills': [
      'leadership', 'communication', 'teamwork', 'problem solving',
      'time management', 'project management', 'agile', 'scrum'
    ]
  };

  // Helper function to find the category for a skill
  function findCategory(skill: string): string {
    skill = skill.toLowerCase();
    for (const [category, keywords] of Object.entries(skillCategories)) {
      if (keywords.some(keyword => skill.includes(keyword))) {
        return category;
      }
    }
    return 'Other';
  }

  // Group skills by category
  const groupedSkills = new Map<string, Set<string>>();

  skills.forEach(skillGroup => {
    skillGroup.items.forEach(skill => {
      const category = skillGroup.category || findCategory(skill);
      if (!groupedSkills.has(category)) {
        groupedSkills.set(category, new Set());
      }
      groupedSkills.get(category)?.add(skill);
    });
  });

  // Convert grouped skills back to array format
  return Array.from(groupedSkills.entries()).map(([category, items]) => ({
    category: validateInput(category, MAX_CHARS.SKILL_CATEGORY),
    items: Array.from(items).map(item => validateInput(item, MAX_CHARS.SKILL_ITEM))
  }));
}

// Function to ensure text fits within PDF boundaries
export function truncateText(text: string, maxWidth: number, fontSize: number): string {
  // Approximate characters that fit in the given width
  // This is a rough estimation - in a real app you'd want to use a proper text measurement
  const charsPerWidth = Math.floor(maxWidth / (fontSize * 0.6));
  
  if (text.length <= charsPerWidth) return text;
  
  return text.slice(0, charsPerWidth - 3) + '...';
}

// Function to format bullet points consistently
export function formatBulletPoint(text: string): string {
  // Remove any existing bullet points or dashes
  text = text.replace(/^[•\-\*]\s*/, '');
  
  // Capitalize first letter
  text = text.charAt(0).toUpperCase() + text.slice(1);
  
  // Ensure it ends with a period
  if (!text.endsWith('.')) text += '.';
  
  return text;
}

// Function to validate and format experience descriptions
export function formatExperienceDescriptions(descriptions: string[]): string[] {
  const actionVerbs = [
    'achieved', 'developed', 'implemented', 'created', 'managed',
    'led', 'designed', 'improved', 'increased', 'reduced',
    'coordinated', 'launched', 'built', 'established', 'generated'
  ];

  return descriptions.map(desc => {
    // Validate length
    desc = validateInput(desc, MAX_CHARS.DESCRIPTION_BULLET);
    
    // Check if starts with action verb
    const firstWord = desc.split(' ')[0].toLowerCase();
    if (!actionVerbs.includes(firstWord)) {
      // Prepend a random action verb if none exists
      const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
      desc = `${randomVerb} ${desc}`;
    }
    
    return formatBulletPoint(desc);
  });
}

// Function to wrap text at a specific character limit
export function wrapText(text: string, maxCharsPerLine: number = 40): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + ' ' + word).length <= maxCharsPerLine) {
      currentLine = currentLine ? `${currentLine} ${word}` : word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines;
}

// Function to create wrapped text element for PDF
export function createWrappedText(text: string, maxCharsPerLine: number = 40): React.ReactNode[] {
  return wrapText(text, maxCharsPerLine).map((line, index) => ({
    type: 'tspan',
    children: line,
    props: {
      x: 0,
      dy: index === 0 ? 0 : 15, // Add line spacing for subsequent lines
    }
  }));
}