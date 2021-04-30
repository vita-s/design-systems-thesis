import FieldWrapper from './FieldWrapper'

export default class DropdownFieldWrapper extends FieldWrapper {
  get multiselect() {
    return this.root.findComponent({ name: 'vue-multiselect' })
  }

  get input() {
    return this.multiselect.find('input')
  }

  get options() {
    return this.multiselect.findAll('.multiselect__element .multiselect__option span')
  }

  get value() {
    const valueElement = this.multiselect.find('.multiselect__single')
    return valueElement.exists() ? valueElement.text() : null
  }

  get multiValue() {
    return this.findAllByDataPlanktonTest('selected-option-chip').wrappers.map(wrapper =>
      wrapper.find('span').text()
    )
  }

  get errors() {
    return this.findAllByDataPlanktonTest(
      'dropdown-field-error'
    ).wrappers.map(errorWrapper => errorWrapper.text())
  }

  isDisabled() {
    return this.multiselect.classes().includes('multiselect--disabled')
  }

  getOption(option: string) {
    return this.options.wrappers.find(o => o.text() === option)
  }

  async selectOption(option: string) {
    const opt = this.getOption(option)
    if (!opt) {
      // eslint-disable-next-line no-console
      console.warn('Option', option, 'not found in', this.multiselect.html(), this.input)
    } else {
      await opt.trigger('click')
    }
  }

  triggerValidation() {
    this.multiselect.vm.$emit('close')
  }

  async search(searchText: string) {
    if (!this.root.vm.searchable) throw new Error("Can't search non-searchable dropdown")
    this.input.setValue(searchText)
    await this.input.trigger('input')
  }

  async clearSelection() {
    return this.selectOption('Clear selection')
  }
}
