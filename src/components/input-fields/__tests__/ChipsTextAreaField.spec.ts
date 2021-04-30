import { mount } from '@vue/test-utils'
import ChipsTextAreaField from '../ChipsTextAreaField.vue'
import { ChipsTextAreaFieldWrapper } from '@/test-utils/jest/wrappers'

describe('ChipsTextAreaField.vue', () => {
  it('render ChipsTextAreaField.vue', () => {
    const wrapper = new ChipsTextAreaFieldWrapper(mount(ChipsTextAreaField))

    expect(wrapper.textAreaField.exists()).toBeTrue()
  })

  it('Displays title', () => {
    const wrapper = new ChipsTextAreaFieldWrapper(
      mount(ChipsTextAreaField, {
        propsData: { title: 'LABEL:', value: '' }
      })
    )

    expect(wrapper.text()).toContain('LABEL:')
  })

  it('render chips inside the chips prop array', async () => {
    const sampleChips = ['chip1', 'chip2', 'chip3', 'chip4', 'chip5']
    const wrapper = new ChipsTextAreaFieldWrapper(
      mount(ChipsTextAreaField, {
        propsData: {
          chips: sampleChips
        }
      })
    )

    expect(wrapper.values).toHaveLength(sampleChips.length)
  })

  it('emit onDelete event to the parent', async () => {
    const sampleChips = ['chip1']
    const wrapper = new ChipsTextAreaFieldWrapper(
      mount(ChipsTextAreaField, {
        propsData: {
          chips: sampleChips
        }
      })
    )

    const chipEl = wrapper.values[0]
    await chipEl.close()
    expect(wrapper.emitted('chips-input')).toHaveLength(1)
  })

  it('clear all on click clear button', async () => {
    const sampleChips = ['chip1', 'chip2']
    const wrapper = new ChipsTextAreaFieldWrapper(
      mount(ChipsTextAreaField, {
        propsData: {
          chips: sampleChips
        }
      })
    )
    await wrapper.clearAllButton.click()
    expect(wrapper.emitted('chips-input')).toHaveLength(1)
  })

  it('clear all on click clear button', async () => {
    const sampleChips = ['chip1', 'chip2']
    const wrapper = new ChipsTextAreaFieldWrapper(
      mount(ChipsTextAreaField, {
        propsData: {
          chips: sampleChips
        }
      })
    )
    await wrapper.clearAllButton.click()
    expect(wrapper.emitted('chips-input')).toHaveLength(1)
  })
})
