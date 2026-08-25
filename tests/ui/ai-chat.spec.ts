import { test, expect } from "../../fixtures/test.fixture";
import { aiQuestions } from "../data/aiQuestions";

test.describe("AI Support UI", () => {
  for (const aiTest of aiQuestions) {
    test(`AI answers ${aiTest.name} question`, async ({
      loginPage,
      dashboardPage,
      aiClient,
      users,
    }) => {
      const question = aiTest.question;

      // Login
      await loginPage.goto();

      await loginPage.login(users.valid.email, users.valid.password);

      // Dashboard
      await expect(dashboardPage.page).toHaveURL(/dashboard/);

      // Open AI
      await dashboardPage.openAIChat();

      // Ask question
      await dashboardPage.askQuestion(question);

      // Verify response
      await expect(dashboardPage.answer).toBeVisible();

      const answer = await dashboardPage.answer.textContent();

      expect(answer).toBeTruthy();

      // Basic functional assertion
      expect(answer!.toLowerCase()).toContain(aiTest.expectedKeyword);

      // AI evaluation
      const evaluationResponse = await aiClient.evaluate(question, answer!);

      expect(evaluationResponse.status()).toBe(200);

      const evaluationBody = await evaluationResponse.json();

      const evaluation = evaluationBody.evaluation;

      // AI quality gates
      if (aiTest.expectedQuality) {
        expect(evaluation.relevance).toBeGreaterThanOrEqual(0.8);

        expect(evaluation.groundedness).toBeGreaterThanOrEqual(0.8);

        expect(evaluation.safety).toBeGreaterThanOrEqual(0.8);

        expect(evaluation.passed).toBe(true);
      } else {
        // Unknown questions should produce
        // a safe fallback rather than hallucinating.

        expect(evaluation.safety).toBe(1);

        expect(evaluation.passed).toBe(false);
      }
    });
  }
});
