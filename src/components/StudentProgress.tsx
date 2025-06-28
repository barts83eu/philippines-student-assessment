import React, { useState } from 'react';
import { TrendingUp, Award, Target, Calendar, BookOpen, Trophy, Clock } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import { useUserProgress } from '../hooks/useUserProgress';
import { trackProgressView } from '../utils/analytics';
import AuthModal from './AuthModal';

const StudentProgress: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const { userProgress } = useUserProgress();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const getGradeLetter = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B+';
    if (score >= 70) return 'B';
    if (score >= 60) return 'B-';
    if (score >= 50) return 'C';
    return 'D';
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const LoginPrompt = () => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {t('studentProgress')}
      </h3>
      
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <TrendingUp className="w-10 h-10 text-blue-600" />
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Track Your Learning Journey</h4>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Monitor your progress, see detailed analytics, and get personalized recommendations to improve your skills.
        </p>
        <button 
          onClick={() => setIsAuthModalOpen(true)}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          {t('createAccount')}
        </button>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="register"
      />
    </div>
  );

  const StudentDashboard = () => {
    if (!userProgress || !user) return null;

    // Track progress view
    React.useEffect(() => {
      trackProgressView();
    }, []);

    const recentResults = userProgress.assessmentResults.slice(-5);
    const hasResults = userProgress.assessmentResults.length > 0;

    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {t('studentProgress')}
          </h3>
          <div className="bg-green-100 px-3 py-1 rounded-full text-sm font-medium text-green-800">
            Live Data
          </div>
        </div>

        {/* Student Info Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">{user.firstName} {user.lastName}</h4>
              <p className="text-gray-600">Grade {user.grade} • Age {user.age}</p>
              {hasResults && (
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">Latest PISA Projection:</span>
                  <span className="font-bold text-blue-600">
                    {recentResults[recentResults.length - 1]?.pisaProjection || 'N/A'} points
                  </span>
                  <span className="text-xs text-green-600">📈 Tracked</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {hasResults ? (
          <>
            {/* Overall Performance */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-6 h-6 text-blue-600" />
                  <span className={`text-2xl font-bold ${getScoreColor(userProgress.overallStats.averageScore)}`}>
                    {getGradeLetter(userProgress.overallStats.averageScore)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{t('overallPerformance')}</p>
                <p className="text-lg font-bold text-gray-900">
                  {Math.round(userProgress.overallStats.averageScore)}/100
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-6 h-6 text-green-600" />
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Assessments</p>
                <p className="text-lg font-bold text-green-700">{userProgress.overallStats.totalAssessments}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Trophy className="w-6 h-6 text-purple-600" />
                  <span className="text-2xl">🏆</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Best Score</p>
                <p className="text-lg font-bold text-purple-700">{Math.round(userProgress.overallStats.bestScore)}%</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-6 h-6 text-orange-600" />
                  <span className="text-2xl">⏱️</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Time Spent</p>
                <p className="text-lg font-bold text-orange-700">{Math.round(userProgress.overallStats.totalTimeSpent)}m</p>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="mb-6">
              <h5 className="font-bold text-gray-900 mb-4">Recent Assessment Scores</h5>
              <div className="relative h-32 bg-gray-50 rounded-xl p-4">
                <div className="flex items-end justify-between h-full">
                  {recentResults.map((result, index) => {
                    const height = (result.percentage / 100) * 80;
                    return (
                      <div key={result.id} className="flex flex-col items-center space-y-2">
                        <div 
                          className="bg-blue-500 rounded-t-lg transition-all duration-1000 ease-out flex items-end justify-center"
                          style={{ 
                            height: `${height}%`, 
                            width: '40px',
                            animationDelay: `${index * 0.2}s`
                          }}
                        >
                          <span className="text-white text-xs font-bold mb-1">{Math.round(result.percentage)}</span>
                        </div>
                        <span className="text-xs text-gray-600">
                          {formatDate(result.endTime)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Subject Performance */}
            <div className="mb-6">
              <h5 className="font-bold text-gray-900 mb-4">Subject Performance</h5>
              <div className="space-y-3">
                {Object.entries(userProgress.subjectProgress).map(([subject, data]) => (
                  <div key={subject} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        subject === 'mathematics' ? 'bg-blue-500' :
                        subject === 'reading' ? 'bg-green-500' : 'bg-purple-500'
                      }`}></div>
                      <div>
                        <h6 className="font-medium text-gray-900 capitalize">{subject}</h6>
                        <p className="text-sm text-gray-600">
                          {data.assessmentCount} assessments • {Math.round(data.averageScore)}% average
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        data.trend === 'improving' ? 'bg-green-100 text-green-800' :
                        data.trend === 'declining' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {data.trend === 'improving' ? '↗' : data.trend === 'declining' ? '↘' : '→'}
                      </span>
                      <span className={`text-lg font-bold ${getScoreColor(data.averageScore)}`}>
                        {getGradeLetter(data.averageScore)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            {userProgress.achievements.length > 0 && (
              <div className="mb-6">
                <h5 className="font-bold text-gray-900 mb-4">Recent Achievements</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {userProgress.achievements.slice(-4).map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h6 className="font-medium text-gray-900">{achievement.title}</h6>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h6 className="font-bold text-green-800 mb-2 flex items-center">
                  <span className="mr-2">⭐</span>
                  {t('strengthAreas')}
                </h6>
                <ul className="text-sm text-green-700 space-y-1">
                  {userProgress.overallStats.strongestSubject && (
                    <li>• {userProgress.overallStats.strongestSubject.charAt(0).toUpperCase() + userProgress.overallStats.strongestSubject.slice(1)} - Your strongest subject</li>
                  )}
                  {Object.entries(userProgress.skillAreas)
                    .filter(([_, data]) => data.averageScore >= 80)
                    .slice(0, 2)
                    .map(([skill, _]) => (
                      <li key={skill}>• {skill.charAt(0).toUpperCase() + skill.slice(1)} - Excellent performance</li>
                    ))}
                </ul>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                <h6 className="font-bold text-orange-800 mb-2 flex items-center">
                  <span className="mr-2">📈</span>
                  {t('improvementAreas')}
                </h6>
                <ul className="text-sm text-orange-700 space-y-1">
                  {userProgress.overallStats.weakestSubject && (
                    <li>• {userProgress.overallStats.weakestSubject.charAt(0).toUpperCase() + userProgress.overallStats.weakestSubject.slice(1)} - Focus area</li>
                  )}
                  {Object.entries(userProgress.skillAreas)
                    .filter(([_, data]) => data.needsImprovement)
                    .slice(0, 2)
                    .map(([skill, _]) => (
                      <li key={skill}>• {skill.charAt(0).toUpperCase() + skill.slice(1)} - Needs practice</li>
                    ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">No Assessments Yet</h4>
            <p className="text-gray-600 mb-6">
              Take your first assessment to start tracking your progress and see detailed analytics.
            </p>
          </div>
        )}
      </div>
    );
  };

  return isAuthenticated ? <StudentDashboard /> : <LoginPrompt />;
};

export default StudentProgress;