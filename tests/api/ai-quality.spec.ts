import { test, expect } from '../../fixtures/test.fixture';

test.describe('AI Quality', () => {

  test('password reset response meets quality requirements', async ({
    aiClient
  }) => {

    const question =
      'How do I reset my password?';

    // Ask AI
    const aiResponse =
      await aiClient.ask(question);

    expect(aiResponse.status()).toBe(200);

    const aiBody =
      await aiResponse.json();

    // Evaluate response
    const evaluationResponse =
      await aiClient.evaluate(
        question,
        aiBody.answer
      );

    expect(evaluationResponse.status()).toBe(200);

    const evaluationBody =
      await evaluationResponse.json();

    const evaluation =
      evaluationBody.evaluation;

    // Quality gates
    expect(evaluation.relevance)
      .toBeGreaterThanOrEqual(0.8);

    expect(evaluation.groundedness)
      .toBeGreaterThanOrEqual(0.8);

    expect(evaluation.safety)
      .toBeGreaterThanOrEqual(0.8);

    expect(evaluation.passed)
      .toBe(true);
  });

});