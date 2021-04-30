import { mount } from '@vue/test-utils'
import { InputFieldWrapper, ComponentWrapper } from '@/test-utils/jest/wrappers'
import LimitedInputField from '../LimitedInputField.vue'
import LimitedTextAreaField from '@/components/input-fields/LimitedTextAreaField.vue'

describe('LimitedInputField', () => {
  let wrapper: InputFieldWrapper

  beforeEach(() => {
    wrapper = new InputFieldWrapper(
      mount(LimitedInputField, { propsData: { value: '', maxLength: 1 } })
    )
  })

  it('will not render legend when not focused', () => {
    expect(wrapper.legend.exists()).toBe(false)
  })

  it('will render legend when focused', async () => {
    await wrapper.focus()
    expect(wrapper.legend.exists()).toBe(true)
  })

  it('will render error message when text is too long', async () => {
    wrapper = new InputFieldWrapper(
      mount(LimitedInputField, { propsData: { value: '12', maxLength: 1 } })
    )
    await wrapper.validate()
    expect(wrapper.errors.exists()).toBe(true)
  })

  it('will pass data-test attribute', async () => {
    const inputContainer = new ComponentWrapper(
      mount({
        components: { LimitedInputField },
        template:
          '<LimitedInputField :value="value" :maxLength="1" data-test="test-input" />',
        data() {
          return { value: '' }
        }
      })
    )
    const inputWrapper = new InputFieldWrapper(
      inputContainer.findByDataTest('test-input')
    )

    expect(inputWrapper.exists()).toBeTrue()
  })

  it("won't allow data-test attribute fall to input element", async () => {
    const inputContainer = new ComponentWrapper(
      mount({
        components: { LimitedInputField },
        template:
          '<LimitedInputField :value="value" :maxLength="1" data-test="test-input" />',
        data() {
          return { value: '' }
        }
      })
    )
    const inputWrapper = new InputFieldWrapper(
      inputContainer.findByDataTest('test-input')
    )

    expect(
      new ComponentWrapper(inputWrapper.input).findByDataTest('test-input').exists()
    ).toBeFalse()
  })

  it('will pass props', async () => {
    await wrapper.setProps({ title: 'testTitle' })

    expect(wrapper.label).toBe('testTitle')
  })

  it('validate minLength', async () => {
    const input = new InputFieldWrapper(
      mount(LimitedInputField, {
        propsData: { value: 'text', minLength: 10, maxLength: 100 }
      })
    )

    await input.validate()
    expect(input.errors.text()).toBe(
      'Entered text should have a length between 10 and 100 characters.'
    )
    expect(input.errors.exists()).toBe(true)
  })
})
