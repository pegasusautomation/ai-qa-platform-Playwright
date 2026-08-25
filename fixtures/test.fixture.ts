import { test as base } from "@playwright/test";
import { AuthApi } from "../api/AuthApi";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../test-data/users";
import { AIClient } from "../api/AIClient";
import { DashboardPage } from "../pages/DashboardPage";

type TestFixtures = {
  authApi: AuthApi;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  users: typeof users;
  aiClient: AIClient;
};

export const test = base.extend<TestFixtures>({
  authApi: async ({ request }, use) => {
    const authApi = new AuthApi(request);

    await use(authApi);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },

  aiClient: async ({ request }, use) => {
    const aiClient = new AIClient(request);

    await use(aiClient);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);

    await use(dashboardPage);
  },

  users: async ({}, use) => {
    await use(users);
  },
});

export { expect } from "@playwright/test";
