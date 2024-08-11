// cypress/support/commands.js

Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://dev.poketrails.com/login');
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('button[type=submit]').click();
  cy.url().should('include', '/home');
});
