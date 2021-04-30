import FieldWrapper from './FieldWrapper'
import ChipWrapper from './ChipWrapper'

export default class MultipleDropdownFieldWrapper extends FieldWrapper {
  get multiselect() {
    return this.root.findComponent({ name: 'vue-multiselect' })
  }

  get input() {
    return this.multiselect.find('input')
  }

  get options() {
    return this.findAllByDataPlanktonTest('multiple-option')
  }

  get visibleValues() {
    if (typeof this.vm.closingTag !== 'boolean') {
      /* eslint-disable-next-line no-console */
      console.warn(
        `"closingTag" prop is not found. Please call the wrapper for the DropdownField/TypeAheadField component directly`
      )
    }
    const valueElements = this.findAllByDataPlanktonTest(
      this.vm.closingTag ? 'selected-option-filter-chip' : 'selected-option-chip'
    )
    return valueElements.wrappers.map(valueElement =>
      new ChipWrapper(valueElement).text()
    )
  }

  get invisibleValuesAmount() {
    const limitElement = this.findByDataPlanktonTest('limit-chip')
    return limitElement.exists() ? Number(limitElement.text()) : 0
  }

  get errors() {
    return this.findAllByDataPlanktonTest(
      'dropdown-field-error'
    ).wrappers.map(errorWrapper => errorWrapper.text())
  }

  isDisabled() {
    return this.multiselect.classes().includes('multiselect--disabled')
  }

  getOption(label: string) {
    const options = this.options.wrappers.filter(o => o.text().includes(label))
    if (options.length === 0) {
      return null
    } else if (options.length > 1) {
      // eslint-disable-next-line no-console
      console.warn(
        `There are ${options.length} "${label}" options, please use more specific option text`
      )
    } else {
      return options[0]
    }
  }

  getOptionTextByPosition(position: number) {
    const option = this.options.wrappers[position]
    return option?.text()
  }

  async addOption(label: string) {
    if (!this.vm.searchable && !this.vm.taggable)
      throw new Error("Can't add option in non searchable and non taggable dropdown")
    this.input.setValue(label)
    await this.input.trigger('input')
    const addTagOption = this.options.wrappers[0]
    await addTagOption.trigger('click')
  }

  async selectOption(option: string) {
    const opt = this.getOption(option)
    if (opt) {
      await opt.trigger('click')
    } else {
      // eslint-disable-next-line
      console.warn('Option was not found and could not be selected')
    }
  }

  rerenderOptions() {
    this.multiselect.vm.$emit('open')
  }

  async search(searchText: string) {
    if (!this.vm.searchable) throw new Error("Can't search non-searchable dropdown")
    this.input.setValue(searchText)
    await this.input.trigger('input')
  }
}
