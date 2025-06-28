import React, { useState, useEffect } from 'react';
import { pisaScores } from '../data/pisaData';
import { useLanguage } from '../hooks/useLanguage';

type Subject = 'mathematics' | 'reading' | 'science';

const PisaComparison: React.FC = () => {
  const { t } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState<Subject>('science');
  const [animationKey, setAnimationKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const subjects: { key: Subject; label: string; color: string }[] = [
    { key: 'mathematics', label: t('mathematics'), color: 'bg-blue-500' },
    { key: 'reading', label: t('reading'), color: 'bg-green-500' },
    { key: 'science', label: t('science'), color: 'bg-purple-500' }
  ];

  const maxScore = Math.max(...pisaScores.map(country => country[selectedSubject]));
  const sortedScores = [...pisaScores].sort((a, b) => b[selectedSubject] - a[selectedSubject]);

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationKey(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 3000);
  };

  useEffect(() => {
    startAnimation();
    const interval = setInterval(startAnimation, 10000);
    return () => clearInterval(interval);
  }, [selectedSubject]);

  const getRankingIcon = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 500) return 'from-green-400 to-green-600';
    if (score >= 400) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {t('pisaComparison')}
      </h3>

      {/* Subject Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {subjects.map((subject) => (
          <button
            key={subject.key}
            onClick={() => setSelectedSubject(subject.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedSubject === subject.key
                ? `${subject.color} text-white shadow-lg transform scale-105`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {subject.label}
          </button>
        ))}
      </div>

      {/* Animated Bar Chart */}
      <div className="space-y-4" key={animationKey}>
        {sortedScores.map((country, index) => {
          const score = country[selectedSubject];
          const percentage = (score / maxScore) * 100;
          const isPhilippines = country.country === 'Philippines';
          
          return (
            <div 
              key={country.country} 
              className={`relative group ${isPhilippines ? 'ring-2 ring-blue-400 rounded-lg p-2' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{country.flag}</span>
                  <span className="text-lg">{getRankingIcon(index)}</span>
                  <span className={`font-semibold ${isPhilippines ? 'text-blue-700' : 'text-gray-900'}`}>
                    {country.country}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${isPhilippines ? 'text-blue-700' : 'text-gray-900'}`}>
                    {score}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">pts</span>
                </div>
              </div>
              
              <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getPerformanceColor(score)} transition-all duration-1000 ease-out transform origin-left`}
                  style={{
                    width: `${percentage}%`,
                    animationDelay: `${index * 0.2}s`,
                    animation: isAnimating ? `slideIn 1s ease-out ${index * 0.2}s both` : undefined
                  }}
                >
                  <div className="absolute inset-0 bg-white bg-opacity-20 animate-pulse"></div>
                </div>
                
                {/* Global Rank Badge */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs font-medium text-gray-600 bg-white bg-opacity-80 px-2 py-1 rounded-full">
                    #{country.globalRank}
                  </span>
                </div>
              </div>

              {/* Gap Indicator for Philippines */}
              {isPhilippines && index > 0 && (
                <div className="mt-2 text-sm text-blue-600">
                  <span className="font-medium">
                    Gap from Singapore: -{(sortedScores[0][selectedSubject] - score)} points
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Performance Summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h4 className="font-bold text-blue-900 mb-2">Performance Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-800">ASEAN Average:</span>
            <span className="ml-2 text-blue-700">
              {Math.round(sortedScores.reduce((sum, country) => sum + country[selectedSubject], 0) / sortedScores.length)} points
            </span>
          </div>
          <div>
            <span className="font-medium text-blue-800">Philippines Gap:</span>
            <span className="ml-2 text-blue-700">
              -{Math.round((sortedScores.reduce((sum, country) => sum + country[selectedSubject], 0) / sortedScores.length) - pisaScores.find(c => c.country === 'Philippines')![selectedSubject])} points
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PisaComparison;