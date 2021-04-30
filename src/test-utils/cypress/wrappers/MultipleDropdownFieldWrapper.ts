import DropdownFieldWrapper from './DropdownFieldWrapper'

export default class MultipleDropdownFieldWrapper extends DropdownFieldWrapper {
  get visibleValues() {
    return this.root.find('.multiple')
  }
}
