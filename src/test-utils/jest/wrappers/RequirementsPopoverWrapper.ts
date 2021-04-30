import ComponentWrapper from './ComponentWrapper'

class RequirementWrapper extends ComponentWrapper {
  assertFulfilled() {
    return this.root.classes().includes('requirement--fullfiled')
  }
}

export default class RequirementsPopoverWrapper extends ComponentWrapper {
  get header() {
    return this.findByDataPlanktonTest('popover-requirements-header')
  }

  get requirements() {
    return this.findAllByDataPlanktonTest('popover-requirement').wrappers.map(
      el => new RequirementWrapper(el)
    )
  }

  assertOpen() {
    return this.root.vm.$attrs.open
  }
}
