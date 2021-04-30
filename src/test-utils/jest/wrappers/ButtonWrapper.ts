import ComponentWrapper from './ComponentWrapper'

export default class ButtonWrapper extends ComponentWrapper {
  get isDisabled() {
    return this.root.html().includes(`disabled="disabled"`)
  }

  async click() {
    if (!this.isDisabled) {
      await this.root.trigger('click')
    } else {
      /* eslint-disable-next-line no-console */
      console.warn(`Button you try to click is disabled: ${this.root.html()}`)
    }
  }
}
