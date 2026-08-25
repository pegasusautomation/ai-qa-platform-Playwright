export const aiQuestions = [
  {
    name: 'password reset',
    question: 'How do I reset my password?',
    expectedKeyword: 'password',
    expectedQuality: true
  },
  {
    name: 'refund',
    question: 'How can I get a refund?',
    expectedKeyword: 'refund',
    expectedQuality: true
  },
  {
    name: 'support',
    question: 'When is customer support available?',
    expectedKeyword: 'support',
    expectedQuality: true
  },
  {
    name: 'unknown question',
    question: 'What is the weather on Mars today?',
    expectedKeyword: 'not sure',
    expectedQuality: false
  }
];