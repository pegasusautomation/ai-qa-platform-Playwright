import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly supportButton: Locator;
  readonly questionInput: Locator;
  readonly askButton: Locator;
  readonly answer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.supportButton =
      page.getByRole('button', {
        name: 'Ask AI Support',
        exact: true
      });

    this.questionInput =
      page.locator('#question');

    this.askButton =
      page.getByRole('button', {
        name: 'Ask AI',
        exact: true
      });

    this.answer =
      page.locator('#answer');
  }

  async openAIChat() {
    await this.supportButton.click();
  }

  async askQuestion(question: string) {
    await this.questionInput.fill(question);
    await this.askButton.click();
  }
}