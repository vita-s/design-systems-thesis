import Vue from 'vue'
import FieldWrapper from './FieldWrapper'
import { Wrapper } from '@vue/test-utils'
import { VueRelaxed } from './VueRelaxed'

export default class RadioButtonWrapper extends FieldWrapper {
  get selectedOption() {
    const radioElement = this.findRadioElementBy((el: Wrapper<VueRelaxed>) => {
      const inputElement = el.find('input').element as HTMLInputElement
      return inputElement.checked
    })
    return radioElement ? radioElement.find('label').text() : null
  }

  async selectOption(option: string) {
    const radioElement = this.findRadioElementBy(
      (el: Wrapper<VueRelaxed>) => el.find('label').text() === option
    )
    radioElement && radioElement.find('input').setChecked()
    await Vue.nextTick()
  }

  findRadioElementBy(predicate: (el: Wrapper<VueRelaxed>) => boolean) {
    return this.root.findAll('div.radio').wrappers.find(predicate)
  }
}
