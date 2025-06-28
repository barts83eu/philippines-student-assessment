import { Assessment, Question } from '../types';

export const readingQuestions: Question[] = [
  {
    id: 'read-001',
    type: 'multiple-choice',
    subject: 'reading',
    difficulty: 'easy',
    ageGroup: '6-8',
    question: 'Ang mga bata ay naglalaro sa parke. Saan naglalaro ang mga bata?',
    options: ['Sa bahay', 'Sa parke', 'Sa paaralan', 'Sa tindahan'],
    correctAnswer: 'Sa parke',
    explanation: 'Ayon sa pangungusap, ang mga bata ay naglalaro sa parke.',
    skillArea: 'comprehension',
    culturalContext: 'Filipino community park setting'
  },
  {
    id: 'read-002',
    type: 'multiple-choice',
    subject: 'reading',
    difficulty: 'medium',
    ageGroup: '9-12',
    question: 'Si Maria ay nag-aral ng mabuti para sa pagsusulit. Anong katangian ang ipinakita ni Maria?',
    options: ['Tamad', 'Masipag', 'Maingay', 'Malungkot'],
    correctAnswer: 'Masipag',
    explanation: 'Ang pag-aaral ng mabuti ay nagpapakita ng pagiging masipag.',
    skillArea: 'criticalAnalysis',
    culturalContext: 'Filipino educational values'
  },
  {
    id: 'read-003',
    type: 'open-ended',
    subject: 'reading',
    difficulty: 'hard',
    ageGroup: '13-15',
    question: 'Basahin ang sumusunod na talata at ipaliwanag ang pangunahing mensahe: "Ang kultura ng Pilipinas ay mayaman at iba-iba. Mula sa mga sayaw ng Luzon hanggang sa mga awit ng Mindanao, bawat rehiyon ay may sariling natatanging tradisyon."',
    correctAnswer: 'Ang pangunahing mensahe ay ang pagkakaiba-iba at yaman ng kulturang Pilipino sa iba\'t ibang rehiyon.',
    explanation: 'Ang talata ay nagbibigay-diin sa diversity at richness ng Filipino culture across different regions.',
    skillArea: 'culturalContext',
    culturalContext: 'Philippine cultural diversity',
    timeLimit: 300
  },
  {
    id: 'read-004',
    type: 'multiple-choice',
    subject: 'reading',
    difficulty: 'easy',
    ageGroup: '6-8',
    question: 'The children are playing in the park. Where are the children playing?',
    options: ['At home', 'In the park', 'At school', 'In the store'],
    correctAnswer: 'In the park',
    explanation: 'According to the sentence, the children are playing in the park.',
    skillArea: 'comprehension',
    culturalContext: 'Community park setting'
  },
  {
    id: 'read-005',
    type: 'multiple-choice',
    subject: 'reading',
    difficulty: 'medium',
    ageGroup: '9-12',
    question: 'Maria studied hard for the test. What quality did Maria show?',
    options: ['Lazy', 'Hardworking', 'Noisy', 'Sad'],
    correctAnswer: 'Hardworking',
    explanation: 'Studying hard shows being hardworking and diligent.',
    skillArea: 'criticalAnalysis',
    culturalContext: 'Educational values'
  }
];

