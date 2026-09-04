import { LLMClient } from './LLMClient';

export class DemoLLMClient implements LLMClient {

  async generateResponse(
    question: string
  ): Promise<string> {

    const normalizedQuestion =
      question.toLowerCase();

    if (
      normalizedQuestion.includes('password')
    ) {
      return 'To reset your password, go to the login page and select Forgot Password.';
    }

    if (
      normalizedQuestion.includes('refund')
    ) {
      return 'To request a refund, go to the Orders section and select the order you want to refund.';
    }

    if (
      normalizedQuestion.includes('support')
    ) {
      return 'Customer support is available Monday through Friday.';
    }

    return 'I am not sure about that. Please contact customer support.';
  }
}