// Test accounts data with pre-populated progress for demonstration
import { AssessmentResult, UserProgress } from '../types';

// Sample assessment results for different test accounts
export const testAccountsProgress: { [userId: string]: UserProgress } = {
  'user-001': {
    userId: 'user-001',
    assessmentResults: [
      {
        id: 'result-001-1',
        assessmentId: 'reading-intermediate',
        studentId: 'user-001',
        startTime: new Date('2024-11-15T10:00:00'),
        endTime: new Date('2024-11-15T10:45:00'),
        answers: [],
        score: 4,
        percentage: 80,
        skillBreakdown: {
          comprehension: { correct: 2, total: 2, percentage: 100 },
          criticalAnalysis: { correct: 2, total: 3, percentage: 67 }
        },
        recommendations: ['Focus on critical analysis skills'],
        pisaProjection: 420
      },
      {
        id: 'result-001-2',
        assessmentId: 'math-intermediate',
        studentId: 'user-001',
        startTime: new Date('2024-11-20T14:00:00'),
        endTime: new Date('2024-11-20T14:45:00'),
        answers: [],
        score: 4,
        percentage: 85,
        skillBreakdown: {
          numberOperations: { correct: 3, total: 3, percentage: 100 },
          geometry: { correct: 1, total: 2, percentage: 50 }
        },
        recommendations: ['Practice geometry problems'],
        pisaProjection: 435
      }
    ],
    overallStats: {
      totalAssessments: 2,
      averageScore: 82.5,
      bestScore: 85,
      totalTimeSpent: 90,
      strongestSubject: 'mathematics',
      weakestSubject: 'reading'
    },
    subjectProgress: {
      mathematics: {
        assessmentCount: 1,
        averageScore: 85,
        latestScore: 85,
        trend: 'stable'
      },
      reading: {
        assessmentCount: 1,
        averageScore: 80,
        latestScore: 80,
        trend: 'stable'
      },
      science: {
        assessmentCount: 0,
        averageScore: 0,
        latestScore: 0,
        trend: 'stable'
      }
    },
    skillAreas: {
      comprehension: {
        assessmentCount: 1,
        averageScore: 100,
        latestScore: 100,
        needsImprovement: false
      },
      criticalAnalysis: {
        assessmentCount: 1,
        averageScore: 67,
        latestScore: 67,
        needsImprovement: true
      },
      numberOperations: {
        assessmentCount: 1,
        averageScore: 100,
        latestScore: 100,
        needsImprovement: false
      },
      geometry: {
        assessmentCount: 1,
        averageScore: 50,
        latestScore: 50,
        needsImprovement: true
      }
    },
    achievements: [
      {
        id: 'first_assessment',
        title: 'Getting Started',
        description: 'Completed your first assessment!',
        earnedAt: new Date('2024-11-15T10:45:00'),
        icon: '🎯'
      }
    ],
    lastUpdated: new Date('2024-11-20T14:45:00')
  },
  'user-003': {
    userId: 'user-003',
    assessmentResults: [
      {
        id: 'result-003-1',
        assessmentId: 'math-basic',
        studentId: 'user-003',
        startTime: new Date('2024-11-18T09:00:00'),
        endTime: new Date('2024-11-18T09:30:00'),
        answers: [],
        score: 5,
        percentage: 100,
        skillBreakdown: {
          numberOperations: { correct: 5, total: 5, percentage: 100 }
        },
        recommendations: [],
        pisaProjection: 450
      }
    ],
    overallStats: {
      totalAssessments: 1,
      averageScore: 100,
      bestScore: 100,
      totalTimeSpent: 30,
      strongestSubject: 'mathematics',
      weakestSubject: ''
    },
    subjectProgress: {
      mathematics: {
        assessmentCount: 1,
        averageScore: 100,
        latestScore: 100,
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
    skillAreas: {
      numberOperations: {
        assessmentCount: 1,
        averageScore: 100,
        latestScore: 100,
        needsImprovement: false
      }
    },
    achievements: [
      {
        id: 'first_assessment',
        title: 'Getting Started',
        description: 'Completed your first assessment!',
        earnedAt: new Date('2024-11-18T09:30:00'),
        icon: '🎯'
      },
      {
        id: 'perfect_score',
        title: 'Perfect Score',
        description: 'Achieved a perfect 100% on an assessment!',
        earnedAt: new Date('2024-11-18T09:30:00'),
        icon: '🏆'
      }
    ],
    lastUpdated: new Date('2024-11-18T09:30:00')
  }
};

// Function to initialize test account progress
export const initializeTestAccountProgress = (userId: string): UserProgress | null => {
  return testAccountsProgress[userId] || null;
};