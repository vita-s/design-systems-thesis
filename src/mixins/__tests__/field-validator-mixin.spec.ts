import Vue from 'vue'
import { mount, Wrapper } from '@vue/test-utils'
import fieldValidatorMixin from '../field-validator-mixin'
import { provider as formProvider } from '@/components/form-provider'
import { VueRelaxed } from '@/test-utils/jest/wrappers/VueRelaxed'

describe('Field Validator Mixin', () => {
  const inlineValidator = {
    isInvalid: jest.fn().mockReturnValue(false),
    errorMessage: 'inline mock error'
  }
  const generalErrorValidator = {
    isInvalid: jest.fn().mockReturnValue(false),
    errorMessage: 'general error',
    inline: false
  }
  let onSubmitFormCallback: jest.Mock
  const formProviderMock = {
    registerField: jest
      .fn()
      .mockImplementation((_name, callback) => (onSubmitFormCallback = callback)),
    unregisterField: jest.fn(),
    setFieldValidationErrors: jest.fn(),
    submitted: Vue.observable({ value: false })
  }
  let wrapper: Wrapper<VueRelaxed>

  beforeEach(() => {
    wrapper = renderMixin()
    inlineValidator.isInvalid.mockReset()
    generalErrorValidator.isInvalid.mockReset()
  })

  it('register component in Form provider', () => {
    expect(formProviderMock.registerField).toHaveBeenCalled()
  })

  describe('When changing field value', () => {
    beforeEach(() => {
      wrapper.find('input').setValue('hola')
    })

    it('executes inline validator', () => {
      expect(inlineValidator.isInvalid).toHaveBeenCalled()
    })

    it('send validation result to form provider', () => {
      expect(formProviderMock.setFieldValidationErrors).toHaveBeenCalled()
    })
  })

  it('shows inline errors after touched', () => {
    inlineValidator.isInvalid.mockReturnValue(true)
    wrapper.find('input').setValue('hola')

    expect(wrapper.vm.fieldValidatorInlineErrorsShown).toBe(false)
    wrapper.vm.fieldValidatorTouch()
    expect(wrapper.vm.fieldValidatorInlineErrorsShown).toBe(true)
  })

  it('shows error indicator after touched', () => {
    inlineValidator.isInvalid.mockReturnValue(true)
    wrapper.find('input').setValue('hola')

    expect(wrapper.vm.fieldValidatorErrorIndicatorShown).toBe(false)
    wrapper.vm.fieldValidatorTouch()
    expect(wrapper.vm.fieldValidatorErrorIndicatorShown).toBe(true)
  })

  it('shows error indicator after submitted', () => {
    inlineValidator.isInvalid.mockReturnValue(true)

    expect(wrapper.vm.fieldValidatorErrorIndicatorShown).toBe(false)
    onSubmitFormCallback()
    expect(wrapper.vm.fieldValidatorErrorIndicatorShown).toBe(true)
  })

  describe('When Form is submitted', () => {
    beforeEach(() => {
      onSubmitFormCallback()
    })

    it('executes general validator', () => {
      expect(generalErrorValidator.isInvalid).toHaveBeenCalled()
    })

    it('shows error indicator from general errors', () => {
      generalErrorValidator.isInvalid.mockReturnValue(false)
      wrapper.find('input').setValue('hola')
      onSubmitFormCallback()

      expect(wrapper.vm.fieldValidatorErrorIndicatorShown).toBe(false)

      generalErrorValidator.isInvalid.mockReturnValue(true)
      wrapper.find('input').setValue('hola2')

      expect(wrapper.vm.fieldValidatorErrorIndicatorShown).toBe(false)

      onSubmitFormCallback()

      expect(wrapper.vm.fieldValidatorErrorIndicatorShown).toBe(true)
    })
  })

  function renderMixin(mixinOptions = {}) {
    const componentWithMixin = {
      // @ts-ignore
      mixins: [fieldValidatorMixin(mixinOptions)],
      template: '<input type="text" v-model="value" data-plankton-test="input" />',
      data() {
        return { value: '' }
      }
    }
    return mount(componentWithMixin, {
      propsData: {
        validators: [inlineValidator, generalErrorValidator]
      },
      provide: {
        [formProvider.from]: formProviderMock
      }
    })
  }
})

describe('Field Validator Mixin with alternative API', () => {
  it('shows error field errorMessage function', () => {
    const inlineValidatorWithErrorMessageFunction = {
      isInvalid: jest.fn().mockReturnValue(true),
      errorMessage: (value: string) => `inline mock error ${value}`
    }

    const wrapper = renderMixin(inlineValidatorWithErrorMessageFunction) as Wrapper<
      VueRelaxed
    >
    wrapper.find('input').setValue('hola')

    expect(wrapper.vm.fieldValidatorErrorIndicatorShown).toBe(false)
    wrapper.vm.fieldValidatorTouch()
    expect(wrapper.vm.fieldValidatorErrorIndicatorShown).toBe(true)
    expect(wrapper.vm.fieldValidatorInlineErrors).toEqual([
      { errorMessage: 'inline mock error hola', inline: true }
    ])
  })

  it('shows error field validator indicator after touched', () => {
    const inlineValidatorReturningErrorMessage = {
      isInvalid: jest.fn().mockReturnValue('Error from validator')
    }

    const wrapper = renderMixin(inlineValidatorReturningErrorMessage) as Wrapper<
      VueRelaxed
    >
    wrapper.find('input').setValue('hola')

    expect(wrapper.vm.fieldValidatorErrorIndicatorShown).toBe(false)
    wrapper.vm.fieldValidatorTouch()
    expect(wrapper.vm.fieldValidatorErrorIndicatorShown).toBe(true)
    expect(wrapper.vm.fieldValidatorInlineErrors).toEqual([
      { errorMessage: 'Error from validator', inline: true }
    ])
  })

  function renderMixin(validator = {}, mixinOptions = {}) {
    const componentWithMixin = {
      // @ts-ignore
      mixins: [fieldValidatorMixin(mixinOptions)],
      template: '<input type="text" v-model="value" data-plankton-test="input" />',
      data() {
        return { value: '' }
      }
    }

    const formProviderMock = {
      registerField: jest.fn(),
      unregisterField: jest.fn(),
      setFieldValidationErrors: jest.fn(),
      submitted: Vue.observable({ value: false })
    }

    return mount(componentWithMixin, {
      propsData: {
        validators: validator
      },
      provide: {
        [formProvider.from]: formProviderMock
      }
    })
  }
})
