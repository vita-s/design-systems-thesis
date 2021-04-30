import { mount } from '@vue/test-utils'
import LimitedTextAreaField from '../LimitedTextAreaField.vue'
import { InputFieldWrapper, ComponentWrapper } from '@/test-utils/jest/wrappers'

describe('LimitedTextAreaField', () => {
  let input: InputFieldWrapper
  beforeEach(async () => {
    input = new InputFieldWrapper(
      mount(LimitedTextAreaField, { propsData: { value: '', maxLength: 1 } })
    )
  })

  it('will not render legend when not focused', () => {
    expect(input.legend.exists()).toBe(false)
  })

  it('will render legend when focused', async () => {
    await input.focus()
    expect(input.legend.exists()).toBe(true)
  })

  it('will render error message when text is too long', async () => {
    const input = new InputFieldWrapper(
      mount(LimitedTextAreaField, {
        propsData: { value: '12', maxLength: 1 }
      })
    )

    await input.validate()
    expect(input.errors.exists()).toBe(true)
  })

  it('will pass data-test attribute', async () => {
    const inputContainer = new ComponentWrapper(
      mount({
        components: { LimitedTextAreaField },
        template:
          '<LimitedTextAreaField :value="value" :maxLength="1" data-test="test-input" />',
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

  it('will pass props', async () => {
    await input.setProps({ title: 'testTitle' })

    expect(input.label).toBe('testTitle')
  })

  it('validate minLength', async () => {
    const input = new InputFieldWrapper(
      mount(LimitedTextAreaField, {
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
