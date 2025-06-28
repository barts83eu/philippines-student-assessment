import React, { useState } from 'react';
import { LanguageProvider } from './hooks/useLanguage';
import { AuthProvider } from './hooks/useAuth';
import { AssessmentProvider } from './hooks/useAssessment';
import { UserProgressProvider } from './hooks/useUserProgress';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TimelineContainer from './components/TimelineContainer';
import PisaComparison from './components/PisaComparison';
import Footer from './components/Footer';
import AssessmentPage from './components/AssessmentPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'assessments'>('home');

  const handleNavigateToAssessments = () => {
    setCurrentPage('assessments');
  };

  const handleNavigateToHome = () => {
    setCurrentPage('home');
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <UserProgressProvider>
          <AssessmentProvider>
            <div className="min-h-screen bg-white">
              {currentPage === 'home' ? (
                <>
                  <Header onNavigateToAssessments={handleNavigateToAssessments} />
                  <main>
                    {/* PISA Performance Section - Top Priority */}
                    <section className="py-16 px-4 bg-gray-50">
                      <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            PISA Performance Analysis
                          </h2>
                          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Compare Philippines' performance with ASEAN countries in international assessments
                          </p>
                        </div>
                        <PisaComparison />
                      </div>
                    </section>
                    
                    <TimelineContainer />
                    <HeroSection onNavigateToAssessments={handleNavigateToAssessments} />
                  </main>
                  <Footer />
                </>
              ) : (
                <AssessmentPage onBack={handleNavigateToHome} />
              )}
            </div>
          </AssessmentProvider>
        </UserProgressProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;