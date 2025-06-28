export interface Language {
  code: string;
  name: string;
  shortName: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  grade: number;
  preferredLanguage: string;
  createdAt: Date;
  lastLoginAt: Date;
  profilePicture?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  grade: number;
  language: string;
  overallScore: number;
  subjects: {
    mathematics: number;
    reading: number;
    science: number;
  };
  skillBreakdown: {
    mathematics: {
      numberOperations: number;
      algebra: number;
      geometry: number;
      statistics: number;
    };
    reading: {
      comprehension: number;
      vocabulary: number;
      criticalAnalysis: number;
      culturalContext: number;
    };
    science: {
      scientificInquiry: number;
      lifeSciences: number;
      physicalSciences: number;
      earthSciences: number;
    };
  };
  progressHistory: Array<{
    date: string;
    overallScore: number;
    subjects: {
      mathematics: number;
      reading: number;
      science: number;
    };
  }>;
  pisaProjection: number;
}

export interface PisaScore {
  country: string;
  flag: string;
  mathematics: number;
  reading: number;
  science: number;
  globalRank: number;
}

export interface EducationLevel {
  name: string;
  ageRange: string;
  color: string;
  description: string;
}

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'open-ended' | 'true-false' | 'matching';
  subject: 'mathematics' | 'reading' | 'science';
  difficulty: 'easy' | 'medium' | 'hard';
  ageGroup: string;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  skillArea: string;
  culturalContext?: string;
  timeLimit?: number;
}

export interface Assessment {
  id: string;
  title: string;
  subject: 'mathematics' | 'reading' | 'science' | 'combined';
  ageGroup: string;
  duration: number;
  questions: Question[];
  description: string;
  difficulty: 'adaptive' | 'easy' | 'medium' | 'hard';
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  studentId: string;
  startTime: Date;
  endTime: Date;
  answers: Array<{
    questionId: string;
    answer: string | string[];
    timeSpent: number;
    isCorrect: boolean;
  }>;
  score: number;
  percentage: number;
  skillBreakdown: {
    [skillArea: string]: {
      correct: number;
      total: number;
      percentage: number;
    };
  };
  recommendations: string[];
  pisaProjection: number;
}

export interface AssessmentSession {
  id: string;
  assessmentId: string;
  currentQuestionIndex: number;
  answers: Array<{
    questionId: string;
    answer: string | string[];
    timeSpent: number;
  }>;
  startTime: Date;
  timeRemaining: number;
  isCompleted: boolean;
}

export interface UserProgress {
  userId: string;
  assessmentResults: AssessmentResult[];
  overallStats: {
    totalAssessments: number;
    averageScore: number;
    bestScore: number;
    totalTimeSpent: number;
    strongestSubject: string;
    weakestSubject: string;
  };
  subjectProgress: {
    mathematics: {
      assessmentCount: number;
      averageScore: number;
      latestScore: number;
      trend: 'improving' | 'declining' | 'stable';
    };
    reading: {
      assessmentCount: number;
      averageScore: number;
      latestScore: number;
      trend: 'improving' | 'declining' | 'stable';
    };
    science: {
      assessmentCount: number;
      averageScore: number;
      latestScore: number;
      trend: 'improving' | 'declining' | 'stable';
    };
  };
  skillAreas: {
    [skillArea: string]: {
      assessmentCount: number;
      averageScore: number;
      latestScore: number;
      needsImprovement: boolean;
    };
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    earnedAt: Date;
    icon: string;
  }>;
  lastUpdated: Date;
}