import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { Plus, Trash2, Hand as DragHandle, AlertCircle, HelpCircle } from 'lucide-react';
import { useFormValidation } from '../hooks/useFormValidation';

export function ResumeForm() {
  const { resumeData, setResumeData } = useResumeStore();
  const { errors, validateForm, formatData } = useFormValidation();
  const [activeTooltip, setActiveTooltip] = React.useState<string | null>(null);

  const ErrorMessage = ({ field }: { field: string }) => {
    const error = errors.find(e => e.field === field);
    if (!error) return null;
    
    return (
      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
        <AlertCircle className="h-4 w-4" />
        {error.message}
      </p>
    );
  };

  const Tooltip = ({ id, content }: { id: string; content: string }) => {
    return (
      <div className="relative inline-block">
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          onMouseEnter={() => setActiveTooltip(id)}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <HelpCircle className="h-4 w-4" />
        </button>
        {activeTooltip === id && (
          <div className="absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg">
            {content}
          </div>
        )}
      </div>
    );
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedData = formatData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    });
    setResumeData(formattedData);
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const formattedData = formatData({
      ...resumeData,
      summary: e.target.value,
    });
    setResumeData(formattedData);
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          description: [''],
        },
      ],
    });
  };

  const updateExperience = (index: number, field: string, value: string | string[]) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    const formattedData = formatData({
      ...resumeData,
      experience: newExperience,
    });
    setResumeData(formattedData);
  };

  const addExperienceBullet = (expIndex: number) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].description.push('');
    setResumeData({
      ...resumeData,
      experience: newExperience,
    });
  };

  const updateExperienceBullet = (expIndex: number, bulletIndex: number, value: string) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].description[bulletIndex] = value;
    const formattedData = formatData({
      ...resumeData,
      experience: newExperience,
    });
    setResumeData(formattedData);
  };

  const removeExperienceBullet = (expIndex: number, bulletIndex: number) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].description.splice(bulletIndex, 1);
    setResumeData({
      ...resumeData,
      experience: newExperience,
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          school: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          gpa: '',
        },
      ],
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    const formattedData = formatData({
      ...resumeData,
      education: newEducation,
    });
    setResumeData(formattedData);
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [
        ...resumeData.skills,
        {
          category: '',
          items: [''],
        },
      ],
    });
  };

  const updateSkill = (index: number, field: string, value: string | string[]) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    const formattedData = formatData({
      ...resumeData,
      skills: newSkills,
    });
    setResumeData(formattedData);
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          name: '',
          description: '',
          technologies: [''],
          link: '',
        },
      ],
    });
  };

  const updateProject = (index: number, field: string, value: string | string[]) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    const formattedData = formatData({
      ...resumeData,
      projects: newProjects,
    });
    setResumeData(formattedData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(resumeData)) {
      // Form is valid, proceed with submission
      console.log('Form is valid');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8 dark:text-gray-100">
      {/* Personal Information */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium dark:text-gray-100">Personal Information</h2>
          <Tooltip 
            id="personal-info"
            content="This section should contain your current contact information and professional online presence."
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium dark:text-gray-200">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={resumeData.personalInfo.fullName}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
            <ErrorMessage field="fullName" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium dark:text-gray-200">
              Professional Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={resumeData.personalInfo.email}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
            <ErrorMessage field="email" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium dark:text-gray-200">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={resumeData.personalInfo.phone}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
            <ErrorMessage field="phone" />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium dark:text-gray-200">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={resumeData.personalInfo.location}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="City, Country"
            />
          </div>
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium dark:text-gray-200">
              LinkedIn Profile
            </label>
            <input
              type="url"
              name="linkedin"
              id="linkedin"
              value={resumeData.personalInfo.linkedin || ''}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <label htmlFor="portfolio" className="block text-sm font-medium dark:text-gray-200">
              Portfolio Website
            </label>
            <input
              type="url"
              name="portfolio"
              id="portfolio"
              value={resumeData.personalInfo.portfolio || ''}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium dark:text-gray-100">Professional Summary</h2>
          <Tooltip 
            id="summary"
            content="Write a compelling 2-4 sentence overview of your professional background, key achievements, and career goals."
          />
        </div>
        <div>
          <textarea
            rows={4}
            value={resumeData.summary}
            onChange={handleSummaryChange}
            className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="A brief 2-3 sentence overview of your professional background and career goals..."
          />
        </div>
      </section>

      {/* Work Experience */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium dark:text-gray-100">Work Experience</h2>
            <Tooltip 
              id="experience"
              content="List your relevant work experience in reverse chronological order. Focus on achievements and quantifiable results."
            />
          </div>
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Experience
          </button>
        </div>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <DragHandle className="h-5 w-5 text-gray-400 cursor-move" />
              <button
                type="button"
                onClick={() => {
                  const newExperience = [...resumeData.experience];
                  newExperience.splice(index, 1);
                  setResumeData({ ...resumeData, experience: newExperience });
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium dark:text-gray-200">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage field={`experience[${index}].company`} />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-gray-200">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                  className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage field={`experience[${index}].position`} />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-gray-200">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(index, 'location', e.target.value)}
                  className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-200">Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="MM/YYYY"
                  />
                  <ErrorMessage field={`experience[${index}].startDate`} />
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-200">End Date</label>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="MM/YYYY or Present"
                  />
                  <ErrorMessage field={`experience[${index}].endDate`} />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <label className="block text-sm font-medium dark:text-gray-200">
                    Responsibilities & Achievements
                  </label>
                  <Tooltip 
                    id={`experience-${index}-bullets`}
                    content="Use action verbs and include measurable achievements. Example: 'Increased sales by 25% through implementation of new marketing strategy'"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => addExperienceBullet(index)}
                  className="inline-flex items-center px-2 py-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Bullet
                </button>
              </div>
              {exp.description.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex items-center gap-2 mb-2">
                  <DragHandle className="h-4 w-4 text-gray-400 cursor-move" />
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => updateExperienceBullet(index, bulletIndex, e.target.value)}
                    className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Start with an action verb (e.g., 'Developed', 'Led', 'Increased')"
                  />
                  <button
                    type="button"
                    onClick={() => removeExperienceBullet(index, bulletIndex)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <ErrorMessage field={`experience[${index}].description`} />
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium dark:text-gray-100">Education</h2>
            <Tooltip 
              id="education"
              content="List your educational background in reverse chronological order. Include relevant coursework and achievements."
            />
          </div>
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Education
          </button>
        </div>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <DragHandle className="h-5 w-5 text-gray-400 cursor-move" />
              <button
                type="button"
                onClick={() => {
                  const newEducation = [...resumeData.education];
                  newEducation.splice(index, 1);
                  setResumeData({ ...resumeData, education: newEducation });
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium dark:text-gray-200">School</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateEducation(index, 'school', e.target.value)}
                  className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage field={`education[${index}].school`} />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-gray-200">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage field={`education[${index}].degree`} />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-gray-200">Field of Study</label>
                <input
                  type="text"
                  value={edu.fieldOfStudy}
                  onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                  className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage field={`education[${index}].fieldOfStudy`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-200">Start Date</label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                    className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="MM/YYYY"
                  />
                  <ErrorMessage field={`education[${index}].startDate`} />
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-200">End Date</label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                    className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="MM/YYYY or Expected MM/YYYY"
                  />
                  <ErrorMessage field={`education[${index}].endDate`} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <label className="block text-sm font-medium dark:text-gray-200">GPA (Optional)</label>
                  <Tooltip 
                    id={`education-${index}-gpa`}
                    content="Only include GPA if it's 3.5 or higher"
                  />
                </div>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                  className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Only include if above 3.5"
                />
                <ErrorMessage field={`education[${index}].gpa`} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium dark:text-gray-100">Skills</h2>
            <Tooltip 
              id="skills"
              content="Group your skills by category (e.g., Programming Languages, Tools, Soft Skills). List the most relevant skills first."
            />
          </div>
          <button
            type="button"
            onClick={addSkill}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Skill Category
          </button>
        </div>
        {resumeData.skills.map((skill, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <DragHandle className="h-5 w-5 text-gray-400 cursor-move" />
              <button
                type="button"
                onClick={() => {
                  const newSkills = [...resumeData.skills];
                  newSkills.splice(index, 1);
                  setResumeData({ ...resumeData, skills: newSkills });
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-200">Category</label>
              <input
                type="text"
                value={skill.category}
                onChange={(e) => updateSkill(index, 'category', e.target.value)}
                className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., Programming Languages, Tools, Soft Skills"
              />
              <ErrorMessage field={`skills[${index}].category`} />
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium dark:text-gray-200">Skills (comma-separated)</label>
                <Tooltip 
                  id={`skills-${index}-items`}
                  content="List skills in order of proficiency. Use industry-standard terminology."
                />
              </div>
              <input
                type="text"
                value={skill.items.join(', ')}
                onChange={(e) => updateSkill(index, 'items', e.target.value.split(',').map(item => item.trim()))}
                className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., JavaScript, React, Node.js"
              />
              <ErrorMessage field={`skills[${index}].items`} />
            </div>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium dark:text-gray-100">Projects</h2>
            <Tooltip 
              id="projects"
              content="Highlight your most impressive projects. Include technologies used and quantifiable results."
            />
          </div>
          <button
            type="button"
            onClick={addProject}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Project
          </button>
        </div>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <DragHandle className="h-5 w-5 text-gray-400 cursor-move" />
              <button
                type="button"
                onClick={() => {
                  const newProjects = [...resumeData.projects];
                 newProjects.splice(index, 1);
                  setResumeData({ ...resumeData, projects: newProjects });
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium dark:text-gray-200">Project Name</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage field={`projects[${index}].name`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <label className="block text-sm font-medium dark:text-gray-200">Description</label>
                  <Tooltip 
                    id={`project-${index}-description`}
                    content="Describe the project's purpose, your role, and its impact. Use metrics when possible."
                  />
                </div>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Describe the project's purpose and your role..."
                />
                <ErrorMessage field={`projects[${index}].description`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <label className="block text-sm font-medium dark:text-gray-200">Technologies Used (comma-separated)</label>
                  <Tooltip 
                    id={`project-${index}-technologies`}
                    content="List the main technologies, frameworks, and tools used in the project."
                  />
                </div>
                <input
                  type="text"
                  value={project.technologies.join(', ')}
                  onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(item => item.trim()))}
                  className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g., React, Node.js, MongoDB"
                />
                <ErrorMessage field={`projects[${index}].technologies`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <label className="block text-sm font-medium dark:text-gray-200">Project Link (Optional)</label>
                  <Tooltip 
                    id={`project-${index}-link`}
                    content="Add a link to the live project, GitHub repository, or documentation."
                  />
                </div>
                <input
                  type="url"
                  value={project.link || ''}
                  onChange={(e) => updateProject(index, 'link', e.target.value)}
                  className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </form>
  );
}