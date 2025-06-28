import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { Assessment, Question, AssessmentSession, AssessmentResult } from '../types';
import { assessments } from '../data/assessments';
import { useAuth } from './useAuth';
import { useUserProgress } from './useUserProgress';
import { trackAssessmentStart, trackAssessmentComplete } from '../utils/analytics';

interface AssessmentContextType {
  currentAssessment: Assessment | null;
  currentSession: AssessmentSession | null;
  startAssessment: (assessmentId: string) => void;
  submitAnswer: (questionId: string, answer: string | string[]) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  finishAssessment: () => AssessmentResult | null;
  getCurrentQuestion: () => Question | null;
  getProgress: () => { current: number; total: number; percentage: number };
  timeRemaining: number;
  isLoading: boolean;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider = ({ children }: { children: ReactNode }) => {
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [currentSession, setCurrentSession] = useState<AssessmentSession | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, isAuthenticated } = useAuth();
  const { saveAssessmentResult } = useUserProgress();

  // Timer effect
  useEffect(() => {
    if (currentSession && timeRemaining > 0 && !currentSession.isCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            finishAssessment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentSession, timeRemaining]);

  const startAssessment = (assessmentId: string) => {
    setIsLoading(true);
    const assessment = assessments.find(a => a.id === assessmentId);
    
    if (!assessment) {
      setIsLoading(false);
      return;
    }

    const session: AssessmentSession = {
      id: `session-${Date.now()}`,
      assessmentId,
      currentQuestionIndex: 0,
      answers: [],
      startTime: new Date(),
      timeRemaining: assessment.duration * 60, // Convert minutes to seconds
      isCompleted: false
    };

    setCurrentAssessment(assessment);
    setCurrentSession(session);
    setTimeRemaining(assessment.duration * 60);
    setIsLoading(false);

    // Track assessment start
    trackAssessmentStart(assessmentId, assessment.subject);
  };

  const submitAnswer = (questionId: string, answer: string | string[]) => {
    if (!currentSession || !currentAssessment) return;

    const existingAnswerIndex = currentSession.answers.findIndex(a => a.questionId === questionId);
    const newAnswer = {
      questionId,
      answer,
      timeSpent: 30 // Placeholder - in real implementation, track actual time
    };

    const updatedAnswers = [...currentSession.answers];
    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex] = newAnswer;
    } else {
      updatedAnswers.push(newAnswer);
    }

    setCurrentSession({
      ...currentSession,
      answers: updatedAnswers
    });
  };

  const nextQuestion = () => {
    if (!currentSession || !currentAssessment) return;

    const nextIndex = currentSession.currentQuestionIndex + 1;
    if (nextIndex < currentAssessment.questions.length) {
      setCurrentSession({
        ...currentSession,
        currentQuestionIndex: nextIndex
      });
    }
  };

  const previousQuestion = () => {
    if (!currentSession) return;

    const prevIndex = currentSession.currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      setCurrentSession({
        ...currentSession,
        currentQuestionIndex: prevIndex
      });
    }
  };

  const finishAssessment = (): AssessmentResult | null => {
    if (!currentSession || !currentAssessment) return null;

    const endTime = new Date();
    const answers = currentSession.answers.map(answer => {
      const question = currentAssessment.questions.find(q => q.id === answer.questionId);
      const isCorrect = question ? 
        (Array.isArray(question.correctAnswer) ? 
          JSON.stringify(question.correctAnswer.sort()) === JSON.stringify((answer.answer as string[]).sort()) :
          question.correctAnswer === answer.answer) : false;

      return {
        ...answer,
        isCorrect
      };
    });

    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const totalQuestions = currentAssessment.questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;

    // Calculate skill breakdown
    const skillBreakdown: { [skillArea: string]: { correct: number; total: number; percentage: number } } = {};
    
    currentAssessment.questions.forEach(question => {
      const answer = answers.find(a => a.questionId === question.id);
      if (!skillBreakdown[question.skillArea]) {
        skillBreakdown[question.skillArea] = { correct: 0, total: 0, percentage: 0 };
      }
      skillBreakdown[question.skillArea].total++;
      if (answer?.isCorrect) {
        skillBreakdown[question.skillArea].correct++;
      }
    });

    Object.keys(skillBreakdown).forEach(skill => {
      const breakdown = skillBreakdown[skill];
      breakdown.percentage = (breakdown.correct / breakdown.total) * 100;
    });

    // Generate recommendations
    const recommendations: string[] = [];
    Object.entries(skillBreakdown).forEach(([skill, data]) => {
      if (data.percentage < 70) {
        recommendations.push(`Focus on improving ${skill} skills`);
      }
    });

    // Calculate PISA projection (simplified)
    const pisaProjection = Math.round(300 + (percentage * 2.5));

    const result: AssessmentResult = {
      id: `result-${Date.now()}`,
      assessmentId: currentAssessment.id,
      studentId: isAuthenticated && user ? user.id : 'guest-user',
      startTime: currentSession.startTime,
      endTime,
      answers,
      score: correctAnswers,
      percentage,
      skillBreakdown,
      recommendations,
      pisaProjection
    };

    // Calculate duration in minutes
    const duration = Math.round((endTime.getTime() - currentSession.startTime.getTime()) / 1000 / 60);

    // Track assessment completion
    trackAssessmentComplete(currentAssessment.id, currentAssessment.subject, percentage, duration);

    // Save result to user progress if authenticated
    if (isAuthenticated && user) {
      saveAssessmentResult(result);
    }

    // Mark session as completed
    setCurrentSession({
      ...currentSession,
      isCompleted: true
    });

    return result;
  };

  const getCurrentQuestion = (): Question | null => {
    if (!currentSession || !currentAssessment) return null;
    return currentAssessment.questions[currentSession.currentQuestionIndex] || null;
  };

  const getProgress = () => {
    if (!currentSession || !currentAssessment) {
      return { current: 0, total: 0, percentage: 0 };
    }

    const current = currentSession.currentQuestionIndex + 1;
    const total = currentAssessment.questions.length;
    const percentage = (current / total) * 100;

    return { current, total, percentage };
  };

  return (
    <AssessmentContext.Provider value={{
      currentAssessment,
      currentSession,
      startAssessment,
      submitAnswer,
      nextQuestion,
      previousQuestion,
      finishAssessment,
      getCurrentQuestion,
      getProgress,
      timeRemaining,
      isLoading
    }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};