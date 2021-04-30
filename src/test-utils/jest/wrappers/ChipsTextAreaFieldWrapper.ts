import ComponentWrapper from './ComponentWrapper'
import InputFieldWrapper from './InputFieldWrapper'
import ChipWrapper from './ChipWrapper'
import ButtonWrapper from './ButtonWrapper'

export default class ChipsTextAreaFieldWrapper extends ComponentWrapper {
  get textAreaField() {
    return new InputFieldWrapper(this.findByDataPlanktonTest('chips-textarea-field'))
  }

  get values() {
    return this.findAllByDataPlanktonTest('filter-chip').wrappers.map(
      el => new ChipWrapper(el)
    )
  }

  get clearAllButton() {
    return new ButtonWrapper(this.findByDataPlanktonTest('clear-all-btn'))
  }
}
