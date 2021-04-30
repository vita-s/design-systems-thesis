import ControlWrapper from './ControlWrapper'

export default class DropdownFieldWrapper extends ControlWrapper {
  get label() {
    return this.root.find('label')
  }

  get input() {
    return this.root.find('.multiselect input')
  }

  get multiselect() {
    return this.root.find('.multiselect')
  }

  get option() {
    return (option: string) =>
      this.multiselect.contains('.multiselect__option span', option, { matchCase: false })
  }

  isEnabled() {
    this.findByDataPlanktonTest('dropdown-field--multiselect').should(
      'have.not.class',
      'multiselect--disabled'
    )
    return this
  }

  isDisabled() {
    this.findByDataPlanktonTest('dropdown-field--multiselect').should(
      'have.class',
      'multiselect--disabled'
    )
    return this
  }

  focus() {
    this.multiselect.click({ force: true })
    return this
  }

  select(option: string) {
    this.focus()
    this.option(option).click({ force: true })
    return this
  }

  remove(option: string) {
    this.root
      .contains('.multiselect__tags span', option, { matchCase: false })
      .siblings('i')
      .click()
    return this
  }
}
