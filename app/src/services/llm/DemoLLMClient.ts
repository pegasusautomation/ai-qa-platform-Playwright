import { LLMClient } from './LLMClient';

export class DemoLLMClient implements LLMClient {

  async generateResponse(question: string): Promise<string> {

    const normalizedQuestion = question.toLowerCase();

    if (
      normalizedQuestion.includes('reset') &&
      normalizedQuestion.includes('password')
    ) {
      return 'To reset your password, go to the login page and select Forgot Password.';
    }

    if (normalizedQuestion.includes('refund')) {
      return 'Refund requests can be submitted through the Orders section.';
    }

    if (normalizedQuestion.includes('support')) {
      return 'Our customer support team is available Monday through Friday.';
    }

    return 'I am not sure about that. Please contact customer support.';
  }
}