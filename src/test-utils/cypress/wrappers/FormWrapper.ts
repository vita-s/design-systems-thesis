import ControlWrapper from './ControlWrapper'

export default class FormWrapper extends ControlWrapper {
  get formErrors() {
    return this.findByDataPlanktonTest('form-general-errors')
  }

  assertShowsErrorMessage(expectedErrorMessage: string) {
    this.formErrors.should('contain', expectedErrorMessage)
    return this
  }
}
