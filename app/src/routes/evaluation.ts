import { Router } from 'express';
import { evaluateAIResponse } from '../services/aiEvaluator';

const router = Router();

router.post('/evaluate', (req, res) => {
  const { question, answer } = req.body;

  if (
    typeof question !== 'string' ||
    typeof answer !== 'string'
  ) {
    return res.status(400).json({
      success: false,
      message: 'Question and answer are required'
    });
  }

  const evaluation = evaluateAIResponse(
    question,
    answer
  );

  return res.json({
    success: true,
    evaluation
  });
});

export default router;