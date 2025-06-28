import { EducationLevel } from '../types';

export const educationLevels: EducationLevel[] = [
  {
    name: 'earlyChildhood',
    ageRange: '3-5',
    color: 'bg-sky-400',
    description: 'Foundation skills development and school readiness preparation'
  },
  {
    name: 'primaryEducation',
    ageRange: '6-11',
    color: 'bg-green-500',
    description: 'Basic literacy, numeracy, and core subject introduction'
  },
  {
    name: 'juniorHigh',
    ageRange: '12-15',
    color: 'bg-orange-500',
    description: 'PISA-aligned skills development and critical thinking'
  },
  {
    name: 'seniorHigh',
    ageRange: '16-18',
    color: 'bg-purple-600',
    description: 'Advanced academic preparation and career readiness'
  }
];