import React from 'react';
import EducationTimeline from './EducationTimeline';
import StudentProgress from './StudentProgress';
import { useLanguage } from '../hooks/useLanguage';

const TimelineContainer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Interactive Educational Analytics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the Philippine education system and track individual student progress
          </p>
        </div>

        <div className="space-y-8">
          {/* Timeline 1: Philippine Education System */}
          <div className="animate-fadeInUp">
            <EducationTimeline />
          </div>

          {/* Timeline 2: Individual Student Progress */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <StudentProgress />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineContainer;