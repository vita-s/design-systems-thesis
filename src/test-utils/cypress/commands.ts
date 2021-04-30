export function registerCommonCommands() {
  Cypress.Commands.add(
    'findByDataTest',
    { prevSubject: 'optional' },
    (subject, value) => {
      if (subject) {
        return cy.wrap(subject).find(`[data-test="${value}"]`)
      } else {
        return cy.get(`[data-test="${value}"]`)
      }
    }
  )
}
