import React from 'react';
import { BookOpen, Calculator, TrendingUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface HeroSectionProps {
  onNavigateToAssessments: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToAssessments }) => {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Types of Assessments
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('welcomeSubtext')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onNavigateToAssessments}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>{t('startAssessment')}</span>
            </button>
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>{t('viewProgress')}</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('reading')}</h3>
            <p className="text-gray-600">Comprehensive reading comprehension assessments with culturally relevant content</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('mathematics')}</h3>
            <p className="text-gray-600">PISA-aligned mathematical assessments covering all key competency areas</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('progress')}</h3>
            <p className="text-gray-600">Track progress over time with detailed analytics and improvement recommendations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;