import ComponentWrapper from './ComponentWrapper'
import ButtonWrapper from './ButtonWrapper'

export default class ToggleInputWrapper extends ComponentWrapper {
  get toggleButton() {
    return new ButtonWrapper(this.findByDataPlanktonTest('toggle-button'))
  }
}
