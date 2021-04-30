import { mount } from '@vue/test-utils'
import PrimitiveDropdownField from '../PrimitiveDropdownField.vue'
import DropdownFieldWrapper from '@/test-utils/jest/wrappers/DropdownFieldWrapper'

describe('PrimitiveDropdownField', () => {
  const options = [
    { label: 'one', value: 1 },
    { label: 'two', value: 2 },
    { label: 'three', value: 3 }
  ]
  const optionLabel = 'label'
  const optionKey = 'value'
  let selectEventHandler: jest.Mock

  beforeEach(() => {
    selectEventHandler = jest.fn()
  })

  describe('Single select', () => {
    it('emits key value when selecting option', async () => {
      const wrapper = renderComponent()
      await wrapper.selectOption('two')

      expect(selectEventHandler).toHaveBeenCalledWith(2)
    })

    it('shows label from selected value in html', () => {
      const wrapper = renderComponent(2)
      expect(wrapper.value).toBe('two')
    })

    it('removes selected value', () => {
      const value = 2
      const wrapper = renderComponent(value)
      wrapper.clearSelection()

      expect(selectEventHandler).toHaveBeenLastCalledWith(null)
    })
  })

  describe('Multi select', () => {
    it('emits key values when selecting options', async () => {
      const value = [2]
      const wrapper = renderComponent(value, true)

      await wrapper.selectOption('three')

      expect(selectEventHandler).toHaveBeenCalledTimes(1)
      expect(selectEventHandler).toHaveBeenCalledWith([2, 3])
    })

    it('shows labels from selected values in html', async () => {
      const value = [2, 3]
      const wrapper = renderComponent(value, true)

      expect(wrapper.multiValue).toEqual(['two', 'three'])
    })
  })

  function renderComponent(value: number | number[] | null = null, multiple = false) {
    return new DropdownFieldWrapper(
      mount(PrimitiveDropdownField, {
        propsData: { options, value, multiple },
        attrs: { optionKey, optionLabel },
        listeners: { select: selectEventHandler }
      })
    )
  }
})
