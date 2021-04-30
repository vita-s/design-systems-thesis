import ComponentWrapper from './ComponentWrapper'

export default class FieldWrapper extends ComponentWrapper {
  get label() {
    return this.root.find('label').text()
  }

  isDisabled() {
    return this.root.html().includes(`disabled="disabled"`)
  }
}
