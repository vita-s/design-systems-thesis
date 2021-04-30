import DropdownFieldWrapper from './DropdownFieldWrapper'

export default class TypeAheadInputWrapper extends DropdownFieldWrapper {
  select(option: string) {
    this.focus()
    this.input.type(option)
    this.option(option).click({ force: true })

    return this
  }

  get value() {
    return this.root.find('.multiselect__single')
  }
}
