import { defineConfig, devices } from "@playwright/test";
import process from "process";

export default defineConfig({
  testDir: "./tests",

  // Run test files in parallel locally.
  // Jenkins uses 1 worker for predictable CI execution.
  fullyParallel: true,

  // Prevent accidental test.only in CI.
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI.
  retries: process.env.CI ? 2 : 0,

  // Keep CI stable and easier to debug.
  workers: process.env.CI ? 1 : undefined,

  // Test timeout.
  timeout: 30_000,

  // Expect assertion timeout.
  expect: {
    timeout: 5_000,
  },

  /*
   * Reports
   *
   * HTML  -> detailed Playwright report
   * JUnit -> Jenkins test-results integration
   */
  reporter: [
    ["html", {
      outputFolder: "playwright-report",
      open: "never",
    }],
    ["junit", {
      outputFile: "test-results/results.xml",
    }],
    ["list"],
  ],

  /*
   * Shared Playwright settings
   */
  use: {
    baseURL:
      process.env.BASE_URL || "http://localhost:3000",

    /*
     * IMPORTANT:
     * Jenkins/Docker has no X server.
     * Therefore CI must always run headless.
     */
    headless: !!process.env.CI,

    /*
     * Slow down actions only when explicitly requested.
     *
     * Do NOT use slowMo in Jenkins.
     */
    launchOptions: {
      slowMo: process.env.PW_SLOWMO
        ? Number(process.env.PW_SLOWMO)
        : 0,
    },

    /*
     * Capture trace on retry.
     */
    trace: "on-first-retry",

    /*
     * Capture screenshot when a test fails.
     */
    screenshot: "only-on-failure",

    /*
     * Capture video only when a test retries.
     */
    video: "on-first-retry",

    /*
     * Useful for debugging CI failures.
     */
    actionTimeout: 15_000,

    /*
     * Ignore HTTPS certificate problems in test environments.
     */
    ignoreHTTPSErrors: true,
  },

  /*
   * Browser projects
   */
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

  /*
   * Local development server.
   *
   * Jenkins already starts the application in Docker,
   * so this remains disabled in CI.
   */
  webServer: process.env.CI
    ? undefined
    : {
        command: "npm run api",
        url: "http://localhost:3000/health",
        reuseExistingServer: true,
        timeout: 30_000,
      },
});