import ComponentWrapper from './ComponentWrapper'

export default class StepperWrapper extends ComponentWrapper {
  get label() {
    return this.findByDataPlanktonTest('stepper--label-indicator').text()
  }

  assertLineExist() {
    return this.findByDataPlanktonTest('stepper--line').exists()
  }

  assertContentExist() {
    return this.findByDataPlanktonTest('stepper--content').exists()
  }

  assertInputAligned() {
    return this.root.classes().includes('align-input')
  }
}
