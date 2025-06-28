import { Student } from '../types';

export const sampleStudent: Student = {
  id: 'sample-001',
  name: 'Maria Santos',
  age: 14,
  grade: 8,
  language: 'en',
  overallScore: 72,
  subjects: {
    mathematics: 75,
    reading: 68,
    science: 73
  },
  skillBreakdown: {
    mathematics: {
      numberOperations: 78,
      algebra: 65,
      geometry: 72,
      statistics: 58
    },
    reading: {
      comprehension: 71,
      vocabulary: 68,
      criticalAnalysis: 62,
      culturalContext: 75
    },
    science: {
      scientificInquiry: 69,
      lifeSciences: 74,
      physicalSciences: 61,
      earthSciences: 67
    }
  },
  progressHistory: [
    {
      date: '2024-09-01',
      overallScore: 65,
      subjects: { mathematics: 68, reading: 62, science: 65 }
    },
    {
      date: '2024-10-01',
      overallScore: 68,
      subjects: { mathematics: 71, reading: 65, science: 68 }
    },
    {
      date: '2024-11-01',
      overallScore: 70,
      subjects: { mathematics: 73, reading: 66, science: 71 }
    },
    {
      date: '2024-12-01',
      overallScore: 72,
      subjects: { mathematics: 75, reading: 68, science: 73 }
    }
  ],
  pisaProjection: 390
};