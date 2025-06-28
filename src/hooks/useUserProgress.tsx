import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { AssessmentResult, UserProgress } from '../types';
import { useAuth } from './useAuth';
import { initializeTestAccountProgress } from '../data/testAccountsData';

interface UserProgressContextType {
  userProgress: UserProgress | null;
  saveAssessmentResult: (result: AssessmentResult) => void;
  getUserResults: () => AssessmentResult[];
  getSubjectProgress: (subject: string) => any;
  getOverallStats: () => any;
  isLoading: boolean;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user progress when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserProgress(user.id);
    } else {
      setUserProgress(null);
    }
  }, [user, isAuthenticated]);

  const loadUserProgress = async (userId: string) => {
    setIsLoading(true);
    try {
      // Check for stored progress first
      const storedProgress = localStorage.getItem(`progress_${userId}`);
      
      if (storedProgress) {
        const progress = JSON.parse(storedProgress);
        // Convert date strings back to Date objects
        progress.assessmentResults = progress.assessmentResults.map((result: any) => ({
          ...result,
          startTime: new Date(result.startTime),
          endTime: new Date(result.endTime)
        }));
        progress.lastUpdated = new Date(progress.lastUpdated);
        progress.achievements = progress.achievements.map((achievement: any) => ({
          ...achievement,
          earnedAt: new Date(achievement.earnedAt)
        }));
        
        setUserProgress(progress);
        console.log(`📊 Loaded existing progress for user ${userId}`);
      } else {
        // Check if this is a test account with pre-populated data
        const testProgress = initializeTestAccountProgress(userId);
        
        if (testProgress) {
          setUserProgress(testProgress);
          localStorage.setItem(`progress_${userId}`, JSON.stringify(testProgress));
          console.log(`🧪 Initialized test account progress for user ${userId}`);
        } else {
          // Initialize new progress for user
          const newProgress: UserProgress = {
            userId,
            assessmentResults: [],
            overallStats: {
              totalAssessments: 0,
              averageScore: 0,
              bestScore: 0,
              totalTimeSpent: 0,
              strongestSubject: '',
              weakestSubject: ''
            },
            subjectProgress: {
              mathematics: {
                assessmentCount: 0,
                averageScore: 0,
                latestScore: 0,
                trend: 'stable'
              },
              reading: {
                assessmentCount: 0,
                averageScore: 0,
                latestScore: 0,
                trend: 'stable'
              },
              science: {
                assessmentCount: 0,
                averageScore: 0,
                latestScore: 0,
                trend: 'stable'
              }
            },
            skillAreas: {},
            achievements: [],
            lastUpdated: new Date()
          };
          
          setUserProgress(newProgress);
          localStorage.setItem(`progress_${userId}`, JSON.stringify(newProgress));
          console.log(`✨ Created new progress for user ${userId}`);
        }
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAssessmentResult = (result: AssessmentResult) => {
    if (!user || !userProgress) return;

    const updatedResults = [...userProgress.assessmentResults, result];
    
    // Calculate updated statistics
    const updatedProgress = calculateProgressStats({
      ...userProgress,
      assessmentResults: updatedResults,
      lastUpdated: new Date()
    });

    // Check for new achievements
    const newAchievements = checkForAchievements(updatedProgress);
    updatedProgress.achievements = [...updatedProgress.achievements, ...newAchievements];

    setUserProgress(updatedProgress);
    localStorage.setItem(`progress_${user.id}`, JSON.stringify(updatedProgress));
    
    console.log(`💾 Saved assessment result for user ${user.id}:`, {
      assessmentId: result.assessmentId,
      score: result.score,
      percentage: result.percentage
    });
  };

  const calculateProgressStats = (progress: UserProgress): UserProgress => {
    const results = progress.assessmentResults;
    
    if (results.length === 0) return progress;

    // Overall stats
    const totalAssessments = results.length;
    const averageScore = results.reduce((sum, r) => sum + r.percentage, 0) / totalAssessments;
    const bestScore = Math.max(...results.map(r => r.percentage));
    const totalTimeSpent = results.reduce((sum, r) => {
      const duration = (r.endTime.getTime() - r.startTime.getTime()) / 1000 / 60; // minutes
      return sum + duration;
    }, 0);

    // Subject progress
    const subjectResults = {
      mathematics: results.filter(r => r.assessmentId.includes('math')),
      reading: results.filter(r => r.assessmentId.includes('reading')),
      science: results.filter(r => r.assessmentId.includes('science') || r.assessmentId.includes('combined'))
    };

    const subjectProgress = Object.entries(subjectResults).reduce((acc, [subject, subjectResults]) => {
      if (subjectResults.length === 0) {
        acc[subject as keyof typeof acc] = {
          assessmentCount: 0,
          averageScore: 0,
          latestScore: 0,
          trend: 'stable' as const
        };
        return acc;
      }

      const assessmentCount = subjectResults.length;
      const averageScore = subjectResults.reduce((sum, r) => sum + r.percentage, 0) / assessmentCount;
      const latestScore = subjectResults[subjectResults.length - 1].percentage;
      
      // Calculate trend
      let trend: 'improving' | 'declining' | 'stable' = 'stable';
      if (subjectResults.length >= 2) {
        const recent = subjectResults.slice(-3).map(r => r.percentage);
        const older = subjectResults.slice(-6, -3).map(r => r.percentage);
        
        if (older.length > 0) {
          const recentAvg = recent.reduce((sum, score) => sum + score, 0) / recent.length;
          const olderAvg = older.reduce((sum, score) => sum + score, 0) / older.length;
          
          if (recentAvg > olderAvg + 5) trend = 'improving';
          else if (recentAvg < olderAvg - 5) trend = 'declining';
        }
      }

      acc[subject as keyof typeof acc] = {
        assessmentCount,
        averageScore,
        latestScore,
        trend
      };
      
      return acc;
    }, {} as UserProgress['subjectProgress']);

    // Skill areas
    const skillAreas: UserProgress['skillAreas'] = {};
    results.forEach(result => {
      Object.entries(result.skillBreakdown).forEach(([skill, data]) => {
        if (!skillAreas[skill]) {
          skillAreas[skill] = {
            assessmentCount: 0,
            averageScore: 0,
            latestScore: 0,
            needsImprovement: false
          };
        }
        
        skillAreas[skill].assessmentCount++;
        skillAreas[skill].latestScore = data.percentage;
        skillAreas[skill].averageScore = (
          (skillAreas[skill].averageScore * (skillAreas[skill].assessmentCount - 1) + data.percentage) /
          skillAreas[skill].assessmentCount
        );
        skillAreas[skill].needsImprovement = skillAreas[skill].averageScore < 70;
      });
    });

    // Determine strongest and weakest subjects
    const subjectScores = Object.entries(subjectProgress)
      .filter(([_, data]) => data.assessmentCount > 0)
      .map(([subject, data]) => ({ subject, score: data.averageScore }));
    
    const strongestSubject = subjectScores.reduce((max, current) => 
      current.score > max.score ? current : max, { subject: '', score: 0 }).subject;
    
    const weakestSubject = subjectScores.reduce((min, current) => 
      current.score < min.score ? current : min, { subject: '', score: 100 }).subject;

    return {
      ...progress,
      overallStats: {
        totalAssessments,
        averageScore,
        bestScore,
        totalTimeSpent,
        strongestSubject,
        weakestSubject
      },
      subjectProgress,
      skillAreas
    };
  };

  const checkForAchievements = (progress: UserProgress) => {
    const newAchievements = [];
    const existingAchievementIds = progress.achievements.map(a => a.id);

    // First assessment achievement
    if (progress.overallStats.totalAssessments === 1 && !existingAchievementIds.includes('first_assessment')) {
      newAchievements.push({
        id: 'first_assessment',
        title: 'Getting Started',
        description: 'Completed your first assessment!',
        earnedAt: new Date(),
        icon: '🎯'
      });
    }

    // Perfect score achievement
    if (progress.overallStats.bestScore === 100 && !existingAchievementIds.includes('perfect_score')) {
      newAchievements.push({
        id: 'perfect_score',
        title: 'Perfect Score',
        description: 'Achieved a perfect 100% on an assessment!',
        earnedAt: new Date(),
        icon: '🏆'
      });
    }

    // Consistent performer achievement
    if (progress.overallStats.totalAssessments >= 5 && 
        progress.overallStats.averageScore >= 80 && 
        !existingAchievementIds.includes('consistent_performer')) {
      newAchievements.push({
        id: 'consistent_performer',
        title: 'Consistent Performer',
        description: 'Maintained an 80%+ average across 5+ assessments!',
        earnedAt: new Date(),
        icon: '⭐'
      });
    }

    // Subject mastery achievements
    Object.entries(progress.subjectProgress).forEach(([subject, data]) => {
      const achievementId = `${subject}_mastery`;
      if (data.assessmentCount >= 3 && 
          data.averageScore >= 85 && 
          !existingAchievementIds.includes(achievementId)) {
        newAchievements.push({
          id: achievementId,
          title: `${subject.charAt(0).toUpperCase() + subject.slice(1)} Master`,
          description: `Achieved mastery in ${subject} with 85%+ average!`,
          earnedAt: new Date(),
          icon: subject === 'mathematics' ? '🔢' : subject === 'reading' ? '📚' : '🔬'
        });
      }
    });

    if (newAchievements.length > 0) {
      console.log(`🏆 New achievements unlocked:`, newAchievements.map(a => a.title));
    }

    return newAchievements;
  };

  const getUserResults = (): AssessmentResult[] => {
    return userProgress?.assessmentResults || [];
  };

  const getSubjectProgress = (subject: string) => {
    return userProgress?.subjectProgress[subject as keyof UserProgress['subjectProgress']];
  };

  const getOverallStats = () => {
    return userProgress?.overallStats;
  };

  return (
    <UserProgressContext.Provider value={{
      userProgress,
      saveAssessmentResult,
      getUserResults,
      getSubjectProgress,
      getOverallStats,
      isLoading
    }}>
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};