describe('Game', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should successfully loads the game', () => {
    cy.visit('http://localhost:3000');
  });

  it('should be count 20', () => {
    cy.get('.deck').should('have.length', 20);
  });

  it('should have length 2', () => {
    cy.get('.game__deck').should('have.length', '2');
  });

  it('should have length 1', () => {
    cy.get('.game__deck--transparent').should('have.length', '1');
  });

  it('should be 1', () => {
    cy.get('.game__deck--spare').should('have.length', 1);
  });

  it('should have card symbol count 55', () => {
    cy.get('.card__symbol').should('have.length', 55);
  });

  it('should have flipped card count 45', () => {
    cy.get('.card--flipped').should('have.length', 45);
  });

  it('should have card length 54', () => {
    cy.get('.card').should('have.length', 55);
  });

  it('should be visible', () => {
    cy.get('.game__deck--spare').should('be.visible');
  });
  
  it('should not be visible transparent game deck', () => {
    cy.get('.game__deck--transparent').should('not.be.visible');
  });

  it('should have css font-family', () => {
    cy.get('.card__rank').should('have.css', 'font-family');
  });

  it('should have css background', () => {
    cy.get('.card--flipped').should('have.css', 'background');
  });

  it('should have css background', () => {
    cy.get('body').should('have.css', 'background');
  });
});