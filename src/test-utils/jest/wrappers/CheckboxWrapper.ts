import Vue from 'vue'
import FieldWrapper from './FieldWrapper'

export default class CheckboxWrapper extends FieldWrapper {
  get checked() {
    return (this.root.find('input').element as HTMLInputElement).checked
  }

  async check() {
    if (!this.checked) {
      this.root.find('input').trigger('click')
      this.root.find('input').trigger('change')
      await Vue.nextTick()
    }
  }

  async uncheck() {
    if (this.checked) {
      this.root.find('input').trigger('click')
      this.root.find('input').trigger('change')
      await Vue.nextTick()
    }
  }
}
