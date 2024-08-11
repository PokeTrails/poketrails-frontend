describe('MenuItem Component', () => {
    beforeEach(() => {
        // Load the fixture data
        cy.fixture('login').as('loginData');
    
        // Log in before visiting the home page
        cy.get('@loginData').then((login) => {
          cy.login(login.validUser.username, login.validUser.password);
        });
      });
  
    it('renders menu items with correct images and alt text', () => {
      cy.get('img[alt="Party Page Icon"]').should('be.visible');
      cy.get('img[alt="Trail page icon"]').should('be.visible');
      cy.get('img[alt="Store Page Icon"]').should('be.visible');
      cy.get('img[alt="Pokédex Page Icon"]').should('be.visible');
    });
  
    it('buttons navigate to correct paths', () => {
      cy.contains('Party').click();
      cy.url().should('include', '/party');
      
      cy.visit('https://dev.poketrails.com/home'); // Go back to the home page
  
      cy.contains('Trails').click();
      cy.url().should('include', '/trails');
    });
  });
  