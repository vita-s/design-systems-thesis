import MoneyInputField from '@/components/input-fields/MoneyInputField.vue'
import { mount } from '@vue/test-utils'
import { InputFieldWrapper } from '@/test-utils/jest/wrappers'

describe('MoneyInputField.vue', () => {
  let wrapper: InputFieldWrapper
  const inputEventStub = jest.fn()

  beforeEach(() => {
    wrapper = new InputFieldWrapper(
      mount(MoneyInputField, {
        listeners: {
          input: inputEventStub
        }
      })
    )
  })

  it('shows label', async () => {
    await wrapper.setProps({ title: 'LABEL:' })

    expect(wrapper.label).toContain('LABEL:')
  })

  it('does not take negative values by default', async () => {
    await wrapper.write('-17')

    expect(inputEventStub).toHaveBeenLastCalledWith(17)
  })

  it('takes negative values when parameter is given', async () => {
    await wrapper.setProps({ allowNegative: true })
    await wrapper.write('-17')

    expect(inputEventStub).toHaveBeenLastCalledWith(-17)
  })

  it('takes decimal values by default', async () => {
    await wrapper.write('2.99')

    expect(inputEventStub).toHaveBeenLastCalledWith(2.99)
  })

  it('only shows two decimal places when showing decimal values', async () => {
    await wrapper.write('2.999')

    expect(inputEventStub).toHaveBeenLastCalledWith(2.99)
  })

  it('only shows integer value when parameter is given', async () => {
    await wrapper.setProps({ allowDecimal: false })
    await wrapper.write('2.99')

    expect(inputEventStub).toHaveBeenLastCalledWith(299)
  })

  it('displays error message if input fails validator', async () => {
    await wrapper.setProps({
      value: 1,
      inputValidators: [
        { isInvalid: (input: number) => input > 0, errorMessage: 'Only zero is valid' }
      ]
    })

    await wrapper.validate()

    expect(wrapper.errors.text()).toBe('Only zero is valid')
  })
})
