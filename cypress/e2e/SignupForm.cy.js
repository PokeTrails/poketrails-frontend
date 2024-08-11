describe('Signup Form', () => {
    beforeEach(() => {
      // Visit the signup page before each test
      cy.visit('https://dev.poketrails.com/signup');
  
      // Load the fixture data
      cy.fixture('signup').as('signupData');
    });
  
    it('signs up successfully with valid data', function () {
      // Use fixture data for valid signup details
      cy.get('@signupData').then((signup) => {
        cy.get('#username').type(signup.validUser.username);
        cy.get('#trainer-name').type(signup.validUser.trainerName);
        cy.get('#password').type(signup.validUser.password);
        cy.get('#confirm-password').type(signup.validUser.confirmPassword);
        
        // Submit the form
        cy.get('button[type=submit]').click();
  
        // Check if redirected to the party page
        cy.url().should('include', '/party');
      });
    });
  
    it('shows an error message when passwords do not match', function () {
      // Use fixture data for mismatched passwords
      cy.get('@signupData').then((signup) => {
        cy.get('#username').type(signup.validUser.username);
        cy.get('#trainer-name').type(signup.validUser.trainerName);
        cy.get('#password').type(signup.validUser.password);
        cy.get('#confirm-password').type(signup.invalidUser.mismatchedPassword);
  
        // Submit the form
        cy.get('button[type=submit]').click();
  
        // Check if an error message is displayed
        cy.contains('Passwords do not match. Please try again').should('be.visible');
      });
    });
  
    it('shows an error message when username is already taken', function () {
      // Use fixture data for a username that already exists
      cy.get('@signupData').then((signup) => {
        cy.get('#username').type(signup.existingUser.username);
        cy.get('#trainer-name').type(signup.existingUser.trainerName);
        cy.get('#password').type(signup.existingUser.password);
        cy.get('#confirm-password').type(signup.existingUser.confirmPassword);
  
        // Submit the form
        cy.get('button[type=submit]').click();
  
        // Check if an error message is displayed
        cy.contains('Error: User with this username already exists').should('be.visible');
      });
    });
  });
  