export const mathematicsQuestions: Question[] = [
  {
    id: 'math-001',
    type: 'multiple-choice',
    subject: 'mathematics',
    difficulty: 'easy',
    ageGroup: '6-8',
    question: 'Si Juan ay may 5 mangga. Binigyan siya ng 3 pang mangga ng kanyang nanay. Ilan lahat ang mangga ni Juan?',
    options: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '5 + 3 = 8 mangga',
    skillArea: 'numberOperations',
    culturalContext: 'Filipino fruits and family context'
  },
  {
    id: 'math-002',
    type: 'multiple-choice',
    subject: 'mathematics',
    difficulty: 'medium',
    ageGroup: '9-12',
    question: 'Ang isang jeepney ay may 14 na pasahero. Kung bumaba ang 6 na pasahero at sumakay naman ang 4, ilan ang pasahero ngayon?',
    options: ['10', '12', '14', '16'],
    correctAnswer: '12',
    explanation: '14 - 6 + 4 = 12 pasahero',
    skillArea: 'numberOperations',
    culturalContext: 'Philippine public transportation'
  },
  {
    id: 'math-003',
    type: 'open-ended',
    subject: 'mathematics',
    difficulty: 'hard',
    ageGroup: '13-15',
    question: 'Ang presyo ng bigas ay tumaas ng 15% mula sa dating presyo na ₱45 kada kilo. Ano ang bagong presyo ng bigas?',
    correctAnswer: '₱51.75',
    explanation: '₱45 × 1.15 = ₱51.75',
    skillArea: 'algebra',
    culturalContext: 'Philippine market prices',
    timeLimit: 180
  },
  {
    id: 'math-004',
    type: 'multiple-choice',
    subject: 'mathematics',
    difficulty: 'easy',
    ageGroup: '6-8',
    question: 'Juan has 5 mangoes. His mother gave him 3 more mangoes. How many mangoes does Juan have in total?',
    options: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '5 + 3 = 8 mangoes',
    skillArea: 'numberOperations',
    culturalContext: 'Fruits and family context'
  },
  {
    id: 'math-005',
    type: 'multiple-choice',
    subject: 'mathematics',
    difficulty: 'medium',
    ageGroup: '9-12',
    question: 'A rectangle has a length of 12 cm and a width of 8 cm. What is its area?',
    options: ['20 cm²', '40 cm²', '96 cm²', '160 cm²'],
    correctAnswer: '96 cm²',
    explanation: 'Area = length × width = 12 × 8 = 96 cm²',
    skillArea: 'geometry',
    culturalContext: 'Basic geometry'
  }
];

export const assessments: Assessment[] = [
  {
    id: 'reading-basic',
    title: 'Basic Reading Assessment',
    subject: 'reading',
    ageGroup: '6-8',
    duration: 30,
    questions: readingQuestions.filter(q => q.ageGroup === '6-8'),
    description: 'Foundation reading skills assessment for young learners',
    difficulty: 'easy'
  },
  {
    id: 'reading-intermediate',
    title: 'Intermediate Reading Assessment',
    subject: 'reading',
    ageGroup: '9-12',
    duration: 45,
    questions: readingQuestions.filter(q => q.ageGroup === '9-12'),
    description: 'Comprehensive reading assessment for intermediate learners',
    difficulty: 'medium'
  },
  {
    id: 'reading-advanced',
    title: 'Advanced Reading Assessment',
    subject: 'reading',
    ageGroup: '13-15',
    duration: 60,
    questions: readingQuestions.filter(q => q.ageGroup === '13-15'),
    description: 'PISA-aligned reading assessment for advanced learners',
    difficulty: 'hard'
  },
  {
    id: 'math-basic',
    title: 'Basic Mathematics Assessment',
    subject: 'mathematics',
    ageGroup: '6-8',
    duration: 30,
    questions: mathematicsQuestions.filter(q => q.ageGroup === '6-8'),
    description: 'Foundation mathematics skills assessment',
    difficulty: 'easy'
  },
  {
    id: 'math-intermediate',
    title: 'Intermediate Mathematics Assessment',
    subject: 'mathematics',
    ageGroup: '9-12',
    duration: 45,
    questions: mathematicsQuestions.filter(q => q.ageGroup === '9-12'),
    description: 'Comprehensive mathematics assessment',
    difficulty: 'medium'
  },
  {
    id: 'math-advanced',
    title: 'Advanced Mathematics Assessment',
    subject: 'mathematics',
    ageGroup: '13-15',
    duration: 60,
    questions: mathematicsQuestions.filter(q => q.ageGroup === '13-15'),
    description: 'PISA-aligned mathematics assessment',
    difficulty: 'hard'
  },
  {
    id: 'combined-adaptive',
    title: 'Adaptive Combined Assessment',
    subject: 'combined',
    ageGroup: '9-15',
    duration: 90,
    questions: [...readingQuestions, ...mathematicsQuestions],
    description: 'Comprehensive adaptive assessment covering reading and mathematics',
    difficulty: 'adaptive'
  }
];