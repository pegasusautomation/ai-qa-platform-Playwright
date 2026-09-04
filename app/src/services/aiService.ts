import { LLMClient } from './llm/LLMClient';

export interface AIResponse {
  question: string;
  answer: string;
}

export class AIService {

  constructor(
    private readonly llmClient: LLMClient
  ) {}

  async ask(question: string): Promise<AIResponse> {

    if (!question || question.trim().length === 0) {
      throw new Error('Question is required');
    }

    const answer =
      await this.llmClient.generateResponse(question);

    return {
      question,
      answer
    };
  }
}