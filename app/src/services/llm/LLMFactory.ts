import { LLMClient } from './LLMClient';
import { DemoLLMClient } from './DemoLLMClient';
// import { OpenAILLMClient } from './OpenAILLMClient';

export function createLLMClient(): LLMClient {
  const provider = process.env.LLM_PROVIDER || 'demo';

  switch (provider.toLowerCase()) {
    case 'demo':
      return new DemoLLMClient();

    // case 'openai':
    //   return new OpenAILLMClient();

    default:
      throw new Error(
        `Unsupported LLM provider: ${provider}`
      );
  }
}