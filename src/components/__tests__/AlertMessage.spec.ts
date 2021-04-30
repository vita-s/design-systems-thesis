import AlertMessage from '../AlertMessage.vue'
import { mount } from '@vue/test-utils'

describe('Alert', () => {
  it('displays content', () => {
    const message = 'hello world'

    const wrapper = renderComponent('success', message)
    expect(wrapper.text()).toEqual(expect.stringContaining(message))
  })
})

function renderComponent(type: string, message: string) {
  return mount(AlertMessage, {
    propsData: { type },
    slots: { default: message }
  })
}
