import ComponentWrapper from './ComponentWrapper'

export default class ChipWrapper extends ComponentWrapper {
  get category() {
    return this.root.vm.category
  }

  text(): string {
    return this.findByDataPlanktonTest('chip-text').exists()
      ? this.findByDataPlanktonTest('chip-text').text()
      : this.text()
  }

  isTruncated() {
    return this.html().includes('chip--truncated')
  }

  async close() {
    if (this.findByDataPlanktonTest('chip-close-btn').exists()) {
      await this.findByDataPlanktonTest('chip-close-btn').trigger('click')
    } else {
      /* eslint-disable-next-line no-console */
      console.warn(`Chip you try to close is not FilterChip`)
    }
  }
}
