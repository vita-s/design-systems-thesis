import DropdownFieldWrapper from './DropdownFieldWrapper'

export default class SingleSelectDropdownFieldWrapper extends DropdownFieldWrapper {
  get value() {
    return this.root.find('.multiselect__single')
  }
}
