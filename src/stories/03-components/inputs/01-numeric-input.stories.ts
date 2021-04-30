import NumericInputField from '@/components/input-fields/NumericInputField.vue'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Inputs/NumericInputField`,
  component: NumericInputField
}

export const Default = () => ({
  template: `<NumericInputField/>`
})

export const Disabled = () => ({
  template: `<NumericInputField :disabled="true"/>`
})

export const WithTitle = () => ({
  template: `<NumericInputField title="Only numbers in"/>`
})

export const WithCustomIcon = () => ({
  template: `<NumericInputField materialIcon='replay'/>`
})

export const WithTextIcon = () => ({
  template: `<div>
        <NumericInputField textIcon="°C"/>
        <NumericInputField textIcon="cm"/>
        <NumericInputField textIcon="AD"/>
        <NumericInputField textIcon="mm"/>
        </div>`
})

export const WithDefaultValue = () => ({
  template: `<NumericInputField v-model="number"/>`,
  data() {
    return {
      number: 2.5
    }
  }
})

export const WithPlaceholder = () => ({
  template: `<NumericInputField placeholder="123456" />`
})

export const TakingNegativeValues = () => ({
  template: `<NumericInputField title="I accept negative values" :allowNegative="true"/>`
})

export const TakingOnlyIntegers = () => ({
  template: `<NumericInputField :allowDecimal="false"/>`
})

export const TakingAValueWithOnlyTwoIntegralAndTwoDecimalParts = () => ({
  template: `<NumericInputField :allowDecimal="2" :allowIntegral="2"/>`
})

export const WithValidation = () => ({
  template: `<NumericInputField title="I won't accept divisors of 3" v-model="price" :inputValidators="inputValidators"/>`,
  data() {
    return {
      price: null,
      inputValidators: [{ isInvalid: (input: string) => parseInt(input) % 3 === 0 }]
    }
  }
})

export const WithValidationAndCustomErrorMessage = () => ({
  template: `<NumericInputField title="Cozy temperature" v-model="value" :inputValidators="inputValidators" />`,
  data() {
    return {
      value: null,
      inputValidators: [
        {
          isInvalid: (input: string) => parseInt(input) < 20,
          errorMessage: 'Too cold!'
        },
        {
          isInvalid: (input: string) => parseInt(input) > 30,
          errorMessage: 'Too hot!'
        }
      ]
    }
  }
})
