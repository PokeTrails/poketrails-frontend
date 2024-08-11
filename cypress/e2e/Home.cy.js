
describe('Home Page', () => {
    beforeEach(() => {
      // Load the fixture data
      cy.fixture('login').as('loginData');
  
      // Log in before visiting the home page
      cy.get('@loginData').then((login) => {
        cy.login(login.validUser.username, login.validUser.password);
      });
    });
  
    it('renders the main menu heading', () => {
      cy.contains('Main Menu').should('be.visible');
    });
  
    it('renders the subheading', () => {
      cy.contains('Select from one of the options below').should('be.visible');
    });
  
    it('renders all menu items with correct text', () => {
      const menuItems = ['Party', 'Trails', 'Store', 'Pokédex'];
  
      menuItems.forEach((item) => {
        cy.contains(item).should('be.visible');
      });
    });
  
    it('navigates to the correct page when a menu item is clicked', () => {
      cy.contains('Party').click();
      cy.url().should('include', '/party');
  
      cy.visit('https://dev.poketrails.com/home'); // Go back to the home page
  
      cy.contains('Store').click();
      cy.url().should('include', '/store');

      cy.visit('https://dev.poketrails.com/home'); // Go back to the home page

      cy.contains('Pokédex').click();
      cy.url().should('include', '/pokedex');
    });
  });
  