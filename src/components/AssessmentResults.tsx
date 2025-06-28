import React from 'react';
import { Trophy, Target, TrendingUp, BookOpen, Calculator, Award, ArrowRight } from 'lucide-react';
import { AssessmentResult } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface AssessmentResultsProps {
  result: AssessmentResult;
  onRetakeAssessment: () => void;
  onViewProgress: () => void;
  onBackToAssessments: () => void;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({ 
  result, 
  onRetakeAssessment, 
  onViewProgress, 
  onBackToAssessments 
}) => {
  const { t } = useLanguage();

  const getGradeLetter = (percentage: number): string => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B+';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'B-';
    if (percentage >= 50) return 'C';
    return 'D';
  };

  const getPerformanceColor = (percentage: number): string => {
    if (percentage >= 80) return 'from-green-500 to-green-600';
    if (percentage >= 70) return 'from-blue-500 to-blue-600';
    if (percentage >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-red-600';
  };

  const getPerformanceMessage = (percentage: number): string => {
    if (percentage >= 90) return 'Excellent work! Outstanding performance!';
    if (percentage >= 80) return 'Great job! Very good performance!';
    if (percentage >= 70) return 'Good work! Solid performance!';
    if (percentage >= 60) return 'Fair performance. Keep practicing!';
    return 'Needs improvement. Don\'t give up!';
  };

  const duration = Math.round((result.endTime.getTime() - result.startTime.getTime()) / 1000 / 60);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Assessment Complete!
          </h1>
          <p className="text-xl text-gray-600">
            {getPerformanceMessage(result.percentage)}
          </p>
        </div>

        {/* Overall Score Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${getPerformanceColor(result.percentage)} text-white mb-6`}>
              <div className="text-center">
                <div className="text-4xl font-bold">{getGradeLetter(result.percentage)}</div>
                <div className="text-lg">{Math.round(result.percentage)}%</div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Score</h2>
            <p className="text-lg text-gray-600 mb-4">
              {result.score} out of {result.answers.length} questions correct
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center justify-center mb-2">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-sm text-gray-600">PISA Projection</div>
                <div className="text-xl font-bold text-blue-600">{result.pisaProjection}</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-sm text-gray-600">Time Taken</div>
                <div className="text-xl font-bold text-green-600">{duration} min</div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-sm text-gray-600">Performance</div>
                <div className="text-xl font-bold text-purple-600">{getGradeLetter(result.percentage)} Grade</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
            Skill Breakdown
          </h3>
          
          <div className="space-y-4">
            {Object.entries(result.skillBreakdown).map(([skill, data]) => (
              <div key={skill} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 capitalize">
                    {skill.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <span className={`font-bold ${
                    data.percentage >= 80 ? 'text-green-600' :
                    data.percentage >= 70 ? 'text-blue-600' :
                    data.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {Math.round(data.percentage)}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{data.correct} out of {data.total} correct</span>
                  <span>{getGradeLetter(data.percentage)}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      data.percentage >= 80 ? 'bg-green-500' :
                      data.percentage >= 70 ? 'bg-blue-500' :
                      data.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${data.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {result.recommendations.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 text-orange-600 mr-2" />
              Recommendations for Improvement
            </h3>
            
            <div className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-orange-800 font-medium">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={onRetakeAssessment}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <Calculator className="w-5 h-5" />
            <span>Retake Assessment</span>
          </button>
          
          <button
            onClick={onViewProgress}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            <TrendingUp className="w-5 h-5" />
            <span>View Progress</span>
          </button>
          
          <button
            onClick={onBackToAssessments}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
          >
            <span>More Assessments</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;