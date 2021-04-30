import ComponentWrapper from './ComponentWrapper'

class RadioButtonWrapper extends ComponentWrapper {
  get radioButton() {
    return this.root.find('input[type="radio"]')
  }

  get label() {
    return this.root.find('label').text()
  }

  checked() {
    return (this.radioButton.element as HTMLInputElement).checked
  }

  async click() {
    await this.radioButton.trigger('click')
  }
}

export default class RadioSetWrapper extends ComponentWrapper {
  get radioButtons() {
    return this.root.findAll('.radio').wrappers.map(el => new RadioButtonWrapper(el))
  }

  getRadioButtonByLabel(label: string) {
    return this.radioButtons.find(radioButton => radioButton.label === label)
  }

  selectedLabel() {
    return this.radioButtons.find(radioButton => radioButton.checked())?.label
  }
}
