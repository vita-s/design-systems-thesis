import ControlWrapper from './ControlWrapper'

export default class CheckboxWrapper extends ControlWrapper {
  assertIsChecked() {
    this.root.find('input').should('be.checked')
  }

  assertIsUnchecked() {
    this.root.find('input').should('be.not.checked')
  }

  assertIsDisabled() {
    this.root.find('input').should('be.disabled')
  }

  toggle() {
    this.root.click()
  }
}
