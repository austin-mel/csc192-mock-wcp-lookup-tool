import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], isMobile: false },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], isMobile: false },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], isMobile: false },
    },

    /* Test against mobile viewports. */
     {
       name: 'Mobile Chrome',
       use: { ...devices['Pixel 5'], isMobile: true },
     },
     {
       name: 'Mobile Safari',
       use: { ...devices['iPhone 12'], isMobile: true },
     },
     {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', isMobile: false }, // or 'chrome-beta'
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge', isMobile: false }, // or 'msedge-dev'
    },
  ],

  // Run your local dev server before starting the tests
   webServer: {
    command: 'task run',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
