const PROVIDER_KEY = Symbol('form provider')
const providerCallbackDefault = () => () => {}

export const provider = {
  from: PROVIDER_KEY,
  default: {
    registerField: providerCallbackDefault,
    unregisterField: providerCallbackDefault,
    setFieldValidationErrors: providerCallbackDefault,
    isFormDisabled: () => false
  }
}
