declare module Cypress {
  interface Chainable {
    /**
     * Selects an element by data-test attribute. Can be used directly with
     * cy.findByDataTest('element') or chained after an element is already found like
     * cy.get('.root').findByDataTest('element').
     *
     * @param value data-test value to select by
     */
    findByDataTest(value): Chainable<Element>
  }
}
