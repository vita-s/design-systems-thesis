import RequirementsPopover from '../RequirementsPopover.vue'
import { RequirementsPopoverWrapper } from '@/test-utils/jest/wrappers'
import { mount } from '@vue/test-utils'

describe('RequirementsPopover.vue', () => {
  const wrapper = renderComponent()
  it('displays header', () => {
    expect(wrapper.header.text()).toBe('HeaderText')
  })
  it('displays options', () => {
    expect(wrapper.requirements[0].assertFulfilled()).toBeTrue()
    expect(wrapper.requirements[1].assertFulfilled()).toBeFalse()
  })
})

function renderComponent() {
  const innerEl = 'hello world'
  return new RequirementsPopoverWrapper(
    mount(RequirementsPopover, {
      propsData: {
        header: 'HeaderText',
        requirements: {
          requirement1: true,
          requirement2: false
        },
        open: true
      },
      slots: { default: innerEl }
    })
  )
}
