import { defineConfig, devices } from "@playwright/test";
import process from "process";

const isCI = process.env.CI === "true";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: isCI,

  retries: isCI ? 2 : 0,

  workers: isCI ? 1 : undefined,

  timeout: 30_000,

  expect: {
    timeout: 5_000,
  },

  reporter: [
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "never",
      },
    ],
    [
      "junit",
      {
        outputFile: "test-results/results.xml",
      },
    ],
    ["list"],
  ],

  use: {
    baseURL:
      process.env.BASE_URL || "http://localhost:3000",

    // IMPORTANT:
    // Jenkins must run headless.
    headless: true,

    launchOptions: {
      slowMo: isCI
        ? 0
        : process.env.PW_SLOWMO
          ? Number(process.env.PW_SLOWMO)
          : 0,
    },

    trace: "on-first-retry",

    screenshot: "only-on-failure",

    video: "on-first-retry",

    actionTimeout: 15_000,

    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],

  webServer: isCI
    ? undefined
    : {
        command: "npm run api",
        url: "http://localhost:3000/health",
        reuseExistingServer: true,
        timeout: 30_000,
      },
});