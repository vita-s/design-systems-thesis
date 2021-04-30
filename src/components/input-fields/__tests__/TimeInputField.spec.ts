import { mount } from '@vue/test-utils'
import TimeInputField from '@/components/input-fields/TimeInputField.vue'
import { InputFieldWrapper } from '@/test-utils/jest/wrappers'

describe('TimeInputField.vue', () => {
  let wrapper: InputFieldWrapper

  beforeEach(() => {
    wrapper = new InputFieldWrapper(mount(TimeInputField))
  })

  it('shows label', async () => {
    await wrapper.setProps({ title: 'LABEL:' })

    expect(wrapper.label).toContain('LABEL:')
  })

  it('shows without errors', async () => {
    await wrapper.setProps({ value: '01:01' })
    await wrapper.validate()

    expect(wrapper.errors.exists()).toBeFalse()
  })

  it('shows default error message for wrong input', () => {
    testWrongInputMessageShowsForValue('25:00')
    testWrongInputMessageShowsForValue('12:60')
    testWrongInputMessageShowsForValue('59:24')
  })

  it('shows custom error message if input fails validation', async () => {
    await wrapper.setProps({
      value: '01:01',
      inputValidators: [
        {
          isInvalid: (value: string) => value && !value.includes('03'),
          errorMessage: 'Wrong value'
        }
      ]
    })

    await wrapper.validate()

    expect(wrapper.errors.text()).toBe('Wrong value')
  })

  async function testWrongInputMessageShowsForValue(value: string) {
    await wrapper.setProps({ value })

    await wrapper.validate()
    expect(wrapper.errors.text()).toBe('Not a valid time')
  }
})
