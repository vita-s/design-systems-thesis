import MultipleDropdownFieldWrapper from './MultipleDropdownFieldWrapper'
import { sleep } from '../../sleep'

export default class TypeAheadFieldWrapper extends MultipleDropdownFieldWrapper {
  /**
   * Initiate the search for options
   *
   * @param {string} searchText searchText is the text to search (min 3 letters)
   */
  async search(searchText: string) {
    this.input.setValue(searchText)
    this.input.trigger('input')

    // It turns out the debounce timeout is 500ms... fixed...
    await sleep(600)
  }

  /**
   * Search for the option and select it
   *
   * @param {string} optionLabel is an option label text (min 3 letters)
   */
  async selectOption(optionLabel: string) {
    await this.search(optionLabel)
    await super.selectOption(optionLabel)
  }
}
