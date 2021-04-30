// @ts-ignore
import { v4 as uuid } from 'uuid'

/**
 * Base class for wrappers.
 * It encapsulates getting the root of a control so that finding elements within
 * the wrapper is easier and more intuitive.
 *
 * See DropdownFieldWrapper for example implementation
 */
export default class ControlWrapper {
  private id: string

  constructor(root: Cypress.Chainable<JQuery<HTMLElement>>) {
    const id = uuid()
    this.id = `@${id}`
    root.as(id)
  }

  get root() {
    return cy.get(this.id)
  }

  findByDataTest(id: string) {
    return this.root.find(`[data-test="${id}"]`)
  }

  protected findByDataPlanktonTest(id: string) {
    return this.root.find(`[data-plankton-test="${id}"]`)
  }
}
