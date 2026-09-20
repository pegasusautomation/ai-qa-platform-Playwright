import { Router } from 'express';
import { AIService } from '../services/AIService';
import { createLLMClient  } from '../services/llm/LLMFactory';

const router = Router();

const llmClient = createLLMClient();
const aiService = new AIService(llmClient);

router.post('/chat', async (req, res) => {
  try {
    const { question } = req.body;

    const result = await aiService.ask(question);

    return res.json({
      success: true,
      ...result
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Unable to process request'
    });
  }
});

export default router;