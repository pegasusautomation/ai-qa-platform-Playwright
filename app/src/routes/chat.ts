import { Router } from 'express';
import { generateAIResponse } from '../services/aiService';

const router = Router();

router.post('/chat', (req, res) => {
  const { question } = req.body;

  if (!question || typeof question !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Question is required'
    });
  }

  const result = generateAIResponse(question);

  return res.json({
    success: true,
    question,
    answer: result.answer
  });
});

export default router;