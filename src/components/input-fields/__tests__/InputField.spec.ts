import InputField from '@/components/input-fields/InputField.vue'
import { InputFieldWrapper } from '@/test-utils/jest/wrappers'
import { mount } from '@vue/test-utils'
import { buildIntegerMask } from '@/components/input-fields/mask-regex'
import { provider as formProvider } from '../../form-provider'

describe('InputField.vue', () => {
  let wrapper: InputFieldWrapper

  beforeEach(() => {
    wrapper = new InputFieldWrapper(mount(InputField))
  })

  it('Displays title', async () => {
    await wrapper.setProps({ title: 'LABEL:' })

    expect(wrapper.label).toContain('LABEL:')
  })

  it('should display errors only when we lose focus', async () => {
    await wrapper.setProps({
      value: '',
      inputValidators: [
        { isInvalid: (value: string) => !value, errorMessage: 'No empty field' }
      ]
    })

    expect(wrapper.errors.exists()).toBe(false)

    await wrapper.validate()

    expect(wrapper.errors.text()).toBe('No empty field')
  })

  it('is disabled if specified as a prop', async () => {
    await wrapper.setProps({ disabled: true })

    expect(wrapper.isDisabled()).toBeTrue()
  })

  it('is not disabled by default', () => {
    expect(wrapper.isDisabled()).toBeFalse()
  })

  it('shows pre-defined value', async () => {
    const value = 'Hello, darling!'
    await wrapper.setProps({ value })

    expect(wrapper.value).toBe(value)
  })

  it('constraint possible input value to mask', async () => {
    const integerMask = buildIntegerMask()
    await wrapper.setProps({ inputMask: integerMask })

    await wrapper.write('eureka')
    expect(wrapper.value).toBe('')

    await wrapper.write('1')
    expect(wrapper.value).toBe('1')
  })

  it('contains placeholder', async () => {
    const placeholder = 'plac3hold3r'
    await wrapper.setProps({ placeholder })

    expect(wrapper.placeholder).toBe(placeholder)
  })

  it('displays text as icon when passed as parameter', async () => {
    const textIcon = '°C'
    await wrapper.setProps({ textIcon })

    expect(wrapper.text()).toContain(textIcon)
  })

  it('displays material design icon when passed as parameter', async () => {
    const materialIcon = 'date_range'
    await wrapper.setProps({ materialIcon })

    expect(wrapper.text()).toContain(materialIcon)
  })

  describe('Accessibility', () => {
    it('should displays input with regular styling', () => {
      expect(wrapper.input.classes()).toContain('input-field__input--regular')
    })

    it('displays input with accessibility standards styling', async () => {
      await wrapper.setProps({
        title: 'Title',
        value: 'Value',
        legend: 'Legend',
        accessibilityStandards: true
      })

      expect(wrapper.input.classes()).toContain('input-text-accessibility')
    })
  })

  it('emits click-on-icon event', async () => {
    const materialIcon = 'date_range'
    const clickOnIconHandler = jest.fn()
    const wrapper = new InputFieldWrapper(
      mount(InputField, {
        propsData: { materialIcon },
        listeners: { 'click-on-icon': clickOnIconHandler }
      })
    )

    await wrapper.icon.trigger('click')
    expect(clickOnIconHandler).toHaveBeenCalled()
  })

  it('emits empty input values as null', async () => {
    const inputEventListener = jest.fn()
    const wrapper = new InputFieldWrapper(
      mount(InputField, {
        propsData: { convertEmptyToNull: true },
        listeners: { input: inputEventListener }
      })
    )

    await wrapper.write('')
    expect(inputEventListener).toHaveBeenCalledWith(null)
  })

  describe('Form registration', () => {
    let wrapper: InputFieldWrapper,
      registerField: jest.Mock,
      setFieldValidationErrors: jest.Mock,
      validationCallback: jest.Mock

    beforeEach(() => {
      registerField = jest.fn((_, callback) => {
        validationCallback = callback
      })
      setFieldValidationErrors = jest.fn()

      wrapper = new InputFieldWrapper(
        mount(InputField, {
          provide: {
            [formProvider.from]: {
              registerField,
              setFieldValidationErrors,
              isFormDisabled: () => false
            }
          }
        })
      )
    })

    it('should register in form provider', () => {
      expect(registerField).toHaveBeenCalled()
    })

    it('should add errors to form provider when changing value', async () => {
      await wrapper.setProps({
        name: 'my-name',
        value: 'Hi guy!',
        inputValidators: [
          {
            isInvalid: (value: string) => value.includes('Hi'),
            errorMessage: 'Some error message'
          }
        ]
      })

      expect(setFieldValidationErrors).toHaveBeenCalledWith('my-name', [
        { errorMessage: 'Some error message', inline: true }
      ])
    })

    it('should wait to show errors till form is submitted', async () => {
      await wrapper.setProps({
        name: 'my-name',
        value: 'Hi guy!',
        inputValidators: [
          {
            isInvalid: (value: string) => value.includes('Hi'),
            errorMessage: 'Some error message'
          }
        ]
      })

      expect(wrapper.errors.exists()).toBe(false)

      await validationCallback()

      expect(wrapper.errors.text()).toContain('Some error message')
    })
  })
})
