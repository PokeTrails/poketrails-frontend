describe('Login Form', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('https://dev.poketrails.com/login');

    // Load the fixture data
    cy.fixture('login').as('loginData');
  });

  it('logs in successfully with valid credentials', function () {
    // Use fixture data for valid credentials
    cy.get('@loginData').then((login) => {
      cy.get('#username').type(login.validUser.username);
      cy.get('#password').type(login.validUser.password);

      // Submit the form
      cy.get('button[type=submit]').click();

      // Check if redirected to the home page
      cy.url().should('include', '/home');
    });
  });

  it('shows an error message on login failure', function () {
    // Use fixture data for invalid credentials
    cy.get('@loginData').then((login) => {
      cy.get('#username').type(login.invalidUser.username);
      cy.get('#password').type(login.invalidUser.password);

      // Submit the form
      cy.get('button[type=submit]').click();

      // Check if an error message is displayed
      cy.contains('Error: Incorrect username or password').should('be.visible');
    });
  });
});
