import ComponentWrapper from './ComponentWrapper'

export default class ProgressBarWrapper extends ComponentWrapper {
  get progressEl() {
    return this.findByDataPlanktonTest('progress-bar--progress').element
  }
}
