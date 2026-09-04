export interface LLMClient {
  generateResponse(question: string): Promise<string>;
}