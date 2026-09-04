import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly message: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.message = page.locator("#message");
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes("/api/auth/login") &&
        response.request().method() === "POST",
    );

    await this.loginButton.click();

    const response = await responsePromise;

    if (response.status() === 200) {
      await this.page.waitForURL(/dashboard/, {
        timeout: 10000,
      });
    } else {
      await expect(this.message).toBeVisible({
        timeout: 5000,
      });
    }
  }
}
