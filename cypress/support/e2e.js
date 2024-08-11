// cypress/support/e2e.js

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands');

beforeEach(() => {
  // Code to run before each test, like clearing local storage
  cy.clearLocalStorage();
});
