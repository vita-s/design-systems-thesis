import ControlWrapper from './ControlWrapper'

export default class InputFieldWrapper extends ControlWrapper {
  private get input() {
    return this.findByDataPlanktonTest('input-field')
  }

  write(text: string) {
    this.input.clear().type(text)
    return this
  }

  clickEnter() {
    this.input.type('{enter}')
    return this
  }

  isDisabled() {
    this.input.should('be.disabled')
    return this
  }

  isEnabled() {
    this.input.should('be.enabled')
    return this
  }

  assertHasValue(value: string) {
    this.input.should('have.value', value)
    return this
  }
}
