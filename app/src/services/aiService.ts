export interface AIResponse {
  answer: string;
}

export function generateAIResponse(question: string): AIResponse {
  const normalizedQuestion = question.toLowerCase();

  if (
    normalizedQuestion.includes('reset') &&
    normalizedQuestion.includes('password')
  ) {
    return {
      answer:
        'To reset your password, go to the login page and select Forgot Password.'
    };
  }

  if (normalizedQuestion.includes('refund')) {
    return {
      answer:
        'Refund requests can be submitted through the Orders section.'
    };
  }

  if (normalizedQuestion.includes('support')) {
    return {
      answer:
        'Our customer support team is available Monday through Friday.'
    };
  }

  return {
    answer:
      'I am not sure about that. Please contact customer support.'
  };
}