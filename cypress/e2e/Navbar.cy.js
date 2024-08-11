describe('Navbar', () => {
    context('When logged in', () => {
      beforeEach(() => {
        // Log in before each test
        cy.login('user3', 'user3'); // Replace with actual login command or credentials
        cy.visit('https://dev.poketrails.com/home'); // Go back to the home page
      });
  
      it('should display the app logo on navbar', () => {
        cy.get('.MuiTypography-h6 > img').should('be.visible');
      });
  
      it('should show navigation buttons for all pages on desktop', () => {
        const pages = ['Home', 'Party', 'Trails', 'Pokédex', 'Store'];
  
        cy.viewport('macbook-15');
        pages.forEach(page => {
          cy.contains(page).should('be.visible');
        });
      });
  
      it('should navigate to correct pages when navigation buttons are clicked', () => {
        cy.contains('Party').click();
        cy.url().should('include', '/party');
        cy.contains('Trails').click();
        cy.url().should('include', '/trails');
      });
    });
  
    context('When logged out', () => {
      beforeEach(() => {
        // Clear the JWT to simulate a logged-out state
        localStorage.removeItem('jwt');
      });
  
      it('should display the Sign Up/Log In button', () => {
        cy.visit('https://dev.poketrails.com/login'); // Go to login page
        cy.get('.MuiButton-outlined').should('be.visible');
        cy.visit('https://dev.poketrails.com/login'); // Go to sign up page
        cy.get('.MuiButton-outlined').should('be.visible');
      });
    
      it('should navigate to login page on clicking Sign Up button', () => {
        cy.visit('https://dev.poketrails.com/login');
        cy.get('.MuiButton-outlined').click();
        cy.url().should('include', '/signup');
      });

      it('should navigate to login page on clicking Log In button', () => {
        cy.visit('https://dev.poketrails.com/signup');
        cy.get('.MuiButton-outlined').click();
        cy.url().should('include', '/login');
      });
    });
  });
  