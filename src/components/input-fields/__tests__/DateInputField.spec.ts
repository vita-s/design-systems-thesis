import DateInputField from '@/components/input-fields/DateInputField.vue'
import { mount } from '@vue/test-utils'
import { InputFieldWrapper } from '@/test-utils/jest/wrappers'

describe('DateInputField.vue', () => {
  let wrapper: InputFieldWrapper

  beforeEach(() => {
    wrapper = new InputFieldWrapper(mount(DateInputField))
  })

  it('Displays label', async () => {
    await wrapper.setProps({ title: 'LABEL:' })

    expect(wrapper.label).toContain('LABEL:')
  })

  it('displays without errors', async () => {
    await wrapper.setProps({ value: '01-01-2019' })
    await wrapper.validate()

    expect(wrapper.errors.exists()).toBeFalse()
  })

  it('displays error message if invalid date', async () => {
    await wrapper.setProps({ value: '99-99-2019' })
    await wrapper.validate()

    expect(wrapper.errors.text()).toBe('Not a valid date')
  })

  it('displays error message if failed validation', async () => {
    await wrapper.setProps({
      inputValidators: [
        {
          isInvalid: (value: string) => value && !value.includes('03'),
          errorMessage: 'Wrong value'
        }
      ]
    })
    expect(wrapper.errors.exists()).toBe(false)

    await wrapper.setProps({ value: '02-02-2019' })
    await wrapper.validate()

    expect(wrapper.errors.text()).toBe('Wrong value')
  })

  it('allows to use european date format', async () => {
    await wrapper.setProps({
      useDotAsSeparator: true
    })

    await wrapper.write('01.01.2019')
    await wrapper.validate()

    expect(wrapper.errors.exists()).toBeFalse()
  })
})
