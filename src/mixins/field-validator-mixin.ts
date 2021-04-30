// @ts-nocheck
import uuid from 'uuid/v4'
import { provider as formProvider } from '@/components/form-provider'

const isFunction = (obj: any) => !!(obj && obj.constructor && obj.call && obj.apply)
const isString = (obj: any) => typeof obj === 'string' || obj instanceof String
const isBoolean = (obj: any) => typeof obj === 'boolean'
const DEFAULT_ERROR_MESSAGE = (value: string) => `validation error: ${value}`

interface validator {
  isInvalid: (arg: any) => boolean
  errorMessage: (arg: string) => string
  inline: boolean
}

const validatorPropValidator = (validators = []) => {
  if (!(validators instanceof Array)) {
    if (typeof validators === 'object') {
      validators = [validators]
    } else {
      return false
    }
  }
  return validators.every(
    ({ isInvalid, errorMessage = DEFAULT_ERROR_MESSAGE, inline = true }) =>
      isFunction(isInvalid) &&
      (isString(errorMessage) || isFunction(errorMessage)) &&
      isBoolean(inline)
  )
}

const getValidationErrors = (validators: validator[], value: any) => {
  return validators.reduce((validationErrors: any[], validator: validator) => {
    const { isInvalid, errorMessage, inline = true } = validator
    const result = isInvalid(value)
    if (typeof result === 'boolean' && result) {
      const error = isFunction(errorMessage) ? errorMessage(value) : errorMessage
      return [...validationErrors, { errorMessage: error, inline }]
    } else if (typeof result === 'string' && result !== '') {
      return [...validationErrors, { errorMessage: result, inline }]
    } else {
      return validationErrors
    }
  }, [])
}

const DEFAULT_OPTIONS = {
  validatorsPropName: 'validators',
  componentValue: 'value'
}

export default (optionsParam = {}) => {
  const options = { ...DEFAULT_OPTIONS, ...optionsParam }
  const getValidators = (component: any): validator[] => {
    const validators = component[options.validatorsPropName]
    if (!(validators instanceof Array)) {
      return [validators]
    } else {
      return validators
    }
  }
  const getValue = (component: any) => component[options.componentValue]

  return {
    props: {
      name: { type: String, default: () => uuid() },
      [options.validatorsPropName]: {
        type: [Object, Array],
        validator: validatorPropValidator,
        default: () => []
      }
    },
    inject: { fieldValidatorFormProvider: formProvider },
    data() {
      return {
        fieldValidatorDirty: false,
        fieldValidatorHasGeneralErrors: false,
        fieldValidatorSubmitted: false
      }
    },
    computed: {
      fieldValidatorInlineErrorsShown(): () => boolean {
        return (
          (this.fieldValidatorDirty || this.fieldValidatorSubmitted) &&
          this.fieldValidatorInlineErrorMessages.length > 0
        )
      },
      fieldValidatorErrorIndicatorShown(this: void): () => boolean {
        return this.fieldValidatorInlineErrorsShown || this.fieldValidatorHasGeneralErrors
      },
      fieldValidatorInlineErrorMessages() {
        return this.fieldValidatorInlineErrors
          .filter((error: validator) => error.inline)
          .map((error: validator) => error.errorMessage)
      },
      fieldValidatorInlineErrors(): validator[] {
        const value = getValue(this)
        const inlineValidators = getValidators(this).filter(
          ({ inline = true }) => inline === true
        )
        return getValidationErrors(inlineValidators, value)
      }
    },
    watch: {
      fieldValidatorInlineErrors(errors: any) {
        this.fieldValidatorFormProvider.setFieldValidationErrors(this.name, errors)
      }
    },
    mounted() {
      const onFormSubmitted = () => {
        const generalValidators = getValidators(this).filter(
          ({ inline = true }) => !inline
        )
        const generalErrors = getValidationErrors(generalValidators, getValue(this))
        this.fieldValidatorHasGeneralErrors = generalErrors.length > 0
        this.fieldValidatorSubmitted = true

        return generalErrors.concat(this.fieldValidatorInlineErrors)
      }
      this.fieldValidatorFormProvider.registerField(this.name, onFormSubmitted)
    },
    beforeDestroy() {
      this.fieldValidatorFormProvider.unregisterField(this.name)
    },
    methods: {
      fieldValidatorTouch() {
        this.fieldValidatorDirty = true
      }
    }
  }
}
