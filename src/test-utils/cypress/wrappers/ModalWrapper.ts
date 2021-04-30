import ControlWrapper from './ControlWrapper'

export default class ModalWrapper extends ControlWrapper {
  get title() {
    return this.root.find('.modal-title')
  }

  get body() {
    return this.findByDataPlanktonTest('dialog--content')
  }

  waitModalBeVisible() {
    this.root.find('.modal').should('be.visible')
    return this
  }

  waitModalBeHidden() {
    this.root.find('.modal').should('not.be.visible')
    return this
  }

  confirm() {
    this.findByDataPlanktonTest('dialog--confirm-button').click()
    return this
  }

  cancel() {
    this.findByDataPlanktonTest('dialog--cancel-button').click()
    return this
  }
}
