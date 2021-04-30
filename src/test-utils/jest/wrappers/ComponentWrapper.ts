import { Wrapper } from '@vue/test-utils'
import { VueRelaxed } from './VueRelaxed'

export default class ComponentWrapper {
  constructor(public root: Wrapper<VueRelaxed>) {
    this.root = root
  }

  get _id() {
    return this.root.element.dataset.test
  }

  get element() {
    return this.root.element
  }

  get vm() {
    return this.root.vm
  }

  attributes() {
    return this.root.attributes()
  }

  setProps(props: object) {
    return this.root.setProps(props)
  }

  emitted(event?: string): any {
    if (event) {
      return this.root.emitted()?.[event]
    } else {
      return this.root.emitted()
    }
  }

  exists() {
    return this.root.exists()
  }

  destroy() {
    return this.root.destroy()
  }

  html() {
    return this.root.html()
  }

  text() {
    return this.root.text()
  }

  findByDataTest(dataTest: string) {
    return this.root.find(`[data-test="${dataTest}"]`)
  }

  protected findByDataPlanktonTest(dataTest: string) {
    return this.root.find(`[data-plankton-test="${dataTest}"]`)
  }

  findAllByDataTest(dataTest: string) {
    return this.root.findAll(`[data-test="${dataTest}"]`)
  }

  protected findAllByDataPlanktonTest(dataTest: string) {
    return this.root.findAll(`[data-plankton-test="${dataTest}"]`)
  }
}
