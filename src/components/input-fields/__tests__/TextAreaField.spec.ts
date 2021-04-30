import { mount } from '@vue/test-utils'
import TextAreaField from '../TextAreaField.vue'
import { InputFieldWrapper } from '@/test-utils/jest/wrappers'

describe('TextAreaField', () => {
  it('renders textarea element', () => {
    const wrapper = new InputFieldWrapper(mount(TextAreaField))
    expect(wrapper.input.exists()).toBe(true)
  })

  it('shows validation errors', async () => {
    const wrapper = new InputFieldWrapper(
      mount(TextAreaField, {
        propsData: {
          value: 'test',
          validators: [
            {
              isInvalid: (value: string) => value.length < 10,
              errorMessage: 'invalid value'
            }
          ]
        }
      })
    )

    await wrapper.validate()

    expect(wrapper.errors.text()).toEqual(expect.stringContaining('invalid value'))
  })

  it('converts empty value to null', async () => {
    const inputEventListener = jest.fn()
    const wrapper = new InputFieldWrapper(
      mount(TextAreaField, {
        propsData: { value: 'test', convertEmptyToNull: true },
        listeners: { input: inputEventListener }
      })
    )

    await wrapper.write('')

    expect(inputEventListener).toHaveBeenCalledWith(null)
  })
})
