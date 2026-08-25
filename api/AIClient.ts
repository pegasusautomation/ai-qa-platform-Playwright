import { APIRequestContext } from '@playwright/test';

export class AIClient {
  constructor(private request: APIRequestContext) {}

  async ask(question: string) {
    const response = await this.request.post('/api/chat', {
      data: {
        question
      }
    });

    return response;
  }

  async evaluate(question: string, answer: string) {
    const response = await this.request.post('/api/evaluate', {
      data: {
        question,
        answer
      }
    });

    return response;
  }
}