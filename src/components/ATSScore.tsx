import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { AlertTriangle, CheckCircle, Info, Zap, Target, Award, BarChart3 } from 'lucide-react';

export function ATSScore() {
  const { resumeData } = useResumeStore();

  const calculateATSScore = () => {
    let score = 0;
    let maxScore = 0;
    const feedback = [];
    const improvements = [];

    // Check Personal Information (20 points)
    maxScore += 20;
    if (resumeData.personalInfo.fullName) {
      score += 5;
      if (resumeData.personalInfo.fullName.length < 3) {
        improvements.push({ type: 'warning', message: 'Consider using your full legal name for better ATS recognition' });
      }
    } else {
      feedback.push({ type: 'error', message: 'Missing full name' });
    }
    
    if (resumeData.personalInfo.email) {
      score += 5;
      if (!resumeData.personalInfo.email.includes('@')) {
        improvements.push({ type: 'error', message: 'Invalid email format' });
      }
    } else {
      feedback.push({ type: 'error', message: 'Missing email address' });
    }
    
    if (resumeData.personalInfo.phone) {
      score += 5;
      if (!/^\+?[\d\s-()]{10,}$/.test(resumeData.personalInfo.phone)) {
        improvements.push({ type: 'warning', message: 'Phone number format might not be recognized by all ATS systems' });
      }
    } else {
      feedback.push({ type: 'error', message: 'Missing phone number' });
    }
    
    if (resumeData.personalInfo.location) {
      score += 5;
      if (!resumeData.personalInfo.location.includes(',')) {
        improvements.push({ type: 'info', message: 'Consider adding city and country/state for better location matching' });
      }
    } else {
      feedback.push({ type: 'warning', message: 'Consider adding location for local job matching' });
    }

    // Check Professional Summary (15 points)
    maxScore += 15;
    if (resumeData.summary) {
      const words = resumeData.summary.split(/\s+/).length;
      if (words >= 50 && words <= 200) {
        score += 15;
      } else if (words < 50) {
        score += 10;
        improvements.push({ type: 'warning', message: 'Professional summary should be 50-200 words for optimal ATS scanning' });
      } else {
        score += 5;
        improvements.push({ type: 'warning', message: 'Professional summary is too long, consider condensing it' });
      }

      // Check for key industry terms
      const industryTerms = ['experienced', 'professional', 'skilled', 'expertise', 'accomplished'];
      const hasIndustryTerms = industryTerms.some(term => resumeData.summary.toLowerCase().includes(term));
      if (!hasIndustryTerms) {
        improvements.push({ type: 'info', message: 'Consider adding industry-specific keywords to your summary' });
      }
    } else {
      feedback.push({ type: 'error', message: 'Missing professional summary' });
    }

    // Check Work Experience (30 points)
    maxScore += 30;
    if (resumeData.experience.length > 0) {
      const experiencePoints = Math.min(resumeData.experience.length * 5, 15);
      score += experiencePoints;
      
      let hasDetailedDescriptions = true;
      let hasActionVerbs = true;
      let hasMetrics = true;

      resumeData.experience.forEach(exp => {
        // Check description length and quality
        if (exp.description.length < 3) {
          hasDetailedDescriptions = false;
        }

        // Check for action verbs at the start of each bullet
        const actionVerbs = ['led', 'developed', 'managed', 'created', 'implemented', 'achieved', 'increased', 'reduced'];
        const hasVerbs = exp.description.every(desc => 
          actionVerbs.some(verb => desc.toLowerCase().startsWith(verb))
        );
        if (!hasVerbs) hasActionVerbs = false;

        // Check for metrics and numbers
        const hasNumbers = exp.description.some(desc => /\d+%|\d+x|\$\d+|\d+ [a-zA-Z]+/.test(desc));
        if (!hasNumbers) hasMetrics = false;

        // Date format validation
        if (!/^\d{2}\/\d{4}$/.test(exp.startDate) || !/^\d{2}\/\d{4}$|^Present$/i.test(exp.endDate)) {
          improvements.push({ type: 'warning', message: `Date format in ${exp.company} experience should be MM/YYYY` });
        }
      });

      if (hasDetailedDescriptions) score += 5;
      else improvements.push({ type: 'warning', message: 'Add more details to work experiences (aim for 3-5 bullet points each)' });

      if (hasActionVerbs) score += 5;
      else improvements.push({ type: 'warning', message: 'Start achievement bullets with strong action verbs' });

      if (hasMetrics) score += 5;
      else improvements.push({ type: 'info', message: 'Include measurable achievements and metrics in your experience' });

    } else {
      feedback.push({ type: 'error', message: 'Missing work experience' });
    }

    // Check Education (15 points)
    maxScore += 15;
    if (resumeData.education.length > 0) {
      score += 10;
      
      const hasRelevantInfo = resumeData.education.every(edu => 
        edu.degree && edu.fieldOfStudy && edu.school && edu.startDate && edu.endDate
      );
      
      if (hasRelevantInfo) score += 5;
      else improvements.push({ type: 'warning', message: 'Include complete education details for better matching' });
    } else {
      feedback.push({ type: 'error', message: 'Missing education information' });
    }

    // Check Skills (20 points)
    maxScore += 20;
    if (resumeData.skills.length > 0) {
      let skillScore = Math.min(resumeData.skills.length * 3, 10);
      score += skillScore;
      
      // Check for skill categorization
      const hasCategories = resumeData.skills.every(skill => skill.category && skill.items.length >= 3);
      if (hasCategories) score += 5;
      else improvements.push({ type: 'warning', message: 'Organize skills into clear categories with at least 3 items each' });

      // Check for technical and soft skills balance
      const hasTechnicalSkills = resumeData.skills.some(skill => 
        skill.category.toLowerCase().includes('technical') || 
        skill.category.toLowerCase().includes('programming')
      );
      const hasSoftSkills = resumeData.skills.some(skill => 
        skill.category.toLowerCase().includes('soft') || 
        skill.category.toLowerCase().includes('interpersonal')
      );

      if (hasTechnicalSkills && hasSoftSkills) score += 5;
      else improvements.push({ type: 'info', message: 'Include both technical and soft skills for a well-rounded profile' });
    } else {
      feedback.push({ type: 'error', message: 'Missing skills section' });
    }

    const percentage = Math.round((score / maxScore) * 100);

    return {
      score: percentage,
      feedback,
      improvements,
    };
  };

  const { score, feedback, improvements } = calculateATSScore();

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreCategory = (score: number) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Needs Improvement';
    return 'Poor';
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getScoreBreakdown = () => {
    return [
      { label: 'Personal Info', max: 20, icon: <Target className="h-4 w-4" /> },
      { label: 'Summary', max: 15, icon: <Zap className="h-4 w-4" /> },
      { label: 'Experience', max: 30, icon: <Award className="h-4 w-4" /> },
      { label: 'Education', max: 15, icon: <BarChart3 className="h-4 w-4" /> },
      { label: 'Skills', max: 20, icon: <CheckCircle className="h-4 w-4" /> },
    ];
  };

  return (
    <div className="p-6 dark:text-gray-100">
      <h2 className="text-lg font-medium mb-4">ATS Score Analysis</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-lg font-medium">Overall Score</span>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Category: {getScoreCategory(score)}
            </p>
          </div>
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
          <div
            className={`h-2.5 rounded-full ${
              score >= 85
                ? 'bg-green-600'
                : score >= 70
                ? 'bg-yellow-600'
                : 'bg-red-600'
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {getScoreBreakdown().map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              {item.icon}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Max: {item.max}pts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium dark:text-gray-100 mb-2">Critical Issues</h3>
            {feedback.length === 0 ? (
              <p className="text-sm text-green-600 dark:text-green-400">No critical issues found!</p>
            ) : (
              <div className="space-y-2">
                {feedback.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 p-3 rounded-lg ${
                      item.type === 'error'
                        ? 'bg-red-50 dark:bg-red-900/20'
                        : item.type === 'warning'
                        ? 'bg-yellow-50 dark:bg-yellow-900/20'
                        : 'bg-blue-50 dark:bg-blue-900/20'
                    }`}
                  >
                    {getFeedbackIcon(item.type)}
                    <span className="text-sm dark:text-gray-300">{item.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium dark:text-gray-100 mb-2">Suggested Improvements</h3>
            <div className="space-y-2">
              {improvements.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 p-3 rounded-lg ${
                    item.type === 'warning'
                      ? 'bg-yellow-50 dark:bg-yellow-900/20'
                      : 'bg-blue-50 dark:bg-blue-900/20'
                  }`}
                >
                  {getFeedbackIcon(item.type)}
                  <span className="text-sm dark:text-gray-300">{item.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}