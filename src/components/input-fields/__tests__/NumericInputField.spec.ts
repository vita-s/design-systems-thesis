import NumericInputField from '@/components/input-fields/NumericInputField.vue'
import { mount } from '@vue/test-utils'
import { InputFieldWrapper } from '@/test-utils/jest/wrappers'

describe('NumericInputField.vue', () => {
  let wrapper: InputFieldWrapper

  beforeEach(() => {
    wrapper = new InputFieldWrapper(mount(NumericInputField))
  })

  it('does not take string values', async () => {
    await wrapper.write('abc')

    expect(wrapper.assertLastEmitted()).toBeNull()
  })

  it('takes decimal numbers by default', async () => {
    await wrapper.write('2.5')

    expect(wrapper.assertLastEmitted()).toBe(2.5)
  })

  it('only shows the first two decimal places when showing decimal values', async () => {
    await wrapper.write('2.999')

    expect(wrapper.assertLastEmitted()).toBe(2.99)
  })

  it('only shows integer value when parameter is given', async () => {
    await wrapper.setProps({ allowDecimal: false })
    await wrapper.write('2.99')

    expect(wrapper.assertLastEmitted()).toBe(299)
  })

  it('does not take negative values by default', async () => {
    await wrapper.write('-17')

    expect(wrapper.assertLastEmitted()).toBe(17)
  })

  it('takes negative values when parameter is given', async () => {
    await wrapper.setProps({ allowNegative: true })
    await wrapper.write('-17')

    expect(wrapper.assertLastEmitted()).toBe(-17)
  })

  it('allows zero value', async () => {
    await wrapper.write('0')

    expect(wrapper.assertLastEmitted()).toBe(0)
  })

  it('displays error message if input fails validator', async () => {
    await wrapper.setProps({
      value: 1,
      inputValidators: [
        {
          isInvalid: (input: number) => input < 10,
          errorMessage: 'Input must be above 10'
        }
      ]
    })

    await wrapper.validate()

    expect(wrapper.errors.text()).toBe('Input must be above 10')
  })
})
