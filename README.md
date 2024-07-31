# Next.js + Playwright

This example shows how to configure Playwright to work with Next.js.

## Run Playwright E2E Tests

This runs the dev server and the mock API server, then executing the e2e tests.

```bash
npm run test:e2e
```

To run the tests (and the dev and mock API server) continuously, go into the VSCode Playwright Test Runner, then click the "Continuous Run" eye symbol. Then, click the "Run Tests" button.

Now, the tests will run on every save in a e2e .spec file.

If you want to stop the servers and the tests, click the "Refresh Tests" button.

> If it for some reason doesn't run on every save, click the "Stop Continuous Run" (eye) button and then click it again. Then make a change in a .spec file again and it should work.
