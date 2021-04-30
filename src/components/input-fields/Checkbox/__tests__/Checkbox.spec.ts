import Checkbox from '../Checkbox.vue'
import { CheckboxWrapper } from '@/test-utils/jest/wrappers'
import { mount } from '@vue/test-utils'

describe('Checkbox', () => {
  const label = 'a label'
  const value = 'testValue'
  const inputCallback = jest.fn()
  let checkbox: CheckboxWrapper

  beforeEach(() => {
    const component = mount(Checkbox, {
      propsData: { checked: false },
      listeners: {
        input: inputCallback
      }
    })
    checkbox = new CheckboxWrapper(component)
    inputCallback.mockReset()
  })

  it('shows label parameter', async () => {
    await checkbox.root.setProps({ label })
    expect(checkbox.label).toContain(label)
  })

  describe('is checked if parameter is passed', () => {
    it('as a boolean', async () => {
      expect(checkbox.checked).toBeFalse()
      await checkbox.root.setProps({ checked: true })
      expect(checkbox.checked).toBeTrue()
    })

    it('as an array', async () => {
      await checkbox.root.setProps({ value, checked: [] })
      expect(checkbox.checked).toBeFalse()
      await checkbox.root.setProps({ checked: [value] })
      expect(checkbox.checked).toBeTrue()
    })
  })

  it('is disabled if parameter is passed', async () => {
    expect(checkbox.isDisabled()).toBeFalse()
    await checkbox.root.setProps({ disabled: true })
    expect(checkbox.isDisabled()).toBeTrue()
  })

  describe('calls function when clicked, if an input handler is attached', () => {
    it('bound to boolean', async () => {
      await checkbox.check()
      expect(inputCallback).toBeCalledWith(true)
    })

    it('bound to array', async () => {
      checkbox.root.setProps({ value, checked: [] })
      await checkbox.check()
      expect(inputCallback).toBeCalledWith([value])
    })
  })
})
