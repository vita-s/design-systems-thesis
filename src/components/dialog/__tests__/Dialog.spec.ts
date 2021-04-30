import { mount, createLocalVue } from '@vue/test-utils'
import { ModalWrapper } from '@/test-utils/jest/wrappers'
import BootstrapVue from 'bootstrap-vue'
import Dialog from '../Dialog.vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('Dialog', () => {
  const dialogContent = 'hola mundo'
  const confirmButtonText = 'accept'
  const cancelButtonText = 'cancel'
  const element = document.createElement('div')
  document.body.appendChild(element)

  let wrapper: ModalWrapper, closeEventHandlerMock: jest.Mock

  beforeEach(() => {
    closeEventHandlerMock = jest.fn()
    wrapper = new ModalWrapper(
      mount(Dialog, {
        localVue,
        propsData: {
          show: true,
          title: 'my-title',
          confirmButtonText,
          cancelButtonText
        },
        slots: { default: dialogContent },
        listeners: { close: closeEventHandlerMock },
        attachTo: element
      })
    )
  })

  afterEach(() => {
    if (wrapper) wrapper.destroy()
  })

  it('renders content', () => {
    expect(wrapper.text()).not.toContain(dialogContent)
    expect(document.body.innerHTML).toContain(dialogContent)
  })

  it('renders content "in-place"', async () => {
    await wrapper.setProps({
      show: true,
      title: 'my-title',
      confirmButtonText,
      cancelButtonText,
      inPlace: true,
      lazy: true
    })
    expect(wrapper.text()).toContain(dialogContent)
  })

  it('renders confirm button', () => {
    expect(document.body.innerHTML).toContain(confirmButtonText)
  })

  it('renders cancel button', () => {
    expect(document.body.innerHTML).toContain(confirmButtonText)
  })

  it('renders title when injected via props', () => {
    const modalTitle = 'Title from props'

    wrapper.destroy()
    wrapper = new ModalWrapper(
      mount(Dialog, {
        localVue,
        propsData: {
          show: true,
          inPlace: true,
          title: modalTitle
        },
        slots: { default: dialogContent },
        attachTo: element
      })
    )

    expect(wrapper.title.text()).toBe(modalTitle)
  })

  it('renders title without hard spaces', () => {
    const modalTitle = 'Title from props'

    wrapper.destroy()
    wrapper = new ModalWrapper(
      mount(Dialog, {
        localVue,
        propsData: {
          show: true,
          inPlace: true,
          title: modalTitle
        },
        slots: { default: dialogContent },
        attachTo: element
      })
    )

    expect(wrapper.title.html()).toBe('<h5 class="modal-title">Title from props</h5>')
    expect(wrapper.title.html()).not.toBe(`<h5 class="modal-title">
  Title from props
</h5>`)
  })

  it('overrides default title when injected via slot', () => {
    const modalTitleSlot = '<div>Title from <span>slot</span></div>'

    wrapper.destroy()
    wrapper = new ModalWrapper(
      mount(Dialog, {
        localVue,
        propsData: {
          show: true,
          inPlace: true,
          title: 'Title from props'
        },
        slots: { default: dialogContent, 'modal-title': modalTitleSlot },
        attachTo: element
      })
    )

    expect(wrapper.title.text()).toBe('Title from slot')
  })

  it('overrides default header when injected via slot', () => {
    const modalHeaderSlot = '<div>Header from <span>slot</span></div>'

    wrapper.destroy()
    wrapper = new ModalWrapper(
      mount(Dialog, {
        localVue,
        propsData: {
          show: true,
          inPlace: true,
          title: 'Test title'
        },
        slots: { default: dialogContent, 'modal-header': modalHeaderSlot },
        attachTo: element
      })
    )

    expect(wrapper.header.text()).toBe('Header from slot')
  })

  describe('When Dialog is disabled', () => {
    beforeEach(async () => {
      await wrapper.setProps({
        show: true,
        confirmButtonText,
        cancelButtonText,
        inPlace: true,
        lazy: true,
        disabled: true
      })
    })

    it('disables actions buttons', () => {
      expect(wrapper.confirmButton.isDisabled).toBeTrue()
      expect(wrapper.cancelButton.isDisabled).toBeTrue()
    })

    it('does not allow user to close modal', async () => {
      await wrapper.close()
      expect(closeEventHandlerMock).not.toHaveBeenCalled()
    })
  })
})
