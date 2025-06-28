import React, { useState } from 'react';
import { educationLevels } from '../data/educationLevels';
import { useLanguage } from '../hooks/useLanguage';

const EducationTimeline: React.FC = () => {
  const { t } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {t('philippineEducation')}
      </h3>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 rounded-full"></div>
        
        {/* Timeline Items */}
        <div className="space-y-8">
          {educationLevels.map((level, index) => (
            <div key={level.name} className="relative">
              {/* Timeline Dot */}
              <div 
                className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 ${level.color} rounded-full border-4 border-white shadow-lg z-10 cursor-pointer transition-transform duration-200 hover:scale-125`}
                onClick={() => setSelectedLevel(selectedLevel === level.name ? null : level.name)}
              ></div>
              
              {/* Content Card */}
              <div className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                  <div 
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedLevel === level.name 
                        ? `border-${level.color.split('-')[1]}-500 bg-${level.color.split('-')[1]}-50` 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedLevel(selectedLevel === level.name ? null : level.name)}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-3 h-3 ${level.color} rounded-full`}></div>
                      <h4 className="font-bold text-gray-900">{t(level.name)}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Ages {level.ageRange}</p>
                    {selectedLevel === level.name && (
                      <p className="text-sm text-gray-700 leading-relaxed animate-fadeIn">
                        {level.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationTimeline;