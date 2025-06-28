import React from 'react';
import { Clock, Users, BookOpen, Calculator, Brain } from 'lucide-react';
import { Assessment } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface AssessmentCardProps {
  assessment: Assessment;
  onStart: (assessmentId: string) => void;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({ assessment, onStart }) => {
  const { t } = useLanguage();

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'reading':
        return <BookOpen className="w-6 h-6" />;
      case 'mathematics':
        return <Calculator className="w-6 h-6" />;
      case 'combined':
        return <Brain className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'reading':
        return 'from-green-500 to-green-600';
      case 'mathematics':
        return 'from-blue-500 to-blue-600';
      case 'combined':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      case 'adaptive':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${getSubjectColor(assessment.subject)} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getSubjectIcon(assessment.subject)}
            <div>
              <h3 className="text-xl font-bold">{assessment.title}</h3>
              <p className="text-sm opacity-90">{t(assessment.subject)}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assessment.difficulty)} bg-white bg-opacity-20`}>
            {assessment.difficulty.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-4 leading-relaxed">
          {assessment.description}
        </p>

        {/* Assessment Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{assessment.duration} minutes</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-green-500" />
            <span>Ages {assessment.ageGroup}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <BookOpen className="w-4 h-4 text-purple-500" />
            <span>{assessment.questions.length} questions</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Brain className="w-4 h-4 text-orange-500" />
            <span>PISA-aligned</span>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => onStart(assessment.id)}
          className={`w-full py-3 px-6 bg-gradient-to-r ${getSubjectColor(assessment.subject)} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
        >
          <span>{t('startAssessment')}</span>
          <BookOpen className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AssessmentCard;