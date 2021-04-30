import MoneyInputField from '@/components/input-fields/MoneyInputField.vue'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Inputs/MoneyInputField`,
  component: MoneyInputField
}

export const Default = () => ({
  components: { MoneyInputField },
  template: `<MoneyInputField/>`
})

export const Disabled = () => ({
  components: { MoneyInputField },
  template: `<MoneyInputField :disabled="yes"/>`,
  data() {
    return {
      yes: true
    }
  }
})

export const WithTitle = () => ({
  components: { MoneyInputField },
  template: `<MoneyInputField title="How much do I owe you?"/>`
})

export const WithDefaultValue = () => ({
  components: { MoneyInputField },
  template: `<MoneyInputField v-model="amount"/>`,
  data() {
    return {
      amount: 2.5
    }
  }
})

export const WithPlaceholder = () => ({
  components: { MoneyInputField },
  template: `<MoneyInputField placeholder="123456" />`
})

export const TakingNegativeValues = () => ({
  components: { MoneyInputField },
  template: `<MoneyInputField title="I accept negative values" :allowNegative="yes"/>`,
  data() {
    return {
      yes: true
    }
  }
})

export const TakingOnlyIntegers = () => ({
  components: { MoneyInputField },
  template: `<MoneyInputField :allowDecimal="false"/>`
})

export const WithValidation = () => ({
  components: { MoneyInputField },
  template: `<MoneyInputField title="I won't accept divisors of 3" v-model="price" :inputValidators="inputValidators"/>`,
  data() {
    return {
      price: null,
      inputValidators: [{ isInvalid: (input: string) => parseInt(input) % 3 === 0 }]
    }
  }
})

export const WithValidationAndCustomErrorMessage = () => ({
  components: { MoneyInputField },
  template: `<MoneyInputField title="I won't accept zero" v-model="value" :inputValidators="inputValidators" />`,
  data() {
    return {
      value: null,
      inputValidators: [
        {
          isInvalid: (input: string) => parseInt(input) === 0,
          errorMessage: 'Zero is not a valid value'
        }
      ]
    }
  }
})
