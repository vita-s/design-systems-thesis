import FieldWrapper from './FieldWrapper'

export default class InputFieldWrapper extends FieldWrapper {
  get input() {
    return this.findByDataPlanktonTest('input-field')
  }

  get value() {
    return (this.input.element as HTMLInputElement).value
  }

  get placeholder() {
    return (this.input.element as HTMLInputElement).placeholder
  }

  get icon() {
    return this.findByDataPlanktonTest('icon-wrapper')
  }

  get legend() {
    return this.findByDataPlanktonTest('input-legend')
  }

  get errors() {
    return this.findByDataPlanktonTest('wrong-input-feedback')
  }

  async write(value: string) {
    await this.input.setValue(value)
  }

  async validate() {
    await this.input.trigger('blur')
  }

  async focus() {
    await this.input.element.focus()
  }

  assertLastEmitted() {
    const emits = this.emitted('input')
    return emits?.[emits.length - 1][0]
  }
}
