import React, { useState } from 'react';
import { User, Settings, Trophy, TrendingUp, Calendar, LogOut, Edit2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useUserProgress } from '../hooks/useUserProgress';
import { useLanguage } from '../hooks/useLanguage';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, logout, updateProfile, isLoading } = useAuth();
  const { userProgress } = useUserProgress();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    age: user?.age || 0,
    grade: user?.grade || 0
  });

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleSaveProfile = async () => {
    if (user) {
      const success = await updateProfile(editData);
      if (success) {
        setIsEditing(false);
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getGradeLetter = (percentage: number): string => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B+';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'B-';
    if (percentage >= 50) return 'C';
    return 'D';
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
          >
            <User className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
              <p className="text-blue-100">Grade {user.grade} • Age {user.age}</p>
              <p className="text-blue-100 text-sm">Member since {formatDate(user.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-blue-600" />
                Profile Information
              </h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <Edit2 className="w-4 h-4" />
                <span>{isEditing ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={editData.firstName}
                      onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={editData.lastName}
                      onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      value={editData.age}
                      onChange={(e) => setEditData({ ...editData, age: parseInt(e.target.value) })}
                      min="6"
                      max="18"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade Level
                    </label>
                    <input
                      type="number"
                      value={editData.grade}
                      onChange={(e) => setEditData({ ...editData, grade: parseInt(e.target.value) })}
                      min="1"
                      max="12"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <span className="text-gray-600">Language:</span>
                  <p className="font-medium">{user.preferredLanguage.toUpperCase()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Last Login:</span>
                  <p className="font-medium">{formatDate(user.lastLoginAt)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Student ID:</span>
                  <p className="font-medium font-mono">{user.id}</p>
                </div>
              </div>
            )}
          </div>

          {/* Progress Overview */}
          {userProgress && (
            <>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Progress Overview
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {userProgress.overallStats.totalAssessments}
                    </div>
                    <div className="text-sm text-gray-600">Assessments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {getGradeLetter(userProgress.overallStats.averageScore)}
                    </div>
                    <div className="text-sm text-gray-600">Avg Grade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(userProgress.overallStats.bestScore)}%
                    </div>
                    <div className="text-sm text-gray-600">Best Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.round(userProgress.overallStats.totalTimeSpent)}m
                    </div>
                    <div className="text-sm text-gray-600">Time Spent</div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              {userProgress.achievements.length > 0 && (
                <div className="bg-yellow-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                    Recent Achievements
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {userProgress.achievements.slice(-4).map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-yellow-200">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          <p className="text-xs text-gray-500">{formatDate(achievement.earnedAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subject Performance */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                  Subject Performance
                </h3>
                
                <div className="space-y-4">
                  {Object.entries(userProgress.subjectProgress).map(([subject, data]) => (
                    <div key={subject} className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 capitalize">{subject}</h4>
                        <p className="text-sm text-gray-600">
                          {data.assessmentCount} assessments • {Math.round(data.averageScore)}% average
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          data.trend === 'improving' ? 'bg-green-100 text-green-800' :
                          data.trend === 'declining' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {data.trend === 'improving' ? '↗ Improving' :
                           data.trend === 'declining' ? '↘ Declining' :
                           '→ Stable'}
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          {getGradeLetter(data.averageScore)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;