import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, Flag, X } from 'lucide-react';
import { useAssessment } from '../hooks/useAssessment';
import { useLanguage } from '../hooks/useLanguage';
import { Question } from '../types';

interface AssessmentInterfaceProps {
  onComplete: (result: any) => void;
  onExit: () => void;
}

const AssessmentInterface: React.FC<AssessmentInterfaceProps> = ({ onComplete, onExit }) => {
  const { 
    currentAssessment, 
    currentSession, 
    submitAnswer, 
    nextQuestion, 
    previousQuestion, 
    finishAssessment, 
    getCurrentQuestion, 
    getProgress,
    timeRemaining 
  } = useAssessment();
  
  const { t } = useLanguage();
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>('');
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const currentQuestion = getCurrentQuestion();
  const progress = getProgress();

  useEffect(() => {
    // Load existing answer if available
    if (currentQuestion && currentSession) {
      const existingAnswer = currentSession.answers.find(a => a.questionId === currentQuestion.id);
      if (existingAnswer) {
        setSelectedAnswer(existingAnswer.answer);
      } else {
        setSelectedAnswer(currentQuestion.type === 'matching' ? [] : '');
      }
    }
  }, [currentQuestion, currentSession]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: string) => {
    if (currentQuestion?.type === 'matching') {
      const currentAnswers = Array.isArray(selectedAnswer) ? selectedAnswer : [];
      const newAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter(a => a !== answer)
        : [...currentAnswers, answer];
      setSelectedAnswer(newAnswers);
    } else {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = () => {
    if (currentQuestion && selectedAnswer) {
      submitAnswer(currentQuestion.id, selectedAnswer);
    }
  };

  const handleNext = () => {
    handleSubmitAnswer();
    if (progress.current === progress.total) {
      // Last question - finish assessment
      const result = finishAssessment();
      if (result) {
        onComplete(result);
      }
    } else {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    handleSubmitAnswer();
    previousQuestion();
  };

  const handleFinish = () => {
    handleSubmitAnswer();
    const result = finishAssessment();
    if (result) {
      onComplete(result);
    }
  };

  const handleExit = () => {
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    setShowExitConfirm(false);
    onExit();
  };

  if (!currentAssessment || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">{currentAssessment.title}</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Question {progress.current} of {progress.total}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Timer */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded-lg">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className={`font-mono text-sm ${timeRemaining < 300 ? 'text-red-600' : 'text-blue-600'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              
              {/* Exit Button */}
              <button
                onClick={handleExit}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {/* Question */}
          <div className="mb-8">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {progress.current}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                  {currentQuestion.question}
                </h2>
                {currentQuestion.culturalContext && (
                  <p className="text-sm text-blue-600 mt-2 italic">
                    Context: {currentQuestion.culturalContext}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Answer Options */}
          <div className="mb-8">
            {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === option
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswer === option && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'true-false' && (
              <div className="space-y-3">
                {['True', 'False'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === option
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswer === option && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'open-ended' && (
              <div>
                <textarea
                  value={selectedAnswer as string}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                  rows={6}
                />
                {currentQuestion.timeLimit && (
                  <p className="text-sm text-gray-500 mt-2">
                    Recommended time: {Math.floor(currentQuestion.timeLimit / 60)} minutes
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={progress.current === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                progress.current === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleFinish}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-all duration-200"
              >
                <Flag className="w-5 h-5" />
                <span>Finish</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  !selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <span>{progress.current === progress.total ? 'Finish' : 'Next'}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Exit Assessment?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to exit? Your progress will be lost.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Continue Assessment
              </button>
              <button
                onClick={confirmExit}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentInterface;