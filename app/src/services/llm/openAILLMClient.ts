import OpenAI from 'openai';
import { LLMClient } from './LLMClient';

export class OpenAILLMClient implements LLMClient {
  private readonly client: OpenAI;
  private readonly model: string;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    this.model =
      process.env.OPENAI_MODEL || 'gpt-5.6-luna';
  }

  async generateResponse(question: string): Promise<string> {
    const response = await this.client.responses.create({
      model: this.model,
      instructions:
        'You are a helpful customer support assistant. ' +
        'Give concise, accurate answers. ' +
        'If you do not know the answer, say so clearly.',
      input: question
    });

    return response.output_text;
  }
}