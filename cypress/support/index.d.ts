declare namespace Cypress {
    interface Chainable {
      getDataCy(value: string): Chainable<Element>
    }
  }