import React, { useState } from 'react';
import { BookOpen, Calculator, Brain, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useAssessment } from '../hooks/useAssessment';
import { assessments } from '../data/assessments';
import AssessmentCard from './AssessmentCard';
import AssessmentInterface from './AssessmentInterface';
import AssessmentResults from './AssessmentResults';
import { AssessmentResult } from '../types';

interface AssessmentPageProps {
  onBack: () => void;
}

const AssessmentPage: React.FC<AssessmentPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const { startAssessment, currentAssessment } = useAssessment();
  const [currentView, setCurrentView] = useState<'selection' | 'assessment' | 'results'>('selection');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'reading' | 'mathematics' | 'combined'>('all');

  const handleStartAssessment = (assessmentId: string) => {
    startAssessment(assessmentId);
    setCurrentView('assessment');
  };

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setAssessmentResult(result);
    setCurrentView('results');
  };

  const handleRetakeAssessment = () => {
    if (currentAssessment) {
      startAssessment(currentAssessment.id);
      setCurrentView('assessment');
    }
  };

  const handleViewProgress = () => {
    // In a real app, this would navigate to the progress page
    setCurrentView('selection');
  };

  const handleBackToAssessments = () => {
    setCurrentView('selection');
  };

  const handleExitAssessment = () => {
    setCurrentView('selection');
  };

  const filteredAssessments = selectedSubject === 'all' 
    ? assessments 
    : assessments.filter(assessment => assessment.subject === selectedSubject);

  const subjectFilters = [
    { key: 'all', label: 'All Assessments', icon: Brain, color: 'bg-purple-500' },
    { key: 'reading', label: t('reading'), icon: BookOpen, color: 'bg-green-500' },
    { key: 'mathematics', label: t('mathematics'), icon: Calculator, color: 'bg-blue-500' },
    { key: 'combined', label: 'Combined', icon: Brain, color: 'bg-purple-500' }
  ];

  if (currentView === 'assessment') {
    return (
      <AssessmentInterface 
        onComplete={handleAssessmentComplete}
        onExit={handleExitAssessment}
      />
    );
  }

  if (currentView === 'results' && assessmentResult) {
    return (
      <AssessmentResults
        result={assessmentResult}
        onRetakeAssessment={handleRetakeAssessment}
        onViewProgress={handleViewProgress}
        onBackToAssessments={handleBackToAssessments}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('assessments')}</h1>
              <p className="text-gray-600 mt-1">
                Choose an assessment to measure your skills and track your progress
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Subject Filters */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter by Subject</h2>
          <div className="flex flex-wrap gap-3">
            {subjectFilters.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <button
                  key={filter.key}
                  onClick={() => setSelectedSubject(filter.key as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    selectedSubject === filter.key
                      ? `${filter.color} text-white shadow-lg transform scale-105`
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Assessment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              onStart={handleStartAssessment}
            />
          ))}
        </div>

        {filteredAssessments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No assessments found</h3>
            <p className="text-gray-600">
              Try selecting a different subject filter to see available assessments.
            </p>
          </div>
        )}

        {/* Assessment Info */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-4">About Our Assessments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
            <div>
              <h4 className="font-semibold mb-2">PISA-Aligned Standards</h4>
              <p>Our assessments are designed to align with international PISA standards, helping students prepare for global benchmarks.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Adaptive Difficulty</h4>
              <p>Questions adapt to your skill level, providing an optimal challenge that promotes learning and growth.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Cultural Relevance</h4>
              <p>Content includes Filipino cultural contexts and examples that resonate with local students' experiences.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Detailed Analytics</h4>
              <p>Receive comprehensive feedback on your performance with specific recommendations for improvement.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;