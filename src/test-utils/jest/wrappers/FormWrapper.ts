import Vue from 'vue'
import ComponentWrapper from './ComponentWrapper'

export default class FormWrapper extends ComponentWrapper {
  get errors() {
    return this.findByDataPlanktonTest('form-general-errors')
  }

  async submit() {
    await this.root.trigger('submit.prevent')
  }

  async validate() {
    const form = this.root.vm.$refs.form as any
    form.validate()
    await Vue.nextTick()
  }
}
