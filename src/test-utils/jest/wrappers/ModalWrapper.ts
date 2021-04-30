import Vue from 'vue'
import ComponentWrapper from './ComponentWrapper'
import ButtonWrapper from './ButtonWrapper'

export default class ModalWrapper extends ComponentWrapper {
  get modalId() {
    const inPlace = this.root.vm.inPlace
    return inPlace ? null : this.innerModal.attributes().id
  }

  get header() {
    return new ComponentWrapper(
      this.root.find(
        this.modalId ? `#${this.modalId}___BV_modal_header_` : '.modal-header'
      )
    )
  }

  get title() {
    return new ComponentWrapper(
      this.root.find(this.modalId ? `#${this.modalId}___BV_modal_title_` : '.modal-title')
    )
  }

  get footer() {
    return new ComponentWrapper(
      this.root.find(
        this.modalId ? `#${this.modalId}___BV_modal_footer_` : '.modal-footer'
      )
    )
  }

  get confirmButton() {
    return new ButtonWrapper(this.findByDataPlanktonTest('dialog--confirm-button'))
  }

  get cancelButton() {
    return new ButtonWrapper(this.findByDataPlanktonTest('dialog--cancel-button'))
  }

  get modalEl() {
    return this.innerModal.element
  }

  private get innerModal() {
    return this.root.find('.modal')
  }

  assertIsVisible() {
    expect(this.modalEl).toBeVisible()
  }

  assertIsNotVisible() {
    expect(this.modalEl).not.toBeVisible()
  }

  async confirm() {
    await this.confirmButton.click()
  }

  async cancel() {
    await this.cancelButton.click()
  }

  async close() {
    await this.root.find('button.close').trigger('click')
  }
}
