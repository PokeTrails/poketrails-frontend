import { defineConfig } from "cypress";
import mochawesome from 'mochawesome';

export default defineConfig({
  projectId: "hyjppy",
  e2e: {
    setupNodeEvents(on, config) {
      // Set MochaAwesome as the reporter
      on('before:run', () => {
        config.reporter = 'mochawesome';
        config.reporterOptions = {
          charts: true,
          overwrite: false,
          html: false,
          json: true,
          reportDir: 'cypress/report/mochawesome-report',
        };
      });

      // Implement other node event listeners here if needed
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
