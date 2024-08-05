# Next.js + Playwright + React Testing Library

This example shows how to configure Playwright and React Testing Library to work with Next.js.

## Run Playwright E2E Tests

This runs the dev server and the mock API server, then executing the e2e tests.

```bash
npm run test:e2e
```

To run the Playwright tests _continuously_, go into the VSCode Playwright Test Runner (install the extension if you don't have it), then click the "Continuous Run" eye symbol. Then, click the "Run Tests" button.

Now, the extension will spin up a server and run the tests on every save in a e2e .spec file.

If you want to stop the servers and the tests, click the "Refresh Tests" button.

> If it for some reason doesn't run on every save, click the "Stop Continuous Run" (eye) button and then click it again. Then make a change in a .spec file again and it should work.

> In this project I used a mock Express API server `./mock-server/server.ts` to simulate API requests. According to the configuration in `playwright.config.ts`, the package Concurrently is used with this command `npm run start:both` to spin up the frontend dev server and the mock API server at the same time.

## Run React Testing Library Unit Tests

```bash
npm run test-watch
```
