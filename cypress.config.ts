import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000'
  },
  video: false,
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
  env: {
    CYPRESS_USERNAME: 'alice@gmail.com',
    CYPRESS_PASSWORD: 'alice'
  }
});
